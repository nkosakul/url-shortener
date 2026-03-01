[![Netlify Status](https://api.netlify.com/api/v1/badges/4847aac5-dd93-425e-819a-92dcc689087b/deploy-status)](https://app.netlify.com/projects/nkus/deploys)

# URL Shortener

A minimal URL shortener: paste a long URL, get a short link. Open the short link to be redirected to the original URL.

**Vue 3 + TypeScript + mocked API** (no backend). Shortened URLs are stored in the browser’s `localStorage`, so they only resolve in the same browser/device where they were created.

## Demo

**[Try it live →](https://nkus.netlify.app/)**

## Run locally

```bash
npm install
npm run dev
