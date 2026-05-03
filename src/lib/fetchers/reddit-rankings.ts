import type { RankingCard, RankingFetcher } from "@/types/ranking";

// Chilean subs: include all posts — they're inherently about Chile
const CHILE_SUBS = new Set(["chile", "republicadechile"]);
// General subs: only include posts that mention Chile positively
const GENERAL_SUBS = ["LatinAmerica", "asklatinamerica", "2latinoforyou", "SpanishMeme"];
const ALL_SUBS = [...CHILE_SUBS, ...GENERAL_SUBS];

const KEYWORDS = [
  /chile/i,
  /chileno|chilena|chileans/i,
  /santiago|patagonia|atacama|valpara[ií]so/i,
];

function matchesKeyword(text: string): boolean {
  return KEYWORDS.some((re) => re.test(text));
}

async function fetchSubreddit(sub: string): Promise<RankingCard[]> {
  const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=100`, {
    next: { revalidate: 3600 },
    headers: { "User-Agent": "SomosElMejorPais/1.0 (educational)" },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const posts: {
    data: { id: string; title: string; permalink: string; score: number; selftext: string };
  }[] = json?.data?.children ?? [];

  return posts
    .filter((p) => CHILE_SUBS.has(sub) || matchesKeyword(p.data.title) || matchesKeyword(p.data.selftext))
    .map((p) => ({
      id: `reddit-ranking-${p.data.id}`,
      tipo: "absurdo" as const,
      titulo: p.data.title,
      descripcion: p.data.selftext?.slice(0, 120) || "La comunidad de Reddit lo confirma.",
      valor: p.data.score >= 1000 ? `${(p.data.score / 1000).toFixed(1)}k votos` : `${p.data.score} votos`,
      fuente: `r/${sub}`,
      url: `https://reddit.com${p.data.permalink}`,
    }));
}

export const redditRankingsFetcher: RankingFetcher = {
  id: "reddit-rankings",
  async fetch(): Promise<RankingCard[]> {
    const results = await Promise.allSettled(ALL_SUBS.map(fetchSubreddit));
    return results
      .filter((r): r is PromiseFulfilledResult<RankingCard[]> => r.status === "fulfilled")
      .flatMap((r) => r.value);
  },
};
