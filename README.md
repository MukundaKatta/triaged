# Triaged

AI reads every email, sorts it, summarizes threads, and drafts replies in your voice. All for five dollars a month.

**Status:** v0 skeleton — landing page + email-sorting demo route. Full AI not yet wired.

**Landing:** https://triaged.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 email sorter — 5 sample emails auto-sorted into Urgent, Reply, Read Later, Trash via keyword rules |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "triaged"` |

## What's next

- Wire real AI (contextual sorting + thread summarization)
- Voice-matched draft generation
- Auth + per-user inbox connection
