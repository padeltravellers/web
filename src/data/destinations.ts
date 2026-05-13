// Padel Travellers — Datos por destino
// Fotos: catálogo Drive PT (Fotos web + Bali Oriol). 106 fotos disponibles.

import { trips2026 as bali2026, faqs, included, notIncluded } from "./content";

export type DayTag = "padel" | "cultura" | "naturaleza" | "playa" | "libre" | "social";

export interface ItineraryDay {
  day: number;
  weekday: string;
  title: string;
  subtitle: string;
  description: string;
  tags: DayTag[];
  photo: string;
  photos?: string[]; // optional carousel
  highlights: string[];
}

export type ExperienceGroup = "padel" | "turismo" | "actividades";

export interface Experience {
  slug: string;
  title: string;
  short: string;
  text: string;
  photos: string[];
  group: ExperienceGroup;
}

export interface Destination {
  slug: string;
  name: string;
  status: "open" | "comingsoon" | "draft";
  shortPitch: string;
  description: string;
  hero: string;
  heroAlt: string;
  duration: string;
  groupSize: string;
  basePrice: string;
  solo: string;
  deposit: string;
  trips: typeof bali2026;
  highlights: { icon: string; title: string; text: string }[];
  experiences: Experience[];
  itinerary: ItineraryDay[];
  gallery: string[]; // fotos sueltas para galería
  weather?: string;
  gettingThere?: string;
  faqs: typeof faqs;
  included: typeof included;
  notIncluded: typeof notIncluded;
}

