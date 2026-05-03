# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

**Somos el Mejor País de Chile (SEMPDC)** is a satirical Node.js web dashboard celebrating Chilean national identity. It surfaces real rankings and cultural news, framed as unambiguous national victory. Solo project, one owner.

Full product spec is in `docs/PRD.md`. Read it before making architectural decisions — it defines scope, personas, accepted data sources, and explicit v2 deferrals.

## v1 Scope (what exists now vs. what is deferred)

**In v1:**
- "Number 1" Fetcher — rankings from World Bank, IMF, and curated static data, split into Serious Wins and Absurdist Wins
- "Chaos Culture" Live Feed — RSS/API aggregation from Chilean news sources, with the Cerveza Cristal video transition filter

**Deferred to v2 (do not build):**
- Meme-o-Meter (social API / hashtag leaderboard)
- User accounts, voting, or any user-generated content
- Community submission of Absurdist Rankings
- Mobile app
- Improved HTML scraper: generic multi-target scraper with configurable selectors, error reporting, and automatic Chile rank detection across arbitrary ranking pages

## Key Decisions

- **Absurdist Rankings** are defined in a static config file maintained by the owner — no database table, no admin UI, no moderation.
- **Cerveza Cristal Filter** is a satirical homage. It is legally protected under Chilean law. No licensing is needed.
- **Data privacy (Ley 19.628):** v1 collects no PII. Revisit only when user accounts are introduced in v2.
- **Language:** Spanish only in v1.

## Stack & Runtime

- **Runtime:** Node.js v24 / npm 11
- **Framework:** Next.js 16.2.4 + React 19, App Router
- **Language:** TypeScript throughout
- **Styling:** Tailwind CSS 4
- **Fonts:** Self-hosted in `public/fonts/` — no Google Fonts

## Architecture Intent

- Data fetching for rankings runs server-side and caches results; refresh interval is at least once per 24 hours.
- Fetcher architecture is modular: each source is a separate file implementing a shared `RankingFetcher` interface. Three source types are supported: structured APIs (World Bank, UN, etc.), HTML scraping, and static config. Adding a source = adding one file. Current fetchers: `world-bank`, `imf`, `wikipedia-scraper`.
- Rankings page (`src/app/page.tsx`) uses `export const dynamic = "force-dynamic"` so cards are shuffled randomly on every request (underlying fetch calls still use their own data cache).
- Feed sources: 10 Chilean RSS feeds + Reddit r/chile + Reddit r/republicadechile, 72-hour filter, cached 1h. Reddit is feed-only — not a rankings source.
- Absurdist Rankings live in `src/config/absurdist-rankings.ts`, not a database. Do not modify without owner approval — it is used by external collaborators.
- Feed items older than 72 hours must be filtered out before rendering.
- No user authentication or session persistence beyond localStorage for UI toggles (e.g., Cerveza Cristal filter state, one-time welcome popup).
- Separate serializable config (data, settings) from non-serializable config (closures, handlers).
- Favicon: `src/app/icon.svg` (copy of `public/logo.svg`) — Next.js App Router picks it up automatically. No `favicon.ico`.
- `src/components/NavPopup.tsx` — client component rendering nav buttons + a one-time tooltip popup anchored below "Caos Cultural". Popup state persists via `localStorage` key `popup-seen`.

## Branding

- Project footer and any `author` fields: **Felipe Carvajal Brown**
- Never use "Instituto Igualdad" or any other prior affiliation name.

## Performance Targets

From the PRD — these are acceptance criteria, not aspirational:
- LCP < 2.5s, CLS < 0.1, FID < 100ms (Core Web Vitals)
- 1,000 concurrent users without degradation
- 99.5% uptime

## Working Style

- **One file at a time** — present a file, wait for feedback, then move to the next.
- **Fixes and improvements:** diffs and targeted snippets only — never a full file rewrite unless explicitly asked.
- **Recommendations:** give one, don't hedge with multiple options.

## Code Style

- Comments: 1-line max — no block comments, no multi-line comments.
- Bug fixes go to the root cause — never patch test parameters to produce passing results.

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`, `style`

Examples:
- `feat(rankings): add World Bank API integration`
- `fix(feed): filter items older than 72 hours`
- `chore(config): update absurdist rankings list`
- `docs(prd): close open questions on Meme-o-Meter and curation`

Scope is optional but encouraged for this project: `rankings`, `feed`, `filter`, `config`, `ui`.

## Commands

```
npm run dev      # development server (http://localhost:3000)
npm run build    # production build
npm run start    # run production build locally
npm run lint     # ESLint
```

Never chain shell commands with `&&` — use separate commands or `;`.

## Next.js 16 — Breaking Changes

This project uses **Next.js 16.2.4** and **React 19**. Both have breaking changes from prior versions. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. APIs, conventions, and file structure may differ from training data.

## Development Roadmap

Status legend: `[ ]` todo · `[x]` done · `[-]` in progress

**Phase 0 — Foundation**
- [x] 1. Strip Next.js boilerplate; configure Tailwind with Chilean flag palette (red, white, blue, neutral grays)
- [x] 2. Self-hosted font setup in `public/fonts/`
- [x] 3. Root layout: header, main, footer — footer branding "Felipe Carvajal Brown"
- [x] 4. `config/absurdist-rankings.ts` — TypeScript type + 8–10 seed entries

**Phase 1 — Number 1 Fetcher (P0)**
- [x] 5. TypeScript interfaces for ranking cards (shared type for Serious and Absurdist)
- [x] 6. Server-side fetcher for World Bank API with 24-hour cache (`unstable_cache` or `fetch` cache)
- [x] 7. Rankings page UI — card grid, all cards mixed (no split), Verificado badge for serio only, earthquake hover, force-dynamic shuffle
- [x] 8. Wire static Absurdist config into the same card grid

**Phase 2 — Chaos Culture Feed (P1)**
- [x] 9. RSS aggregator (server-side) from 10 Chilean news sources + Reddit feed, 72-hour filter before render
- [x] 10. Feed UI — list component with pagination
- [ ] 11. Cerveza Cristal filter — 2-second transition on video previews, toggle in localStorage

**Phase 3 — Polish**
- [x] 14. Logo seal (`public/logo.svg` + `src/app/icon.svg`): circular presidential seal, condor silhouette, poop silhouette, no text
- [x] 15. Nav buttons with button styling; one-time welcome tooltip popup via `NavPopup` client component
- [ ] 12. Responsive pass: desktop (1280px+) and tablet (768px+)
- [ ] 13. Core Web Vitals check: LCP < 2.5s, CLS < 0.1, FID < 100ms
