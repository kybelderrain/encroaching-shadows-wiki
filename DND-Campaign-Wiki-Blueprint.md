# D&D Campaign Wiki Stack Blueprint (11ty + Open Props + Pagefind + GitHub + Vercel)

This document is the single source of truth for building and deploying a lightweight, standards-forward D&D campaign wiki.

## Goals

- Static, fast, link-heavy “wiki vibe”
- Mostly vanilla HTML/CSS/JS
- Content-first authoring (Markdown + small JSON/YAML datasets)
- Full-text search without external services (Pagefind)
- Clean codebase enforced by Prettier + ESLint
- GitHub-driven deploys to Vercel with preview builds for PRs

---

## Stack

### Core
- **11ty (Eleventy)**: static site generator
- **Open Props**: CSS design tokens
- **Vanilla JS**: minimal enhancements (search UI, nav, theme toggle)
- **Pagefind**: build-time search indexing

### Tooling
- **Prettier**: formatting for Markdown/JSON/CSS/JS
- **ESLint**: JS linting
- (Optional) **Stylelint**: CSS linting if we want strict CSS rules later

### Platform
- **GitHub**: source control + history + collaboration
- **Vercel**: deploy + preview URLs for branches/PRs

---

## Architecture Overview

Local authoring:
1) Edit Markdown/data/templates/styles/scripts
2) Run `npm run dev` to preview locally
3) Run `npm run lint` + `npm run format:check` before committing
4) Commit + push to GitHub

CI/deploy:
- GitHub push triggers Vercel build
- Vercel runs:
  - Install deps
  - Build 11ty to `_site/`
  - Run Pagefind indexing on `_site/`
- Vercel publishes:
  - Preview deploy for PRs/branches
  - Production deploy for `main`

---

## Repository Layout

Recommended structure (keep it predictable, wiki-friendly):

```text
.
├─ src/
│  ├─ content/
│  │  ├─ sessions/
│  │  ├─ npcs/
│  │  ├─ locations/
│  │  ├─ factions/
│  │  ├─ items/
│  │  └─ lore/
│  ├─ _data/
│  │  ├─ site.json
│  │  ├─ nav.json
│  │  └─ (optional) npcs.json, quests.json, factions.json
│  ├─ _includes/
│  │  ├─ layouts/
│  │  │  ├─ base.njk
│  │  │  ├─ page.njk
│  │  │  └─ listing.njk
│  │  ├─ partials/
│  │  │  ├─ header.njk
│  │  │  ├─ sidebar.njk
│  │  │  ├─ footer.njk
│  │  │  └─ search.njk
│  │  └─ shortcodes/
│  ├─ assets/
│  │  ├─ css/
│  │  │  └─ site.css
│  │  ├─ js/
│  │  │  ├─ main.js
│  │  │  └─ search.js
│  │  └─ img/
│  └─ index.md
├─ _site/                 (build output, gitignored)
├─ .eleventy.js
├─ package.json
├─ .gitignore
├─ .editorconfig
├─ .prettierrc
├─ .prettierignore
├─ eslint.config.js        (or .eslintrc depending on preference)
└─ README.md
```

Notes:
- Keep everything authored under `src/` so output stays clean.
- Content lives in `src/content/*` with Markdown front matter.
- Global data in `src/_data/` is perfect for nav, site metadata, tags, etc.

---

## Content Conventions (Wiki-first)

### Markdown front matter (baseline)
Every page should include:

```yaml
---
title: "Page Title"
description: "1–2 sentence summary used for previews and SEO"
tags: ["region:panthalasia", "faction:tiamat", "arc:embered-sanctuary"]
date: 2026-03-02
---
```

Conventions:
- Use tag prefixes like `region:*`, `faction:*`, `arc:*`, `type:*` so tag pages are tidy.
- Prefer stable slugs for permalinks (avoid renaming URLs if you can).

### Crosslinking
- Use normal Markdown links between pages.
- We will add heading anchors so you can deep-link into sections of a lore page.

---

## Styling with Open Props

### Design approach
- Import Open Props tokens.
- Use a small set of semantic layout primitives (e.g., `.stack`, `.cluster`, `.card`).
- Keep typography and spacing consistent using tokens.

### CSS plan
- `site.css` contains:
  - Open Props imports
  - base typography + layout
  - component styles: cards, callouts, tables, tags, breadcrumbs
  - optional themes: `data-theme="night"` toggle

---

## JavaScript (Vanilla + Minimal)

We keep JS additive:
- Search UI behaviors (open/close, keyboard shortcut)
- Nav enhancements (mobile sidebar toggle)
- Theme toggle (optional)
- Local-only private notes using `localStorage` (optional, separate module)

