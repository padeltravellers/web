// Padel Travellers — copy oficial + datos producto
// Fuente: Web Text Google Doc + brandbook + memoria operativa
// NUNCA inventar: 54 viajeros totales, NO "150+"

export const brand = {
  name: "Padel Travellers",
  tagline: "Viajes de pádel a Bali. Premium, en grupo, con coordinador español.",
  primaryGreen: "#0E3B2D",
  cream: "#F5EFE6",
};

export const hero = {
  kicker: "Bali · 14 días · 8–12 personas",
  title: "Donde el pádel se vuelve viaje.",
  subtitle:
    "Catorce días en Bali con un grupo afín. Pádel real, alojamiento premium con desayuno, cultura, surf, aventura y una persona del equipo PT contigo de principio a fin.",
  ctaPrimary: { label: "Solicitar plaza (500€)", href: "#reservar" },
  ctaSecondary: { label: "Ver fechas 2026", href: "#fechas" },
};

export const valuePillars = [
  {
    icon: "🎾",
    title: "Pádel auténtico",
    text:
      "Dos días de partidos a la semana en BPA, una clase semanal con coach local y un torneo el fin de semana. Sin overdose: pádel cuando apetece, descanso cuando toca.",
  },
  {
    icon: "🏡",
    title: "Habitación privada con desayuno",
    text:
      "Nunca compartirás con desconocidos. Máximo dos personas por habitación si vais juntos. Desayuno incluido cada mañana.",
  },
  {
    icon: "🧭",
    title: "Coordinador PT español",
    text:
      "Una persona del equipo Padel Travellers viaja contigo todo el viaje. No es \"guía local\": es alguien que conoce el grupo, los sitios y resuelve cualquier cosa.",
  },
  {
    icon: "🌴",
    title: "Todo incluido (sin bote común)",
    text:
      "Alojamiento, pádel, actividades, entradas, transporte interno y el coordinador. Solo te ocupas de tus vuelos y comidas, desde tu origen.",
  },
];

export const trips2026 = [
  { n: 1, range: "21 jun – 5 jul", month: "Junio" },
  { n: 2, range: "5 – 19 jul", month: "Julio" },
  { n: 3, range: "19 jul – 2 ago", month: "Julio" },
  { n: 4, range: "2 – 16 ago", month: "Agosto" },
  { n: 5, range: "16 – 30 ago", month: "Agosto", featured: "🔥 Buen grupo formándose" },
  { n: 6, range: "30 ago – 13 sep", month: "Septiembre", featured: "🔥 Buen grupo formándose" },
  { n: 7, range: "13 – 27 sep", month: "Septiembre" },
  { n: 8, range: "27 sep – 11 oct", month: "Octubre" },
];