// === BALI EXPERIENCES con grupos (Pádel / Turismo / Actividades) ===
const baliExperiences: Experience[] = [
  // ===== PÁDEL =====
  {
    slug: "club-bali",
    title: "Bali Padel Academy",
    short: "Tu club durante el viaje",
    text:
      "Club premium con 7 pistas cubiertas de clase mundial, entre los arrozales de Canggu. Pista central con grada para 200 espectadores, sauna de vapor, baño de hielo y piscina infinita con vistas a los arrozales.",
    photos: [
      "/photos/extra/bpa/aerial.jpg",
      "/photos/extra/bpa/piscina-atardecer.jpg",
      "/photos/extra/bpa/piscina-arrozales.jpg",
    ],
    group: "padel",
  },
  {
    slug: "partidos-clases",
    title: "Partidos y clases con coaches NOX",
    short: "4 h de clase + 4 partidos de 1,5 h",
    text:
      "Entrenamientos en grupo con coaches profesionales de NOX Academy: 4 horas semanales de clase para trabajar técnica y posicionamiento, más 4 partidos de hora y media entre los miembros del grupo para poner en práctica lo aprendido y formar parejas del torneo.",
    photos: [
      "/photos/bali/entrenos/1.jpg",
      "/photos/bali/partidos/1.jpg",
      "/photos/extra/padel-action/1.jpg",
    ],
    group: "padel",
  },
  {
    slug: "torneo",
    title: "Torneo del grupo",
    short: "El fin de semana competimos",
    text:
      "Los clubes de pádel de Bali organizan torneos internacionales cada fin de semana y participamos. Si ese fin de semana no hay torneo externo, montamos uno interno con eliminatorias y la copa Padel Travellers. La competición sana cierra siempre la semana.",
    photos: [
      "/photos/extra/padel-action/2.jpg",
      "/photos/bali/partidos/2.jpg",
      "/photos/extra/padel-action/3.jpg",
    ],
    group: "padel",
  },
  // ===== TURISMO =====
  {
    slug: "ubud",
    title: "Ubud — corazón cultural",
    short: "Templo Tirta Empul, terrazas de arroz, Palacio Real y Mercado",
    text:
      "Día en Ubud, centro cultural y artístico de Bali. Templo de Purificación (ritual en piscinas sagradas), campos de arroz de Tegallalang, Palacio Real y el Mercado de Arte Tradicional con tiempo libre para souvenirs.",
    photos: [
      "/photos/bali/ubud/1.jpg",
      "/photos/bali/ubud/2.jpg",
      "/photos/bali/ubud/3.jpg",
      "/photos/bali/ubud/4.jpg",
      "/photos/extra/arrozales/1.jpg",
      "/photos/extra/arrozales/2.jpg",
      "/photos/extra/mercado/1.jpg",
      "/photos/extra/mercado/2.jpg",
    ],
    group: "turismo",
  },
  {
    slug: "uluwatu",
    title: "Uluwatu — acantilados del sur",
    short: "Playa, acantilados y el templo Pura Luhur",
    text:
      "Uluwatu es famoso por sus impresionantes acantilados, su templo y sus olas desafiantes. Mañana de playa, comida con vistas a los surfistas, paseo por el templo y atardecer con vistas al Índico de regreso a Canggu.",
    photos: [
      "/photos/bali/uluwatu/1.jpg",
      "/photos/bali/uluwatu/2.jpg",
      "/photos/bali/uluwatu/3.jpg",
      "/photos/extra/atardecer/1.jpg",
      "/photos/extra/atardecer/2.jpg",
    ],
    group: "turismo",
  },
  {
    slug: "amed",
    title: "Amed — Bali Este",
    short: "Pura Lempuyang (Puertas del Cielo) + snorkel",
    text:
      "Hacia el este: Pura Lempuyang, una de las Puertas del Cielo más fotografiadas de Bali, con vistas al volcán Agung. Ruta de miradores y bajada a Amed, costa de arena negra volcánica, snorkel sobre arrecifes de coral.",
    photos: [
      "/photos/bali/amed/1.jpg",
      "/photos/bali/amed/2.jpg",
      "/photos/bali/amed/3.jpg",
      "/photos/bali/amed/4.jpg",
      "/photos/extra/playa/1.jpg",
      "/photos/extra/playa/2.jpg",
    ],
    group: "turismo",
  },
  {
    slug: "ubud-norte",
    title: "Ubud Norte — naturaleza pura",
    short: "Templo Pura Ulun Danu, cascada y Jatiluwih",
    text:
      "Día en la zona oeste y norte. Templo Pura Ulun Danu Bratan flotando sobre el lago, cascada en Tabanan con piscina natural, y arrozales de Jatiluwih, Patrimonio de la Humanidad por la UNESCO.",
    photos: [
      "/photos/bali/ubud-norte/1.jpg",
      "/photos/bali/ubud-norte/2.jpg",
      "/photos/bali/ubud-norte/3.jpg",
      "/photos/extra/arrozales/3.jpg",
      "/photos/extra/arrozales/4.jpg",
    ],
    group: "turismo",
  },
  {
    slug: "tanah-lot",
    title: "Tanah Lot",
    short: "El templo sobre la roca en el mar",
    text:
      "Tierra en el Mar en idioma balinés. Templo sobre una gran roca rodeada por el océano: con marea baja se accede, con marea alta parece flotar. Uno de los lugares más fotografiados de Bali y peregrinación local.",
    photos: [
      "/photos/bali/tanah-lot/1.jpg",
      "/photos/bali/tanah-lot/2.jpg",
      "/photos/bali/tanah-lot/3.jpg",
      "/photos/extra/templos/1.jpg",
    ],
    group: "turismo",
  },
  {
    slug: "taman-ayun",
    title: "Taman Ayun",
    short: "Templo real declarado Patrimonio de la Humanidad",
    text:
      "Construido en el siglo XVII por la dinastía real de Mengwi, destaca por su diseño armonioso que fusiona arquitectura balinesa tradicional con un extenso jardín rodeado de canales de agua.",
    photos: [
      "/photos/bali/taman-ayun/1.jpg",
      "/photos/bali/taman-ayun/2.jpg",
      "/photos/bali/taman-ayun/3.jpg",
      "/photos/extra/templos/2.jpg",
    ],
    group: "turismo",
  },

  // ===== ACTIVIDADES =====
  {
    slug: "surf",
    title: "Clase de surf",
    short: "Dos horas con instructor experimentado",
    text:
      "Las playas de Bali ofrecen algunas de las mejores olas del mundo. Reservamos una tarde para clases de surf de dos horas con instructor que adaptará la sesión a tu nivel. Terminamos con el atardecer en la misma playa.",
    photos: [
      "/photos/bali/surf/1.jpg",
      "/photos/bali/surf/2.jpg",
      "/photos/extra/surf-extra/1.jpg",
      "/photos/extra/surf-extra/2.jpg",
      "/photos/extra/surf-extra/3.jpg",
    ],
    group: "actividades",
  },
  {
    slug: "cafe",
    title: "Plantación de café",
    short: "Cata del famoso café Luwak",
    text:
      "Visita inmersiva a una plantación tradicional. Descubrirás el proceso del Luwak, uno de los cafés más exclusivos del mundo, cata de robusta y tés balineses, y vistas a los campos y el entorno natural.",
    photos: [
      "/photos/bali/cafe/1.jpg",
      "/photos/bali/cafe/2.jpg",
      "/photos/extra/comida/1.jpg",
      "/photos/extra/comida/2.jpg",
    ],
    group: "actividades",
  },
  {
    slug: "nusa-penida",
    title: "Nusa Penida (día libre)",
    short: "Angel's Billabong, Kelingking Beach, Crystal Bay",
    text:
      "Isla de ensueño a 40 minutos en ferry. Angel's Billabong (piscina natural entre acantilados), Broken Beach, Kelingking Beach (acantilado con forma de dinosaurio) y Crystal Bay para nadar o hacer snorkel.",
    photos: [
      "/photos/extra/playa/3.jpg",
      "/photos/extra/playa/4.jpg",
      "/photos/extra/playa/5.jpg",
      "/photos/extra/atardecer/4.jpg",
    ],
    group: "actividades",
  },
];

