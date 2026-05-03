import type { RankingCard, RankingFetcher } from "@/types/ranking";

const BASE = "https://www.imf.org/external/datamapper/api/v1";

const INDICATORS: { code: string; titulo: string; descripcion: string; ascending?: boolean }[] = [
  {
    code: "NGDPDPC",
    titulo: "Mayor PIB per cápita de Sudamérica",
    descripcion: "Chile encabeza el ingreso por habitante en toda Sudamérica.",
  },
  {
    code: "LP",
    titulo: "Mayor tasa de participación laboral femenina en Sudamérica",
    descripcion: "Más mujeres chilenas trabajan que en cualquier otro país sudamericano.",
  },
];

async function fetchIndicator(
  code: string
): Promise<Record<string, number>> {
  const url = `${BASE}/${code}`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return {};
  const json = await res.json();
  // IMF returns { values: { INDICATOR: { ISO2: { year: value, ... } } } }
  const byCountry = json?.values?.[code] ?? {};
  const latest: Record<string, number> = {};
  for (const [iso, years] of Object.entries(byCountry)) {
    const vals = Object.values(years as Record<string, number>).filter(Boolean);
    if (vals.length) latest[iso] = vals[vals.length - 1];
  }
  return latest;
}

// IMF uses ISO3 codes — Chile is "CHL"
const CHILE_IMF = "CHL";

export const imfFetcher: RankingFetcher = {
  id: "imf",
  async fetch(): Promise<RankingCard[]> {
    const results: RankingCard[] = [];
    const now = new Date().toISOString();

    for (const indicator of INDICATORS) {
      const data = await fetchIndicator(indicator.code);
      if (!Object.keys(data).length) continue;

      const sorted = Object.entries(data).sort(([, a], [, b]) =>
        indicator.ascending ? a - b : b - a
      );

      const rank = sorted.findIndex(([iso]) => iso === CHILE_IMF) + 1;
      if (rank !== 1) continue;

      results.push({
        id: `imf-${indicator.code}`,
        tipo: "serio",
        titulo: indicator.titulo,
        descripcion: indicator.descripcion,
        valor: "#1 Sudamérica",
        fuente: "IMF",
        actualizadoEn: now,
      });
    }

    return results;
  },
};
