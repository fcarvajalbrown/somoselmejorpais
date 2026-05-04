import { fetchFeed } from "@/lib/feed/aggregator";
import { FeedItem } from "@/components/FeedItem";

const POR_PAGINA = 20;

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pagina = Math.max(1, parseInt(page ?? "1", 10));
  const items = await fetchFeed();
  const total = items.length;
  const totalPaginas = Math.ceil(total / POR_PAGINA);
  const slice = items.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <div className="min-h-full">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold text-cl-blue uppercase tracking-wide">
          Caos Cultural
        </h2>

        {slice.length === 0 ? (
          <p className="text-text-muted">No hay noticias en las últimas 72 horas.</p>
        ) : (
          <div>
            {slice.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="mt-10 flex items-center justify-between text-sm">
            {pagina > 1 ? (
              <a href={`/feed?page=${pagina - 1}`} className="text-cl-blue hover:underline">
                ← Anterior
              </a>
            ) : <span />}
            <span className="text-text-muted">
              Página {pagina} de {totalPaginas}
            </span>
            {pagina < totalPaginas ? (
              <a href={`/feed?page=${pagina + 1}`} className="text-cl-blue hover:underline">
                Siguiente →
              </a>
            ) : <span />}
          </div>
        )}
      </section>
    </div>
  );
}
