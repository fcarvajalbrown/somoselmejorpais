import { load } from "cheerio";
import type { RankingCard, RankingFetcher } from "@/types/ranking";

const TARGETS = [
  {
    id: "wiki-copper",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_copper_production",
    titulo: "Mayor productor de cobre del mundo",
    descripcion: "Chile extrae más cobre que ningún otro país en el planeta.",
    fuente: "Wikipedia / USGS",
    chileRowIndex: 0,
  },
  {
    id: "wiki-lithium",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_lithium_production",
    titulo: "Mayor productor de litio del mundo",
    descripcion: "El litio que mueve los autos eléctricos del planeta viene del norte de Chile.",
    fuente: "Wikipedia / USGS",
    chileRowIndex: 0,
  },
  {
    id: "wiki-salmon",
    url: "https://en.wikipedia.org/wiki/Salmon_farming_in_Chile",
    titulo: "Segundo mayor productor de salmón del mundo",
    descripcion: "Solo Noruega produce más salmón. Y ellos no tienen cordillera.",
    fuente: "Wikipedia",
    chileRowIndex: 0,
  },
  {
    id: "wiki-avocado",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_avocado_production",
    titulo: "Mayor exportador de palta de Sudamérica",
    descripcion: "La palta chilena llega a todo el mundo. El mundo lo agradece.",
    fuente: "Wikipedia / FAO",
    chileRowIndex: 0,
  },
  {
    id: "wiki-wine",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_wine_production",
    titulo: "Mayor exportador de vino de Sudamérica",
    descripcion: "El Carménère sobrevivió en Chile cuando murió en Europa. Eso dice todo.",
    fuente: "Wikipedia / OIV",
    chileRowIndex: 0,
  },
];

export const wikipediaScraperFetcher: RankingFetcher = {
  id: "wikipedia-scraper",
  async fetch(): Promise<RankingCard[]> {
    const results: RankingCard[] = [];
    const now = new Date().toISOString();

    for (const target of TARGETS) {
      const res = await fetch(target.url, {
        next: { revalidate: 86400 },
        headers: { "User-Agent": "SomosElMejorPais/1.0 (educational)" },
      });
      if (!res.ok) continue;

      const html = await res.text();
      const $ = load(html);
      const firstTable = $("table.wikitable").first();
      const rows = firstTable.find("tbody tr").toArray();
      const dataRows = rows.filter((r) => $(r).find("td").length > 0);
      if (!dataRows.length) continue;

      const idx = Math.min(target.chileRowIndex, dataRows.length - 1);
      const firstCell = $(dataRows[idx]).find("td").first().text().trim();
      if (!firstCell.toLowerCase().includes("chile")) continue;

      const valueCell = $(dataRows[idx]).find("td").eq(1).text().trim();

      results.push({
        id: target.id,
        tipo: "serio",
        titulo: target.titulo,
        descripcion: target.descripcion,
        valor: valueCell || "#1",
        fuente: target.fuente,
        actualizadoEn: now,
        url: target.url,
      });
    }

    return results;
  },
};
