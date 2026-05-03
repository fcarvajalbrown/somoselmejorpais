import { fetchAllRankings } from "@/lib/fetchers";
import { absurdistRankings } from "@/config/absurdist-rankings";
import { RankingCard } from "@/components/RankingCard";

export default async function Home() {
  const serios = await fetchAllRankings();
  const absurdos = absurdistRankings;

  return (
    <div className="bg-surface min-h-full">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold text-cl-blue uppercase tracking-wide">
          Logros Verificados
        </h2>
        {serios.length === 0 ? (
          <p className="text-text-muted">No se encontraron rankings en este momento.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serios.map((card) => <RankingCard key={card.id} card={card} />)}
          </div>
        )}
      </section>

      <hr className="border-black/10" />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold text-cl-red uppercase tracking-wide">
          Logros Satíricos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {absurdos.map((card) => <RankingCard key={card.id} card={card} />)}
        </div>
      </section>
    </div>
  );
}
