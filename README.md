# Jeavy Reppel — Karting Site


<!-- sync trigger: 2026-06-30e.g -->

Static React + Vite site, deployed to **GitHub Pages**, with content managed via **Sveltia CMS** (git-based, draait op `/admin/`). Geen externe hosting nodig.

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

## Editing content (Sveltia CMS)

All editable content lives in `/content/` as markdown files and wordt beheerd
via **Sveltia CMS** — een git-based admin die volledig in de browser draait,
geserveerd vanaf je eigen site op `/<repo>/admin/`. Geen externe hosting nodig.

### Eenmalige setup

1. Open `public/admin/config.yml` en vervang `OWNER/REPO` (en de twee
   `site_url` regels) door je eigen GitHub gebruiker + repo naam.
2. Maak een **GitHub OAuth App** aan zodat Sveltia kan inloggen op je repo:
   - GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*
   - Homepage URL: `https://<user>.github.io/<repo>/`
   - Authorization callback URL: `https://auth.sveltia.dev/callback`
     *(gratis publieke OAuth proxy van Sveltia — geen eigen server nodig)*
   - Noteer **Client ID** en **Client Secret**.
3. Ga naar [auth.sveltia.dev](https://auth.sveltia.dev) en registreer je
   OAuth App één keer met de twee waarden uit stap 2. Klaar.

Liever zelf hosten? Deploy [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth)
op een gratis Cloudflare Worker en zet de URL als `backend.base_url` in
`config.yml`.

### Dagelijks gebruik

1. Ga naar `https://<user>.github.io/<repo>/admin/`.
2. Log in met je GitHub account → je ziet de collecties **Over mij**,
   **Racekalender** en **Sponsors**.
3. Wijzig of voeg toe → **Publish** → Sveltia commit naar `main` →
   GitHub Actions rebuildt de site automatisch (1-2 min).

Geüploade afbeeldingen landen in `public/images/uploads/`.

## Project structure

```
content/                # markdown content (edited via Sveltia CMS)
  about.md
  races/*.md
  sponsors/*.md
public/admin/           # Sveltia CMS admin (config.yml + index.html)
public/images/          # static images (hero, paddock, etc.)
src/
  components/           # React components
  lib/content.ts        # build-time markdown loader
  lib/asset.ts          # base-path aware asset URLs
  App.tsx               # single-page composition
  main.tsx
public/admin/config.yml # Sveltia CMS schema
.github/workflows/      # GitHub Pages deploy
```

## Live Instagram feed

The "Laatste Socials" section is populated at build time from your Instagram
Business/Creator account via the Instagram Graph API. The workflow re-runs
every 6 hours (cron) so new posts appear without a code change.

### One-time setup

1. **Convert your Instagram account** to *Business* or *Creator* (Instagram app
   → Settings → Account type and tools) and connect it to a Facebook Page.
2. **Generate a long-lived access token** with the `instagram_basic` permission.
   Easiest paths:
   - Meta's [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
     → select your app → request `instagram_basic` + `pages_show_list` →
     exchange the short-lived token for a long-lived one (60 days), or
   - Use a helper like [token.fbcdev.com](https://token.fbcdev.com/) /
     `developers.facebook.com/tools/accesstoken`.
3. **Add the token as a GitHub repo secret**:
   GitHub → repo → *Settings → Secrets and variables → Actions → New repository secret*
   - Name: `IG_TOKEN`
   - Value: the long-lived token
   - *(optional)* `IG_USER_ID` if you want to pin a specific IG user id;
     otherwise the script uses the token's `/me` account.
4. Push to `main` (or run the workflow manually under *Actions*). The fetch
   step writes `content/instagram.json`, which the build embeds as static cards.

### Refreshing the token

Long-lived tokens last ~60 days. Refresh by re-running the exchange flow and
updating the `IG_TOKEN` secret. The build keeps working with the last
successful feed if a fetch ever fails — it never blocks the deploy.

