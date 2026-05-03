# Product Requirements Document
## Somos el Mejor País de Chile (SEMPDC)

**Version:** 1.0  
**Date:** 2026-05-03  
**Status:** Draft  

---

## 1. Overview

**SEMPDC** is a satirical, high-performance web dashboard that celebrates Chilean national identity by surfacing real rankings, viral memes, and cultural chaos under a single patriotic lens. The product leans into the uniquely Chilean paradox: national pride at 71% despite relentless self-criticism.

**Tagline:** *Independiente si es bueno o no, somos los primeros.*

---

## 2. Goals & Non-Goals

### Goals
- Aggregate real data (rankings, news) about Chile and frame it as unambiguous victory.
- Deliver a culturally resonant, performant web experience that handles traffic spikes during national events.

### Non-Goals
- This is not a news outlet. Content accuracy is subordinate to tone.
- No user-generated content in v1.
- Mobile app out of scope for v1.
- Social media integration (Meme-o-Meter) deferred to v2.

---

## 3. User Personas

| Persona | Description | Primary Need |
|---|---|---|
| **El Hincha** | Chilean, 18–35, high social media usage, shares memes daily | Quick access to the latest viral content to share |
| **El Expat** | Chilean abroad, nostalgic, wants connection to home culture | A pulse on what's happening in Chile right now |
| **El Gringo Curioso** | Non-Chilean, discovered Chile through media or travel | Understanding why Chileans are the way they are |

---

## 4. Feature Requirements

### 4.1 The "Number 1" Fetcher

**Priority:** P0

A data engine that surfaces rankings where Chile holds a top position.

**Functional requirements:**
- Pull from at least 3 data sources (e.g., World Bank API, IMF data, curated static datasets) and display verified rankings.
- Display rankings in two categories: **Serious Wins** (real, sourced metrics) and **Absurdist Wins** (satirical, clearly labeled as humor).
- Each ranking card must show: title, source, date, and a short "victory framing" caption.
- Serious Wins examples: Most Prosperous Country in Latin America (2026), #1 Destination for Foreign Investment in the region, 70% share of global astronomical observation capacity.
- Absurdist Wins examples: #1 in Marraqueta Consumption per Capita, #1 in Slang Complexity Index.
- Absurdist rankings must be visually distinguished (e.g., a "Satirical" badge) so content is never mistaken for fact.
- Absurdist Rankings are defined in a static config file maintained by the project owner. No community submission or moderation layer required.

**Acceptance criteria:**
- Rankings load within 2 seconds on a standard connection.
- Serious and Absurdist categories are visually distinct.
- Each Serious Win card links to its source.
- Data refreshes at least once every 24 hours.
- Adding or editing an Absurdist entry requires only a config file change with no code deployment.

---

### 4.2 The "Chaos Culture" Live Feed

**Priority:** P1

A real-time feed mixing news headlines, social trends, and curated cultural moments.

**Functional requirements:**
- Aggregate RSS or API feeds from at least 2 Chilean news sources.
- Surface trending topics related to national culture events (e.g., Viña Festival, national holidays).
- Include a **Cerveza Cristal Filter**: when a video preview is present in the feed, apply a 2-second satirical transition effect at the start of playback, evoking the iconic 2003/2024 commercial format. This is a satirical homage and is legally protected under Chilean law. This must be toggleable by the user.

**Acceptance criteria:**
- Feed displays at least 20 items on initial load and paginates or infinite-scrolls for more.
- The Cerveza Cristal transition plays on video previews when the filter is enabled.
- The filter toggle persists in localStorage across sessions.
- Feed items older than 72 hours are not surfaced.

---

## 5. Technical Requirements

| Requirement | Detail |
|---|---|
| **Platform** | Node.js web application (managed hosting) |
| **Concurrency** | Must sustain 1,000 concurrent users without degraded response times. Designed to scale during high-traffic national events (e.g., earthquakes, major sporting results). |
| **Data Privacy** | All user-generated data (votes, comments) must comply with **Ley 19.628** (Chilean data protection law). No PII collected without explicit consent. |
| **Performance** | Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms. |
| **Availability** | 99.5% uptime target. |
| **Browser Support** | Latest 2 versions of Chrome, Firefox, Safari, Edge. |

---

## 6. Design Requirements

- **Color palette:** Chilean flag red, white, and blue as primary brand colors.
- **Tone:** Maximalist patriotism. Every empty state, error message, and loading screen must reinforce the satirical-pride voice.
- **Accessibility:** WCAG 2.1 AA minimum for all non-satirical informational content.
- **Responsiveness:** Fully functional on desktop (1280px+) and tablet (768px+). Mobile is a v2 concern.

---

## 7. Success Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Weekly Active Users | 5,000 by end of month 2 | Analytics (e.g., Plausible or equivalent) |
| Average session duration | ≥ 3 minutes | Analytics |
| Page load time (LCP) | < 2.5s at p75 | Web Vitals monitoring |
| Uptime | ≥ 99.5% | Uptime monitor |

---

## 8. Risks & Dependencies

| Risk | Likelihood | Mitigation |
|---|---|---|
| Satirical content misread as factual by non-Chilean audiences | Medium | Clear "Satirical" labeling on Absurdist Rankings; disclaimer in footer |
| Traffic spike during national event overwhelming server | Low-Medium | Load testing before launch; CDN caching for static assets |
| Ley 19.628 compliance gap | Low | No PII collected in v1; revisit when user accounts are introduced in v2 |

---

## 9. Out of Scope (v1)

- User accounts or persistent profiles
- Native mobile application
- Real-time chat or comment threads
- Revenue model / monetization
- Multi-language support (Spanish only for v1)
- Social media API integration and Meme-o-Meter leaderboard (v2)
- Community submission of Absurdist Rankings (v2)

---

## 10. Decisions Log

| # | Question | Decision |
|---|---|---|
| 1 | Social API / Meme-o-Meter in v1? | Deferred to v2. No social API dependency in v1. |
| 2 | Cerveza Cristal brand assets — license or homage? | Satirical homage. Legally protected under Chilean law. No licensing required. |
| 3 | Who curates Absurdist Rankings? | Project owner only. Managed via a static config file. No community submission or moderation in v1. |
