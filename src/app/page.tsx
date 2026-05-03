import { fetchAllRankings } from "@/lib/fetchers";
import { absurdistRankings } from "@/config/absurdist-rankings";
import { InfiniteCardGrid } from "@/components/InfiniteCardGrid";

export default async function Home() {
  const serios = await fetchAllRankings();

  const todos = [];
  const max = Math.max(serios.length, absurdistRankings.length);
  for (let i = 0; i < max; i++) {
    if (i < serios.length) todos.push(serios[i]);
    if (i < absurdistRankings.length) todos.push(absurdistRankings[i]);
  }

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
