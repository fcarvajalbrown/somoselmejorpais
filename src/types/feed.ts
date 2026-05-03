export interface FeedItem {
  id: string;
  titulo: string;
  url: string;
  fuente: string;
  publicadoEn: Date;
  resumen?: string;
  imagen?: string;
}
