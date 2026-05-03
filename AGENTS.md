# Agent Instructions — Somos el Mejor País de Chile (SEMPDC)

This file is for any AI agent (Kimi, Gemini, GPT, etc.) working on this project.
Read this before writing any code, generating any content, or making any suggestions.

---

## Who you are working with

**Name:** Felipe Carvajal Brown  
**Company:** Felipe Carvajal Brown Software  
**Location:** Santiago, Chile

### Affiliation rules
| Context | Use |
|---|---|
| Code — footers, `author` fields, package metadata | Felipe Carvajal Brown Software |
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
- TypeScript throughout
- React + TypeScript + Vite (frontend)
- Next.js preferred for full-stack, or Vite + Node API if separated
- Self-hosted fonts in `public/fonts/` — no Google Fonts, no CDN-loaded fonts

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

## How to deliver code

- One file at a time — present it and wait for feedback before the next
- For fixes and improvements: diffs or targeted snippets only
- Never rewrite a full file when a targeted change is sufficient — only do so if explicitly asked
