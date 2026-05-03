import { load } from "cheerio";
import type { RankingCard, RankingFetcher } from "@/types/ranking";

// Scrapes Wikipedia tables where Chile is known to rank #1
const TARGETS = [
  {
    id: "wiki-copper",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_copper_production",
    titulo: "Mayor productor de cobre del mundo",
    descripcion: "Chile extrae más cobre que ningún otro país en el planeta.",
    fuente: "Wikipedia / USGS",
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

      const firstCell = $(dataRows[target.chileRowIndex]).find("td").first().text().trim();
      const isChile = firstCell.toLowerCase().includes("chile");
      if (!isChile) continue;

      const valueCell = $(dataRows[target.chileRowIndex]).find("td").eq(1).text().trim();

      results.push({
        id: target.id,
        tipo: "serio",
        titulo: target.titulo,
        descripcion: target.descripcion,
        valor: valueCell || "#1 mundial",
        fuente: target.fuente,
        actualizadoEn: now,
      });
    }

    return results;
  },
};
