# Jeavy Reppel — Karting Site

<!-- sync trigger: 2026-08-17a -->

Static React + Vite site, deployed naar **GitHub Pages**, met een **eigen ingebouwd CMS**
op `/#/admin` dat op Lovable Cloud (database + login) draait. Geen externe CMS-dienst nodig.

## Local dev

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # outputs ./dist
```

## Deployen naar GitHub Pages

1. Push deze repo naar GitHub.
2. In de repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. De workflow in `.github/workflows/deploy.yml` bouwt bij elke push naar `main` of `jr`.

Custom domein: `public/CNAME` bevat `jeavyreppel.nl`.

## Content beheren (eigen CMS)

1. Ga naar `https://jeavyreppel.nl/#/admin` (of `/#/admin` op de preview-URL).
2. Maak eenmalig een account aan met e-mail + wachtwoord. De **eerste** gebruiker
   krijgt automatisch de beheerdersrol; daarna log je gewoon in.
3. Beheer de secties **Over mij**, **Seizoen** (races) en **Sponsors**.
4. Opslaan = direct live. Geen rebuild of GitHub-commit nodig, want de content
   staat in de database.

Afbeeldingen: plaats bestanden in `public/images/` (of gebruik een volledige
https-URL) en vul het pad in bij het betreffende veld.

De markdown in `/content/` dient nog als fallback-inhoud tijdens het laden.

## Project structure

```
content/                # fallback content (markdown)
public/images/          # statische afbeeldingen (hero, paddock, etc.)
src/
  components/           # React componenten
  pages/Home.tsx        # publieke one-pager
  pages/Admin.tsx       # het CMS
  lib/site-data.tsx     # laadt content uit de database
  lib/content.ts        # markdown fallback loader
  lib/asset.ts          # base-path aware asset URLs
.github/workflows/      # GitHub Pages deploy
```

## Instagram

De "Laatste Socials" sectie gebruikt de **Elfsight Instagram Feed** widget
(script in `index.html`). Die update automatisch — geen API-token of build-stap nodig.
