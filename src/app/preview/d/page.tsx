import Link from "next/link";
import Img from "@/components/Img";
import { pricing, contact, reviews } from "@/data/content";

export const metadata = {
  title: "Padel Travellers · Propuesta D — Manifiesto (revolucionaria)",
};

// === Chapters ===
// Reusing PT content but rendered in a completely different paradigm:
// - Dark background, scrollytelling chapters
// - Brutalist typography (oversized type, monospace for "system" messages)
// - Chat-bubble snippets that imitate WhatsApp Marta
// - Horizontal timeline instead of accordion
// - Single CTA at the end; no nav, no header carousel, no card grid

const chapters = [
  { id: "01", title: "Mira la pantalla", line: "Imagínate dentro de 3 meses." },
  { id: "02", title: "Bali", line: "Esto no es un tour. Es la quincena que llevas años posponiendo." },
  { id: "03", title: "El plan", line: "14 noches. Una pista entre arrozales. Un grupo. Cero excusas." },
  { id: "04", title: "El precio", line: "Vuela tú. Lo demás está resuelto." },
  { id: "05", title: "¿Te vienes?", line: "No necesitamos un email largo. Solo tu número." },
];

const timeline = [
  { day: 0, label: "Aterrizas en Denpasar", img: "/photos/villa/1.jpg" },
  { day: 1, label: "Primera clase + atardecer en Tanah Lot", img: "/photos/bali/tanah-lot/1.jpg" },
  { day: 2, label: "Ubud. Ritual de purificación", img: "/photos/extra/arrozales/1.jpg" },
  { day: 3, label: "Partido + surf en Canggu", img: "/photos/extra/surf-extra/1.jpg" },
  { day: 4, label: "Uluwatu. Acantilados", img: "/photos/bali/uluwatu/1.jpg" },
  { day: 5, label: "Pádel + tarde libre", img: "/photos/extra/bpa/piscina-atardecer.jpg" },
  { day: 6, label: "Nusa Penida. Kelingking Beach", img: "/photos/nusa-penida/1.jpg" },
  { day: 7, label: "Puertas del Cielo + snorkel en Amed", img: "/photos/bali/amed/1.jpg" },
  { day: 8, label: "Pádel + Taman Ayun + café Luwak", img: "/photos/bali/cafe/1.jpg" },
  { day: 9, label: "Ubud Norte. Pura Ulun Danu y Jatiluwih", img: "/photos/bali/ubud-norte/1.jpg" },
  { day: 10, label: "Pádel + tarde libre", img: "/photos/extra/padel-action/2.jpg" },
  { day: 11, label: "Quad por arrozales + Cretya Ubud", img: "/photos/extra/arrozales/2.jpg" },
  { day: 12, label: "Preparación torneo", img: "/photos/bali/partidos/1.jpg" },
  { day: 13, label: "Torneo internacional + cena despedida", img: "/photos/bali/partidos/2.jpg" },
  { day: 14, label: "Vuelves siendo otro/a", img: "/photos/extra/arrozales/3.jpg" },
];

const features = [
  "Hotel privado · 14 noches · desayuno incluido",
  "Bali Padel Academy · 4h de clase + 4 partidos + torneo",
  "Excursión Nusa Penida · ferry incluido",
  "Excursión Bali Este · Puertas del Cielo",
  "Excursión Ubud Norte · cascada + Jatiluwih",
  "Día de quad por arrozales + club piscinas",
  "Coordinador de Padel Travellers contigo cada día",
  "Todos los traslados internos · vehículo privado",
];

const realChatSnippets = [
  { from: "marta", text: "Eo! Vi que dejaste tu número 👋" },
  { from: "marta", text: "Cuéntame, ¿cómo te ha dado por Bali?" },
  { from: "user",  text: "Es que llevo todo el año diciendo que tengo que desconectar" },
  { from: "user",  text: "Y un amigo me pasó vuestra cuenta" },
  { from: "marta", text: "Te entiendo. Mira, hay 8 salidas en 2026, ¿qué mes te encaja mejor?" },
  { from: "user",  text: "Septiembre podría" },
  { from: "marta", text: "Perfecto. Hay 2 viajes en septiembre. Te paso fechas y te llamo 5 min, ¿va?" },
];