export const baliExperiences = [
  {
    slug: "club-bali",
    title: "Bali Padel Academy",
    short: "Tu pista durante 14 días",
    text:
      "Club oficial del viaje. Pistas premium, comunidad local que ya nos conoce, ambiente joven. Aquí jugamos los partidos, las clases y el torneo.",
    photos: ["/photos/bali/club-bali/1.jpg", "/photos/bali/club-bali/2.jpg"],
  },
  {
    slug: "partidos",
    title: "Partidos del grupo",
    short: "Tu nivel encuentra el suyo",
    text:
      "Hacemos americana, formamos parejas rotando y montamos el torneo del fin de semana. Da igual si vienes con tu pareja habitual o si vienes solo: aquí siempre se juega.",
    photos: ["/photos/bali/partidos/1.jpg", "/photos/bali/partidos/2.jpg"],
  },
  {
    slug: "ubud",
    title: "Ubud — corazón cultural",
    short: "Templos, mercado y arrozales",
    text:
      "Las terrazas de arroz de Tegallalang, el Palacio Real, el templo de purificación y el Mercado de Arte. Día completo con calma para los que quieren sentir Bali más allá de la playa.",
    photos: ["/photos/bali/ubud/1.jpg", "/photos/bali/ubud/2.jpg", "/photos/bali/ubud/3.jpg"],
  },
  {
    slug: "uluwatu",
    title: "Uluwatu — acantilados al sur",
    short: "Templo en el borde del mar",
    text:
      "Atardecer en el templo de Uluwatu, espectáculo de danza kecak con el océano de fondo y cena en chiringuito de pies en la arena. Una de las tardes que más recordarás.",
    photos: ["/photos/bali/uluwatu/1.jpg", "/photos/bali/uluwatu/2.jpg"],
  },
  {
    slug: "tanah-lot",
    title: "Tanah Lot",
    short: "El templo sobre la roca",
    text:
      "Tanah Lot al atardecer es de esas postales que crees haber visto mil veces y aun así te quedas sin palabras. Visita guiada y café cerca de la costa.",
    photos: ["/photos/bali/tanah-lot/1.jpg", "/photos/bali/tanah-lot/2.jpg"],
  },
  {
    slug: "taman-ayun",
    title: "Taman Ayun",
    short: "El templo real entre jardines",
    text:
      "Templo real balinés rodeado de un canal y jardines impecables. Parada tranquila, perfecta para hacer foto y respirar.",
    photos: ["/photos/bali/taman-ayun/1.jpg", "/photos/bali/taman-ayun/2.jpg"],
  },
  {
    slug: "ubud-norte",
    title: "Ubud Norte — naturaleza pura",
    short: "Cascadas y junglas escondidas",
    text:
      "Salimos un día entero a la parte norte: cascadas, ríos y jungla que no aparece en los itinerarios estándar. Plan duro y bonito.",
    photos: ["/photos/bali/ubud-norte/1.jpg", "/photos/bali/ubud-norte/2.jpg"],
  },
  {
    slug: "amed",
    title: "Amed — buceo y mar tranquilo",
    short: "Otra cara de Bali, sin masas",
    text:
      "Costa este, mar calmo, snorkel sobre el U.S.A.T. Liberty, pueblo de pescadores. Para los que quieren parar el reloj.",
    photos: ["/photos/bali/amed/1.jpg", "/photos/bali/amed/2.jpg"],
  },
  {
    slug: "cafe",
    title: "Plantación de café",
    short: "Luwak, té y vistas",
    text:
      "Visita a una plantación tradicional con cata de cafés y tés locales. Pequeña, sin masas turísticas, justo lo que toca tras una mañana de pádel.",
    photos: ["/photos/bali/plantacion-cafe/1.jpg", "/photos/bali/plantacion-cafe/2.jpg"],
  },
  {
    slug: "surf",
    title: "Surf",
    short: "Olas para todos los niveles",
    text:
      "Día opcional de surf con monitores locales. Playas del sur con olas amables para empezar, y olas serias para quienes ya lo controlan.",
    photos: ["/photos/bali/surf/1.jpg", "/photos/bali/surf/2.jpg"],
  },
  {
    slug: "entrenos",
    title: "Entrenamiento y clases",
    short: "Una clase a la semana",
    text:
      "Una clase semanal con un coach del club. Trabajamos técnica, posicionamiento y juego en pareja. Sin presión: el ritmo lo pones tú.",
    photos: ["/photos/bali/entrenos/1.jpg", "/photos/bali/entrenos/2.jpg"],
  },
];

export const included = [
  "Alojamiento en el hotel del pack seleccionado durante 14 noches",
  "Todos los desayunos",
  "2 h semanales de clases de pádel + torneo internacional o partidos",
  "4 partidos del grupo de 1,5 h",
  "Traslados aeropuerto – hotel – aeropuerto",
  "Traslados días de pádel: hotel ↔ Bali Padel Academy",
  "Traslados hasta el final de cada actividad diaria",
  "Todas las actividades y entradas del pack",
  "Acompañamiento personal Padel Travellers durante todas las actividades",
];

