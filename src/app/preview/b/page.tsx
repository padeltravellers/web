import Image from "next/image";
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

export const metadata = { title: "Padel Travellers · Propuesta B — Editorial Magazine" };

export default function ProposalB() {
  return (
    <main className="bg-pt-cream text-pt-ink">
      {/* MAGAZINE NAV */}
      <nav className="border-b border-pt-green/15 bg-pt-cream/95 backdrop-blur sticky top-0 z-40">
        <div className="px-6 lg:px-16 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logos/monogram.png" alt="" width={32} height={32} className="object-contain" />
            <span className="font-display font-semibold tracking-tight text-pt-green">Padel Travellers</span>
          </Link>
          <div className="hidden md:flex gap-7 font-serif italic text-sm text-pt-green">
            <a href="#editorial">Editorial</a>
            <a href="#bali">Bali</a>
            <a href="#calendario">Calendario</a>
            <a href="#palabra">Lo que dicen</a>
            <a href="#reservar">Reservar</a>
          </div>
          <span className="font-display uppercase tracking-[0.28em] text-[10px] text-pt-muted">Vol. 01 · 2026</span>
        </div>
      </nav>

      {/* COVER */}
      <section className="px-6 lg:px-16 pt-12 pb-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <p className="font-script text-pt-clay text-3xl mb-6 -rotate-2">edición especial</p>
            <h1 className="font-display font-extralight text-6xl md:text-8xl text-pt-green leading-[0.85] tracking-tight">
              Bali,<br />
              <span className="font-serif italic font-normal">contado</span><br />
              despacio.
            </h1>
            <p className="mt-10 text-pt-muted leading-relaxed font-serif text-lg">
              Catorce días entre arrozales, templos, surf y un club de pádel local que se ha convertido en
              nuestra casa. Una guía para los que entienden viajar como otra cosa.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#calendario" className="px-7 py-3 rounded-full bg-pt-green text-pt-cream font-display uppercase tracking-[0.18em] text-[11px] hover:bg-pt-green-soft transition">
                Salidas 2026
              </a>
              <a href={contact.whatsappLink} className="px-7 py-3 rounded-full border border-pt-green text-pt-green font-display uppercase tracking-[0.18em] text-[11px] hover:bg-pt-green hover:text-pt-cream transition">
                WhatsApp Marta
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-12 gap-3 lg:gap-4">
            <div className="col-span-8 relative aspect-[4/5] rounded-sm overflow-hidden tape">
              <Image src="/photos/bali/ubud/1.jpg" alt="" fill className="object-cover" priority />
            </div>
            <div className="col-span-4 flex flex-col gap-3 lg:gap-4 pt-10">
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image src="/photos/bali/partidos/2.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image src="/photos/bali/uluwatu/2.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="bg-pt-green text-pt-cream rounded-sm p-4 font-serif italic text-sm leading-tight">
                <span className="font-script text-2xl text-pt-cream block leading-none mb-1">14</span>
                días donde el viaje empieza al aterrizar.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAGAZINE MASTHEAD STRIP */}
      <section className="border-y border-pt-green/15 bg-pt-cream overflow-hidden">
        <div className="marquee whitespace-nowrap py-5 font-display uppercase tracking-[0.32em] text-pt-green/70 text-sm flex">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="px-8 flex items-center gap-8">
              <span>Bali · 14 días</span><span>·</span>
              <span>Grupos de 8 a 12</span><span>·</span>
              <span className="font-script normal-case italic text-pt-clay">pádel a la sombra</span><span>·</span>
              <span>Coordinador español</span><span>·</span>
              <span>54 viajeros con nosotros</span><span>·</span>
              <span className="font-script normal-case italic text-pt-clay">sin bote común</span><span>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* EDITORIAL LEAD ARTICLE */}
      <section id="editorial" className="px-6 lg:px-16 py-28 max-w-5xl mx-auto">
        <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Artículo · 01</p>
        <h2 className="font-serif italic text-4xl md:text-5xl text-pt-green leading-tight mb-12 max-w-3xl">
          Por qué Bali, por qué pádel, por qué juntos.
        </h2>
        <div className="grid md:grid-cols-2 gap-10 text-lg font-serif leading-[1.75] text-pt-ink/90">
          <div>
            <p className="drop-cap">
              Bali entró en nuestra vida por casualidad. Buscábamos un sitio donde el clima dejara jugar todo el año,
              donde la cultura tuviera profundidad, donde se pudiera estar dos semanas sin que nadie se aburriera.
              Lo encontramos.
            </p>
            <p className="mt-6">
              El pádel funciona como hilo: ordena la semana, junta a la gente y deja claro que esto no es
              «un viaje organizado» sino algo más parecido a una colonia adulta. Por la mañana se juega; por la
              tarde, lo que toque.
            </p>
          </div>
          <div>
            <p>
              Hemos viajado con 54 personas y todas dicen lo mismo: que el grupo se ha hecho. Que el coordinador
              ha resuelto cosas que ni sabían que iban a salir. Que la villa estaba mejor de lo que pensaban.
              Que volverían.
            </p>
            <blockquote className="mt-8 pl-6 border-l-2 border-pt-clay font-script italic text-3xl text-pt-green leading-tight">
              «El día que aterrizas dejas de tener que decidir nada. Eso es el viaje.»
            </blockquote>
          </div>
        </div>
      </section>

      {/* STATS POSTER */}
      <section className="bg-pt-green text-pt-cream py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif italic text-6xl font-light mb-2">{s.value}</div>
              <div className="font-display uppercase tracking-[0.28em] text-[10px] text-pt-cream/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE — magazine list */}
      <section className="px-6 lg:px-16 py-28 max-w-6xl mx-auto">
        <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Artículo · 02</p>
        <h2 className="font-serif italic text-4xl md:text-5xl text-pt-green leading-tight mb-16 max-w-3xl">
          Cuatro decisiones que cambian el viaje.
        </h2>
        <ol className="space-y-12 max-w-3xl">
          {valuePillars.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[80px_1fr] gap-6 items-start border-t border-pt-green/15 pt-8">
              <span className="font-serif italic text-7xl text-pt-clay font-light leading-none">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display font-medium text-2xl text-pt-green mb-3">{p.title}</h3>
                <p className="text-pt-muted leading-relaxed font-serif text-lg">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* BALI — magazine spread with mixed photos */}
      <section id="bali" className="bg-pt-sand/40 py-28 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Reportaje fotográfico</p>
            <h2 className="font-serif italic text-5xl md:text-6xl text-pt-green leading-tight">
              Explora Bali con nosotros.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {baliExperiences.map((b, i) => {
              // Vary layout: every 3rd is full-width with text overlay style
              const isFeature = i % 3 === 0;
              return (
                <article
                  key={b.slug}
                  className={`${isFeature ? "lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-10" : "lg:col-span-6"} space-y-5`}
                >
                  <div className={`${isFeature ? "lg:col-span-7" : ""} relative ${isFeature ? "aspect-[16/10]" : "aspect-[4/5]"} rounded-sm overflow-hidden`}>
                    <Image src={b.photos[0]} alt={b.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                  </div>
                  <div className={`${isFeature ? "lg:col-span-5 lg:pt-8" : ""}`}>
                    <p className="font-display uppercase tracking-[0.28em] text-[10px] text-pt-clay mb-3">
                      {String(i + 1).padStart(2, "0")} · {b.short}
                    </p>
                    <h3 className={`font-serif italic ${isFeature ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} text-pt-green mb-4 leading-tight`}>
                      {b.title}
                    </h3>
                    <p className="text-pt-ink/80 font-serif leading-relaxed">{b.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALENDARIO */}
      <section id="calendario" className="px-6 lg:px-16 py-28 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Calendario</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-pt-green leading-tight">
              Las ocho salidas de la temporada.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-14">
            <p className="text-pt-muted font-serif text-lg leading-relaxed">
              De junio a octubre. Quincenales. Cada una su carácter: junio más tranquilo, agosto en plena
              temporada del grupo, octubre con la luz dorada de fin de monzón.
            </p>
          </div>
        </div>
        <ul className="divide-y divide-pt-green/15">
          {trips2026.map((t) => (
            <li key={t.n} className="py-6 grid grid-cols-12 gap-4 items-center">
              <span className="col-span-2 font-serif italic text-3xl text-pt-clay font-light">{String(t.n).padStart(2, "0")}</span>
              <span className="col-span-3 font-display uppercase tracking-[0.22em] text-[11px] text-pt-muted">{t.month}</span>
              <span className="col-span-5 font-display text-lg text-pt-green">{t.range}</span>
              <span className="col-span-2 text-right font-script italic text-pt-clay text-sm">
                {t.featured ? "buen grupo" : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* INCLUDED — newspaper columns */}
      <section className="bg-white py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4 text-center">Lo que va dentro</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-pt-green text-center mb-14">
            El viaje completo, por escrito.
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-[0.22em] text-pt-green mb-6 border-b border-pt-green/30 pb-3">Incluido</h3>
              <ul className="space-y-4 font-serif text-pt-ink/90 leading-relaxed">
                {included.map((i) => <li key={i} className="flex gap-3"><span className="text-pt-clay">▸</span>{i}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-[0.22em] text-pt-clay mb-6 border-b border-pt-clay/30 pb-3">No incluido</h3>
              <ul className="space-y-4 font-serif text-pt-muted leading-relaxed">
                {notIncluded.map((i) => <li key={i} className="flex gap-3"><span>—</span>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIO — editorial card */}
      <section className="px-6 lg:px-16 py-28 max-w-5xl mx-auto">
        <div className="bg-pt-green text-pt-cream rounded-sm p-12 md:p-20 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-pt-clay/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-12">
            <div>
              <p className="font-script text-3xl text-pt-cream mb-4 -rotate-2">la cuenta</p>
              <h2 className="font-display font-extralight text-5xl md:text-6xl leading-[0.95]">
                Un precio.
                <br />
                <span className="font-serif italic">Sin sobres.</span>
              </h2>
              <p className="mt-8 font-serif text-pt-cream/85 leading-relaxed">
                Lo que pagas es el viaje entero. Sin bote común para nada. Si surge una comida especial o una
                actividad opcional, lo cubres tú porque te ha apetecido, no porque tocaba.
              </p>
            </div>
            <div className="space-y-6">
              <div className="border-b border-pt-cream/30 pb-6">
                <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/70 mb-2">En pareja / compartiendo</p>
                <div className="font-serif italic text-5xl">{pricing.base}</div>
                <p className="font-serif text-pt-cream/80 text-sm">{pricing.baseNote}</p>
              </div>
              <div>
                <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/70 mb-2">Solo / habitación individual</p>
                <div className="font-serif italic text-5xl">{pricing.solo}</div>
                <p className="font-serif text-pt-cream/80 text-sm">{pricing.soloNote}</p>
              </div>
              <p className="font-script text-pt-cream/90 text-lg pt-4">Reserva: {pricing.deposit}. El resto antes de salir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PALABRA */}
      <section id="palabra" className="bg-pt-sand/40 py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4 text-center">Voces</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-pt-green text-center mb-16">
            «Volveríamos mañana.»
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {reviews.map((r) => (
              <figure key={r.name} className="bg-white p-10 rounded-sm relative">
                <span className="font-script text-7xl text-pt-clay leading-none absolute -top-2 left-6">“</span>
                <blockquote className="font-serif italic text-xl text-pt-ink/90 leading-relaxed pt-6">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-pt-green/15 text-sm">
                  <span className="font-display font-semibold text-pt-green">{r.name}</span>
                  <span className="text-pt-muted"> · {r.trip}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 lg:px-16 max-w-4xl mx-auto">
        <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4 text-center">El consultorio</p>
        <h2 className="font-serif italic text-4xl md:text-5xl text-pt-green text-center mb-16">
          Vuestras preguntas.
        </h2>
        <div className="divide-y divide-pt-green/15 border-y border-pt-green/15">
          {faqs.map((f, i) => (
            <details key={i} className="group py-6">
              <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6">
                <span className="font-serif italic text-pt-green text-xl leading-tight">{f.q}</span>
                <span className="font-display text-pt-clay text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-4 font-serif text-pt-ink/80 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="reservar" className="relative py-28 px-6 lg:px-16 bg-pt-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-script text-4xl text-pt-clay mb-6 -rotate-2">cierra tu plaza</p>
          <h2 className="font-serif italic text-5xl md:text-7xl text-pt-green leading-[0.95] mb-10">
            Hablemos antes
            <br /> de cobrar nada.
          </h2>
          <p className="font-serif text-lg text-pt-muted max-w-2xl mx-auto mb-10">
            Te llamamos cuando te encaje, te contamos el viaje, vemos qué fecha y luego —y solo luego— viene
            la reserva. Sin presión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={contact.whatsappLink} className="px-9 py-4 rounded-full bg-pt-green text-pt-cream font-display uppercase tracking-[0.18em] text-[11px] hover:bg-pt-green-soft transition">
              WhatsApp · {contact.whatsapp}
            </a>
            <a href={`mailto:${contact.email}`} className="px-9 py-4 rounded-full border border-pt-green text-pt-green font-display uppercase tracking-[0.18em] text-[11px] hover:bg-pt-green hover:text-pt-cream transition">
              Email · {contact.email}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-pt-ink text-pt-cream/70 py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-display tracking-tight text-pt-cream">Padel Travellers · Vol. 01 · 2026</span>
          <Link href="/" className="hover:text-pt-cream">← Volver al índice</Link>
        </div>
      </footer>
    </main>
  );
}
