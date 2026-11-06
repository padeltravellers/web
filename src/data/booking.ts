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
  "0 - Iniciación",
  "1 - Bajo",
  "2 - Intermedio",
  "3 - Medio",
  "4 - Avanzado",
  "5 - Competitivo",
  "6 - Pro",
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

export type Country = { name: string; iso: string; code: string };

/** Prefijos telefónicos (España primero). La bandera se calcula a partir del código ISO. */
export const countries: Country[] = [
  { name: "España", iso: "ES", code: "+34" },
  { name: "Portugal", iso: "PT", code: "+351" },
  { name: "Francia", iso: "FR", code: "+33" },
  { name: "Italia", iso: "IT", code: "+39" },
  { name: "Alemania", iso: "DE", code: "+49" },
  { name: "Reino Unido", iso: "GB", code: "+44" },
  { name: "Irlanda", iso: "IE", code: "+353" },
  { name: "Países Bajos", iso: "NL", code: "+31" },
  { name: "Bélgica", iso: "BE", code: "+32" },
  { name: "Suiza", iso: "CH", code: "+41" },
  { name: "Austria", iso: "AT", code: "+43" },
  { name: "Andorra", iso: "AD", code: "+376" },
  { name: "Mónaco", iso: "MC", code: "+377" },
  { name: "Luxemburgo", iso: "LU", code: "+352" },
  { name: "Dinamarca", iso: "DK", code: "+45" },
  { name: "Suecia", iso: "SE", code: "+46" },
  { name: "Noruega", iso: "NO", code: "+47" },
  { name: "Finlandia", iso: "FI", code: "+358" },
  { name: "Polonia", iso: "PL", code: "+48" },
  { name: "Chequia", iso: "CZ", code: "+420" },
  { name: "Grecia", iso: "GR", code: "+30" },
  { name: "Rumanía", iso: "RO", code: "+40" },
  { name: "Estados Unidos", iso: "US", code: "+1" },
  { name: "Canadá", iso: "CA", code: "+1" },
  { name: "México", iso: "MX", code: "+52" },
  { name: "Argentina", iso: "AR", code: "+54" },
  { name: "Brasil", iso: "BR", code: "+55" },
  { name: "Chile", iso: "CL", code: "+56" },
  { name: "Colombia", iso: "CO", code: "+57" },
  { name: "Perú", iso: "PE", code: "+51" },
  { name: "Venezuela", iso: "VE", code: "+58" },
  { name: "Uruguay", iso: "UY", code: "+598" },
  { name: "Paraguay", iso: "PY", code: "+595" },
  { name: "Ecuador", iso: "EC", code: "+593" },
  { name: "Bolivia", iso: "BO", code: "+591" },
  { name: "Costa Rica", iso: "CR", code: "+506" },
  { name: "Panamá", iso: "PA", code: "+507" },
  { name: "República Dominicana", iso: "DO", code: "+1" },
  { name: "Puerto Rico", iso: "PR", code: "+1" },
  { name: "Cuba", iso: "CU", code: "+53" },
  { name: "Marruecos", iso: "MA", code: "+212" },
  { name: "Israel", iso: "IL", code: "+972" },
  { name: "Emiratos Árabes Unidos", iso: "AE", code: "+971" },
  { name: "Indonesia", iso: "ID", code: "+62" },
  { name: "Filipinas", iso: "PH", code: "+63" },
  { name: "Singapur", iso: "SG", code: "+65" },
  { name: "Tailandia", iso: "TH", code: "+66" },
  { name: "Australia", iso: "AU", code: "+61" },
  { name: "Nueva Zelanda", iso: "NZ", code: "+64" },
  { name: "Sudáfrica", iso: "ZA", code: "+27" },
];

export function flag(iso: string): string {
  return iso.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

/** Nacionalidad = país (todos los del mundo). Los más habituales primero; el resto, por orden alfabético. */
export const nationalitiesTop = [
  "España", "Portugal", "Francia", "Italia", "Andorra", "Alemania", "Reino Unido", "Países Bajos", "Bélgica",
  "Suiza", "Estados Unidos", "México", "Argentina",
];

export const nationalitiesAll = [
  "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudí", "Argelia",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin",
  "Bélgica", "Belice", "Benín", "Bielorrusia", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi",
  "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad",
  "Chequia", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Congo", "Corea del Norte",
  "Corea del Sur", "Costa Rica", "Côte d’Ivoire", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto",
  "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos",
  "Estonia", "Esuatini", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia",
  "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea Ecuatorial", "Guinea-Bisáu", "Guyana", "Haití",
  "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Israel",
  "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kosovo", "Kuwait",
  "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo",
  "Macedonia del Norte", "Madagascar", "Malasia", "Malaui", "Maldivas", "Mali", "Malta", "Marruecos", "Mauricio",
  "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique",
  "Myanmar (Birmania)", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda",
  "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia",
  "Portugal", "Puerto Rico", "RAE de Hong Kong (China)", "RAE de Macao (China)", "Reino Unido",
  "República Centroafricana", "República Democrática del Congo", "República Dominicana", "Ruanda", "Rumanía",
  "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía",
  "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia",
  "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Taiwán",
  "Tanzania", "Tayikistán", "Territorios Palestinos", "Timor-Leste", "Togo", "Tonga", "Trinidad y Tobago", "Túnez",
  "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela",
  "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue",
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
