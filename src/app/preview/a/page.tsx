import Img from "@/components/Img";
import Link from "next/link";
import {
  hero,
  valuePillars,
  trips2026,
  baliExperiences,
  included,
  notIncluded,
  pricing,
  faqs,
  reviews,
  stats,
  contact,
} from "@/data/content";

export const metadata = { title: "Padel Travellers · Propuesta A — Boutique Premium" };

export default function ProposalA() {
  return (
    <main className="bg-pt-cream text-pt-ink font-body">
      {/* NAV */}
      <nav className="absolute top-0 inset-x-0 z-30 px-6 lg:px-16 py-7 flex items-center justify-between text-white">
        <Link href="/" className="flex items-center gap-3 group">
          <Img src="/logos/monogram.png" alt="" width={36} height={36} className="object-contain invert brightness-200" />
          <span className="font-display tracking-tight font-medium">Padel Travellers</span>
        </Link>
        <div className="hidden md:flex gap-8 font-display uppercase tracking-[0.18em] text-xs">
          <a href="#viaje" className="hover:opacity-70">El viaje</a>
          <a href="#bali" className="hover:opacity-70">Bali</a>
          <a href="#fechas" className="hover:opacity-70">Fechas</a>
          <a href="#precio" className="hover:opacity-70">Precio</a>
          <a href="#reservar" className="hover:opacity-70">Reservar</a>
        </div>
        <a
          href={contact.whatsappLink}
          className="font-display uppercase tracking-[0.18em] text-xs px-5 py-2.5 rounded-full border border-white/40 hover:bg-white hover:text-pt-green transition"
        >
          WhatsApp
        </a>
      </nav>

      {/* HERO — full bleed cinema */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <Img src="/photos/home/hero.jpg" alt="Bali" fill priority className="object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-pt-green/40 via-pt-green/10 to-pt-green/80" />
        <div className="absolute inset-0 flex items-end pb-20 lg:pb-28">
          <div className="px-6 lg:px-16 max-w-5xl text-white fade-up">
            <p className="font-display uppercase tracking-[0.32em] text-[11px] mb-8 opacity-90">{hero.kicker}</p>
            <h1 className="font-display font-extralight text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Donde el pádel
              <br />
              <span className="font-script font-normal italic">se vuelve viaje.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg md:text-xl font-light leading-relaxed opacity-95">
              {hero.subtitle}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a href="#reservar" className="px-9 py-4 rounded-full bg-white text-pt-green font-display uppercase tracking-[0.18em] text-xs hover:bg-pt-cream transition">
                {hero.ctaPrimary.label}
              </a>
              <a href="#fechas" className="px-9 py-4 rounded-full border border-white/50 font-display uppercase tracking-[0.18em] text-xs hover:bg-white/10 transition">
                {hero.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 lg:right-16 text-white/80 font-display uppercase tracking-[0.3em] text-[10px] writing-mode-vertical">
          Scroll ↓
        </div>
      </section>

      {/* STATS strip */}
      <section className="bg-white border-y border-pt-green/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl md:text-5xl font-light text-pt-green">{s.value}</div>
              <div className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-muted mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONCEPT */}
      <section id="viaje" className="px-6 lg:px-16 py-28 lg:py-40 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">El concepto</p>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green mb-8">
              Catorce días.
              <br />
              Un grupo afín.
              <br />
              <span className="font-script italic text-pt-clay">Bali entera.</span>
            </h2>
            <p className="text-pt-muted text-lg leading-relaxed mb-6">
              No es un viaje organizado al uso. Es la idea de juntar a entre ocho y doce personas con el pádel
              como hilo común, dejarles dos semanas en Bali con todo cuadrado, y que cada uno haga el viaje
              que necesita: jugar más, jugar menos, conocer la isla, desconectar.
            </p>
            <p className="text-pt-muted text-lg leading-relaxed">
              Nuestro trabajo es el de detrás: la villa, el club, el coche, los templos, el coordinador. Lo que
              tú haces es aparecer.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-6 gap-3 lg:gap-4">
            <div className="col-span-4 aspect-[4/5] relative rounded-lg overflow-hidden">
              <Img src="/photos/bali/partidos/1.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="col-span-2 aspect-square relative rounded-lg overflow-hidden mt-12">
              <Img src="/photos/bali/club-bali/2.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="col-span-3 aspect-square relative rounded-lg overflow-hidden -mt-6">
              <Img src="/photos/bali/uluwatu/1.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="col-span-3 aspect-[3/4] relative rounded-lg overflow-hidden">
              <Img src="/photos/bali/ubud/2.jpg" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="bg-white py-28 lg:py-36">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6 text-center">Qué hace distinto a PT</p>
          <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green text-center max-w-3xl mx-auto mb-20">
            Cuatro decisiones de diseño que cambian el viaje entero.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {valuePillars.map((p) => (
              <div key={p.title} className="border-t border-pt-green/15 pt-8">
                <div className="text-3xl mb-5">{p.icon}</div>
                <h3 className="font-display font-medium text-xl text-pt-green mb-4">{p.title}</h3>
                <p className="text-pt-muted leading-relaxed text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BALI EXPERIENCES */}
      <section id="bali" className="py-28 lg:py-36 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">El destino</p>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1] text-pt-green">
              Explora Bali
              <br />
              <span className="font-script italic text-pt-clay">con nosotros.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-20">
            <p className="text-pt-muted text-lg leading-relaxed">
              Bali no es la playa de la postal. Bali son arrozales escalonados, templos sobre roca volcánica,
              cafés tradicionales, surf, jungla y un club de pádel local que ya nos espera. Cada viaje recorre
              esto, con calma.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {baliExperiences.map((b, i) => (
            <article
              key={b.slug}
              className={`grid lg:grid-cols-12 gap-8 items-center py-10 border-t border-pt-green/15 ${i % 2 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={`lg:col-span-7 relative aspect-[16/10] rounded-lg overflow-hidden ${i % 2 ? "lg:col-start-6" : ""}`}>
                <Img src={b.photos[0]} alt={b.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-clay mb-3">
                  {String(i + 1).padStart(2, "0")} · {b.short}
                </p>
                <h3 className="font-display font-light text-3xl md:text-4xl text-pt-green mb-5">{b.title}</h3>
                <p className="text-pt-muted leading-relaxed">{b.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FECHAS */}
      <section id="fechas" className="bg-pt-green text-white py-28 lg:py-36">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70 mb-6">Calendario 2026</p>
          <h2 className="font-display font-extralight text-4xl md:text-6xl leading-[1] mb-16 max-w-3xl">
            Ocho salidas.
            <br />
            <span className="font-script italic text-pt-cream">Elige la tuya.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trips2026.map((t) => (
              <div
                key={t.n}
                className={`border ${t.featured ? "border-pt-cream bg-pt-cream/10" : "border-white/20"} rounded-2xl p-7 hover:bg-white/5 transition`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display font-light text-5xl">{String(t.n).padStart(2, "0")}</span>
                  <span className="font-display uppercase tracking-[0.18em] text-[10px] text-pt-cream/70">{t.month}</span>
                </div>
                <div className="font-display text-lg">{t.range}</div>
                {t.featured && (
                  <p className="font-script italic text-sm mt-4 text-pt-cream">{t.featured}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="bg-white py-28 lg:py-36 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">Qué incluye</p>
            <h3 className="font-display font-light text-3xl text-pt-green mb-8">Todo lo importante. Sin sorpresas.</h3>
            <ul className="space-y-5">
              {included.map((i) => (
                <li key={i} className="flex gap-4 text-pt-ink leading-relaxed">
                  <span className="font-display text-pt-green text-xl leading-none mt-0.5">✓</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-pt-green/15 md:pl-16">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">Qué no incluye</p>
            <h3 className="font-display font-light text-3xl text-pt-green mb-8">Lo dejamos a tu criterio.</h3>
            <ul className="space-y-5">
              {notIncluded.map((i) => (
                <li key={i} className="flex gap-4 text-pt-muted leading-relaxed">
                  <span className="font-display text-pt-clay text-xl leading-none mt-0.5">—</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precio" className="py-28 lg:py-36 px-6 lg:px-16 bg-pt-cream">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">Inversión</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-pt-green leading-tight mb-16">
            Un precio. Todo dentro.
            <br />
            <span className="font-script italic text-pt-clay">Sin bote común.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-12 border border-pt-green/10">
              <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-muted mb-4">Compartiendo habitación</p>
              <div className="font-display font-extralight text-6xl text-pt-green mb-2">{pricing.base}</div>
              <p className="text-pt-muted">{pricing.baseNote}</p>
            </div>
            <div className="bg-pt-green text-white rounded-3xl p-12">
              <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/70 mb-4">Habitación individual</p>
              <div className="font-display font-extralight text-6xl mb-2">{pricing.solo}</div>
              <p className="text-pt-cream/80">{pricing.soloNote}</p>
            </div>
          </div>
          <p className="mt-12 text-pt-muted">
            Reserva de plaza: <span className="text-pt-green font-medium">{pricing.deposit}</span>. {pricing.depositNote}
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white py-28 lg:py-36 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6 text-center">Voces del grupo</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-pt-green text-center mb-20 max-w-3xl mx-auto">
            Lo que dicen los que ya volvieron.
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {reviews.map((r) => (
              <figure key={r.name} className="border-t border-pt-green/15 pt-8">
                <blockquote className="font-display font-light text-2xl text-pt-ink leading-snug mb-6">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm text-pt-muted">
                  <span className="font-display font-medium text-pt-green">{r.name}</span> · {r.trip}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 lg:py-36 px-6 lg:px-16 bg-pt-cream">
        <div className="max-w-4xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6 text-center">Preguntas frecuentes</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-pt-green text-center mb-16">
            Lo que nos preguntáis.
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white rounded-2xl p-7 cursor-pointer">
                <summary className="font-display font-medium text-lg text-pt-green list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-pt-clay text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-4 text-pt-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA RESERVA */}
      <section id="reservar" className="relative py-32 lg:py-44 overflow-hidden bg-pt-green text-white">
        <div className="absolute inset-0 opacity-20">
          <Img src="/photos/bali/tanah-lot/1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative px-6 lg:px-16 max-w-4xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70 mb-6">Reservar plaza</p>
          <h2 className="font-display font-extralight text-5xl md:text-7xl leading-[1] mb-10">
            300€ y tu plaza
            <br />
            <span className="font-script italic text-pt-cream">queda guardada.</span>
          </h2>
          <p className="text-lg text-pt-cream/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            Hablamos primero por WhatsApp o por una llamada con Oriol para entender qué buscas y qué fecha te encaja. La reserva se formaliza cuando tú lo digas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={contact.whatsappLink} className="px-10 py-4 rounded-full bg-white text-pt-green font-display uppercase tracking-[0.18em] text-xs hover:bg-pt-cream transition">
              Hablar por WhatsApp
            </a>
            <a href={`mailto:${contact.email}`} className="px-10 py-4 rounded-full border border-white/40 font-display uppercase tracking-[0.18em] text-xs hover:bg-white/10 transition">
              Escribir un email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pt-ink text-white/70 py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-display text-xl text-white mb-4">Padel Travellers</div>
            <p className="text-sm leading-relaxed">Viajes en grupo a Bali con pádel. Hechos con calma, vividos con intensidad.</p>
          </div>
          <div>
            <div className="font-display uppercase tracking-[0.22em] text-[10px] mb-4">Contacto</div>
            <ul className="space-y-2 text-sm">
              <li><a href={contact.whatsappLink}>{contact.whatsapp}</a></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.instagram}>Instagram</a></li>
            </ul>
          </div>
          <div className="text-sm md:text-right">
            <Link href="/" className="hover:text-white">← Volver al índice</Link>
            <p className="mt-4">© {new Date().getFullYear()} Padel Travellers</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
