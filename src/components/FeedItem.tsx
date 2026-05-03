import type { FeedItem } from "@/types/feed";

function formatFecha(date: Date): string {
  return date.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FeedItem({ item }: { item: FeedItem }) {
  return (
    <article className="border-b border-black/10 py-5 last:border-0">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-1"
      >
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="font-semibold uppercase tracking-wide text-cl-blue">
            {item.fuente}
          </span>
          <span>{formatFecha(item.publicadoEn)}</span>
        </div>
        <h3 className="text-base font-semibold leading-snug group-hover:text-cl-blue transition-colors">
          {item.titulo}
        </h3>
        {item.resumen && (
          <p className="text-sm text-text-muted line-clamp-2">{item.resumen}</p>
        )}
      </a>
    </article>
  );
}
