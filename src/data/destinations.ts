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

// === BALI ITINERARY — 15 días según PDF oficial 2026 ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 1,
    weekday: "Día 1",
    title: "Llegada a Bali",
    subtitle: "Aeropuerto, traslado al hotel y bienvenida",
    description:
      "Aterrizaje en el aeropuerto de Denpasar. Recogida en transporte privado incluido y traslado al hotel en Canggu, tu hogar las próximas dos semanas. Tarde para deshacer maletas, refrescarse y empezar a adaptarse al cambio horario. Cena de bienvenida con el grupo y presentación detallada del plan del viaje.",
    tags: ["social", "libre"],
    photo: "/photos/villa/1.jpg",
    highlights: [],
  },
  {
    day: 2,
    weekday: "Día 2",
    title: "Aclimatación y visita a BPA",
    subtitle: "Recuperar fuerzas y conocer el club",
    description:
      "Día tranquilo para recuperarse del viaje. Mañana en el hotel o paseo por Canggu — tiendas, cafés, playa a 5 minutos. Por la tarde visitamos Bali Padel Academy: las 7 pistas cubiertas premium entre arrozales, la pista central con grada para 200 espectadores, la zona de recuperación con sauna de vapor, baño de hielo y piscina infinita, y el restaurante Bandeja del club. Te presentamos a los coaches y al equipo.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/bpa/aerial.jpg",
    highlights: [],
  },
  {
    day: 3,
    weekday: "Día 3",
    title: "Primer pádel + Uluwatu",
    subtitle: "Mañana en pista, tarde en los acantilados del sur",
    description:
      "Por la mañana arrancamos el pádel en BPA con clase técnica y partido entre el grupo en pistas de máximo 4 jugadores por nivel. Tras comer, salida al sur de la isla. Empezamos en una de las playas de Uluwatu, comida en zona de acantilados contemplando a los surfistas con las olas desafiantes, paseo por el templo de Uluwatu en lo alto del acantilado, y parada en otra playa de camino de vuelta para el atardecer.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/uluwatu/1.jpg",
    highlights: [],
  },
  {
    day: 4,
    weekday: "Día 4",
    title: "Día completo en Ubud",
    subtitle: "Cultura, espiritualidad y arte",
    description:
      "Salimos pronto hacia Ubud, centro cultural y artístico de la isla. Empezamos en el Templo de Purificación, donde podrás participar en el ritual tradicional balinés de sumergirse en sus piscinas sagradas. Después, las terrazas de arroz de Tegallalang — uno de los paisajes más icónicos de Bali. Visita al Palacio Real, hogar histórico de la familia real de Ubud, y tiempo libre en el Mercado de Arte Tradicional para llevarte algún recuerdo. Regreso a Canggu para descansar.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/extra/arrozales/1.jpg",
    highlights: [],
  },
  {
    day: 5,
    weekday: "Día 5",
    title: "Pádel + tiempo libre",
    subtitle: "Mañana en BPA, tarde a tu ritmo",
    description:
      "Sesión de pádel matinal en BPA: clase con coach y partidos rotativos del grupo. Por la tarde, tiempo libre para que cada uno haga lo que más le apetezca — repetir surf si te gustó, masaje balinés y spa, sesión de yoga, otra ronda de pádel con jugadores internacionales, o relajarte en alguno de los beach clubs frente al mar. El coordinador te orienta con planes y recomendaciones.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/padel-action/2.jpg",
    highlights: [],
  },
  {
    day: 6,
    weekday: "Día 6",
    title: "Día libre — Nusa Penida",
    subtitle: "Isla de ensueño a 40 minutos en ferry",
    description:
      "Día libre del programa de pádel — te proponemos una excursión espectacular a Nusa Penida. Salimos del puerto de Sanur en ferry y al llegar un conductor local nos acompaña por los rincones más bellos: Angel's Billabong (piscina natural entre acantilados con aguas turquesa), Broken Beach (bahía con espectacular arco de roca abierto al océano), Kelingking Beach (el icónico acantilado con forma de dinosaurio sobre arena blanca) y Crystal Bay (playa para nadar, snorkel y atardecer). Ferry de vuelta a las 17h.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/nusa-penida/1.jpg",
    highlights: [],
  },
  {
    day: 7,
    weekday: "Día 7",
    title: "Torneo fin de semana",
    subtitle: "Pádel competitivo en BPA",
    description:
      "Fin de semana de torneo. Los clubes de pádel de Bali organizan torneos internacionales con cientos de jugadores cada fin de semana, y participamos. Los partidos se reparten entre mañana y tarde, así que hay tiempo libre entre rondas para playa, comida o descanso. Pondrás a prueba lo aprendido durante la semana y conocerás a jugadores de todo el mundo.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/1.jpg",
    highlights: [],
  },
  {
    day: 8,
    weekday: "Día 8",
    title: "Clase de surf",
    subtitle: "Dos horas con instructor en Canggu",
    description:
      "Las playas de Bali están entre las mejores del mundo para surfear. Reservamos una tarde para clase de surf en Canggu: dos horas con instructor experimentado que adapta la sesión a tu nivel, desde primeras olas hasta perfeccionar técnica. Tabla y traje incluidos. Terminamos el día en la misma playa contemplando la puesta de sol — uno de los momentos más recordados del viaje.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/extra/surf-extra/1.jpg",
    highlights: [],
  },
  {
    day: 9,
    weekday: "Día 9",
    title: "Día en Bali Este",
    subtitle: "Puertas del Cielo + snorkel en Amed",
    description:
      "Salimos al este de la isla. Empezamos en Pura Lempuyang, uno de los templos más antiguos y sagrados de Bali, conocido por sus famosas Puertas del Cielo con vista enmarcada al volcán Agung — uno de los lugares más fotografiados de Bali. Ruta panorámica con miradores y bajada a Amed, pueblo costero de arena negra volcánica con ambiente relajado. Actividad de snorkel sobre los arrecifes de coral. Opción de buceo con centros locales (coste aparte, sujeto a disponibilidad).",
    tags: ["cultura", "playa", "naturaleza"],
    photo: "/photos/bali/amed/1.jpg",
    highlights: [],
  },
  {
    day: 10,
    weekday: "Día 10",
    title: "Pádel + tiempo libre",
    subtitle: "Otra mañana en BPA, tarde abierta",
    description:
      "Mañana de clase y partido en BPA, con el grupo ya rodado y los niveles bien identificados. Tarde libre para spa, masajes, yoga, scooter por la costa, mercado nocturno, o más pádel libre con jugadores del club. Si te apetece, cena de grupo opcional en restaurante con música en vivo.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/bpa/piscina-atardecer.jpg",
    highlights: [],
  },
  {
    day: 11,
    weekday: "Día 11",
    title: "Día en Ubud Norte",
    subtitle: "Pura Ulun Danu, cascada y Jatiluwih",
    description:
      "Día completo en la zona oeste y norte de Bali, descubriendo paisajes increíbles. Visita al templo Pura Ulun Danu Bratan, construido en el siglo XVII y dedicado a Dewi Danu, la diosa del agua — parece flotar sobre el lago cuando sube el nivel del agua. Después, cascada en Tabanan tras una caminata entre vegetación y puentes, con baño en la piscina natural en su base. Finalmente, los arrozales de Jatiluwih: Patrimonio de la Humanidad por la UNESCO con el sistema de irrigación tradicional «subak» y el volcán Gunung Batularu al fondo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/ubud-norte/1.jpg",
    highlights: [],
  },
  {
    day: 12,
    weekday: "Día 12",
    title: "Plantación de café + Taman Ayun",
    subtitle: "Cata del Luwak y templo real",
    description:
      "Por la mañana, visita inmersiva a una plantación tradicional de café. Conoces el proceso completo del famoso café Luwak — uno de los más exclusivos del mundo, en el que la civeta asiática selecciona y digiere los granos antes de su tueste. Cata de cafés y tés balineses con vistas a los campos. Por la tarde, templo de Taman Ayun, construido en el siglo XVII por la dinastía real de Mengwi: arquitectura balinesa tradicional, jardines extensos y canales que aportan un ambiente sereno. Patrimonio de la Humanidad por la UNESCO.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/cafe/1.jpg",
    highlights: [],
  },
  {
    day: 13,
    weekday: "Día 13",
    title: "Pádel + Tanah Lot",
    subtitle: "Última sesión técnica y atardecer mítico",
    description:
      "Mañana en BPA: clase técnica para pulir detalles y partido para ajustar parejas pensando en el torneo de mañana. Tras comer, traslado a Tanah Lot — «Tierra en el Mar» en balinés. El templo se alza sobre una gran roca rodeada por el océano, solo accesible cuando baja la marea. Con marea alta, parece flotar sobre las olas. Es uno de los lugares más fotografiados de Bali y también un importante lugar de peregrinación local. Atardecer sobre el templo en silueta.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/tanah-lot/1.jpg",
    highlights: [],
  },
  {
    day: 14,
    weekday: "Día 14",
    title: "Torneo final + despedida",
    subtitle: "El cierre del viaje",
    description:
      "Día del torneo final del grupo en BPA. Formato americana con eliminatorias, ambiente competitivo pero amistoso — lo importante es disfrutar, reír y cerrar la semana de pádel a lo grande. Entrega de premios con la copa Padel Travellers para la pareja campeona (sí, hay copa de verdad). Por la noche, cena de despedida del grupo en un restaurante especial con vistas, brindis y memorias.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/2.jpg",
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
