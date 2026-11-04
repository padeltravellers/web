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

// ---------- Formulario de viajeros ----------

export const phonePrefixes: { code: string; label: string }[] = [
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+351", label: "🇵🇹 +351" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+353", label: "🇮🇪 +353" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+32", label: "🇧🇪 +32" },
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+376", label: "🇦🇩 +376" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+52", label: "🇲🇽 +52" },
  { code: "+54", label: "🇦🇷 +54" },
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+56", label: "🇨🇱 +56" },
  { code: "+57", label: "🇨🇴 +57" },
  { code: "+51", label: "🇵🇪 +51" },
  { code: "+58", label: "🇻🇪 +58" },
  { code: "+598", label: "🇺🇾 +598" },
  { code: "+595", label: "🇵🇾 +595" },
  { code: "+593", label: "🇪🇨 +593" },
  { code: "+62", label: "🇮🇩 +62" },
  { code: "+61", label: "🇦🇺 +61" },
];

export const nationalities = [
  "Española", "Portuguesa", "Francesa", "Italiana", "Alemana", "Británica", "Irlandesa", "Neerlandesa", "Belga", "Suiza",
  "Andorrana", "Estadounidense", "Mexicana", "Argentina", "Brasileña", "Chilena", "Colombiana", "Peruana", "Venezolana",
  "Uruguaya", "Paraguaya", "Ecuatoriana",
];

const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

/** Valida DNI/NIE españoles (con letra de control) o un pasaporte genérico. Devuelve un mensaje de error o "". */
export function docError(tipo: string, raw: string): string {
  const v = raw.replace(/[\s-]/g, "").toUpperCase();
  if (!v) return "Obligatorio";
  if (tipo === "DNI") {
    if (!/^\d{8}[A-Z]$/.test(v)) return "8 números y una letra, p. ej. 12345678Z";
    return DNI_LETTERS[Number(v.slice(0, 8)) % 23] === v[8] ? "" : "La letra no corresponde a ese número";
  }
  if (tipo === "NIE") {
    if (!/^[XYZ]\d{7}[A-Z]$/.test(v)) return "Formato X1234567L";
    const n = Number("XYZ".indexOf(v[0]) + v.slice(1, 8));
    return DNI_LETTERS[n % 23] === v[8] ? "" : "La letra no corresponde a ese número";
  }
  return /^[A-Z0-9]{6,12}$/.test(v) ? "" : "Entre 6 y 12 letras o números";
}

/** Edad en años cumplidos en la fecha `on` (por defecto hoy). */
export function ageOn(birthISO: string, on = new Date()): number {
  const b = new Date(birthISO + "T12:00:00");
  if (isNaN(b.getTime())) return -1;
  let a = on.getFullYear() - b.getFullYear();
  const m = on.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && on.getDate() < b.getDate())) a--;
  return a;
}

export function maxBirthDateISO(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
}
