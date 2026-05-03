import type { FeedItem } from "@/types/feed";

const SUBREDDITS = [
  "chile",
  "republicadechile",
  "2latinoforyou",
  "SpanishMeme",
  "LatinAmerica",
  "asklatinamerica",
];

const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000;

async function fetchSubreddit(sub: string): Promise<FeedItem[]> {
  const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=50`, {
    next: { revalidate: 3600 },
    headers: { "User-Agent": "SomosElMejorPais/1.0 (educational)" },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const posts: {
    data: { id: string; title: string; permalink: string; created_utc: number; selftext: string; thumbnail: string };
  }[] = json?.data?.children ?? [];

  const cutoff = Date.now() - SEVENTY_TWO_HOURS_MS;
  return posts
    .filter((p) => p.data.created_utc * 1000 > cutoff)
    .map((p) => ({
      id: `reddit-${p.data.id}`,
      titulo: p.data.title,
      url: `https://reddit.com${p.data.permalink}`,
      fuente: `r/${sub}`,
      publicadoEn: new Date(p.data.created_utc * 1000),
      resumen: p.data.selftext?.slice(0, 200) || undefined,
      imagen: p.data.thumbnail?.startsWith("http") ? p.data.thumbnail : undefined,
    }));
}

export async function fetchRedditFeed(): Promise<FeedItem[]> {
  const results = await Promise.allSettled(SUBREDDITS.map(fetchSubreddit));
  return results
    .filter((r): r is PromiseFulfilledResult<FeedItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);
}
