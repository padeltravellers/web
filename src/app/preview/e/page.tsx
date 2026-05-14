import Link from "next/link";
import Img from "@/components/Img";
import { pricing, contact, reviews } from "@/data/content";
import { trips2026 } from "@/data/content";

export const metadata = {
  title: "Padel Travellers · Propuesta E — Pantallas (brand intacto)",
};

// === Misma estética que la web actual ===
// Cream/verde/clay · Futura/Inter/Petit/Eczar · mismas fotos
// Diferencia clave: en vez de scroll largo con 8 secciones,
// 7 PANTALLAS COMPLETAS — una idea por pantalla, mucho espacio en blanco.

const dayMoments = [
  { time: "07:30", label: "Desayuno frente al arrozal", img: "/photos/villa/2.jpg" },
  { time: "10:00", label: "Clase en BPA con coach NOX", img: "/photos/extra/bpa/aerial.jpg" },
  { time: "14:00", label: "Templo o playa, según el día", img: "/photos/bali/uluwatu/1.jpg" },
  { time: "18:30", label: "Atardecer en costa", img: "/photos/extra/atardecer/1.jpg" },
];

const includedIcons = [
  { icon: "◐", label: "14 noches habitación privada con desayuno" },
  { icon: "◇", label: "4h de clase + 4 partidos + torneo internacional" },
  { icon: "△", label: "6 excursiones · todas las entradas incluidas" },
  { icon: "○", label: "Coordinador de Padel Travellers cada día" },
  { icon: "✕", label: "Transporte interno completo · vehículo privado" },
];

