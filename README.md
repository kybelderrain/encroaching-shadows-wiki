# D&D Campaign Wiki

A static, fast, link-heavy wiki for your D&D campaign, built with Eleventy, Open Props, and Pagefind.

## Getting started

1. Install dependencies (already done if you used Cursor to scaffold):

   ```bash
   npm install
   ```

2. Run the local dev server:

   ```bash
   npm run dev
   ```

   This runs Eleventy in watch/serve mode and lets you preview the wiki at `http://localhost:8080` (or the port Eleventy reports).

3. Create or edit content under `src/content/` using Markdown.

## Scripts

- `npm run dev` – run Eleventy in serve/watch mode
- `npm run build` – build the static site into `_site/`
- `npm run search:index` – run Pagefind against `_site/`
- `npm run build:prod` – build + index for production
- `npm run format` – format files with Prettier
- `npm run format:check` – check formatting without writing
- `npm run lint` – run ESLint on `src/**/*.js`
- `npm run lint:fix` – run ESLint with auto-fix

## Content layout

All authored content lives under `src/`:

- `src/content/` – Markdown pages for sessions, NPCs, locations, factions, items, and lore
- `src/_data/` – global JSON data such as site metadata and navigation
- `src/_includes/` – Nunjucks layouts and partial templates
- `src/assets/` – CSS, JS, and images

The Eleventy build outputs the final static site to `_site/`, which is what Vercel will deploy.

