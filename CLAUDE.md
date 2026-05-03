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

## Key Decisions

- **Absurdist Rankings** are defined in a static config file maintained by the owner — no database table, no admin UI, no moderation.
- **Cerveza Cristal Filter** is a satirical homage. It is legally protected under Chilean law. No licensing is needed.
- **Data privacy (Ley 19.628):** v1 collects no PII. Revisit only when user accounts are introduced in v2.
- **Language:** Spanish only in v1.

## Stack & Runtime

- **Runtime:** Node.js v24 / npm 11
- **Language:** TypeScript throughout
- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js (Next.js preferred for full-stack, or separate Vite frontend + Node API)
- **Fonts:** Self-hosted in `public/fonts/` — no Google Fonts

## Architecture Intent

- Data fetching for rankings runs server-side and caches results; refresh interval is at least once per 24 hours.
- Absurdist Rankings live in a config file (e.g., `config/absurdist-rankings.ts` or `.json`), not a database.
- Feed items older than 72 hours must be filtered out before rendering.
- No user authentication or session persistence beyond localStorage for UI toggles (e.g., Cerveza Cristal filter state).
- Separate serializable config (data, settings) from non-serializable config (closures, handlers).

## Branding

- Project footer and any `author` fields: **Felipe Carvajal Brown Software**
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

> Project is pre-development. Update this section once `package.json` is created.
> Note: when writing npm scripts or shell commands, never chain with `&&` — use separate commands or `;`.
