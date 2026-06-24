
## Doel
De geüploade karting-site omzetten naar een **statische Vite + React** site die via **GitHub Actions** naar **GitHub Pages** publisht, met **Pages CMS** (pagescms.org) om About, Racekalender en Sponsors via een webinterface te beheren — zonder enige andere hosting dan GitHub.

## Wat ik ga bouwen

### 1. Project omzetten naar Vite static
- Lovable's TanStack Start scaffold opzij zetten en vervangen door een schone Vite + React + TS + Tailwind v4 opzet (zelfde stijl die je gewend bent).
- De huidige Next.js componenten (`Hero`, `About`, `Season`, `Stats`, `Partners`, `Socials`, `ContactCta`, `Navbar`, `Flag`) overzetten naar gewone React componenten. Next-specifieke dingen (`next/image`, `next/font`) vervangen door `<img>` + `@fontsource`.
- Afbeeldingen uit `public/` (hero, paddock, helmet, profile) verhuizen naar `public/images/` zodat ze direct werken op GitHub Pages.
- `vite.config.ts` met `base: '/<repo-naam>/'` zodat assets werken onder `username.github.io/<repo>`. Als je later een custom domain koppelt is dat één regel aanpassen.

### 2. Content uit code halen → bewerkbaar via CMS
De drie secties die jij noemde worden gevoed door **markdown/JSON-bestanden** in de repo (`content/`):

- `content/about.md` — frontmatter (titel, foto, stats) + markdown body voor de "About me" tekst.
- `content/races/*.md` — één bestand per race (datum, circuit, klasse, resultaat, status). De Race-kalender (`Season`) leest deze map en sorteert op datum.
- `content/sponsors/*.md` — één per sponsor (naam, logo, website, tier). `Partners` component rendert grid.

Componenten lezen deze bestanden via Vite's `import.meta.glob` (build-time, dus pure static — geen runtime fetch).

### 3. Pages CMS configuratie
`.pages/config.yml` in de repo-root die Pages CMS gebruikt om te weten welke collecties bestaan en welke velden bewerkbaar zijn. Pages CMS UI draait op pagescms.org, jij logt in met GitHub, hij commit direct naar je repo. Zero extra hosting.

Collecties die ik configureer:
- **About** — single file, velden: naam, ondertitel, foto-upload, bio (rich text), stats (lijstje met label+waarde).
- **Races** — folder collection, velden: datum, circuit, locatie, klasse, status (geplanned/gereden), resultaat (optioneel), notes.
- **Sponsors** — folder collection, velden: naam, logo-upload, website-url, tier (hoofdsponsor/partner/etc), volgorde.

Image uploads via Pages CMS landen automatisch in `public/images/uploads/`.

### 4. GitHub Actions deploy
`.github/workflows/deploy.yml`:
- Trigger op push naar `main`.
- Bun install → `bun run build` → upload `dist/` als Pages artifact → deploy naar Pages.
- `actions/configure-pages` zorgt dat de `base` URL klopt.

### 5. README met setup-stappen
Korte instructies: GitHub repo verbinden, Pages aanzetten in repo settings (Source = GitHub Actions), Pages CMS koppelen via pagescms.org → "Add project" → repo selecteren.

## Wat NIET in scope
- Geen Lovable Cloud / database (alles bestand-gebaseerd, perfect voor static).
- Geen authentication / forms backend (contact-CTA blijft `mailto:` of socials-link).
- Lovable preview hier kan stuk gaan na de migratie; verificatie gebeurt na eerste GitHub Pages deploy.

## Technische details
- **Vite 5**, **React 19**, **Tailwind v4** (zelfde tokens als nu), **@fontsource** voor fonts.
- **gray-matter** + **marked** voor markdown parsing (build-time via Vite glob, geen runtime overhead).
- **Pages CMS** vereist alleen `.pages/config.yml` in de repo — geen npm package, geen OAuth proxy.
- `base` in `vite.config.ts` + `<base>` aware routing (single page voor nu, dus geen client-side router nodig).

Akkoord? Dan begin ik met de migratie.
