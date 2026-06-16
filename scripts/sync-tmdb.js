import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const mainPath = path.join(rootDir, 'src', 'main.jsx');
const outputPath = path.join(rootDir, 'src', 'tmdbMovies.json');
const envPath = path.join(rootDir, '.env.local');
const imageBaseUrl = 'https://image.tmdb.org/t/p';

async function loadEnv() {
  if (!existsSync(envPath)) return;

  const envFile = await readFile(envPath, 'utf8');
  envFile.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    process.env[key] = value;
  });
}

function extractCatalog(source) {
  const start = source.indexOf('const catalog = [');
  if (start === -1) {
    throw new Error('Nao encontrei "const catalog" em src/main.jsx.');
  }

  const arrayStart = source.indexOf('[', start);
  const endMarker = '\n];';
  const arrayEnd = source.indexOf(endMarker, arrayStart);
  if (arrayEnd === -1) {
    throw new Error('Nao encontrei o fim do array catalog.');
  }

  const arraySource = source.slice(arrayStart, arrayEnd + 2);
  return Function(`"use strict"; return ${arraySource};`)();
}

function normalizeYear(releaseDate) {
  if (!releaseDate) return null;
  const year = Number(releaseDate.slice(0, 4));
  return Number.isNaN(year) ? null : year;
}

function pickBestResult(results, movie) {
  if (!Array.isArray(results) || results.length === 0) return null;

  const withSameYear = results.find((result) => normalizeYear(result.release_date) === movie.year);
  return withSameYear ?? results[0];
}

async function searchMovie(movie, apiKey) {
  const url = new URL('https://api.themoviedb.org/3/search/movie');
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('query', movie.title);
  url.searchParams.set('language', 'pt-BR');
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('year', String(movie.year));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDb respondeu ${response.status} ao buscar ${movie.title}`);
  }

  const payload = await response.json();
  return pickBestResult(payload.results, movie);
}

function pickBestTrailer(videos) {
  if (!Array.isArray(videos) || videos.length === 0) return null;

  const youtubeVideos = videos.filter((video) => video.site === 'YouTube');
  const trailers = youtubeVideos.filter((video) => video.type === 'Trailer');
  const candidates = trailers.length > 0 ? trailers : youtubeVideos;

  return candidates.find((video) => video.official) ?? candidates[0] ?? null;
}

async function fetchTrailer(movieId, apiKey) {
  const languages = ['pt-BR', 'en-US'];

  for (const language of languages) {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('language', language);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDb respondeu ${response.status} ao buscar videos do filme ${movieId}`);
    }

    const payload = await response.json();
    const trailer = pickBestTrailer(payload.results);

    if (trailer) {
      return {
        key: trailer.key,
        name: trailer.name,
        language,
        embedUrl: `https://www.youtube.com/embed/${trailer.key}`,
        watchUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
      };
    }
  }

  return null;
}

async function main() {
  await loadEnv();
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('Defina TMDB_API_KEY em .env.local antes de rodar npm run sync:tmdb.');
  }

  const source = await readFile(mainPath, 'utf8');
  const catalog = extractCatalog(source);
  const synced = [];

  for (const [index, movie] of catalog.entries()) {
    const result = await searchMovie(movie, apiKey);

    if (!result) {
      console.warn(`Sem resultado no TMDb: ${movie.title}`);
      continue;
    }

    const trailer = await fetchTrailer(result.id, apiKey);

    synced.push({
      title: movie.title,
      tmdbId: result.id,
      tmdbTitle: result.title,
      year: normalizeYear(result.release_date) ?? movie.year,
      poster: result.poster_path ? `${imageBaseUrl}/w500${result.poster_path}` : null,
      backdrop: result.backdrop_path ? `${imageBaseUrl}/w1280${result.backdrop_path}` : null,
      overview: result.overview || movie.description,
      rating: result.vote_average ? Number(result.vote_average.toFixed(1)) : movie.rating,
      trailer,
    });

    process.stdout.write(`Sincronizado ${index + 1}/${catalog.length}: ${movie.title}\n`);
  }

  await writeFile(outputPath, `${JSON.stringify(synced, null, 2)}\n`, 'utf8');
  console.log(`Arquivo gerado: ${path.relative(rootDir, outputPath)} (${synced.length} filmes)`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
