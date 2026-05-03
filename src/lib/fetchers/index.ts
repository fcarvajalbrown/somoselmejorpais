import type { RankingCard, RankingFetcher } from "@/types/ranking";
import { worldBankFetcher } from "./world-bank";
import { imfFetcher } from "./imf";
import { wikipediaScraperFetcher } from "./wikipedia-scraper";
import { redditRankingsFetcher } from "./reddit-rankings";

const fetchers: RankingFetcher[] = [
  worldBankFetcher,
  imfFetcher,
  wikipediaScraperFetcher,
  redditRankingsFetcher,
];

export async function fetchAllRankings(): Promise<RankingCard[]> {
  const results = await Promise.allSettled(fetchers.map((f) => f.fetch()));
  return results
    .filter((r): r is PromiseFulfilledResult<RankingCard[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);
}