// === BALI ITINERARY — 15 días según PDF oficial 2026 ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 1,
    weekday: "Día 1",
    title: "Llegada a Bali",
    subtitle: "Aeropuerto, traslado al alojamiento y bienvenida",
    description:
      "Aterrizaje en Denpasar. El coordinador te espera al salir del avión, traslado privado al alojamiento en Canggu, tiempo para deshacer maletas y refrescarse. Cena de bienvenida del grupo con cocina balinesa y briefing del viaje.",
    tags: ["social", "libre"],
    photo: "/photos/villa/1.jpg",
    highlights: ["Traslado privado", "Bienvenida del grupo", "Briefing del viaje"],
  },
  {
    day: 2,
    weekday: "Día 2",
    title: "Aclimatación y primer contacto con BPA",
    subtitle: "Mañana libre, tarde de visita al club",
    description:
      "Mañana libre para recuperar el jet lag, nadar y conocer la zona. Por la tarde, visita guiada al club Bali Padel Academy: las 7 pistas cubiertas, la zona de recuperación (sauna, baño de hielo, piscina infinita), el restaurante Bandeja y los coaches NOX.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/bpa/aerial.jpg",
    highlights: ["Recuperar jet lag", "Visita BPA", "Conoces los coaches"],
  },
  {
    day: 3,
    weekday: "Día 3",
    title: "Primera sesión + Uluwatu",
    subtitle: "Pádel por la mañana, acantilados al sur por la tarde",
    description:
      "Mañana de clase y partido en BPA: 1h de clase con coach NOX, 1,5h de partido entre el grupo. Tras comer, salida al sur — playa de Uluwatu, comida con vistas a los surfistas, templo Pura Luhur al atardecer y parada en otra playa al volver para ver la puesta de sol.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/uluwatu/1.jpg",
    highlights: ["Clase + partido BPA", "Templo Uluwatu", "Atardecer Índico"],
  },
  {
    day: 4,
    weekday: "Día 4",
    title: "Día en Ubud",
    subtitle: "El centro cultural y artístico de Bali",
    description:
      "Día completo en Ubud. Templo Tirta Empul para el ritual de purificación en piscinas sagradas, terrazas de arroz de Tegallalang, Palacio Real de Ubud y tiempo libre en el Mercado de Arte Tradicional. Regreso al alojamiento para descansar.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/extra/arrozales/1.jpg",
    highlights: ["Tirta Empul", "Terrazas Tegallalang", "Palacio Real", "Mercado de Arte"],
  },
  {
    day: 5,
    weekday: "Día 5",
    title: "Pádel intensivo + tiempo libre",
    subtitle: "Mañana en pista, tarde para ti",
    description:
      "Mañana en BPA con clase y partido. Por la tarde, tiempo libre: surf si te apetece más, spa y masajes balineses, sesión de yoga, otra ronda de pádel con compañeros del grupo o un beach club frente al mar. El coordinador propone planes; tú eliges.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/padel-action/2.jpg",
    highlights: ["Clase + partido BPA", "Spa, yoga o surf", "Beach club opcional"],
  },
  {
    day: 6,
    weekday: "Día 6",
    title: "Día libre — Nusa Penida",
    subtitle: "Isla de ensueño a 40 min en ferry",
    description:
      "Día libre del programa de pádel: te proponemos Nusa Penida. Ferry desde Sanur, recogida por conductor local, y ruta por Angel's Billabong, Broken Beach, Kelingking Beach (el dinosaurio) y Crystal Bay para nadar o snorkel. Ferry de vuelta a las 17h.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/extra/playa/3.jpg",
    highlights: ["Angel's Billabong", "Kelingking Beach", "Crystal Bay"],
  },
  {
    day: 7,
    weekday: "Día 7",
    title: "Torneo o partidos de grupo",
    subtitle: "Primer fin de semana competitivo",
    description:
      "Si hay torneo en el club ese fin de semana, participamos junto a jugadores internacionales de la isla. Si no, organizamos partidos entre nosotros y con otros jugadores. Los partidos se reparten entre mañana y tarde, dejando ratos libres para playa o descanso.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/1.jpg",
    highlights: ["Torneo o partidos", "Reparto mañana / tarde", "Ratos libres"],
  },
  {
    day: 8,
    weekday: "Día 8",
    title: "Clase de surf",
    subtitle: "Dos horas con instructor en las playas de Canggu",
    description:
      "Tarde de surf en las playas de Canggu, mundialmente conocidas. Dos horas de clase adaptada a tu nivel — desde primeras olas hasta perfeccionar técnica. Material incluido. Cerramos el día contemplando la puesta de sol desde la misma playa.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/extra/surf-extra/1.jpg",
    highlights: ["2h con instructor", "Material incluido", "Puesta de sol"],
  },
  {
    day: 9,
    weekday: "Día 9",
    title: "Día en Bali Este",
    subtitle: "Pura Lempuyang + Amed",
    description:
      "Hacia el este de Bali. Templo Pura Lempuyang con sus famosas Puertas del Cielo y vista al volcán Agung, ruta de miradores panorámicos y bajada a Amed: pueblo costero de arena negra volcánica, snorkel sobre arrecifes de coral. Opción de buceo (coste aparte).",
    tags: ["cultura", "playa", "naturaleza"],
    photo: "/photos/bali/amed/1.jpg",
    highlights: ["Puertas del Cielo", "Vista volcán Agung", "Snorkel en Amed"],
  },
  {
    day: 10,
    weekday: "Día 10",
    title: "Pádel + tiempo libre",
    subtitle: "Mañana en BPA, tarde para recuperar",
    description:
      "Mañana de clase y partido en BPA, ya con el grupo bien rodado. Tarde libre para spa, masajes balineses, yoga, otra ronda de pádel, scooter por la costa o simplemente piscina y siesta. Cena de grupo opcional con música en vivo.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/bpa/piscina-atardecer.jpg",
    highlights: ["Clase + partido BPA", "Recuperación activa", "Cena opcional grupo"],
  },
  {
    day: 11,
    weekday: "Día 11",
    title: "Día en Ubud Norte",
    subtitle: "Pura Ulun Danu, cascada y arrozales de Jatiluwih",
    description:
      "Día completo en el oeste y norte. Templo Pura Ulun Danu Bratan flotando sobre el lago, cascada en Tabanan con baño en piscina natural, y los arrozales de Jatiluwih, Patrimonio de la Humanidad por la UNESCO, con el volcán Gunung Batularu al fondo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/ubud-norte/1.jpg",
    highlights: ["Pura Ulun Danu", "Cascada con baño", "Arrozales Jatiluwih"],
  },
  {
    day: 12,
    weekday: "Día 12",
    title: "Plantación de café + Taman Ayun",
    subtitle: "Cata del Luwak y templo real",
    description:
      "Visita inmersiva a una plantación tradicional: aprendes el proceso del café Luwak — uno de los más exclusivos del mundo — y cata de cafés y tés balineses. Por la tarde, templo Taman Ayun (Patrimonio UNESCO), con sus jardines y canales.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/cafe/1.jpg",
    highlights: ["Cata Luwak y tés", "Taman Ayun", "Jardines reales"],
  },
  {
    day: 13,
    weekday: "Día 13",
    title: "Última sesión de pádel + Tanah Lot",
    subtitle: "Pulir el juego y un atardecer mítico",
    description:
      "Mañana en BPA: clase técnica final y partido para ajustar parejas del torneo. Tras comer, traslado a Tanah Lot, el templo sobre la roca en el mar — postal mítica de Bali. Atardecer con el templo en silueta sobre el océano.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/tanah-lot/1.jpg",
    highlights: ["Clase técnica", "Partido", "Tanah Lot al atardecer"],
  },
  {
    day: 14,
    weekday: "Día 14",
    title: "Torneo Padel Travellers + despedida",
    subtitle: "El gran final en pista y cena de cierre",
    description:
      "Torneo del grupo en BPA: formato americana con eliminatorias finales. Lo importante es competir, reírse y cerrar el viaje. Entrega de premios con la copa Padel Travellers (sí, hay copa). Cena de despedida en restaurante con vistas al mar.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/2.jpg",
    highlights: ["Torneo del grupo", "Copa Padel Travellers", "Cena de despedida"],
  },
  {
    day: 15,
    weekday: "Día 15",
    title: "Vuelta",
    subtitle: "Hasta la próxima",
    description:
      "Traslado al aeropuerto según el horario de tu vuelo. El coordinador organiza los shuttles según las salidas. Muchos del grupo alargan su estancia unos días por su cuenta — el alojamiento se libera por la mañana.",
    tags: ["libre"],
    photo: "/photos/extra/atardecer/4.jpg",
    highlights: ["Traslados al aeropuerto", "Opción alargar viaje", "Recuerdos"],
  },
];