export const notIncluded = [
  "Vuelos ida y vuelta",
  "Comidas, cenas y consumiciones",
  "Seguro de viaje (obligatorio)",
  "Visado de Indonesia (30€)",
  "Todo lo que no se mencione en «Incluye»",
];

export const pricing = {
  base: "1.725€",
  baseNote: "por persona si vais 2 compartiendo habitación",
  solo: "1.975€",
  soloNote: "si viajas en solitario (suplemento individual 250€)",
  deposit: "500€",
  depositNote: "reserva. El resto se paga en dos plazos (1.000€ al confirmar el grupo, resto 30 días antes del viaje).",
};

export const faqs = [
  {
    q: "¿Hace falta un nivel concreto de pádel?",
    a: "No. Tenemos viajeros desde nivel 2 hasta nivel 5. Formamos parejas rotando para que siempre juegues con gente de tu nivel y al final de la semana ya os conocéis todos.",
  },
  {
    q: "Vengo sola/o, ¿es raro?",
    a: "Más de la mitad del grupo viene en solitario. Es justo la mejor forma de hacer el viaje: conoces a todo el grupo a saco. El coordinador hace que nadie se sienta perdido.",
  },
  {
    q: "¿Qué pasa con los vuelos?",
    a: "Cada persona sale desde su origen. Te decimos la ventana ideal de llegada y salida, y compras tú directamente. Así te flexibilizas: muchos aprovechan para alargar o juntarlo con otro destino.",
  },
  {
    q: "¿Cómo es el alojamiento?",
    a: "Villas o hoteles boutique con piscina y desayuno. Habitación privada siempre. Si venís en pareja o grupo cerrado, compartís entre vosotros; si vienes solo, habitación individual.",
  },
  {
    q: "¿Y la comida y cena?",
    a: "Libres. Bali tiene una escena de comida brutal y barata. El coordinador propone planes cada noche y vas con quien quieras. Cenamos juntos cuando hay actividad nocturna programada.",
  },
  {
    q: "¿Cuánto se paga para reservar?",
    a: "500€ y plaza confirmada. El resto se abona antes del viaje. Si surge un imprevisto serio antes de cierta fecha, hay política de cancelación clara.",
  },
  {
    q: "¿Quién organiza esto?",
    a: "Padel Travellers, equipo afincado en España con base operativa en Bali. Llevamos 54 viajeros con nosotros y cada viaje nos cuentan lo mismo: \"se ha pasado volando\".",
  },
];

export const reviews = [
  {
    name: "Pau M.",
    quote:
      "Vine a jugar pádel y volví con un grupo de amigos para toda la vida. El equipo PT lo borda en lo pequeño: que no falte nada, que cada día cuadre.",
    trip: "Bali · agosto 2025",
  },
  {
    name: "Sara R.",
    quote:
      "Iba con miedo de ir sola. A los dos días ya era imposible imaginarse el viaje sin el resto. La pista, los templos, el café, Uluwatu… todo cuadra.",
    trip: "Bali · julio 2025",
  },
  {
    name: "Iker L.",
    quote:
      "El nivel de pádel sorprende. No es \"viaje de jugar a peloteo\": se compite, se aprende. Pero también se desconecta. Está bien medido.",
    trip: "Bali · septiembre 2025",
  },
  {
    name: "Adria V.",
    quote:
      "Volvería mañana mismo. El coordinador hace que no te tengas que preocupar de nada. Llegas al aeropuerto y desconectas hasta el día que vuelves.",
    trip: "Bali · julio 2025",
  },
];

export const stats = [
  { value: "54", label: "viajeros con nosotros" },
  { value: "14", label: "días por viaje" },
  { value: "8–12", label: "personas por grupo" },
  { value: "8", label: "salidas en 2026" },
];

export const contact = {
  whatsapp: "+34 614 47 60 68",
  whatsappLink: "https://wa.me/34614476068",
  email: "info@padeltravellers.com",
  instagram: "https://instagram.com/padeltravellers",
};
