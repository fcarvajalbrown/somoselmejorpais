import { fetchAllRankings } from "@/lib/fetchers";
import { absurdistRankings } from "@/config/absurdist-rankings";
import { InfiniteCardGrid } from "@/components/InfiniteCardGrid";

export const revalidate = 86400;

export default async function Home() {
  const serios = await fetchAllRankings();
  const todos = [...serios, ...absurdistRankings];

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
