---
name: sempdc-satirical-content
description: >
  Research real Chilean achievements, records, culture, and quirks, then write
  satirical "Absurdist Win" entries for the SEMPDC project. Use when the user
  asks to add, expand, or improve absurdist rankings, funny facts about Chile,
  or satirical config entries in src/config/absurdist-rankings.ts. Also use when
  the user wants Chilean satirical copy, victory-framed humor, or culturally
  resonant absurdist content for the dashboard.
---

# SEMPDC Satirical Content Skill

## Goal

Produce `RankingCard` entries where a real Chilean fact or record is framed as
an unambiguous national victory — with an absurdist, satirical punchline that
feels genuinely Chilean.

## Output Format

Append entries to `src/config/absurdist-rankings.ts`. Each entry must match the
`RankingCard` interface:

```ts
interface RankingCard {
  id: string;        // kebab-case, unique, in Spanish
  tipo: "absurdo";
  titulo: string;    // headline: achievement framed as a win
  descripcion: string; // 1-2 sentences: real fact + satirical punchline
  valor: string;     // short metric, rank, or claim
  fuente?: string;   // optional, for verifiable facts (NASA, USGS, etc.)
  url?: string;      // Wikipedia or authoritative source
}
```

## Tone Rules

1. **Fact first, punchline second.** Every description must contain a real,
   verifiable fact. The satire is in the framing, not the fabrication.
2. **Self-deprecating, not cruel.** Chilean humor leans into irony and
   understatement. Mock the situation, not people (especially marginalized
   groups).
3. **Cultural shorthand works.** References to `weón`, `cachai`, `po`,
   completo, mote con huesillo, el 18, Codelco, etc. are fair game because
   the audience is Chilean or Chile-curious.
4. **Unexpected comparisons.** Compare Chile to Mars, Europe, or global
   superpowers — then undercut it with something mundane.
5. **Victory framing always.** Even the driest fact becomes a national triumph.
   "Sin Chile no hay cables" / "De nada."
6. **Keep it tight.** One sentence for the fact, one for the punchline. No
   encyclopedic prose.
7. **Avoid:** dry Wikipedia summaries, generic travel-brochure copy, CV-style
   bios, passive voice, and punchless descriptions.

## Research Approach

1. **Start with Wikipedia.** Fetch articles on Chile, Chilean cuisine, culture,
   music, sports, geography, and lists of Chileans. Look for superlatives,
   firsts, and oddities.
2. **Search for records.** Use queries like:
   - `chile world records guinness`
   - `chile weird facts achievements`
   - `chilean inventions discoveries`
3. **Verify before satirizing.** If a fact seems too good, confirm it. Use
   `FetchURL` on the Wikipedia page or an authoritative source.
4. **Mine cultural specifics.** Look for things unique to Chile:
   - Food: completo, marraqueta, sopaipillas, mote con huesillo, terremoto
   - Drink: piscola, fanschop, jote, pipeño, cola de mono
   - Slang: weón, cachai, po, al tiro, chamullo, pituto, caleta
   - Rituals: fiestas patrias, once, asado, cacerolazo
   - Institutions: Codelco, Colun, AFP, Teletón
5. **Look for contrast.** The best entries pair a grand achievement with a
   mundane or absurd consequence.

## Examples: Dry vs Good

**Dry (what to avoid):**
> Chile ingresó a la OCDE en 2010. Es el primer país sudamericano en el club.

**Good:**
> Ingresamos a la OCDE en 2010. Somos el primer país latinoamericano en el
> club de los ricos. El portero nos miró raro pero nos dejó pasar.

**Dry:**
> Codelco produce el 10% del cobre mundial. Es una empresa estatal chilena.

**Good:**
> Codelco produce el 10% del cobre mundial. Sin ella no hay cables, no hay
> autos eléctricos, no hay fondos de pensión. Somos el cable a tierra del
> planeta.

**Dry:**
> La Roja femenina clasificó a su primer Mundial en 2019.

**Good:**
> La Roja femenina clasificó a su primer Mundial en 2019. Mientras tanto, la
> masculina seguía explicando por qué no. El futuro es femenino, señores.

**Dry:**
> Chile tiene dos especies de serpientes, ambas inofensivas.

**Good:**
> Chile tiene dos serpientes y ninguna mata. Puedes dormir en el bosque sin
> miedo. El peligro real son los pumas y los precios de la bencina.

## Entry Categories That Work Well

| Category | What to look for |
|---|---|
| Geography | Superlatives (driest, longest, southernmost), Mars analogs, remoteness |
| Nature | Endemic species, record-holding flora/fauna, weird adaptations |
| Food & Drink | Consumption records, unique preparations, invented cocktails |
| Language | Slang with no translation, particles that replace grammar |
| History | Military victories, survival stories, firsts in politics |
| Sports | Medals, rankings, improbable achievements |
| Arts | Oscars, Grammys, international recognition of local artists |
| Institutions | State companies, social programs, laws that baffle outsiders |
| Daily Life | Transport, markets, rituals, things foreigners don't understand |

## Delivery Rules

- Write TypeScript directly into the config file. Do not output code in chat
  as a substitute.
- Target at least 100 entries when the user asks for a batch.
- Use `WriteFile` or `StrReplaceFile`. For large batches, write in chunks if
  needed.
- After writing, run `npx tsc --noEmit` to verify type safety.
- Keep `id` values unique and in Spanish kebab-case.
- Prefer Wikipedia URLs for `url` when available.