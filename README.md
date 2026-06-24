# Jeavy Reppel — Karting Site

Static React + Vite site, deployed to **GitHub Pages**, with content managed via **Pages CMS** (https://pagescms.org). No other hosting needed.

## Local dev

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # outputs ./dist
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` will build on every push to `main` and publish to `https://<user>.github.io/<repo>/`.

The Vite `base` is set automatically by the workflow (`VITE_BASE` from `actions/configure-pages`), so assets work whether deployed to a project site (`/repo-name/`) or a user/org site (`/`).

### Custom domain

Add a `public/CNAME` file with your domain and configure it in **Settings → Pages**. With a custom domain the base becomes `/`, no other changes needed.

## Editing content (Pages CMS)

All editable content lives in `/content/` as markdown files.

1. Go to https://app.pagescms.org and sign in with GitHub.
2. **Add project** → pick this repo.
3. Pages CMS reads `.pages.yml` and shows three collections:
   - **About** — bio, photos, age/class/nationality/team
   - **Race calendar** — one entry per round (track, date, country, result)
   - **Sponsors** — name, logo, URL, display order
4. Save = a commit to `main` = the deploy workflow rebuilds the site automatically.

Image uploads land in `public/images/uploads/`.

## Project structure

```
content/                # markdown content (edited via Pages CMS)
  about.md
  races/*.md
  sponsors/*.md
public/images/          # static images (hero, paddock, etc.)
src/
  components/           # React components
  lib/content.ts        # build-time markdown loader
  lib/asset.ts          # base-path aware asset URLs
  App.tsx               # single-page composition
  main.tsx
.pages.yml              # Pages CMS schema
.github/workflows/      # GitHub Pages deploy
```
