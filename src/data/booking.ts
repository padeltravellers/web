// Datos de la reserva online Bali 2027.
// Fechas en ISO para calcular plazos (pago final = 30 días antes del inicio).

export type Departure = {
  n: number;
  start: string; // YYYY-MM-DD
  end: string;
  range: string;
  month: string;
  photo: string;
};

export const departures2027: Departure[] = [
  { n: 1, start: "2027-06-20", end: "2027-07-03", range: "20 junio – 3 julio", month: "Junio", photo: "/photos/bali/club-bali/1.jpg" },
  { n: 2, start: "2027-07-04", end: "2027-07-17", range: "4 – 17 julio", month: "Julio", photo: "/photos/bali/ubud/1.jpg" },
  { n: 3, start: "2027-07-18", end: "2027-07-31", range: "18 – 31 julio", month: "Julio", photo: "/photos/bali/uluwatu/1.jpg" },
  { n: 4, start: "2027-08-01", end: "2027-08-14", range: "1 – 14 agosto", month: "Agosto", photo: "/photos/bali/amed/1.jpg" },
  { n: 5, start: "2027-08-15", end: "2027-08-28", range: "15 – 28 agosto", month: "Agosto", photo: "/photos/bali/tanah-lot/1.jpg" },
  { n: 6, start: "2027-08-29", end: "2027-09-11", range: "29 agosto – 11 septiembre", month: "Septiembre", photo: "/photos/bali/ubud-norte/1.jpg" },
  { n: 7, start: "2027-09-12", end: "2027-09-25", range: "12 – 25 septiembre", month: "Septiembre", photo: "/photos/bali/surf/1.jpg" },
  { n: 8, start: "2027-09-25", end: "2027-10-09", range: "25 septiembre – 9 octubre", month: "Octubre", photo: "/photos/bali/partidos/1.jpg" },
];

export const rooms = {
  compartida: {
    label: "Habitación compartida",
    price: 1490,
    note: "Compartes con la persona con la que viajas. Nunca con desconocidos.",
  },
  individual: {
    label: "Habitación individual",
    price: 1690,
    note: "Tu propia habitación privada. Suplemento de 200 €.",
  },
} as const;

export type RoomKey = keyof typeof rooms;

export const DEPOSIT = 100;
export const SECOND_PAYMENT = 1000;
export const FINAL_DAYS_BEFORE = 30;

export const padelLevels = [
  "Empiezo ahora",
  "Nivel 2 · juego de vez en cuando",
  "Nivel 3 · juego habitualmente",
  "Nivel 4 · nivel medio-alto",
  "Nivel 5 o más · compito",
];

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function finalPaymentDate(startISO: string): string {
  const d = new Date(startISO + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - FINAL_DAYS_BEFORE);
  return `${d.getUTCDate()} de ${MONTHS[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

export function eur(n: number): string {
  // es-ES no agrupa números de 4 cifras ("1490"); la marca usa "1.490 €".
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
}
