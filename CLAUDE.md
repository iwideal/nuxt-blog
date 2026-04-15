# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Nuxt 4 blog site with articles written in Markdown. Articles are stored as `.md` files in `content/` with YAML frontmatter, processed into a data file at build time.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production (runs generate-data.js, then nuxt generate)
pnpm generate   # Generate static site
pnpm preview    # Preview production build
```

## Architecture

### Article System
- **Content**: `content/*.md` - Markdown files with frontmatter (slug, title, description, date, tags)
- **Data Generation**: `scripts/generate-data.js` reads `content/` and generates `articles.data.ts` at build time
- **Data Access**: `composables/useBlog.ts` provides `getArticles()` (sorted by date) and `getArticle(slug)`
- **Rendering**: `pages/blog/[...slug].vue` uses `<MDC>` component from @nuxtjs/mdc to render article content

### Routing
Routes are dynamically generated in `nuxt.config.ts` via a nitro hook that scans the `content/` directory and adds all `.md` files as `/blog/{filename}` routes.

### Styling
- Tailwind CSS via `@nuxtjs/tailwindcss` module
- Markdown styles in `assets/css/markdown.css` applied via `.markdown-body` class

### Key Dependencies
- `nuxt` ^4.2.1
- `@nuxtjs/mdc` ^0.10.0 - Markdown component rendering
- `gray-matter` ^4.0.3 - Frontmatter parsing
- `@nuxtjs/tailwindcss` ^6.14.0
