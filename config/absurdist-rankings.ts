export interface AbsurdistRanking {
  id: string;
  titulo: string;
  descripcion: string;
  valor: string;
  fuente?: string;
}

export const absurdistRankings: AbsurdistRanking[] = [
  {
    id: "pais-mas-flaco",
    titulo: "País más largo y flaco del mundo",
    descripcion: "4.300 km de largo, 177 km de ancho promedio. Un fideo con bandera.",
    valor: "#1 mundial",
  },
  {
    id: "desierto-mas-arido",
    titulo: "Desierto más árido del planeta",
    descripcion: "El Atacama lleva millones de años perfeccionando la sequedad.",
    valor: "0 mm/año en zonas núcleo",
    fuente: "NASA",
  },
  {
    id: "poetas-nobel",
    titulo: "Más premios Nobel de Literatura per cápita en Latinoamérica",
    descripcion: "Mistral y Neruda. Dos. Con 19 millones de habitantes. Hagan el cálculo.",
    valor: "2 premios Nobel",
  },
  {
    id: "astronomos-per-capita",
    titulo: "Mayor concentración de astrónomos por habitante",
    descripcion: "El 40% de la observación astronómica mundial ocurre en suelo chileno.",
    valor: "40% del cielo mundial",
    fuente: "ESO",
  },
  {
    id: "copa-america",
    titulo: "Bicampeón Copa América consecutivo",
    descripcion: "2015 y 2016. Argentina sabe lo que pasó.",
    valor: "2 títulos seguidos",
  },
  {
    id: "terremotos",
    titulo: "País con el terremoto más grande jamás registrado",
    descripcion: "Valdivia 1960, 9.5 Richter. Ni siquiera fue noticia por mucho tiempo.",
    valor: "9.5 Mw — récord mundial",
    fuente: "USGS",
  },
  {
    id: "litio",
    titulo: "Mayor reserva de litio del mundo",
    descripcion: "El futuro eléctrico del planeta está bajo el Salar de Atacama.",
    valor: "~37% reservas globales",
    fuente: "USGS 2023",
  },
  {
    id: "mayonesa",
    titulo: "Primer lugar en consumo de mayonesa per cápita en Latinoamérica",
    descripcion: "Completo, chorrillana, papas fritas. La mayonesa no es condimento, es cultura.",
    valor: "#1 Latinoamérica",
  },
  {
    id: "piscola",
    titulo: "Único país que mezcla pisco con Coca-Cola y le llama trago nacional",
    descripcion: "Perú disputa el pisco. Nadie le disputa la piscola.",
    valor: "Invención 100% chilena",
  },
  {
    id: "empanadas",
    titulo: "País con más variantes de empanada por km² de territorio",
    descripcion: "Pino, queso, mariscos, manjar. Cada región tiene la suya y todas son la mejor.",
    valor: "Incontables variantes",
  },
];