export default function ProposalE() {
  return (
    <main className="bg-pt-cream text-pt-ink font-body">
      {/* Mini top bar */}
      <nav className="fixed top-0 inset-x-0 z-40 px-6 lg:px-12 py-5 flex items-center justify-between mix-blend-difference text-white">
        <Link href="/preview" className="font-display text-xs uppercase tracking-[0.32em] hover:opacity-70">
          ← Archivo
        </Link>
        <span className="font-display text-xs uppercase tracking-[0.32em]">
          Padel Travellers
        </span>
        <Link href={contact.whatsappLink} className="font-display text-xs uppercase tracking-[0.32em] hover:opacity-70">
          WhatsApp
        </Link>
      </nav>

      {/* ========= PANTALLA 1 · HERO ========= */}
      <section className="h-screen relative flex items-end">
        <Img
          src="/photos/hero/1-piscina.jpg"
          alt="Piscina del club sobre los arrozales"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pt-ink/85 via-pt-ink/20 to-transparent" />

        <div className="relative w-full px-8 lg:px-20 pb-20 text-pt-cream">
          <p className="font-display uppercase tracking-[0.36em] text-xs mb-8 opacity-80">
            Bali · 2026
          </p>
          <h1 className="font-display font-medium text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight max-w-5xl">
            Pádel y aventura.
            <br />
            <span className="font-script italic font-normal">14 noches.</span>
          </h1>
          <div className="mt-12 flex items-end justify-between">
            <p className="font-display uppercase tracking-[0.22em] text-xs opacity-70">
              ↓ desliza
            </p>
            <p className="font-display text-right text-sm md:text-base">
              Una pantalla, una idea.
              <br />
              <span className="opacity-60">Siete pantallas hasta el final.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========= PANTALLA 2 · LA IDEA ========= */}
      <section className="h-screen flex items-center px-8 lg:px-20 relative">
        <div className="max-w-5xl">
          <p className="font-display uppercase tracking-[0.36em] text-xs text-pt-clay mb-10">
            02 — la idea
          </p>
          <p className="font-display font-medium text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-pt-green">
            No es un tour. <span className="text-pt-ink/40">Tampoco un retiro.</span>
            <br />
            Es la quincena que llevas <br className="hidden md:block" />
            tres años <span className="font-script italic text-pt-clay">posponiendo</span>.
          </p>
          <p className="mt-10 max-w-xl text-pt-muted text-lg leading-relaxed">
            Coordinador español contigo cada día, grupo reducido, alojamiento privado y todo organizado al detalle.
            Tú vuelas y disfrutas. Lo demás está pensado para que no haga falta pensar.
          </p>
        </div>
        <span className="absolute bottom-10 right-10 font-display uppercase tracking-[0.32em] text-xs text-pt-muted">02/07</span>
      </section>

      {/* ========= PANTALLA 3 · UN DÍA TIPO ========= */}
      <section className="h-screen flex flex-col justify-center px-8 lg:px-20 py-20 relative bg-white">
        <p className="font-display uppercase tracking-[0.36em] text-xs text-pt-clay mb-6">
          03 — un día tipo
        </p>
        <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green leading-tight mb-12 max-w-3xl">
          Pádel por la mañana.
          <br />
          <span className="font-script italic text-pt-clay">Bali por la tarde.</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {dayMoments.map((m) => (
            <figure key={m.time} className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
              <Img
                src={m.img}
                alt={m.label}
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pt-ink/80 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 text-pt-cream">
                <p className="font-display text-2xl font-medium">{m.time}</p>
                <p className="text-sm opacity-85 mt-1">{m.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <span className="absolute bottom-10 right-10 font-display uppercase tracking-[0.32em] text-xs text-pt-muted">03/07</span>
      </section>

      {/* ========= PANTALLA 4 · INCLUYE ========= */}
      <section className="h-screen flex items-center px-8 lg:px-20 relative">
        <div className="max-w-4xl w-full">
          <p className="font-display uppercase tracking-[0.36em] text-xs text-pt-clay mb-10">
            04 — está todo dentro
          </p>
          <ul className="space-y-1">
            {includedIcons.map((it) => (
              <li
                key={it.label}
                className="flex items-baseline gap-8 py-5 border-b border-pt-green/15 hover:bg-pt-green-pale/40 transition px-4 -mx-4 rounded-lg"
              >
                <span className="font-display text-3xl text-pt-clay shrink-0 w-8">{it.icon}</span>
                <span className="font-display text-xl md:text-2xl text-pt-green leading-snug">{it.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-pt-muted">
            <span className="font-display uppercase tracking-[0.22em] text-pt-clay text-xs">No incluye —</span>{" "}
            vuelos · seguro · visado · comidas y cenas a la carta.
          </p>
        </div>
        <span className="absolute bottom-10 right-10 font-display uppercase tracking-[0.32em] text-xs text-pt-muted">04/07</span>
      </section>

      {/* ========= PANTALLA 5 · FECHAS ========= */}
      <section className="h-screen flex flex-col justify-center px-8 lg:px-20 py-20 relative bg-pt-green text-pt-cream">
        <p className="font-display uppercase tracking-[0.36em] text-xs text-pt-cream/65 mb-6">
          05 — 8 salidas en 2026
        </p>
        <h2 className="font-display font-medium text-4xl md:text-6xl leading-[1.05] mb-12 max-w-3xl">
          De junio a octubre.
          <br />
          <span className="font-script italic text-pt-cream/75">Quincenales.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
          {trips2026.slice(0, 8).map((t, i) => (
            <div
              key={i}
              className="border border-pt-cream/20 rounded-2xl px-5 py-4 hover:bg-pt-cream/10 transition"
            >
              <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/55 mb-2">
                Viaje {i + 1}
              </p>
              <p className="font-display text-base md:text-lg leading-snug">
                {t.range}
              </p>
            </div>
          ))}
        </div>

        <span className="absolute bottom-10 right-10 font-display uppercase tracking-[0.32em] text-xs text-pt-cream/55">05/07</span>
      </section>

      {/* ========= PANTALLA 6 · PRECIO ========= */}
      <section className="h-screen flex items-center justify-center px-8 lg:px-20 relative text-center bg-pt-cream">
        <div className="max-w-3xl">
          <p className="font-display uppercase tracking-[0.36em] text-xs text-pt-clay mb-10">
            06 — el precio
          </p>
          <p className="font-display font-medium text-2xl md:text-3xl text-pt-green/65 mb-4">
            Todo incluido
          </p>
          <div className="font-display font-medium text-[18vw] md:text-[14vw] leading-none tracking-tight text-pt-green">
            {pricing.base}
          </div>
          <p className="font-display text-xl md:text-2xl text-pt-green/65 mt-6">
            por persona · habitación compartida
          </p>
          <p className="font-script italic text-pt-clay text-2xl mt-2">
            {pricing.solo} si vienes solo/a
          </p>

          <div className="mt-12 inline-flex gap-8 text-sm text-pt-muted">
            <span>500€ reserva</span>
            <span>·</span>
            <span>1.000€ confirmación</span>
            <span>·</span>
            <span>resto 30d antes</span>
          </div>
        </div>
        <span className="absolute bottom-10 right-10 font-display uppercase tracking-[0.32em] text-xs text-pt-muted">06/07</span>
      </section>

      {/* ========= PANTALLA 7 · CTA + QUOTE ========= */}
      <section className="min-h-screen flex flex-col justify-center px-8 lg:px-20 py-20 relative bg-white">
        <p className="font-display uppercase tracking-[0.36em] text-xs text-pt-clay mb-10">
          07 — ¿hablamos?
        </p>
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl items-center">
          <div>
            <h2 className="font-display font-medium text-4xl md:text-6xl text-pt-green leading-[1.05] mb-8">
              Déjanos tu número.
              <br />
              <span className="font-script italic text-pt-clay">Te llamamos hoy.</span>
            </h2>
            <p className="text-pt-muted text-lg leading-relaxed mb-10 max-w-md">
              Sin email largo. Sin presión. Solo una llamada de 5-10 minutos para ver si encaja contigo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola Marta, me interesa Bali 2026")}`}
                className="px-8 py-4 rounded-full bg-pt-green text-white font-display font-semibold text-base hover:bg-pt-green-soft transition text-center"
              >
                Abrir WhatsApp →
              </a>
              <Link
                href="/contacto"
                className="px-8 py-4 rounded-full border border-pt-green/30 text-pt-green font-display font-semibold text-base hover:bg-pt-green-pale transition text-center"
              >
                Prefiero formulario
              </Link>
            </div>
          </div>

          {reviews[0] && (
            <figure className="bg-pt-cream rounded-3xl p-10 border border-pt-green/10">
              <p className="font-display font-medium text-2xl md:text-3xl text-pt-green leading-snug italic">
                «{reviews[0].quote}»
              </p>
              <figcaption className="mt-6 flex items-center justify-between text-pt-muted text-sm">
                <span className="font-display font-semibold text-pt-green">{reviews[0].name}</span>
                <span className="font-display uppercase tracking-[0.22em] text-xs text-pt-clay">{reviews[0].trip}</span>
              </figcaption>
            </figure>
          )}
        </div>

        <span className="absolute bottom-10 right-10 font-display uppercase tracking-[0.32em] text-xs text-pt-muted">07/07</span>
      </section>
    </main>
  );
}
