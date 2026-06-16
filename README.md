# CineScope Catalog

Catálogo de filmes desenvolvido com React e Vite, usando dados e imagens da TMDb API. O projeto apresenta uma interface responsiva para consulta de filmes, filtros, ordenação, paginação e visualização detalhada em modal.

## Funcionalidades

- Catálogo com 100 filmes
- Capas e backdrops reais sincronizados pela TMDb API
- Busca por título, diretor, elenco ou gênero
- Filtros por gênero e status
- Ordenação por nota, ano ou duração
- Paginação com 10 filmes por página
- Modal de detalhes com sinopse, elenco, direção, nota, ano e duração
- Player de trailer em tela com fechamento por clique fora, botão X ou tecla Esc
- Ação de favorito em destaque e nos cards
- Layout responsivo para desktop, tablet e mobile

## Tecnologias

- React
- Vite
- Node.js
- Lucide React
- TMDb API

## Como Rodar Localmente

Instale as dependências:

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

Se a porta `5173` estiver ocupada, o Vite usará automaticamente a próxima porta disponível.

## Build de Produção

Para gerar a versão final:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Sincronização com TMDb

O projeto possui um script para buscar dados, imagens reais e trailers dos filmes na TMDb API:

```bash
npm run sync:tmdb
```

Para usar esse script, crie um arquivo `.env.local` na raiz do projeto com:

```text
TMDB_API_KEY=sua_chave_tmdb
```

O arquivo `.env.local` está no `.gitignore` e não deve ser enviado ao GitHub.

Os dados sincronizados são gravados em:

```text
src/tmdbMovies.json
```

Os trailers são buscados primeiro em `pt-BR`. Quando não há vídeo em português do Brasil, o script usa o primeiro trailer disponível em `en-US`.

## Deploy

Configuração recomendada para Vercel:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Não é necessário configurar variáveis de ambiente na Vercel para o deploy atual, pois os dados já estão salvos em `src/tmdbMovies.json`.

## Créditos

- Desenvolvido por: Ricardo Lacerda Pereira
- Mentor: Marlon Santini
- Dados e imagens: TMDb API

Este produto utiliza a API do TMDb, mas não é endossado ou certificado pela TMDb.
