import type { RankingCard as RankingCardType } from "@/types/ranking";

export function RankingCard({ card }: { card: RankingCardType }) {
  const esAbsurdo = card.tipo === "absurdo";

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <span
        className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white ${
          esAbsurdo ? "bg-cl-red" : "bg-cl-blue"
        }`}
      >
        {esAbsurdo ? "Satírico" : "Verificado"}
      </span>
      <p className="text-3xl font-bold text-cl-blue">{card.valor}</p>
      <h3 className="text-lg font-semibold leading-snug">{card.titulo}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{card.descripcion}</p>
      {card.fuente && (
        <p className="mt-auto text-xs text-text-muted">Fuente: {card.fuente}</p>
      )}
    </article>
  );
}
