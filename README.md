# Somos el Mejor País de Chile

Dashboard satírico que celebra la identidad nacional chilena. Agrega rankings reales e inventados y los presenta como victorias nacionales irrefutables.

**Sitio en vivo:** [red-quail-442294.hostingersite.com](https://red-quail-442294.hostingersite.com)

---

## Qué hace

- **Rankings** — fetchers modulares que consultan World Bank, IMF y Wikipedia en busca de rankings donde Chile aparece primero. Se mezclan con rankings absurdistas escritos a mano (el país más flaco, el terremoto más grande, los poetas Nobel, etc.).
- **Caos Cultural** — feed en vivo con las últimas noticias de 10 medios chilenos + Reddit r/chile y r/republicadechile, filtradas a 72 horas.

## Stack

- Next.js 16.2.4 + React 19 — App Router
- TypeScript
- Tailwind CSS 4
- Node.js 24 / npm 11
- Deployed en Hostinger

## Comandos

```
npm run dev      # servidor de desarrollo — http://localhost:3000
npm run build    # build de producción
npm run start    # correr el build localmente
npm run lint     # ESLint
```

## Estructura

```
src/
  app/           # rutas Next.js (page.tsx, feed/page.tsx, layout.tsx)
  components/    # RankingCard, InfiniteCardGrid, FeedItem, NavPopup, ScrollReveal
  config/        # absurdist-rankings.ts — rankings estáticos mantenidos por el dueño
  lib/
    fetchers/    # world-bank.ts · imf.ts · wikipedia-scraper.ts · index.ts
    feed/        # aggregator.ts · reddit.ts
  types/         # ranking.ts · feed.ts
public/
  fonts/         # RutaCL (autohosteada)
  logo.svg       # sello presidencial con cóndor y silueta de emoji de caca
  mountains.svg  # fondo de montañas scrolleantes
```

## Autor

Felipe Carvajal Brown
