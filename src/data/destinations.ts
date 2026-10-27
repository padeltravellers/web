// Padel Travellers — Datos por destino
// Fotos: catálogo Drive PT (Fotos web + Bali Oriol). 106 fotos disponibles.

import { trips2027 as bali2026, faqs, included, notIncluded } from "./content";

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
  cardTagline: string;   // línea corta para la tarjeta de "Nuestros destinos" (home)
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
    slug: "partidos",
    title: "Partidos y americanas",
    short: "4 partidos de 1,5 h con el grupo",
    text:
      "Cuatro partidos de hora y media entre los miembros del grupo. Montamos americanas y rotamos parejas por niveles, para que siempre juegues con gente de tu nivel — y al final del viaje os conocéis todos. Da igual si vienes con tu pareja habitual o si vienes solo: aquí siempre se juega.",
    photos: [
      "/photos/bali/partidos/1.jpg",
      "/photos/bali/partidos/2.jpg",
      "/photos/extra/padel-action/1.jpg",
    ],
    group: "padel",
  },
  {
    slug: "clases",
    title: "Clases con coaches NOX",
    short: "2 h semanales de clase",
    text:
      "Entrenamientos en grupo con coaches profesionales de NOX Academy: dos horas semanales para trabajar técnica, posicionamiento y juego en pareja. Sin presión — el ritmo lo pones tú, desde nivel iniciación hasta avanzado.",
    photos: [
      "/photos/bali/entrenos/1.jpg",
      "/photos/extra/bpa/1.jpg",
      "/photos/extra/padel-action/2.jpg",
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

// === BALI ITINERARY — 14 días (13 noches) PT 2027 ===
const baliItinerary: ItineraryDay[] = [
  {
    day: 0,
    weekday: "Día 0",
    title: "Llegada a Bali",
    subtitle: "Aeropuerto, traslado al hotel y bienvenida",
    description:
      "**¡Bienvenido a Bali!**\n\nAterrizas en el aeropuerto de Denpasar y te recogemos con **transporte privado incluido** para llevarte al hotel en **Canggu**, tu hogar durante todo el viaje. Los vuelos no están incluidos, así que eliges con total libertad horario, aerolínea y aeropuerto de salida.\n\nTarde para deshacer maletas, refrescarte y adaptarte al cambio horario. Después, **bienvenida con el grupo y presentación del coordinador**.\n\n**¡Que empiece la aventura!**",
    tags: ["social", "libre"],
    photo: "/photos/villa/1.jpg",
    highlights: [],
  },
  {
    day: 1,
    weekday: "Día 1",
    title: "Partido de pádel + Tanah Lot",
    subtitle: "Introducción al viaje, primer partido en BPA y templo del atardecer",
    description:
      "**Primer día y primer partido.**\n\nPor la mañana, introducción al viaje y traslado a **Bali Padel Academy** para el **primer partido por niveles**: conoces el club, las pistas y al grupo. Comemos en **Bandeja**, el restaurante del club.\n\nPor la tarde, **Tanah Lot**, «Tierra en el Mar» en balinés: un templo alzado sobre una gran roca rodeada por el océano que, con marea alta, parece flotar sobre las olas.\n\n**Atardecer con el templo en silueta**, uno de los lugares más fotografiados de Bali.",
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
      "**Un día entero en el corazón cultural de Bali.**\n\nEmpezamos en uno de los **templos más sagrados** de la isla, donde quien quiera puede vivir el **ritual balinés de purificación** sumergiéndose en las aguas que brotan de sus fuentes naturales.\n\nDespués, las **terrazas de arroz de Tegallalang**, uno de los paisajes más icónicos de Bali, y el **Palacio Real de Ubud**, hogar histórico de la familia real.\n\nCerramos con tiempo libre en el **Mercado de Arte Tradicional** («Pasar Seni Ubud») para llevarte algún recuerdo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/extra/arrozales/1.jpg",
    highlights: [],
  },
  {
    day: 3,
    weekday: "Día 3",
    title: "Clase de pádel + surf",
    subtitle: "Mañana en BPA, tarde en las olas de Canggu",
    description:
      "**Pádel por la mañana, olas por la tarde.**\n\nPrimera **clase de pádel en BPA** con los coaches de NOX para trabajar técnica y posicionamiento. Descanso y comida en el club.\n\nPor la tarde, **clase de surf en Canggu**, una de las mejores playas del mundo para iniciarse: **2 horas con instructor** que adapta la sesión a tu nivel, con **tabla y traje incluidos**.\n\n**Terminamos en la misma playa viendo la puesta de sol.**",
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
      "**Acantilados, playas de arena blanca y uno de los mejores atardeceres de la isla.**\n\nBajamos al sur de Bali. Mañana de playa con **baño en aguas cristalinas** y comida en la zona de acantilados, viendo a los **mejores surfistas** desafiar las olas.\n\nPor la tarde, paseo por el **templo de Pura Luhur Uluwatu**, en lo alto del acantilado y con vistas espectaculares al océano Índico.\n\nDe vuelta a Canggu, última parada en una playa cercana para disfrutar de **uno de los atardeceres más impresionantes de Bali**.",
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
      "**Pádel por la mañana y tarde a tu ritmo.**\n\n**Partido por niveles en BPA**, descanso y comida en el club.\n\nLa tarde es tuya: **spa balinés, yoga, otra ronda de surf, beach club** frente al mar o **pádel libre** con jugadores internacionales del club.\n\nEl coordinador te recomienda planes según lo que te apetezca.",
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
      "**Excursión a Nusa Penida, la isla de las postales.**\n\nSalimos temprano en **ferry desde el puerto de Sanur**. Al llegar, un **conductor local** nos lleva por los rincones más bonitos de la isla.\n\n**Angel's Billabong**, una piscina natural de agua turquesa entre acantilados. **Broken Beach**, una bahía con un espectacular arco de roca abierto al océano. **Kelingking Beach**, la playa más fotografiada de Instagram, con su acantilado en forma de dinosaurio. Y **Crystal Bay**, para nadar, hacer snorkel o simplemente relajarte.\n\n**A las 17:00 h, ferry de vuelta a Bali.**",
    tags: ["playa", "naturaleza"],
    photo: "/photos/nusa-penida/1.jpg",
    highlights: [],
  },
  {
    day: 7,
    weekday: "Día 7",
    title: "Día libre — tú eliges",
    subtitle: "Domingo libre: Nusa Penida o quads + Cretya",
    description:
      "**Domingo libre: tú eliges el plan.**\n\nPuedes **alargar Nusa Penida** un segundo día o apuntarte a la aventura en **quad por los arrozales de Ubud** y rematar en las **piscinas infinitas de Cretya**.\n\nY si prefieres ir a tu aire, Bali tiene mil planes: **playa, spa balinés, surf, beach club** o pádel libre en el club.\n\nEl coordinador te ayuda con lo que elijas.",
    tags: ["libre", "naturaleza"],
    photo: "/photos/extra/la-brisa/2.jpg",
    highlights: [],
  },
  {
    day: 8,
    weekday: "Día 8",
    title: "Partido de pádel + Taman Ayun + Coffee Plantation",
    subtitle: "Mañana en BPA, tarde cultural",
    description:
      "**Pádel, templo real y café balinés.**\n\nPor la mañana, **partido en BPA** con el grupo y comida en el club.\n\nPor la tarde, el **templo de Taman Ayun**, construido en el siglo XVII por la dinastía real de Mengwi y **Patrimonio de la Humanidad por la UNESCO**, rodeado de jardines y canales que crean un ambiente sereno.\n\nTerminamos en una **plantación tradicional de café**: descubres el proceso del famoso **café Luwak** y haces una **cata de cafés y tés balineses** con vistas a los campos.",
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
      "**Templos, cascadas y arrozales en el norte de Bali.**\n\nVisitamos **Pura Ulun Danu Bratan**, templo del siglo XVII dedicado a Dewi Danu, la diosa del agua, que **parece flotar sobre el lago** cuando sube el nivel del agua.\n\nDespués, caminata entre vegetación y puentes hasta una **cascada en Tabanan**, con **baño en la piscina natural** de su base.\n\nY para cerrar, los **arrozales de Jatiluwih**, Patrimonio de la Humanidad por la UNESCO, con su sistema de riego tradicional «subak» y el volcán Batukaru al fondo.",
    tags: ["cultura", "naturaleza"],
    photo: "/photos/bali/ubud-norte/1.jpg",
    highlights: [],
  },
  {
    day: 10,
    weekday: "Día 10",
    title: "Clase de pádel + tarde libre",
    subtitle: "Mañana en BPA, tarde a tu ritmo",
    description:
      "**Segunda clase de pádel y tarde de desconexión.**\n\n**Clase en BPA con los coaches**, descanso y comida en el club.\n\nTarde libre para lo que más te apetezca: **spa, masaje balinés, yoga**, scooter por la costa, mercados, cafés de especialidad o simplemente **piscina y desconexión**.",
    tags: ["padel", "libre"],
    photo: "/photos/extra/padel-action/2.jpg",
    highlights: [],
  },
  {
    day: 11,
    weekday: "Día 11",
    title: "Día en Amed",
    subtitle: "Puertas del Cielo + snorkel en Amed",
    description:
      "**Las Puertas del Cielo y snorkel en el este de Bali.**\n\nEmpezamos en **Pura Lempuyang**, uno de los templos más antiguos y sagrados de la isla, famoso por sus **«Puertas del Cielo»** con el **volcán Agung** enmarcado al fondo.\n\nRuta panorámica de miradores y llegada a **Amed**, pueblo costero de arena negra volcánica y ambiente relajado, donde hacemos **snorkel sobre los arrecifes de coral**.\n\nOpcional: **submarinismo** con centros locales (coste aparte y sujeto a disponibilidad).",
    tags: ["cultura", "playa", "naturaleza"],
    photo: "/photos/bali/amed/1.jpg",
    highlights: [],
  },
  {
    day: 12,
    weekday: "Día 12",
    title: "Último partido + cena de despedida",
    subtitle: "Cierre del viaje con el grupo",
    description:
      "**Último partido y cena de despedida.**\n\n**Cuarto y último partido en BPA** por niveles con tu pareja, comida en el club y tarde libre para descansar o aprovechar la isla.\n\nPor la noche, **cena de despedida del grupo** en un restaurante especial: brindis, fotos, recuerdos y el cierre de dos semanas inolvidables.",
    tags: ["padel", "social"],
    photo: "/photos/bali/partidos/1.jpg",
    highlights: [],
  },
  {
    day: 13,
    weekday: "Día 13",
    title: "Regreso",
    subtitle: "Hasta la próxima",
    description:
      "**Hasta la próxima, Bali.**\n\n**Traslado privado al aeropuerto** según el horario de tu vuelo de regreso. El coordinador organiza los traslados para que cada uno salga a su hora.\n\nMuchos aprovechan para **alargar la estancia** unos días o combinar Bali con otro destino. Si te quieres quedar más tiempo, **te ayudamos con cualquier reserva extra**.",
    tags: ["libre"],
    photo: "/photos/extra/atardecer/6.jpg",
    highlights: [],
  },
];

const baliHighlights = [
  { icon: "🎾", title: "Pádel en BPA", text: "Club Bali Padel Academy: pistas premium, comunidad local, coaches con nivel." },
  { icon: "🏝", title: "13 experiencias incluidas", text: "Templos, mercados, cascadas, surf, snorkel, café, danza tradicional, beach clubs." },
  { icon: "🍜", title: "Cultura real, no postal", text: "Vamos a los sitios donde van los locales, no donde van los turistas." },
  { icon: "🧭", title: "Coordinador local", text: "Un coordinador balinés que juega al pádel vive el viaje con el grupo. Y el equipo español PT, que también vive en Bali, de apoyo." },
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
    cardTagline: "Pádel, Cultura y Aventura",
    description:
      "Nuestro destino fundacional. Llevamos años llevando grupos a Bali y conocemos la isla como si fuera nuestra casa. Pádel en el club BPA, 13 experiencias en la isla, alojamiento privado y coordinador local acompañando el viaje completo.",
    hero: "/photos/extra/atardecer/1.jpg",
    heroAlt: "Acantilados de Uluwatu al atardecer",
    duration: "14 días",
    groupSize: "8–12 personas",
    basePrice: "1.525€",
    solo: "1.750€",
    deposit: "100€",
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
    slug: "indonesia",
    name: "Indonesia",
    status: "comingsoon",
    shortPitch: "Próximamente — Yogyakarta, Bromo, Lombok y Flores.",
    cardTagline: "Pádel · Yogyakarta · Bromo · Lombok · Flores",
    description:
      "El gran viaje por Indonesia, más allá de Bali. Yogyakarta y sus templos (Borobudur, Prambanan), el amanecer sobre el volcán Bromo, las playas y el pádel en Lombok, y la naturaleza salvaje de Flores (Komodo, lago Kelimutu). Pádel, aventura y cultura recorriendo varias islas. Lista de espera abierta.",
    hero: "/photos/extra/arrozales/1.jpg",
    heroAlt: "Paisajes de Indonesia",
    duration: "14 días",
    groupSize: "8–12 personas",
    basePrice: "Por confirmar",
    solo: "Por confirmar",
    deposit: "—",
    trips: [],
    highlights: [
      { icon: "🛕", title: "Yogyakarta", text: "Borobudur y Prambanan, los templos más impresionantes de Java." },
      { icon: "🌋", title: "Bromo", text: "Amanecer sobre el mar de nubes y el volcán más icónico de Indonesia." },
      { icon: "🎾", title: "Lombok", text: "Playas vírgenes, las Gili y pádel junto al mar." },
      { icon: "🦎", title: "Flores", text: "Komodo, el lago Kelimutu y naturaleza salvaje sin masas." },
    ],
    experiences: [],
    itinerary: [],
    gallery: ["/photos/extra/arrozales/1.jpg", "/photos/extra/arrozales/2.jpg"],
    faqs: [],
    included: [],
    notIncluded: [],
  },
  {
    slug: "filipinas",
    name: "Filipinas",
    status: "comingsoon",
    shortPitch: "1 salida 2027 — 25 jul a 7 ago · plazas limitadas.",
    cardTagline: "Pádel · Moalboal · Siargao · Bohol",
    description:
      "Una única salida en 2027: del 25 de julio al 7 de agosto, 13 días. Pádel + travesía por las islas: Moalboal, Siargao y Bohol. Buceo con sardinas y tortugas, surf, playas vírgenes, comida filipina y la calidez de la gente local. Plazas limitadas — lista de espera abierta.",
    hero: "/photos/filipinas/1.jpg",
    heroAlt: "Aguas turquesas de Filipinas",
    duration: "13 días",
    groupSize: "8–12 personas",
    basePrice: "Por confirmar",
    solo: "Por confirmar",
    deposit: "100€",
    trips: [{ n: 1, range: "25 jul – 7 ago", month: "Julio" }],
    highlights: [
      { icon: "🤿", title: "Moalboal", text: "El banco de sardinas y las tortugas, snorkel desde la orilla. De lo mejor del planeta." },
      { icon: "🏄", title: "Siargao", text: "La capital del surf de Filipinas: olas, lagunas y ambiente isleño." },
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
