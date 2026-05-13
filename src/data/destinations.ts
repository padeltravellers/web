// Padel Travellers — Datos por destino
// IMPORTANTE: las plazas vienen mockeadas. En producción se inyectan desde Sheet.

import { trips2026 as bali2026, baliExperiences, faqs, included, notIncluded } from "./content";

export type DayTag = "padel" | "cultura" | "naturaleza" | "playa" | "libre" | "social";

export interface ItineraryDay {
  day: number;
  weekday: string;
  title: string;
  subtitle: string;
  description: string;
  tags: DayTag[];
  photo: string;
  highlights: string[];
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
  experiences: typeof baliExperiences;
  itinerary: ItineraryDay[];
  weather?: string;
  gettingThere?: string;
  faqs: typeof faqs;
  included: typeof included;
  notIncluded: typeof notIncluded;
}

// === BALI ITINERARY — 14 días ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 1,
    weekday: "Sábado",
    title: "Llegada a Bali",
    subtitle: "Aterrizaje en Denpasar y bienvenida",
    description:
      "El coordinador te recoge en el aeropuerto y os trasladáis a la villa. Tarde tranquila para deshacer maletas y adaptarse al cambio horario. Cena de bienvenida al grupo: cocina balinesa con plato típico, presentación entre todos y briefing del viaje.",
    tags: ["social", "libre"],
    photo: "/photos/home/bali.jpg",
    highlights: ["Traslado privado", "Cena de bienvenida", "Briefing del viaje"],
  },
  {
    day: 2,
    weekday: "Domingo",
    title: "Aclimatación",
    subtitle: "Primer día de descanso y exploración local",
    description:
      "Mañana libre para nadar, recuperar el jet lag o pasear por la zona. Por la tarde, visita guiada al club Bali Padel Academy para ver dónde vamos a jugar las próximas dos semanas. Café con el dueño del club y los coaches locales.",
    tags: ["padel", "social", "libre"],
    photo: "/photos/bali/club-bali/1.jpg",
    highlights: ["Villa y piscina", "Visita BPA", "Conoces a los coaches"],
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
    highlights: ["Partidos BPA", "Templo de Uluwatu", "Danza kecak al atardecer"],
  },
  {
    day: 4,
    weekday: "Martes",
    title: "Clase con coach + Tanah Lot",
    subtitle: "Técnica de pádel y el templo sobre la roca",
    description:
      "Por la mañana, clase semanal con coach del club: trabajamos posicionamiento, salida de pared y juego en pareja. Por la tarde, traslado a Tanah Lot — el templo sobre la roca volcánica que el océano rodea con la marea alta. Atardecer y café en la costa.",
    tags: ["padel", "cultura"],
    photo: "/photos/bali/tanah-lot/1.jpg",
    highlights: ["Clase técnica", "Tanah Lot", "Café con vistas"],
  },
  {
    day: 5,
    weekday: "Miércoles",
    title: "Día en Ubud",
    subtitle: "Corazón cultural de la isla",
    description:
      "Día completo en Ubud, el corazón cultural y espiritual de Bali. Terrazas de arroz de Tegallalang al amanecer, Palacio Real, templo de purificación Tirta Empul y Mercado de Arte Tradicional para los souvenirs. Comida en warung local con vistas a la jungla.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/ubud/1.jpg",
    highlights: ["Terrazas Tegallalang", "Palacio Real", "Templo Tirta Empul", "Mercado de Arte"],
  },
  {
    day: 6,
    weekday: "Jueves",
    title: "Partidos del grupo",
    subtitle: "Americana y cenas en Seminyak",
    description:
      "Mañana de partidos en BPA: vamos rotando para que cada uno juegue con todos los del grupo. Por la noche, cenas en chiringuitos de Seminyak con los pies en la arena — varios planes propuestos, vas con quien quieras.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/1.jpg",
    highlights: ["Partidos rotativos", "Cenas en Seminyak", "Free time noche"],
  },
  {
    day: 7,
    weekday: "Viernes",
    title: "Surf en Canggu",
    subtitle: "Olas amables para empezar",
    description:
      "Día de surf en Canggu con monitores locales. Playas con olas suaves para los que empiezan, y olas serias para quien ya lo controla. Tablas y trajes incluidos. Quien no quiera surfear, queda con el coordinador en chiringuito.",
    tags: ["playa", "naturaleza"],
    photo: "/photos/bali/surf/1.jpg",
    highlights: ["Surf con monitor", "Material incluido", "Plan B chiringuito"],
  },
  {
    day: 8,
    weekday: "Sábado",
    title: "Día libre",
    subtitle: "Tu Bali, a tu ritmo",
    description:
      "Día sin agenda. El coordinador propone planes: spa, masajes locales, otra ronda de partidos en BPA, scooter por la costa, mercado nocturno. Tú decides. Cena del grupo en restaurante con música en vivo, si te apetece.",
    tags: ["libre", "social"],
    photo: "/photos/bali/entrenos/1.jpg",
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
    photo: "/photos/bali/plantacion-cafe/1.jpg",
    highlights: ["Cata de cafés y tés", "Templo Taman Ayun", "Jardines reales"],
  },
  {
    day: 10,
    weekday: "Lunes",
    title: "Ubud Norte — cascadas y jungla",
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
    subtitle: "Pulir antes del torneo del grupo",
    description:
      "Última clase semanal con coach del club. Repasamos lo aprendido, ajustamos parejas para el torneo de mañana y trabajamos detalles tácticos. Tarde libre o piscina. Cena ligera, mañana hay torneo.",
    tags: ["padel"],
    photo: "/photos/bali/entrenos/2.jpg",
    highlights: ["Clase técnica final", "Formación parejas torneo", "Recuperación"],
  },
  {
    day: 13,
    weekday: "Jueves",
    title: "Torneo del grupo",
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
    photo: "/photos/home/hero.jpg",
    highlights: ["Traslados aeropuerto", "Opción alargar viaje", "Recuerdos para llevar"],
  },
];

const baliHighlights = [
  { icon: "🎾", title: "Pádel en BPA", text: "Club Bali Padel Academy: pistas premium, comunidad local, coaches con nivel." },
  { icon: "🏝", title: "12 actividades incluidas", text: "Templos, mercados, cascadas, surf, snorkel, café, danza tradicional." },
  { icon: "🍜", title: "Cultura real, no postal", text: "Vamos a los sitios donde van los locales, no donde van los turistas." },
  { icon: "🧭", title: "Coordinador español", text: "Una persona del equipo PT viaja con vosotros las 2 semanas." },
];

export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    status: "open",
    shortPitch: "14 días en Indonesia — pádel, cultura, surf y aventura.",
    description:
      "Nuestro destino fundacional. Llevamos años llevando grupos a Bali y conocemos la isla como si fuera nuestra casa. Pádel en el club BPA, 11 experiencias en la isla, alojamiento privado y coordinador español acompañando el viaje completo.",
    hero: "/photos/bali/uluwatu/1.jpg",
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
    weather: "26–32°C todo el año. Estación seca abril–octubre (mejor para viajar). Humedad alta pero llevable.",
    gettingThere: "Vuelos desde Madrid/Barcelona vía Dubái, Doha o Singapur. 16–20h totales. El coordinador te aconseja franja ideal de llegada.",
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
    hero: "/photos/bali/amed/1.jpg",
    heroAlt: "Aguas turquesas del este de Bali (referencia visual Filipinas)",
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