No client-side routing, no SPA framework.

---

## Search with Pagefind

### Build-time indexing
We run Pagefind after 11ty builds `_site/`.

Implementation notes:
- Pagefind expects static HTML output.
- Add a search box that loads Pagefind UI JS and points at the generated index.

Expected output:
- Pagefind generates an index folder inside `_site/` (commonly `_site/pagefind/`)

---

## Code Quality: Prettier + ESLint

### Prettier
Formats:
- Markdown
- JSON/YAML
- CSS
- JS

### ESLint
Lints:
- Vanilla JS (browser)
- Keeps the JS small, readable, and consistent

Optional later:
- Stylelint if CSS grows and we want stricter style rules.

---

## Scripts (package.json)

Cursor should implement these standard scripts:

- `dev`  
  Runs 11ty in serve/watch mode.

- `build`  
  Runs 11ty build into `_site`.

- `search:index`  
  Runs Pagefind against `_site`.

- `build:prod`  
  Runs build + search indexing in sequence.

- `format`  
  Runs Prettier in write mode.

- `format:check`  
  Runs Prettier in check mode (CI friendly).

- `lint`  
  Runs ESLint.

- `lint:fix`  
  Runs ESLint with auto-fix.

Recommended dependency mindset:
- Keep dependencies minimal.
- Prefer official 11ty packages/plugins where practical.
- Keep JS libraries out unless absolutely needed.

---

## Vercel Deployment

### Vercel settings
- Framework preset: “Other” (or Eleventy if available)
- Build command: `npm run build:prod`
- Output directory: `_site`

Behavior:
- Push to `main` -> production deploy
- PRs/branches -> preview deploys

---

## GitHub Workflow

Branches:
- `main` for stable production
- feature branches for changes (e.g., `feature/search-ui`, `feature/npc-layout`)

Pull requests:
- Use preview deploy URL to review changes.
- Optional: require checks to pass before merging.

Optional GitHub Actions (recommended if collaborating):
- Run `npm ci`
- Run `npm run format:check`
- Run `npm run lint`
- Run `npm run build:prod` (smoke test)

---

## Step-by-Step Build Plan (Implementation Order)

1) **Scaffold repo**
   - Add `package.json`, `.gitignore`, `.editorconfig`
   - Install 11ty
   - Add `src/` structure

2) **11ty configuration**
   - Set input to `src`, output to `_site`
   - Add Markdown support and template engine (Nunjucks recommended)
   - Add passthrough copy for `src/assets/`

3) **Base layout + navigation**
   - `base.njk` with header/sidebar/footer
   - `nav.json` for sidebar structure
   - Build breadcrumbs (optional)

4) **Open Props styling**
   - Add Open Props import
   - Build base typography + layout primitives
   - Style wiki elements: tables, blockquotes, callouts, tag pills

5) **Collections + listing pages**
   - Sessions index (sorted by date desc)
   - NPC directory (alphabetical)
   - Locations directory (by region tag)
   - Tag pages (all pages with `tags`)

6) **Anchors + usability**
   - Heading anchor links
   - “Copy link to heading” UI (optional)

7) **Pagefind**
   - Add build step to index `_site`
   - Add search UI partial and minimal JS

8) **Tooling**
   - Add Prettier config + ignore
   - Add ESLint config
   - Wire scripts and make sure build fails on lint in CI (optional)

9) **Deploy**
   - Push to GitHub
   - Connect to Vercel
   - Confirm preview + production deploys

---

## Acceptance Criteria (Definition of Done)

- `npm run dev` serves the wiki locally
- `npm run build:prod` produces `_site` with Pagefind index generated
- Sidebar nav renders from `nav.json`
- At least these sections exist with templates:
  - Sessions
  - NPCs
  - Locations
  - Factions
  - Items
- Search returns results across pages
- `npm run lint` passes
- `npm run format:check` passes
- Vercel deploys preview URLs for PRs and prod for `main`

---

## Cursor Notes (How Cursor should use this file)

When generating code:
- Prefer minimal dependencies and modern web standards
- Keep templates small and readable
- Keep CSS mostly semantic (Open Props tokens + small components)
- Keep JS additive and modular (no frameworks)
- Ensure scripts match the names and purposes in this document
- Ensure Vercel build output directory is `_site`

---

## Future Enhancements (Optional, still lightweight)

- Backlinks (“Mentioned in”) generated at build time
- Local-only GM notes stored in `localStorage`/`IndexedDB`
- Image optimization pipeline for maps/handouts
- Dark mode theme via CSS variables
- “Quick jump” command palette (tiny JS)

End of blueprint.
