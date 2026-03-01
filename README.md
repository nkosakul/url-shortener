[![Netlify Status](https://api.netlify.com/api/v1/badges/4847aac5-dd93-425e-819a-92dcc689087b/deploy-status)](https://app.netlify.com/projects/nkus/deploys)

# URL Shortener (MVP)

Paste a long URL and get a short link. Open the short link and you’re taken straight to the original.

Built with **Vue 3**, **TypeScript**, and a mocked API (no backend). Links are stored in your browser’s `localStorage`, so they only work in the same browser where you created them.

## Demo

**[Try it live →](https://nkus.netlify.app/)**

## How it works

1. Enter a long URL and click **Shorten Link** — you get a short link (e.g. `https://nkus.netlify.app/r/abc12345`).
2. Open that short link and you’re redirected to the original URL.

## Run locally

```bash
npm install
npm run dev
```
