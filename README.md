# Liangliang Xu — personal site (AI for Science)

Static React (Vite) site: bilingual (EN / 中文), white UI with tech accents.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this folder as a Git repository (or monorepo subfolder with root set to `liangliang-xu-site` in Vercel project settings).
2. In Vercel: **New Project** → import the repo → framework **Vite** is auto-detected; build command `npm run build`, output `dist`.
3. Optional assets: `public/0.png` (hero); `public/partners-logos.png` (collaboration logos). Missing files fall back to `hero-fallback.svg` and `partners-placeholder.svg`.

## Content updates

- Copy and navigation labels: `src/content/copy.ts`
- Publication list (parsed from CV JSON): `src/content/publications_raw.json`, `src/content/publications.ts`, `src/content/parsePublication.ts`
- Styles: `src/App.css`, `src/index.css`
