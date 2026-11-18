# vemreyilmaz.com

Portfolio and freelance site of Veysel Emre Yılmaz. Static site built with [Astro](https://astro.build), in Turkish (`/`) and English (`/en`), hosted on Cloudflare Pages.

## Commands

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Local dev server at `http://localhost:4321`    |
| `npm run build`   | Build the production site into `dist/`         |
| `npm run preview` | Serve the built `dist/` folder locally         |
| `npm run check`   | Type-check `.astro` and `.ts` files            |

Requires Node 22.23 or newer.

## Where to edit content

| What                                   | File                                         |
| -------------------------------------- | -------------------------------------------- |
| Name, email, social links, CV path     | `src/data/site.ts`                           |
| All page copy (TR and EN)              | `src/i18n/ui.ts`                             |
| Projects                               | `src/data/projects.ts`                       |
| Services                               | `src/data/services.ts`                       |
| Experience and skills                  | `src/data/experience.ts`                     |
| Blog posts (Markdown)                  | `src/content/blog/`                          |

### Adding a project

1. Add an entry to `src/data/projects.ts` with texts in both languages. Set `kind` to `product`, `client` or `personal`; the projects page lists products and client work first.
2. Put a cover image named after the slug in `src/assets/projects/` (for example `my-project.png`, ideally 3:2). For a real screenshot, set `shot: true` and it is shown whole inside a browser frame. Images are resized and converted to WebP at build time.
3. Set `featured: true` to show it on the homepage.

### Adding a blog post

Posts are written in both languages: `src/content/blog/tr/my-post.md` (served at `/blog/my-post`) and `src/content/blog/en/my-post.md` (served at `/en/blog/my-post`). Use the same file name in both folders so the language switch links the two versions. Put the cover in `src/assets/blog/` and use this frontmatter:

```md
---
title: 'Post title'
description: 'One-sentence summary.'
date: 2026-11-18
tags: ['.NET']
minutes: 6
cover: ../../../assets/blog/my-post.png
---
```

A post that exists in only one language still works; its language switch goes to the other language's post list. The RSS feed lists the English posts.

## Contact form

The form on `/contact` posts to [Formspree](https://formspree.io). The form ID is `formspreeId` in `src/data/site.ts`.

## Deploying to Cloudflare Pages

The site is the Pages project `vemreyilmaz` (https://vemreyilmaz.pages.dev), served at vemreyilmaz.com.

Every push to `master` publishes the site automatically: `.github/workflows/deploy.yml` installs, type-checks, builds and uploads `dist` with Wrangler. A failing check or build stops the deploy, so the live site stays on the last good version. The workflow needs two repository secrets: `CLOUDFLARE_API_TOKEN` (an API token with the "Cloudflare Pages: Edit" permission) and `CLOUDFLARE_ACCOUNT_ID`. It can also be started by hand from the Actions tab.

To publish from this machine instead:

```sh
npm run build
npx wrangler pages deploy dist --project-name vemreyilmaz --branch main
```

`public/_headers` sets security and cache headers. `dist/404.html` is used automatically as the not-found page.
