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
    short: "2 h de clase + 4 partidos de 1,5 h",
    text:
      "Entrenamientos en grupo con coaches profesionales de NOX Academy: 2 horas semanales de clase para trabajar técnica y posicionamiento, más 4 partidos de hora y media entre los miembros del grupo para poner en práctica lo aprendido y formar parejas del torneo.",
    photos: [
      "/photos/bali/entrenos/1.jpg",
      "/photos/bali/partidos/1.jpg",
      "/photos/extra/padel-action/1.jpg",
    ],
    group: "padel",
  },
  {
    slug: "torneo",
    title: "Torneo fin de semana",
    short: "Torneo internacional con cientos de jugadores",
    text:
      "Los clubes de pádel de Bali organizan torneos internacionales cada fin de semana y participamos. Son torneos amateur con más de 500 jugadores en múltiples categorías, ambiente brutal y la oportunidad de competir con gente de todo el mundo en una pista de nivel.",
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
    title: "Ubud — Corazón cultural",
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
    title: "Uluwatu — Acantilados del sur",
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
    title: "Ubud Norte — Naturaleza pura",
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
      "/photos/nusa-penida/1.jpg",
      "/photos/nusa-penida/2.jpg",
      "/photos/nusa-penida/3.jpg",
    ],
    group: "actividades",
  },
];

