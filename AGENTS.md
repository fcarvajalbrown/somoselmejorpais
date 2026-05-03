# Agent Instructions — Somos el Mejor País de Chile (SEMPDC)

This file is for any AI agent (Kimi, Gemini, GPT, etc.) working on this project.
Read this before writing any code, generating any content, or making any suggestions.

---

## Who you are working with

**Name:** Felipe Carvajal Brown  
**Location:** Santiago, Chile

### Affiliation rules
| Context | Use |
|---|---|
| Code — `author` fields, package metadata | Felipe Carvajal Brown |
| Project footers, branding | Felipe Carvajal Brown |
| Security reports, responsible disclosure PDFs | Magíster en Simulaciones Numéricas, UPM |
| Academic papers | UPM + ORCID 0000-0002-8300-7587 |
| Never use | Instituto Igualdad, UC Chile, or any other prior affiliation |

---

## Project summary

SEMPDC is a satirical Node.js web dashboard that celebrates Chilean national identity. It aggregates real rankings and news and frames everything as an unambiguous national victory.

Full spec: `docs/PRD.md`. Read it before making any architectural decisions.

---

## What is and is not in scope for v1

**Build:**
- "Number 1" Fetcher — rankings from World Bank, IMF, and a static config file, split into Serious Wins and Absurdist Wins
- "Chaos Culture" Live Feed — RSS/API from Chilean news sources, with a Cerveza Cristal satirical video transition filter

**Do not build (deferred to v2):**
- Meme-o-Meter / social API / hashtag leaderboard
- User accounts, voting, or any user-generated content
- Community submission of Absurdist Rankings
- Mobile app

---

## Closed decisions — do not re-open

- Absurdist Rankings are a static config file. No database, no admin UI.
- Cerveza Cristal Filter is a satirical homage, legally protected under Chilean law. No license needed.
- v1 collects zero PII. Ley 19.628 compliance is not a concern until user accounts exist in v2.
- Spanish only in v1.

---

## Stack

- Node.js v24 / npm 11
- Next.js 16.2.4 + React 19 + TypeScript (App Router)
- Tailwind CSS 4
- Self-hosted fonts in `public/fonts/` — no Google Fonts, no CDN-loaded fonts

**Next.js 16 has breaking changes.** Before writing any framework-specific code, read `node_modules/next/dist/docs/`. APIs and conventions may differ from your training data.

---

## Environment

- OS: Windows 10, terminal is PowerShell
- **Never chain commands with `&&`** — use separate commands or `;`
- Linux tools run via WSL (Kali)

---

## Code style

- 1-line comments only — no block comments, no multi-line comment blocks
- Fixes go to the root cause — never patch parameters to force a passing result
- No code written just to make something compile — it must reflect real behavior

---

## Commit convention

```
<type>(<scope>): <short description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`, `style`  
Scopes for this project: `rankings`, `feed`, `filter`, `config`, `ui`

---

## How to communicate

- Brief and direct — no over-explaining
- Prose for conversational answers, not bullet lists
- No emojis unless Felipe uses them first
- Give one recommendation — do not hedge with multiple options
- If you need to research something before answering, say so and do it — do not guess

---

## Development Roadmap

Status legend: `[ ]` todo · `[x]` done · `[-]` in progress

**Phase 0 — Foundation**
- [x] 1. Strip Next.js boilerplate; configure Tailwind with Chilean flag palette (red, white, blue, neutral grays)
- [x] 2. Self-hosted font setup in `public/fonts/`
- [x] 3. Root layout: header, main, footer — footer branding "Felipe Carvajal Brown"
- [x] 4. `src/config/absurdist-rankings.ts` — TypeScript type + 10 seed entries. Do not modify without owner approval.

**Phase 1 — Number 1 Fetcher (P0)**
- [x] 5. TypeScript interfaces for ranking cards (shared type for Serious and Absurdist)
- [x] 6. Server-side fetchers: World Bank, IMF, Wikipedia scraper — 24-hour cache via `fetch` revalidate
- [x] 7. Rankings page UI — all cards mixed, Verificado badge for serio only, earthquake hover, per-request shuffle via `force-dynamic`
- [x] 8. Wire static Absurdist config into the same card grid

**Phase 2 — Chaos Culture Feed (P1)**
- [x] 9. RSS aggregator (server-side) from 10 Chilean news sources + Reddit feed, 72-hour filter, cached 1h
- [x] 10. Feed UI — list component with pagination
- [ ] 11. Cerveza Cristal filter — 2-second transition on video previews, toggle in localStorage

**Phase 3 — Polish**
- [x] 14. Logo seal (`public/logo.svg` + `src/app/icon.svg`): circular presidential seal, condor, poop silhouette, no text
- [x] 15. Nav buttons with clear button styling; `NavPopup` one-time tooltip on entry (localStorage `popup-seen`)
- [ ] 12. Responsive pass: desktop (1280px+) and tablet (768px+)
- [ ] 13. Core Web Vitals check: LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## How to deliver code

- One file at a time — present it and wait for feedback before the next
- For fixes and improvements: diffs or targeted snippets only
- Never rewrite a full file when a targeted change is sufficient — only do so if explicitly asked
