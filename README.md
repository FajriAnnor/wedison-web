# WEDISON website prototype

Next.js (App Router), TypeScript and Tailwind CSS. All content comes from mock data in `lib/mockData.ts` and `lib/pages.ts`. No backend, database or API keys are needed.

Requires Node.js 20.9 or newer.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Environment variables

None are required. `NEXT_PUBLIC_SITE_URL` is optional (see `.env.example`). Never commit `.env.local`.

## Push to GitHub

```bash
git init
git add .
git commit -m "WEDISON website prototype"
git branch -M main
git remote add origin https://github.com/<your-account>/<your-repo>.git
git push -u origin main
```

Use a private repository. `WEDISON_MASTER_PROMPT.md` is an internal strategy document.

## Deploy on Vercel

1. In Vercel choose **Add New > Project** and import the GitHub repository.
2. Keep the detected settings (Framework: Next.js, build command `npm run build`).
3. Click **Deploy**.

## Prototype notes

- While `IS_MOCK_DATA` is `true` in `lib/mockData.ts`, the site sends `noindex` and `robots.txt` disallows all crawlers. Set it to `false` only when real, verified data replaces the mock data.
- Values tagged "Sample" and `[DATA REQUIRED]` are placeholders. No image files exist yet, so illustrated placeholders are shown. Add real files under `public/images/mock/` and they are picked up automatically.