// === BALI ITINERARY — 15 días según brochure oficial PT 2026 ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 0,
    weekday: "Día 0",
    title: "Llegada a Bali",
    subtitle: "Aeropuerto, traslado al hotel y bienvenida",
    description:
      "Aterrizaje en el aeropuerto de Denpasar. Recogida en transporte privado incluido y traslado al hotel en Canggu, tu hogar durante todo el viaje. Tarde para deshacer maletas, refrescarse y empezar a adaptarse al cambio horario. Bienvenida con el grupo y presentación del coordinador.",
    tags: ["social", "libre"],
    photo: "/photos/villa/1.jpg",
    highlights: [],
  },
  {
    day: 1,
    weekday: "Día 1",
    title: "Clase de pádel + Tanah Lot",
    subtitle: "Introducción al viaje, primera clase en BPA y templo del atardecer",
    description:
      "Por la mañana introducción al viaje y traslado a Bali Padel Academy para la primera clase con los coaches — conoces el club, las pistas y los grupos por nivel. Comida en el restaurante Bandeja del club. Por la tarde, visita al templo de Tanah Lot: «Tierra en el Mar» en balinés, alzado sobre una gran roca rodeada por el océano. Con marea alta parece flotar sobre las olas. Atardecer sobre el templo en silueta — uno de los lugares más fotografiados de Bali.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/tanah-lot/1.jpg",
    highlights: [],
  },
  {
    day: 2,
    weekday: "Día 2",
    title: "Día en Ubud",
    subtitle: "Templo de purificación, arrozales y palacio real",
    description:
      "Salimos hacia Ubud, centro cultural y artístico de la isla. Empezamos en uno de los templos más sagrados, donde quien quiera puede participar en el ritual tradicional balinés de purificación sumergiéndose en las aguas que fluyen de fuentes naturales. Después, las terrazas de arroz de Tegallalang — uno de los paisajes más icónicos de Bali. Visita al Palacio Real de Ubud, hogar histórico de la familia real, y tiempo libre en el Mercado de Arte Tradicional («Pasar Seni Ubud») para llevarte algún recuerdo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/extra/arrozales/1.jpg",
    highlights: [],
  },
  {
    day: 3,
    weekday: "Día 3",
    title: "Partido de pádel + surf",
    subtitle: "Mañana en BPA, tarde en las olas de Canggu",
    description:
      "Por la mañana, primer partido de pádel en BPA por niveles con la pareja con la que jugarás el torneo, descanso y comida en el club. Por la tarde, clase de surf en una de las playas de Canggu — entre las mejores del mundo para iniciarse. Dos horas con instructor experimentado que adapta la sesión a tu nivel, tabla y traje incluidos. Terminamos el día en la misma playa contemplando la puesta de sol.",
    tags: ["padel", "playa", "naturaleza"],
    photo: "/photos/extra/surf-extra/1.jpg",
    highlights: [],
  },
  {
    day: 4,
    weekday: "Día 4",
    title: "Día en Uluwatu",
    subtitle: "Playas, templo y atardecer",
    description:
      "Salida al sur de la isla, zona famosa por sus acantilados, playas de arena blanca y olas desafiantes. Empezamos la mañana relajándonos en una de las playas con baño en aguas cristalinas. Después, comida en zona de acantilados contemplando a los mejores surfistas desafiando las olas. Por la tarde, paseo por el templo de Pura Luhur Uluwatu, en lo alto del acantilado con vistas espectaculares al océano Índico. Última parada en otra playa cercana de regreso a Canggu para disfrutar de uno de los atardeceres más impresionantes de la isla.",
    tags: ["playa", "cultura"],
    photo: "/photos/bali/uluwatu/1.jpg",
    highlights: [],
  },
  {
    day: 5,
    weekday: "Día 5",
    title: "Partido de pádel + tarde libre",
    subtitle: "Pádel por la mañana, tarde a tu ritmo",
    description:
      "Partido de pádel matinal en BPA por niveles con descanso y comida en el club. Tarde libre: spa balinés, sesión de yoga, otra ronda de surf, beach club frente al mar, o pádel libre con jugadores internacionales del club. El coordinador te orienta con recomendaciones según lo que te apetezca.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/bpa/piscina-atardecer.jpg",
    highlights: [],
  },
  {
    day: 6,
    weekday: "Día 6",
    title: "Día libre — Nusa Penida",
    subtitle: "Isla de ensueño a 40 minutos en ferry",
    description:
      "Excursión a Nusa Penida. Salida temprano desde el puerto de Sanur en ferry. Al llegar, un conductor local nos acompaña por los rincones más bellos: Angel's Billabong (piscina natural entre acantilados con aguas turquesa) y Broken Beach (bahía con espectacular arco de roca abierto al océano), Kelingking Beach (la playa más fotografiada en Instagram, con el icónico acantilado en forma de dinosaurio sobre arena blanca) y Crystal Bay (ideal para relajarse, nadar y snorkel). A las 17:00h ferry de vuelta a Bali.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/nusa-penida/1.jpg",
    highlights: [],
  },
  {
    day: 7,
    weekday: "Día 7",
    title: "Día en Bali Este",
    subtitle: "Puertas del Cielo + snorkel en Amed",
    description:
      "Salimos al este de la isla. Empezamos en Pura Lempuyang, uno de los templos más antiguos y sagrados de Bali, conocido por sus famosas «Puertas del Cielo» con vista enmarcada al volcán Agung — uno de los lugares más fotografiados de la isla. Ruta panorámica de miradores con paisajes increíbles. Finalizamos en Amed, pueblo costero de arena negra volcánica y ambiente relajado, donde haremos una actividad de snorkel sobre los arrecifes de coral. Opcional: submarinismo con centros locales (coste aparte, sujeto a disponibilidad).",
    tags: ["cultura", "playa", "naturaleza"],
    photo: "/photos/bali/amed/1.jpg",
    highlights: [],
  },
  {
    day: 8,
    weekday: "Día 8",
    title: "Clase de pádel + Taman Ayun + Coffee Plantation",
    subtitle: "Mañana en BPA, tarde cultural",
    description:
      "Por la mañana, segunda clase de pádel en BPA con los coaches para pulir técnica, y comida en el club. Por la tarde, visita al templo Taman Ayun, construido en el siglo XVII por la dinastía real de Mengwi — Patrimonio de la Humanidad por la UNESCO, con arquitectura balinesa tradicional, jardines extensos y canales que crean un ambiente sereno. Después, parada en una plantación tradicional de café: conoces el proceso del famoso café Luwak — seleccionado y digerido por la civeta asiática antes del tueste — y cata de cafés y tés balineses con vistas a los campos.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/cafe/1.jpg",
    highlights: [],
  },
  {
    day: 9,
    weekday: "Día 9",
    title: "Día en Ubud Norte",
    subtitle: "Pura Ulun Danu, cascada y Jatiluwih",
    description:
      "Día completo en la zona oeste y norte de Bali, descubriendo paisajes increíbles. Visita al templo Pura Ulun Danu Bratan, construido en el siglo XVII y dedicado a Dewi Danu, la diosa del agua — parece flotar sobre el lago cuando sube el nivel del agua. Después, cascada en Tabanan tras una caminata entre vegetación y puentes, con baño en la piscina natural en su base. Finalmente, los arrozales de Jatiluwih: Patrimonio de la Humanidad por la UNESCO con el sistema de irrigación tradicional «subak» y el volcán Gunung Batularu al fondo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/ubud-norte/1.jpg",
    highlights: [],
  },
  {
    day: 10,
    weekday: "Día 10",
    title: "Partido de pádel + tarde libre",
    subtitle: "Mañana en BPA, tarde a tu ritmo",
    description:
      "Tercer partido de pádel en BPA con la pareja del torneo, descanso y comida en el club. Tarde libre para que cada uno haga lo que más le apetezca: spa, masaje balinés, yoga, scooter por la costa, mercados, cafés especializados o simplemente piscina y desconexión.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/padel-action/2.jpg",
    highlights: [],
  },
  {
    day: 11,
    weekday: "Día 11",
    title: "Día libre — Aventura y Relax",
    subtitle: "Quad en Ubud + piscinas de Cretya",
    description:
      "Mañana de aventura en quad: nos dirigimos a Ubud y recorremos en quad propio arrozales, senderos de barro, túneles naturales e incluso una cueva con cascada — una de las rutas más espectaculares de Bali. No se necesita experiencia previa, los instructores locales te enseñan lo necesario. Por la tarde, uno de los clubs más espectaculares de Ubud con piscinas infinitas en terrazas con vistas a los arrozales, música y ambiente chill — el sitio ideal para disfrutar hasta el atardecer.",
    tags: ["naturaleza", "libre"],
    photo: "/photos/extra/arrozales/2.jpg",
    highlights: [],
  },
  {
    day: 12,
    weekday: "Día 12",
    title: "Partido de pádel + preparación torneo",
    subtitle: "Última sesión técnica antes del torneo",
    description:
      "Cuarto y último partido de pádel en BPA por niveles, con la pareja del torneo. Es el momento de ajustar detalles tácticos, comunicación y ritmo antes del fin de semana de competición. Comida en el club y revisión de los cuadros del torneo con el coordinador para que cada pareja conozca sus horarios. Tarde libre para descansar.",
    tags: ["padel"],
    photo: "/photos/bali/partidos/1.jpg",
    highlights: [],
  },
  {
    day: 13,
    weekday: "Día 13",
    title: "Torneo internacional + cena de despedida",
    subtitle: "Día de competición y cierre del viaje",
    description:
      "Día del torneo internacional en BPA junto a jugadores de todo el mundo. Los partidos se reparten entre mañana y tarde, así que hay tiempo libre entre rondas para playa, comida o descanso. Es el momento de poner en práctica todo lo aprendido y vivir el espíritu competitivo y social del pádel en Bali. Por la noche, cena de despedida del grupo en un restaurante especial — brindis, fotos, recuerdos y el cierre de dos semanas inolvidables.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/2.jpg",
    highlights: [],
  },
  {
    day: 14,
    weekday: "Día 14",
    title: "Vuelta",
    subtitle: "Hasta la próxima",
    description:
      "Traslado privado al aeropuerto según el horario de tu vuelo de regreso. El coordinador organiza los shuttles para que cada uno salga a su hora. Muchos del grupo aprovechan para alargar la estancia unos días por su cuenta o combinar Bali con otro destino — te ayudamos con cualquier reserva extra si te quieres quedar más tiempo.",
    tags: ["libre"],
    photo: "/photos/extra/arrozales/3.jpg",
    highlights: [],
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
