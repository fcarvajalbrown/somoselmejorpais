import type { RankingCard, RankingFetcher } from "@/types/ranking";

const CHILE = "CHL";
const BASE = "https://api.worldbank.org/v2";

const LATAM = new Set([
  "ARG","BOL","BRA","CHL","COL","CRI","CUB","DOM","ECU","SLV",
  "GTM","HTI","HND","MEX","NIC","PAN","PRY","PER","URY","VEN",
  "JAM","TTO","BLZ","GUY","SUR",
]);

const INDICATORS: {
  code: string;
  titulo: string;
  descripcion: string;
  ascending?: boolean;
  unidad?: string;
}[] = [
  { code: "SP.DYN.LE00.IN",   titulo: "Mayor esperanza de vida en Latinoamérica",         descripcion: "Los chilenos viven más que cualquier otro latinoamericano en promedio." },
  { code: "SH.DYN.MORT",      titulo: "Menor mortalidad infantil en Latinoamérica",        descripcion: "Chile tiene la tasa de mortalidad infantil más baja de toda la región.", ascending: true },
  { code: "IT.NET.USER.ZS",   titulo: "Mayor penetración de internet en Sudamérica",       descripcion: "Chile lidera el acceso a internet en toda Sudamérica." },
  { code: "EG.ELC.ACCS.ZS",   titulo: "Mayor acceso a electricidad en Latinoamérica",     descripcion: "Casi el 100% de la población chilena tiene acceso a electricidad." },
  { code: "NY.GDP.PCAP.CD",   titulo: "Mayor PIB per cápita de Sudamérica",               descripcion: "Chile encabeza el ingreso por habitante en toda Sudamérica." },
  { code: "SE.ADT.LITR.ZS",   titulo: "Mayor tasa de alfabetización adulta en la región", descripcion: "Los chilenos leen y escriben más que nadie en Latinoamérica." },
  { code: "SE.TER.ENRR",      titulo: "Mayor matrícula universitaria en Sudamérica",      descripcion: "Más chilenos van a la universidad que en cualquier otro país sudamericano." },
  { code: "SH.MED.BEDS.ZS",   titulo: "Más camas hospitalarias por habitante en LatAm",   descripcion: "Chile tiene más infraestructura hospitalaria per cápita que toda la región." },
  { code: "IT.CEL.SETS.P2",   titulo: "Más teléfonos móviles por persona en Sudamérica",  descripcion: "En Chile hay más celulares que personas. Todos tienen dos." },
  { code: "EG.FEC.RNEW.ZS",   titulo: "Mayor porcentaje de energía renovable en LatAm",  descripcion: "Chile genera más energía limpia per cápita que ningún otro país de la región." },
  { code: "SP.URB.TOTL.IN.ZS",titulo: "Población más urbanizada de Sudamérica",           descripcion: "Chile es el país más urbanizado de Sudamérica. Todos vivimos en ciudades." },
  { code: "SH.H2O.SMDW.ZS",   titulo: "Mayor acceso a agua potable en Latinoamérica",    descripcion: "El agua del grifo en Chile es potable. Eso no lo puede decir todo el mundo." },
  { code: "SH.STA.SMSS.ZS",   titulo: "Mayor acceso a saneamiento básico en LatAm",      descripcion: "Chile lidera el saneamiento en toda la región. Sin más detalles." },
  { code: "IC.REG.DURS",       titulo: "Más fácil abrir una empresa en Sudamérica",       descripcion: "Crear una empresa en Chile es más rápido que en cualquier país vecino.", ascending: true },
  { code: "GC.DOD.TOTL.GD.ZS",titulo: "Menor deuda pública como % del PIB en LatAm",     descripcion: "Chile debe menos plata que todos sus vecinos. Seriedad fiscal nivel dios.", ascending: true },
  { code: "FP.CPI.TOTL.ZG",   titulo: "Menor inflación histórica de Sudamérica",         descripcion: "Chile ha mantenido la inflación más baja de la región por décadas.", ascending: true },
  { code: "NE.EXP.GNFS.ZS",   titulo: "Mayor porcentaje de exportaciones en Sudamérica", descripcion: "Chile exporta más, como proporción de su economía, que cualquier vecino." },
  { code: "SH.IMM.MEAS",       titulo: "Mayor cobertura de vacunación sarampión en LatAm",descripcion: "Los niños chilenos son los más vacunados de toda Latinoamérica." },
  { code: "SH.IMM.IDPT",       titulo: "Mayor cobertura vacunal DPT en Latinoamérica",   descripcion: "Chile vacuna a sus niños mejor que cualquier otro país de la región." },
  { code: "SE.PRM.NENR",       titulo: "Mayor matrícula escolar primaria en la región",   descripcion: "En Chile, todos los niños van al colegio. Todos." },
  { code: "EN.ATM.METH.AG.KT", titulo: "Menor emisión de metano agrícola en LatAm",      descripcion: "Chile contamina menos por agricultura que todos sus vecinos.", ascending: true },
  { code: "AG.LND.IRIG.AG.ZS", titulo: "Mayor porcentaje de tierras irrigadas en LatAm", descripcion: "Chile riega más eficientemente su tierra agrícola que el resto de la región." },
  { code: "NV.IND.MANF.ZS",    titulo: "Mayor valor manufacturero industrial en LatAm",  descripcion: "La industria chilena produce más valor que la de cualquier vecino." },
  { code: "IS.ROD.PAVE.ZS",    titulo: "Mayor porcentaje de caminos pavimentados en LatAm", descripcion: "En Chile se puede manejar por casi todas partes. Los baches son la excepción." },
  { code: "SP.DYN.TFRT.IN",    titulo: "Menor tasa de fertilidad de Sudamérica",         descripcion: "Los chilenos tienen pocos hijos. Los que tienen son los mejores del mundo.", ascending: true },
];

async function fetchIndicator(
  code: string
): Promise<{ countryCode: string; value: number }[]> {
  const url = `${BASE}/country/all/indicator/${code}?format=json&mrv=1&per_page=300`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return [];
  const json = await res.json();
  const rows: { countryiso3code: string; value: number | null }[] = json[1] ?? [];
  return rows
    .filter((r) => r.value !== null && LATAM.has(r.countryiso3code))
    .map((r) => ({ countryCode: r.countryiso3code, value: r.value as number }));
}

export const worldBankFetcher: RankingFetcher = {
  id: "world-bank",
  async fetch(): Promise<RankingCard[]> {
    const now = new Date().toISOString();
    const fetched = await Promise.allSettled(
      INDICATORS.map((ind) => fetchIndicator(ind.code).then((rows) => ({ ind, rows })))
    );

    return fetched
      .filter((r): r is PromiseFulfilledResult<{ ind: typeof INDICATORS[number]; rows: { countryCode: string; value: number }[] }> => r.status === "fulfilled")
      .flatMap(({ value: { ind, rows } }) => {
        if (!rows.length) return [];
        const sorted = [...rows].sort((a, b) => ind.ascending ? a.value - b.value : b.value - a.value);
        const rank = sorted.findIndex((r) => r.countryCode === CHILE) + 1;
        if (rank !== 1) return [];
        const chileValue = rows.find((r) => r.countryCode === CHILE)?.value;
        return [{
          id: `wb-${ind.code}`,
          tipo: "serio" as const,
          titulo: ind.titulo,
          descripcion: ind.descripcion,
          valor: chileValue !== undefined ? String(Number(chileValue).toFixed(1)) : "#1",
          fuente: "World Bank",
          actualizadoEn: now,
          url: `https://data.worldbank.org/indicator/${ind.code}`,
        }];
      });
  },
};