export default function ProposalD() {
  return (
    <main className="min-h-screen bg-[#0A0F0C] text-[#F5EFE6] font-body selection:bg-[#B8543A] selection:text-white overflow-x-hidden">
      {/* Mono-style top status bar */}
      <div className="fixed top-0 inset-x-0 z-40 px-5 py-3 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-[#F5EFE6]/55 mix-blend-difference">
        <span>Padel Travellers · MMXXVI</span>
        <Link href="/preview" className="hover:text-[#F5EFE6]">← Vol a archivo</Link>
      </div>

      {/* Fixed sticky WhatsApp dot */}
      <a
        href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola! Me interesa el viaje a Bali")}`}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#B8543A] text-white flex items-center justify-center font-display font-bold text-2xl shadow-2xl shadow-[#B8543A]/40 hover:scale-110 transition"
        aria-label="WhatsApp"
      >
        ✦
      </a>

      {/* === CHAPTER 01: COLD OPEN — chat-style hero === */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Tiny chapter mark */}
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">{chapters[0].id} · {chapters[0].title}</span>

        <div className="max-w-3xl w-full">
          {/* Chat bubble */}
          <div className="flex justify-start mb-6">
            <div className="bg-[#1B5840]/40 backdrop-blur px-5 py-4 rounded-2xl rounded-bl-md max-w-md">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#5CFFB0] mb-1 block">Marta · ahora</span>
              <p className="text-base leading-relaxed">¿Y si paras 14 noches? ¿Pádel por la mañana, isla por la tarde?</p>
            </div>
          </div>

          <h1 className="font-display font-bold text-[14vw] md:text-[10vw] leading-[0.85] tracking-[-0.04em] mb-8">
            Bali.
            <br />
            <span className="text-[#B8543A]">No turismo.</span>
            <br />
            Pádel.
          </h1>

          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#F5EFE6]/55">
            ↓ desliza · 14 noches · 1 grupo
          </p>
        </div>
      </section>

      {/* === CHAPTER 02: MANIFESTO === */}
      <section className="min-h-screen flex items-center px-6 lg:px-20 py-24 relative">
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">{chapters[1].id} · {chapters[1].title}</span>

        <div className="max-w-5xl">
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] font-light tracking-tight">
            Esto no es un tour. <span className="text-[#F5EFE6]/40">Tampoco es un retiro.</span><br />
            Es <span className="text-[#B8543A] font-bold italic">la quincena</span> que llevas <br className="hidden md:block" />
            tres años <span className="line-through decoration-[#B8543A]/60 decoration-4">prometiéndote</span> posponiendo.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-3xl">
            <div>
              <div className="font-display font-bold text-7xl text-[#5CFFB0] mb-2">54</div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F5EFE6]/60">viajeros · 3 años</p>
            </div>
            <div>
              <div className="font-display font-bold text-7xl text-[#5CFFB0] mb-2">7</div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F5EFE6]/60">viajes ya · &gt;9/10</p>
            </div>
            <div>
              <div className="font-display font-bold text-7xl text-[#5CFFB0] mb-2">8</div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F5EFE6]/60">salidas 2026 · jun-oct</p>
            </div>
          </div>
        </div>
      </section>

      {/* === CHAPTER 03: TIMELINE (horizontal scroll) === */}
      <section className="min-h-screen flex flex-col justify-center py-24 relative">
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">{chapters[2].id} · {chapters[2].title}</span>

        <div className="px-6 lg:px-20 mb-12">
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] font-light tracking-tight max-w-4xl">
            14 noches. <br />
            <span className="text-[#F5EFE6]/40">15 días.</span> <span className="text-[#B8543A] font-bold italic">Ningún espacio en blanco.</span>
          </p>
        </div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto pb-8 px-6 lg:px-20 -mx-1">
          <ol className="inline-flex gap-1 min-w-full">
            {timeline.map((t) => (
              <li key={t.day} className="w-[260px] md:w-[320px] shrink-0 group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1B5840]/30">
                  <Img
                    src={t.img}
                    alt={t.label}
                    fill
                    sizes="320px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0C] via-[#0A0F0C]/30 to-transparent" />
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#5CFFB0]">
                    DÍA {String(t.day).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-lg leading-tight">{t.label}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="px-6 lg:px-20 mt-6 font-mono text-xs uppercase tracking-[0.32em] text-[#F5EFE6]/45">
          → desliza horizontal · grayscale activo · hover para color
        </p>
      </section>

      {/* === CHAPTER 04: FEATURES — typographic list === */}
      <section className="min-h-screen flex items-center px-6 lg:px-20 py-24 relative">
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">{chapters[3].id} · {chapters[3].title}</span>

        <div className="max-w-5xl w-full">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#5CFFB0] mb-8">// está todo dentro</p>

          <ul className="space-y-1 mb-16">
            {features.map((f, i) => (
              <li
                key={f}
                className="border-b border-[#F5EFE6]/15 py-5 flex items-baseline gap-6 font-display text-2xl md:text-3xl leading-snug hover:bg-[#F5EFE6]/5 transition-colors"
              >
                <span className="font-mono text-xs text-[#F5EFE6]/40 shrink-0 w-12">{String(i + 1).padStart(2, "0")}</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#B8543A]">// no incluye:</p>
          <p className="font-display text-2xl md:text-3xl leading-snug mt-2 text-[#F5EFE6]/55">
            Vuelos · seguro · visado · cenas a la carta.
            <br />
            Vuelas tú. Lo demás está resuelto.
          </p>
        </div>
      </section>

      {/* === CHAPTER 05: PRICE === */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 relative text-center">
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">04 · El precio</span>

        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#5CFFB0] mb-6">// precio total · sin asteriscos</p>
          <div className="font-display font-bold text-[18vw] md:text-[12vw] leading-none tracking-[-0.04em] text-[#F5EFE6]">
            {pricing.base}
          </div>
          <p className="font-display text-xl md:text-2xl text-[#F5EFE6]/65 mt-4">por persona · habitación compartida · 14 noches</p>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#F5EFE6]/45 mt-8">{pricing.solo} si vienes solo/a</p>

          <div className="mt-16 max-w-md mx-auto bg-[#1B5840]/30 backdrop-blur p-6 rounded-3xl text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5CFFB0] mb-3">// pago</p>
            <ol className="space-y-2 font-display text-base">
              <li className="flex justify-between"><span>Reserva hoy</span><span className="font-bold">500€</span></li>
              <li className="flex justify-between"><span>Confirmación grupo</span><span className="font-bold">1.000€</span></li>
              <li className="flex justify-between"><span>30 días antes</span><span className="font-bold">resto</span></li>
            </ol>
          </div>
        </div>
      </section>

      {/* === CHAPTER 06: REAL CHAT (testimonials reframed) === */}
      <section className="min-h-screen flex items-center px-6 py-24 relative">
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">05 · Conversación real</span>

        <div className="max-w-2xl w-full mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#5CFFB0] mb-6">// así arrancó el viaje de Pau el año pasado</p>

          <div className="space-y-3">
            {realChatSnippets.map((m, i) => (
              <div key={i} className={`flex ${m.from === "marta" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-sm px-5 py-3 rounded-2xl ${
                    m.from === "marta"
                      ? "bg-[#1B5840]/40 backdrop-blur rounded-bl-md"
                      : "bg-[#B8543A]/85 rounded-br-md text-white"
                  }`}
                >
                  <p className="text-base leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {reviews[0] && (
            <div className="mt-12 pt-10 border-t border-[#F5EFE6]/15">
              <p className="font-display text-2xl md:text-3xl leading-snug italic font-light">
                «{reviews[0].quote}»
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#F5EFE6]/55 mt-4">
                — {reviews[0].name}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* === CHAPTER 07: CTA === */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 relative">
        <span className="absolute top-12 left-6 text-[10px] uppercase tracking-[0.36em] text-[#F5EFE6]/40">06 · ¿Te vienes?</span>

        <div className="max-w-3xl text-center">
          <p className="font-display font-bold text-[12vw] md:text-[8vw] leading-[0.9] tracking-[-0.03em] mb-8">
            Solo
            <br />
            <span className="text-[#B8543A]">tu número.</span>
          </p>
          <p className="font-display text-xl md:text-2xl text-[#F5EFE6]/70 mb-12 max-w-xl mx-auto leading-relaxed">
            No quieras pensarlo más. Si dejas tu número Marta te escribe y resolvemos en 5 minutos lo que llevas tres meses Googleando.
          </p>

          <form
            action={`${contact.whatsappLink}?text=Hola Marta, quiero info sobre Bali 2026`}
            method="GET"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <a
              href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola Marta, quiero info sobre Bali 2026")}`}
              className="flex-1 bg-[#5CFFB0] text-[#0A0F0C] font-display font-bold text-base px-8 py-5 rounded-full hover:bg-white transition uppercase tracking-[0.18em]"
            >
              Abrir WhatsApp →
            </a>
          </form>

          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#F5EFE6]/40 mt-10">
            o llama directamente · {contact.whatsapp}
          </p>
        </div>
      </section>

      {/* Bottom mono marker */}
      <footer className="px-6 py-10 border-t border-[#F5EFE6]/10 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-[#F5EFE6]/40 font-mono">
        <span>EOF · padeltravellers.com</span>
        <span>54 pasaron por aquí</span>
      </footer>
    </main>
  );
}
