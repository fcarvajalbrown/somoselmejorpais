import Parser from "rss-parser";
import type { FeedItem } from "@/types/feed";

const parser = new Parser({
  customFields: { item: [["media:content", "mediaContent"]] },
});

const SOURCES = [
  { id: "latercera",   nombre: "La Tercera",    url: "https://www.latercera.com/feed/" },
  { id: "elmostrador", nombre: "El Mostrador",  url: "https://www.elmostrador.cl/feed/" },
  { id: "emol",        nombre: "Emol",          url: "https://www.emol.com/rss/" },
  { id: "biobio",      nombre: "Biobío Chile",  url: "https://www.biobiochile.cl/feed/" },
  { id: "theclinic",   nombre: "The Clinic",    url: "https://www.theclinic.cl/feed/" },
  { id: "ciper",       nombre: "CIPER Chile",   url: "https://ciperchile.cl/feed/" },
  { id: "cnnchile",    nombre: "CNN Chile",     url: "https://www.cnnchile.com/feed/" },
  { id: "cooperativa", nombre: "Cooperativa",   url: "https://cooperativa.cl/noticias/rss.xml" },
  { id: "t13",         nombre: "T13",           url: "https://www.t13.cl/rss.xml" },
  { id: "meganoticias",nombre: "Meganoticias",  url: "https://www.meganoticias.cl/feed/" },
];

const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000;

async function fetchSource(source: typeof SOURCES[number]): Promise<FeedItem[]> {
  const res = await fetch(source.url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const xml = await res.text();
  const feed = await parser.parseString(xml);
  const cutoff = Date.now() - SEVENTY_TWO_HOURS_MS;

  return (feed.items ?? [])
    .filter((item) => {
      const t = item.pubDate ? new Date(item.pubDate).getTime() : 0;
      return t > cutoff;
    })
    .map((item) => ({
      id: `${source.id}-${item.guid ?? item.link ?? item.title ?? Math.random()}`,
      titulo: item.title ?? "(sin título)",
      url: item.link ?? "",
      fuente: source.nombre,
      publicadoEn: new Date(item.pubDate ?? Date.now()),
      resumen: item.contentSnippet,
      imagen: item.enclosure?.url ?? ((item as unknown as Record<string, unknown>).mediaContent as string | undefined),
    }));
}

export async function fetchFeed(): Promise<FeedItem[]> {
  const results = await Promise.allSettled(SOURCES.map(fetchSource));
  return results
    .filter((r): r is PromiseFulfilledResult<FeedItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .sort((a, b) => b.publicadoEn.getTime() - a.publicadoEn.getTime());
}
