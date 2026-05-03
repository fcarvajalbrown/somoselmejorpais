import type { RankingCard as RankingCardType } from "@/types/ranking";

export function RankingCard({ card }: { card: RankingCardType }) {
  const Wrapper = card.url ? "a" : "div";
  const wrapperProps = card.url
    ? { href: card.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-sm cursor-pointer hover:animate-earthquake hover:shadow-md transition-shadow"
    >
      {card.tipo === "serio" && (
        <span className="self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white bg-gold">
          Verificado
        </span>
      )}
      <p className="text-3xl font-bold text-cl-blue">{card.valor}</p>
      <h3 className="text-lg font-semibold leading-snug group-hover:text-cl-blue transition-colors">
        {card.titulo}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">{card.descripcion}</p>
      {card.fuente && (
        <p className="mt-auto text-xs text-text-muted">Fuente: {card.fuente}</p>
      )}
    </Wrapper>
  );
}
