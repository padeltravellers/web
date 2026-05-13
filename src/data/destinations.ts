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

// === BALI ITINERARY — 15 días según itinerario oficial PT ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 1,
    weekday: "Día 1",
    title: "Llegada a Bali",
    subtitle: "Aeropuerto, traslado al hotel y bienvenida",
    description:
      "Aterrizaje en el aeropuerto de Denpasar. Recogida en transporte privado incluido y traslado al hotel en Canggu, tu hogar las próximas dos semanas. Tarde para deshacer maletas, refrescarse y empezar a adaptarse al cambio horario. Cena de bienvenida con el grupo y presentación del viaje.",
    tags: ["social", "libre"],
    photo: "/photos/villa/1.jpg",
    highlights: [],
  },
  {
    day: 2,
    weekday: "Día 2",
    title: "Pádel y Tanah Lot",
    subtitle: "Introducción al viaje, clase en BPA y templo del atardecer",
    description:
      "Por la mañana introducción al viaje y traslado a Bali Padel Academy para la primera clase de pádel — conoces el club, los coaches y las pistas. Comida en el club. Por la tarde, visita al templo de Tanah Lot: «Tierra en el Mar» en balinés, alzado sobre una gran roca rodeada por el océano. Con marea alta parece flotar sobre las olas. Atardecer sobre el templo en silueta — uno de los lugares más fotografiados de Bali.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/tanah-lot/1.jpg",
    highlights: [],
  },
  {
    day: 3,
    weekday: "Día 3",
    title: "Día completo en Ubud",
    subtitle: "Templo de purificación, arrozales y palacio real",
    description:
      "Salimos pronto hacia Ubud, centro cultural y artístico de la isla. Empezamos en el templo Pura Mengening, donde quien quiera puede participar en el ritual tradicional balinés de purificación sumergiéndose en sus piscinas sagradas. Después, las terrazas de arroz de Tegalalang — uno de los paisajes más icónicos de Bali. Visita al Palacio Real Puri Saren Agung, hogar histórico de la familia real de Ubud, y tiempo libre en el Mercado Artesanal para llevarte algún recuerdo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/extra/arrozales/1.jpg",
    highlights: [],
  },
  {
    day: 4,
    weekday: "Día 4",
    title: "Partidos de pádel + surf",
    subtitle: "Mañana en BPA, tarde en las olas de Canggu",
    description:
      "Por la mañana, partidos de pádel en BPA por niveles, con descanso y comida en el club. Por la tarde, clase de surf en una de las playas de Canggu — entre las mejores del mundo para iniciarse. Dos horas con instructor experimentado que adapta la sesión a tu nivel, tabla y traje incluidos. Terminamos el día en la misma playa contemplando la puesta de sol.",
    tags: ["padel", "playa", "naturaleza"],
    photo: "/photos/extra/surf-extra/1.jpg",
    highlights: [],
  },
  {
    day: 5,
    weekday: "Día 5",
    title: "Día en Uluwatu",
    subtitle: "Playa Thomas, templo y atardecer en Jimbaran",
    description:
      "Salida al sur de la isla. Empezamos en Thomas Beach, una de las playas escondidas de Uluwatu entre acantilados — mañana de baño, snorkel y sol. Después, paseo por Pura Luhur Uluwatu, el templo en lo alto del acantilado con vistas espectaculares al océano (cuidado con los monos del lugar). Cerramos con la puesta de sol en la playa de Jimbaran y cena de pescado fresco en chiringuitos sobre la arena.",
    tags: ["playa", "cultura"],
    photo: "/photos/bali/uluwatu/1.jpg",
    highlights: [],
  },
  {
    day: 6,
    weekday: "Día 6",
    title: "Pádel + beach club",
    subtitle: "Partido por la mañana, tarde frente al mar",
    description:
      "Partido de pádel matinal en BPA con descanso en el club. Por la tarde, sesión en Finns Beach Club — uno de los beach clubs más conocidos de Canggu, con piscinas infinitas frente al océano, tumbonas, música y atardecer en directo. Tarde para desconectar, nadar, tomar algo y disfrutar del ambiente.",
    tags: ["padel", "playa", "libre"],
    photo: "/photos/extra/bpa/piscina-atardecer.jpg",
    highlights: [],
  },
  {
    day: 7,
    weekday: "Día 7",
    title: "Día libre en Canggu",
    subtitle: "A tu ritmo",
    description:
      "Día libre para que cada uno haga lo que más le apetezca: spa balinés, sesión de yoga, otra ronda de surf, scooter por la costa, mercados, cafés especializados, pádel libre con jugadores internacionales del club, o simplemente piscina y desconexión. El coordinador te orienta con recomendaciones según lo que te apetezca.",
    tags: ["libre"],
    photo: "/photos/villa/1.jpg",
    highlights: [],
  },
  {
    day: 8,
    weekday: "Día 8",
    title: "Norte de Bali",
    subtitle: "Twin Lakes, Pura Ulun Danu, Jatiluwih y cascada Leke Leke",
    description:
      "Día completo en el norte de la isla. Empezamos en el mirador de Twin Lakes (Lagos Gemelos), con vistas a los lagos Buyan y Tamblingan rodeados de selva. Después, el templo Pura Ulun Danu Beratan, construido en el siglo XVII y dedicado a Dewi Danu, la diosa del agua — parece flotar sobre el lago cuando sube el nivel. Continuamos por los arrozales de Jatiluwih, Patrimonio de la Humanidad por la UNESCO. Cierre en la cascada Leke Leke con baño en la piscina natural a sus pies.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/ubud-norte/1.jpg",
    highlights: [],
  },
  {
    day: 9,
    weekday: "Día 9",
    title: "Pádel, Taman Ayun y plantación de café",
    subtitle: "Mañana en BPA, tarde cultural",
    description:
      "Por la mañana, clase de pádel en BPA y comida en el club. Por la tarde, visita al templo Taman Ayun, construido en el siglo XVII por la dinastía real de Mengwi — arquitectura balinesa tradicional, jardines extensos y canales que crean un ambiente sereno. Después, parada en una plantación tradicional de café: conoces el proceso del famoso café Luwak y haces una cata de cafés y tés balineses con vistas a los campos.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/cafe/1.jpg",
    highlights: [],
  },
  {
    day: 10,
    weekday: "Día 10",
    title: "Nusa Penida",
    subtitle: "Excursión todo el día a la isla de ensueño",
    description:
      "Día completo en Nusa Penida. Salida temprano desde el puerto de Sanur en ferry rápido. Una vez en la isla, recorrido con conductor local por los puntos más espectaculares: Broken Beach (bahía con un arco de roca abierto al océano), Angel's Billabong (piscina natural entre acantilados con aguas turquesa), Kelingking Beach (el icónico acantilado con forma de dinosaurio sobre arena blanca) y Crystal Bay (playa para nadar y snorkel). Ferry de vuelta a media tarde.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/nusa-penida/1.jpg",
    highlights: [],
  },
  {
    day: 11,
    weekday: "Día 11",
    title: "Pádel + tarde libre",
    subtitle: "Última mañana de partidos, tarde a tu ritmo",
    description:
      "Mañana de partido de pádel en BPA con descanso y comida en el club. Tarde libre para masaje balinés, spa, otro paseo por la costa, mercados nocturnos, cena de grupo opcional, o simplemente descansar antes del torneo. Es el último día «tranquilo» antes del cierre competitivo del viaje.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/padel-action/2.jpg",
    highlights: [],
  },
  {
    day: 12,
    weekday: "Día 12",
    title: "Torneo internacional · Día 1",
    subtitle: "Arranca el fin de semana de competición",
    description:
      "Empieza el torneo internacional en Bali. Los clubes de la isla organizan torneos cada fin de semana con cientos de jugadores de todo el mundo, y participamos por niveles. Revisamos los cuadros juntos para que cada uno sepa el horario de sus partidos y pueda llegar al club con antelación. Entre rondas hay tiempo libre para playa, comida o descanso.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/1.jpg",
    highlights: [],
  },
  {
    day: 13,
    weekday: "Día 13",
    title: "Torneo internacional · Día 2",
    subtitle: "Segunda jornada de partidos",
    description:
      "Continúa el torneo. Según cómo cada pareja avance en los cuadros, los partidos se reparten entre mañana y tarde. Para los que no juegan en alguna franja, organizamos actividades o salidas según preferencias del grupo — talleres, beach club, exploración por la zona, lo que se ajuste mejor.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/2.jpg",
    highlights: [],
  },
  {
    day: 14,
    weekday: "Día 14",
    title: "Final del torneo + cena de despedida",
    subtitle: "El cierre del viaje",
    description:
      "Último día de torneo con las finales y entrega de premios. Por la noche, cena de despedida del grupo en un restaurante especial — brindis, fotos, recuerdos y el cierre que se merecen dos semanas tan intensas. Para muchos es uno de los momentos más recordados del viaje.",
    tags: ["padel", "social"],
    photo: "/photos/extra/bpa/aerial.jpg",
    highlights: [],
  },
  {
    day: 15,
    weekday: "Día 15",
    title: "Vuelta",
    subtitle: "Hasta la próxima",
    description:
      "Traslado privado al aeropuerto según el horario de tu vuelo de regreso. El coordinador organiza los shuttles para que cada uno salga a su hora. Muchos del grupo aprovechan para alargar la estancia unos días por su cuenta o combinar Bali con otro destino — el hotel se libera por la mañana pero te ayudamos con cualquier reserva extra si te quieres quedar más.",
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
