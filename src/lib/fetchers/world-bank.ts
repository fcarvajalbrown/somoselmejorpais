import type { RankingCard, RankingFetcher } from "@/types/ranking";

const CHILE = "CL";
const BASE = "https://api.worldbank.org/v2";

// Indicators where Chile is known to lead globally or in LatAm
const INDICATORS: { code: string; titulo: string; descripcion: string }[] = [
  {
    code: "EG.ELC.ACCS.ZS",
    titulo: "Mayor acceso a electricidad en Latinoamérica",
    descripcion: "Casi el 100% de la población chilena tiene acceso a electricidad.",
  },
  {
    code: "IT.NET.USER.ZS",
    titulo: "Mayor penetración de internet en Sudamérica",
    descripcion: "Chile lidera el acceso a internet en toda Sudamérica.",
  },
  {
    code: "SH.DYN.MORT",
    titulo: "Menor mortalidad infantil en Latinoamérica",
    descripcion: "Chile tiene la tasa de mortalidad infantil más baja de la región.",
  },
  {
    code: "SP.DYN.LE00.IN",
    titulo: "Mayor esperanza de vida en Sudamérica",
    descripcion: "Los chilenos viven más que cualquier otro sudamericano en promedio.",
  },
];

async function fetchIndicator(
  code: string
): Promise<{ countryCode: string; value: number | null }[]> {
  const url = `${BASE}/country/all/indicator/${code}?format=json&mrv=1&per_page=300`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return [];
  const json = await res.json();
  const rows = json[1] ?? [];
  return rows
    .filter((r: { value: unknown }) => r.value !== null)
    .map((r: { countryiso3code: string; value: number }) => ({
      countryCode: r.countryiso3code,
      value: r.value,
    }));
}

export const worldBankFetcher: RankingFetcher = {
  id: "world-bank",
  async fetch(): Promise<RankingCard[]> {
    const results: RankingCard[] = [];
    const now = new Date().toISOString();

    for (const indicator of INDICATORS) {
      const rows = await fetchIndicator(indicator.code);
      if (!rows.length) continue;

      // Sort descending; for mortality sort ascending (lower = better)
      const ascending = indicator.code === "SH.DYN.MORT";
      const sorted = [...rows].sort((a, b) =>
        ascending ? a.value! - b.value! : b.value! - a.value!
      );

      const rank = sorted.findIndex((r) => r.countryCode === CHILE) + 1;
      if (rank !== 1) continue;

      const chileValue = rows.find((r) => r.countryCode === CHILE)?.value;

      results.push({
        id: `wb-${indicator.code}`,
        tipo: "serio",
        titulo: indicator.titulo,
        descripcion: indicator.descripcion,
        valor: chileValue !== undefined ? String(Number(chileValue).toFixed(1)) : "#1",
        fuente: "World Bank",
        actualizadoEn: now,
      });
    }

    return results;
  },
};