const baliHighlights = [
  { icon: "🎾", title: "Pádel en BPA", text: "Club Bali Padel Academy: pistas premium, comunidad local, coaches con nivel." },
  { icon: "🏝", title: "13 experiencias incluidas", text: "Templos, mercados, cascadas, surf, snorkel, café, danza tradicional, beach clubs." },
  { icon: "🍜", title: "Cultura real, no postal", text: "Vamos a los sitios donde van los locales, no donde van los turistas." },
  { icon: "🧭", title: "Coordinador español", text: "Una persona del equipo PT viaja con vosotros las 2 semanas." },
];

const baliGallery = [
  "/photos/extra/atardecer/1.jpg",
  "/photos/extra/arrozales/1.jpg",
  "/photos/extra/bpa/1.jpg",
  "/photos/extra/padel-action/1.jpg",
  "/photos/bali/uluwatu/1.jpg",
  "/photos/extra/playa/1.jpg",
  "/photos/extra/la-brisa/1.jpg",
  "/photos/bali/ubud/1.jpg",
  "/photos/extra/comida/1.jpg",
  "/photos/extra/atardecer/2.jpg",
  "/photos/bali/tanah-lot/1.jpg",
  "/photos/extra/padel-action/2.jpg",
  "/photos/extra/arrozales/2.jpg",
  "/photos/extra/playa/2.jpg",
  "/photos/villa/1.jpg",
  "/photos/extra/atardecer/3.jpg",
];

