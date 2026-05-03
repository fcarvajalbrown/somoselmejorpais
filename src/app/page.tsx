import { fetchAllRankings } from "@/lib/fetchers";
import { absurdistRankings } from "@/config/absurdist-rankings";
import { InfiniteCardGrid } from "@/components/InfiniteCardGrid";
import type { RankingCard } from "@/types/ranking";

export const dynamic = "force-dynamic";

function shuffle(arr: RankingCard[]): RankingCard[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function Home() {
  const serios = await fetchAllRankings();
  const todos = shuffle([...serios, ...absurdistRankings]);

  return (
    <div className="bg-surface min-h-full">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold text-cl-blue uppercase tracking-wide">
          Chile: Número Uno
        </h2>
        <InfiniteCardGrid cards={todos} />
      </section>
    </div>
  );
}
