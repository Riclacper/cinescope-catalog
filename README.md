# CineScope Catalog

Catalogo de filmes desenvolvido com React e Vite, usando dados e imagens da TMDb API. O projeto apresenta uma interface responsiva para consulta de filmes, filtros, ordenacao, paginacao e visualizacao detalhada em modal.

## Funcionalidades

- Catalogo com 100 filmes
- Capas e backdrops reais sincronizados pela TMDb API
- Busca por titulo, diretor, elenco ou genero
- Filtros por genero e status
- Ordenacao por nota, ano ou duracao
- Paginacao com 10 filmes por pagina
- Modal de detalhes com sinopse, elenco, direcao, nota, ano e duracao
- Acao de favorito em destaque e nos cards
- Layout responsivo para desktop, tablet e mobile

## Tecnologias

- React
- Vite
- Node.js
- Lucide React
- TMDb API

## Como Rodar Localmente

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:5173/
```

Se a porta `5173` estiver ocupada, o Vite usara automaticamente a proxima porta disponivel.

## Build de Producao

Para gerar a versao final:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Sincronizacao com TMDb

O projeto possui um script para buscar dados e imagens reais dos filmes na TMDb API:

```bash
npm run sync:tmdb
```

Para usar esse script, crie um arquivo `.env.local` na raiz do projeto com:

```text
TMDB_API_KEY=sua_chave_tmdb
```

O arquivo `.env.local` esta no `.gitignore` e nao deve ser enviado ao GitHub.

Os dados sincronizados sao gravados em:

```text
src/tmdbMovies.json
```

## Deploy

Configuracao recomendada para Vercel:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Nao e necessario configurar variaveis de ambiente na Vercel para o deploy atual, pois os dados ja estao salvos em `src/tmdbMovies.json`.

## Creditos

- Desenvolvido por: Ricardo Lacerda Pereira
- Mentor: Marlon Santini
- Dados e imagens: TMDb API

Este produto utiliza a API do TMDb, mas nao e endossado ou certificado pela TMDb.
