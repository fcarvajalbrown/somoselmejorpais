export type RankingTipo = "serio" | "absurdo";

export interface RankingCard {
  id: string;
  tipo: RankingTipo;
  titulo: string;
  descripcion: string;
  valor: string;
  fuente?: string;
  actualizadoEn?: string; // ISO date, only for API-fetched serious rankings
  url?: string;
}

export interface RankingFetcher {
  id: string;
  fetch(): Promise<RankingCard[]>;
}