export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    status: "open",
    shortPitch: "14 días en Indonesia — pádel, cultura, surf y aventura.",
    description:
      "Nuestro destino fundacional. Llevamos años llevando grupos a Bali y conocemos la isla como si fuera nuestra casa. Pádel en el club BPA, 13 experiencias en la isla, alojamiento privado y coordinador español acompañando el viaje completo.",
    hero: "/photos/extra/atardecer/1.jpg",
    heroAlt: "Acantilados de Uluwatu al atardecer",
    duration: "15 días",
    groupSize: "8–12 personas",
    basePrice: "1.725€",
    solo: "1.975€",
    deposit: "300€",
    trips: bali2026,
    highlights: baliHighlights,
    experiences: baliExperiences,
    itinerary: baliItinerary,
    gallery: baliGallery,
    weather:
      "26–32°C todo el año. Estación seca abril–octubre (mejor para viajar). Humedad alta pero llevable.",
    gettingThere:
      "Vuelos desde Madrid/Barcelona vía Dubái, Doha o Singapur. 16–20h totales. El coordinador te aconseja franja ideal de llegada.",
    faqs,
    included,
    notIncluded,
  },
  {
    slug: "filipinas",
    name: "Filipinas",
    status: "comingsoon",
    shortPitch: "Próximamente — islas paradisíacas, buceo y pádel.",
    description:
      "Estamos diseñando el destino para 2027. Pádel en Manila + travesía por las islas: Palawan, Cebú, Bohol. Buceo, playas vírgenes, comida filipina y la calidez de la gente local. Lista de espera abierta.",
    hero: "/photos/filipinas/1.jpg",
    heroAlt: "Aguas turquesas de Filipinas",
    duration: "14–16 días",
    groupSize: "8–12 personas",
    basePrice: "Por confirmar",
    solo: "Por confirmar",
    deposit: "—",
    trips: [],
    highlights: [
      { icon: "🤿", title: "Buceo de nivel mundial", text: "Tubbataha, Apo Reef y Bohol — algunos de los mejores spots del planeta." },
      { icon: "🏝", title: "Multi-isla", text: "Manila + Palawan + Cebú o Bohol. Travesías cortas en barco y avión." },
      { icon: "🎾", title: "Pádel en Manila", text: "Club local en arranque, en lo que el viaje empieza y termina." },
      { icon: "🍤", title: "Sabor filipino", text: "Adobo, sinigang, lechón. Comida potente y barata." },
    ],
    experiences: [],
    itinerary: [],
    gallery: ["/photos/filipinas/1.jpg", "/photos/filipinas/2.jpg", "/photos/filipinas/3.jpg"],
    faqs: [],
    included: [],
    notIncluded: [],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getOpenDestinations() {
  return destinations.filter((d) => d.status === "open");
}
