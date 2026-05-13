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

export interface Experience {
  slug: string;
  title: string;
  short: string;
  text: string;
  photos: string[];
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

// === BALI EXPERIENCES con fotos múltiples ===
const baliExperiences: Experience[] = [
  {
    slug: "club-bali",
    title: "Bali Padel Academy",
    short: "Tu pista durante 14 días",
    text:
      "Club oficial del viaje. Pistas premium, comunidad local que ya nos conoce, ambiente joven. Aquí jugamos los partidos, las clases y el torneo.",
    photos: [
      "/photos/bali/club-bali/1.jpg",
      "/photos/bali/club-bali/2.jpg",
      "/photos/bali/club-bali/3.jpg",
      "/photos/bali/club-bali/4.jpg",
      "/photos/extra/bpa/1.jpg",
      "/photos/extra/bpa/2.jpg",
      "/photos/extra/bpa/3.jpg",
    ],
  },
  {
    slug: "partidos",
    title: "Partidos del grupo",
    short: "Tu nivel encuentra el suyo",
    text:
      "Americana, parejas rotando y torneo el fin de semana. Da igual si vienes con tu pareja habitual o si vienes solo: aquí siempre se juega.",
    photos: [
      "/photos/bali/partidos/1.jpg",
      "/photos/bali/partidos/2.jpg",
      "/photos/extra/padel-action/1.jpg",
      "/photos/extra/padel-action/2.jpg",
      "/photos/extra/padel-action/3.jpg",
      "/photos/extra/padel-action/4.jpg",
      "/photos/extra/padel-action/5.jpg",
    ],
  },
  {
    slug: "ubud",
    title: "Ubud — corazón cultural",
    short: "Templos, mercado y arrozales",
    text:
      "Las terrazas de arroz de Tegallalang, el Palacio Real, el templo de purificación y el Mercado de Arte. Día completo con calma para los que quieren sentir Bali más allá de la playa.",
    photos: [
      "/photos/bali/ubud/1.jpg",
      "/photos/bali/ubud/2.jpg",
      "/photos/bali/ubud/3.jpg",
      "/photos/bali/ubud/4.jpg",
      "/photos/extra/arrozales/1.jpg",
      "/photos/extra/arrozales/2.jpg",
      "/photos/extra/arrozales/3.jpg",
      "/photos/extra/mercado/1.jpg",
    ],
  },
  {
    slug: "uluwatu",
    title: "Uluwatu — acantilados al sur",
    short: "Templo en el borde del mar",
    text:
      "Atardecer en el templo de Uluwatu, espectáculo de danza kecak con el océano de fondo y cena en chiringuito de pies en la arena.",
    photos: [
      "/photos/bali/uluwatu/1.jpg",
      "/photos/bali/uluwatu/2.jpg",
      "/photos/bali/uluwatu/3.jpg",
      "/photos/extra/atardecer/1.jpg",
      "/photos/extra/atardecer/2.jpg",
    ],
  },
  {
    slug: "tanah-lot",
    title: "Tanah Lot",
    short: "El templo sobre la roca",
    text:
      "Tanah Lot al atardecer es de esas postales que crees haber visto mil veces y aun así te quedas sin palabras. Visita guiada y café cerca de la costa.",
    photos: [
      "/photos/bali/tanah-lot/1.jpg",
      "/photos/bali/tanah-lot/2.jpg",
      "/photos/bali/tanah-lot/3.jpg",
      "/photos/extra/templos/1.jpg",
      "/photos/extra/atardecer/3.jpg",
    ],
  },
  {
    slug: "taman-ayun",
    title: "Taman Ayun",
    short: "El templo real entre jardines",
    text:
      "Templo real balinés rodeado de un canal y jardines impecables. Parada tranquila, perfecta para hacer foto y respirar.",
    photos: [
      "/photos/bali/taman-ayun/1.jpg",
      "/photos/bali/taman-ayun/2.jpg",
      "/photos/bali/taman-ayun/3.jpg",
      "/photos/extra/templos/2.jpg",
    ],
  },
  {
    slug: "ubud-norte",
    title: "Ubud Norte — naturaleza pura",
    short: "Cascadas y junglas escondidas",
    text:
      "Salimos un día entero a la parte norte: cascadas, ríos y jungla que no aparece en los itinerarios estándar. Plan duro y bonito.",
    photos: [
      "/photos/bali/ubud-norte/1.jpg",
      "/photos/bali/ubud-norte/2.jpg",
      "/photos/bali/ubud-norte/3.jpg",
      "/photos/extra/arrozales/4.jpg",
      "/photos/extra/arrozales/5.jpg",
    ],
  },
  {
    slug: "amed",
    title: "Amed — buceo y mar tranquilo",
    short: "Otra cara de Bali, sin masas",
    text:
      "Costa este, mar calmo, snorkel sobre el U.S.A.T. Liberty, pueblo de pescadores. Para los que quieren parar el reloj.",
    photos: [
      "/photos/bali/amed/1.jpg",
      "/photos/bali/amed/2.jpg",
      "/photos/bali/amed/3.jpg",
      "/photos/bali/amed/4.jpg",
      "/photos/extra/playa/1.jpg",
      "/photos/extra/playa/2.jpg",
    ],
  },
  {
    slug: "cafe",
    title: "Plantación de café",
    short: "Luwak, té y vistas",
    text:
      "Visita a una plantación tradicional con cata de cafés y tés locales. Pequeña, sin masas turísticas, justo lo que toca tras una mañana de pádel.",
    photos: [
      "/photos/bali/cafe/1.jpg",
      "/photos/bali/cafe/2.jpg",
      "/photos/extra/comida/1.jpg",
      "/photos/extra/comida/2.jpg",
    ],
  },
  {
    slug: "surf",
    title: "Surf",
    short: "Olas para todos los niveles",
    text:
      "Día opcional de surf con monitores locales. Playas del sur con olas amables para empezar, y olas serias para quienes ya lo controlan.",
    photos: [
      "/photos/bali/surf/1.jpg",
      "/photos/bali/surf/2.jpg",
      "/photos/extra/surf-extra/1.jpg",
      "/photos/extra/surf-extra/2.jpg",
      "/photos/extra/surf-extra/3.jpg",
      "/photos/extra/playa/3.jpg",
    ],
  },
  {
    slug: "entrenos",
    title: "Clases técnicas",
    short: "Una clase a la semana",
    text:
      "Una clase semanal con un coach del club. Trabajamos técnica, posicionamiento y juego en pareja. Sin presión: el ritmo lo pones tú.",
    photos: [
      "/photos/bali/entrenos/1.jpg",
      "/photos/bali/entrenos/2.jpg",
      "/photos/bali/entrenos/3.jpg",
      "/photos/extra/bpa/4.jpg",
      "/photos/extra/bpa/5.jpg",
    ],
  },
  {
    slug: "comida",
    title: "Comida balinesa",
    short: "Sabores que recordarás",
    text:
      "Cenas del grupo, warungs locales, mercados nocturnos, brunches frente al mar. Bali tiene una de las mejores escenas gastronómicas del sudeste asiático.",
    photos: [
      "/photos/extra/comida/1.jpg",
      "/photos/extra/comida/2.jpg",
      "/photos/extra/comida/3.jpg",
      "/photos/extra/comida/4.jpg",
      "/photos/extra/comida/5.jpg",
      "/photos/extra/comida/6.jpg",
    ],
  },
  {
    slug: "la-brisa",
    title: "La Brisa y los beach clubs",
    short: "El sur con estilo",
    text:
      "Salidas a beach clubs míticos de Canggu como La Brisa: cócteles al atardecer, música y la mejor puesta de sol de la costa oeste.",
    photos: [
      "/photos/extra/la-brisa/1.jpg",
      "/photos/extra/la-brisa/2.jpg",
      "/photos/extra/la-brisa/3.jpg",
      "/photos/extra/la-brisa/4.jpg",
    ],
  },
];

// === BALI ITINERARY — 14 días ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 1,
    weekday: "Sábado",
    title: "Llegada a Bali",
    subtitle: "Aterrizaje en Denpasar y bienvenida",
    description:
      "El coordinador te recoge en el aeropuerto y os trasladáis a la villa. Tarde tranquila para deshacer maletas y adaptarse al cambio horario. Cena de bienvenida del grupo: cocina balinesa con plato típico, presentación entre todos y briefing del viaje.",
    tags: ["social", "libre"],
    photo: "/photos/villa/1.jpg",
    highlights: ["Traslado privado", "Cena de bienvenida balinesa", "Briefing del viaje"],
  },
  {
    day: 2,
    weekday: "Domingo",
    title: "Aclimatación + visita al club",
    subtitle: "Piscina, brunch y conoces el BPA",
    description:
      "Mañana libre para nadar, recuperar el jet lag o pasear por la zona. Por la tarde, visita guiada al club Bali Padel Academy para ver dónde vamos a jugar las próximas dos semanas. Café con el dueño del club y los coaches locales.",
    tags: ["padel", "social", "libre"],
    photo: "/photos/extra/bpa/1.jpg",
    highlights: ["Villa y piscina", "Brunch en Canggu", "Visita BPA y coaches"],
  },
  {
    day: 3,
    weekday: "Lunes",
    title: "Primer día de pádel",
    subtitle: "Partidos en el club + tarde de templos del sur",
    description:
      "Mañana de partidos en BPA: rotaciones para conocer el nivel de cada uno y formar parejas. Tras comer, salida al sur de la isla — Uluwatu, el templo en el acantilado, atardecer con vistas al océano y espectáculo de danza kecak.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/uluwatu/1.jpg",
    highlights: ["Partidos BPA mañana", "Templo de Uluwatu", "Danza kecak al atardecer"],
  },
  {
    day: 4,
    weekday: "Martes",
    title: "Clase técnica + Tanah Lot",
    subtitle: "Pulir el juego y el templo sobre la roca",
    description:
      "Por la mañana, clase semanal con coach del club: trabajamos posicionamiento, salida de pared y juego en pareja. Por la tarde, traslado a Tanah Lot — el templo sobre la roca volcánica que el océano rodea con la marea alta. Atardecer y café en la costa.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/tanah-lot/1.jpg",
    highlights: ["Clase técnica", "Tanah Lot al atardecer", "Café con vistas"],
  },
  {
    day: 5,
    weekday: "Miércoles",
    title: "Día entero en Ubud",
    subtitle: "Corazón cultural de la isla",
    description:
      "Día completo en Ubud, el corazón cultural y espiritual de Bali. Terrazas de arroz de Tegallalang al amanecer, Palacio Real, templo de purificación Tirta Empul y Mercado de Arte Tradicional para los souvenirs. Comida en warung local con vistas a la jungla.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/extra/arrozales/1.jpg",
    highlights: ["Terrazas Tegallalang", "Palacio Real", "Templo Tirta Empul", "Mercado de Arte"],
  },
  {
    day: 6,
    weekday: "Jueves",
    title: "Partidos rotativos del grupo",
    subtitle: "Americana y cenas en Seminyak",
    description:
      "Mañana de partidos en BPA: vamos rotando para que cada uno juegue con todos los del grupo. Comida de grupo en warung. Por la noche, cenas en chiringuitos de Seminyak con los pies en la arena — varios planes propuestos, vas con quien quieras.",
    tags: ["padel", "social"],
    photo: "/photos/extra/padel-action/1.jpg",
    highlights: ["Partidos rotativos BPA", "Cenas en Seminyak", "Free time noche"],
  },
  {
    day: 7,
    weekday: "Viernes",
    title: "Surf y beach club",
    subtitle: "Olas en Canggu + atardecer en La Brisa",
    description:
      "Día de surf en Canggu con monitores locales. Playas con olas suaves para los que empiezan, olas serias para quien ya lo controla. Tablas y trajes incluidos. Por la tarde, cócteles en La Brisa con la mejor puesta de sol de la costa oeste.",
    tags: ["playa", "naturaleza", "social"],
    photo: "/photos/extra/surf-extra/1.jpg",
    highlights: ["Surf con monitor", "Material incluido", "Atardecer en La Brisa"],
  },
  {
    day: 8,
    weekday: "Sábado",
    title: "Día libre",
    subtitle: "Tu Bali, a tu ritmo",
    description:
      "Día sin agenda. El coordinador propone planes: spa, masajes locales, otra ronda de partidos en BPA, scooter por la costa, mercado nocturno. Tú decides. Cena del grupo en restaurante con música en vivo, si te apetece.",
    tags: ["libre", "social"],
    photo: "/photos/extra/playa/1.jpg",
    highlights: ["Día abierto", "Sugerencias del coordinador", "Cena opcional grupo"],
  },
  {
    day: 9,
    weekday: "Domingo",
    title: "Plantación de café + Taman Ayun",
    subtitle: "El interior tranquilo",
    description:
      "Visita a plantación tradicional de café con cata de luwak, robusta y tés balineses — pequeña, sin masas turísticas. Por la tarde, Taman Ayun, el templo real entre jardines y canales. Plan calmado tras una semana intensa.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/cafe/1.jpg",
    highlights: ["Cata de cafés y tés", "Templo Taman Ayun", "Jardines reales"],
  },
  {
    day: 10,
    weekday: "Lunes",
    title: "Ubud Norte — cascadas",
    subtitle: "La Bali que no aparece en las fotos",
    description:
      "Excursión a la parte norte de Ubud. Cascadas escondidas, ríos de aguas frías, jungla densa. Comida en restaurante familiar con vistas a un cañón verde. Plan más duro físicamente, pero de los más recordados del viaje.",
    tags: ["naturaleza"],
    photo: "/photos/bali/ubud-norte/1.jpg",
    highlights: ["Cascadas escondidas", "Senderismo ligero", "Comida con vistas"],
  },
  {
    day: 11,
    weekday: "Martes",
    title: "Amed — snorkel y costa este",
    subtitle: "Mar tranquilo y un naufragio",
    description:
      "Traslado a Amed, en la costa este, donde el mar está calmo. Snorkel sobre el USAT Liberty, un buque hundido en la Segunda Guerra Mundial cubierto de coral y peces. Comida en pueblo de pescadores, ritmo lento.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/bali/amed/1.jpg",
    highlights: ["Snorkel USAT Liberty", "Costa este", "Pueblo de pescadores"],
  },
  {
    day: 12,
    weekday: "Miércoles",
    title: "Última clase técnica",
    subtitle: "Pulir antes del torneo",
    description:
      "Última clase semanal con coach del club. Repasamos lo aprendido, ajustamos parejas para el torneo de mañana y trabajamos detalles tácticos. Tarde libre o piscina. Cena ligera, mañana hay torneo.",
    tags: ["padel"],
    photo: "/photos/bali/entrenos/1.jpg",
    highlights: ["Clase técnica final", "Formación parejas torneo", "Recuperación"],
  },
  {
    day: 13,
    weekday: "Jueves",
    title: "Torneo Padel Travellers",
    subtitle: "El gran final en la pista",
    description:
      "Torneo del grupo en BPA. Formato americana con eliminatorias finales. Lo importante es competir un poco, reírse mucho y cerrar la semana. Ceremonia de entrega de premios con la copa Padel Travellers — sí, hay copa. Cena de despedida en restaurante con vistas al mar.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/2.jpg",
    highlights: ["Torneo Padel Travellers", "Copa al ganador", "Cena de despedida"],
  },
  {
    day: 14,
    weekday: "Viernes",
    title: "Vuelta",
    subtitle: "Hasta la próxima",
    description:
      "Traslado al aeropuerto al horario que te corresponda. El coordinador organiza los shuttles según tus vuelos. Muchos del grupo alargan su estancia unos días por su cuenta — la villa se queda libre por la mañana.",
    tags: ["libre"],
    photo: "/photos/extra/atardecer/4.jpg",
    highlights: ["Traslados aeropuerto", "Opción alargar viaje", "Recuerdos para llevar"],
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
    duration: "14 días",
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
