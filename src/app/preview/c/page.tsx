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

export const metadata = { title: "Padel Travellers · Propuesta C — Modern Conversion" };

// Static mock plazas — would come from Sheet live in production
const liveAvailability: Record<number, number> = {
  1: 12, 2: 6, 3: 12, 4: 10, 5: 7, 6: 5, 7: 6, 8: 12,
};

export default function ProposalC() {
  return (
    <main className="bg-white text-pt-ink">
      {/* STICKY NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-pt-green/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Img src="/logos/monogram.png" alt="" width={32} height={32} className="object-contain" />
            <span className="font-display font-bold tracking-tight text-pt-green">Padel Travellers</span>
          </Link>
          <div className="hidden md:flex gap-7 text-sm font-display font-medium text-pt-ink">
            <a href="#viaje" className="hover:text-pt-green">El viaje</a>
            <a href="#bali" className="hover:text-pt-green">Destino</a>
            <a href="#fechas" className="hover:text-pt-green">Fechas</a>
            <a href="#precio" className="hover:text-pt-green">Precio</a>
            <a href="#faq" className="hover:text-pt-green">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <a href={contact.whatsappLink} className="hidden md:inline-flex text-xs font-display font-medium px-4 py-2 rounded-full text-pt-green hover:bg-pt-green-pale">
              WhatsApp
            </a>
            <a href="#reservar" className="inline-flex items-center gap-1.5 text-xs md:text-sm font-display font-semibold px-4 py-2.5 rounded-full bg-pt-green text-white hover:bg-pt-green-soft transition">
              Reservar 300€
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 bg-pt-green-pale text-pt-green rounded-full px-3.5 py-1.5 text-xs font-display font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-pt-green animate-pulse" />
              8 salidas 2026 · Plazas en vivo
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tight text-pt-ink mb-7">
              Viajes de pádel
              <br />
              a <span className="text-pt-green">Bali</span>.
              <br />
              <span className="text-pt-muted font-light">Premium. En grupo.</span>
            </h1>
            <p className="text-lg text-pt-muted leading-relaxed mb-9 max-w-xl">
              14 días, 8-12 personas, alojamiento privado, partidos en BPA, cultura, surf y un coordinador
              español de principio a fin. Reserva con 300€ y plaza confirmada.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#reservar" className="px-7 py-3.5 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition shadow-lg shadow-pt-green/20">
                Reservar plaza · 300€
              </a>
              <a href="#fechas" className="px-7 py-3.5 rounded-full border-2 border-pt-green text-pt-green font-display font-semibold text-sm hover:bg-pt-green-pale transition">
                Ver fechas
              </a>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div>
                <div className="flex -space-x-2 mb-2">
                  {["uluwatu/1", "ubud/1", "partidos/1", "club-bali/1"].map((p) => (
                    <div key={p} className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden relative">
                      <Img src={`/photos/bali/${p}.jpg`} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-pt-muted"><span className="text-pt-ink font-semibold">54 viajeros</span> con nosotros</p>
              </div>
              <div>
                <div className="text-pt-clay text-base mb-1">★★★★★</div>
                <p className="text-pt-muted">4.9 / 5 Google Reviews</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-6 gap-3 lg:gap-4">
              <div className="col-span-4 relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Img src="/photos/bali/partidos/1.jpg" alt="" fill priority className="object-cover" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-display font-semibold text-pt-green flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pt-clay animate-pulse" /> Quedan 5 plazas · Viaje 6
                </div>
              </div>
              <div className="col-span-2 flex flex-col gap-3 lg:gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Img src="/photos/bali/uluwatu/1.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Img src="/photos/bali/club-bali/1.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="rounded-2xl bg-pt-green text-white p-4">
                  <div className="font-display font-bold text-3xl leading-none">1.725€</div>
                  <div className="text-pt-cream/80 text-xs mt-1.5">todo incluido · sin bote común</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-pt-green/10 bg-pt-cream/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-bold text-3xl text-pt-green">{s.value}</div>
              <div className="text-xs text-pt-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PILLARS — cards */}
      <section id="viaje" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-clay">Cómo funciona</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 mb-5 leading-tight text-pt-ink">
              Lo que hace que el viaje <span className="text-pt-green">funcione.</span>
            </h2>
            <p className="text-pt-muted max-w-2xl mx-auto">
              Hemos diseñado cada decisión pensando en el grupo. No es teoría: son los aprendizajes de 54 viajeros antes que tú.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {valuePillars.map((p) => (
              <div key={p.title} className="group bg-white border border-pt-green/10 rounded-2xl p-7 hover:border-pt-green hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-pt-green-pale flex items-center justify-center text-2xl mb-5 group-hover:bg-pt-green group-hover:scale-110 transition">
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-pt-ink mb-3">{p.title}</h3>
                <p className="text-sm text-pt-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BALI EXPERIENCES — card grid */}
      <section id="bali" className="py-24 px-6 lg:px-12 bg-pt-cream/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-clay">El destino</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 leading-tight text-pt-ink">
                Bali, más allá <span className="text-pt-green">de la postal.</span>
              </h2>
            </div>
            <p className="text-pt-muted max-w-md">11 experiencias incluidas en cada viaje. Sin recargos. Sin opcionales escondidos.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {baliExperiences.map((b) => (
              <article key={b.slug} className="group bg-white rounded-2xl overflow-hidden border border-pt-green/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Img src={b.photos[0]} alt={b.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-display font-semibold text-pt-green">
                    Incluido
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-display uppercase tracking-[0.18em] text-[10px] text-pt-clay mb-2">{b.short}</p>
                  <h3 className="font-display font-bold text-lg text-pt-ink mb-3">{b.title}</h3>
                  <p className="text-sm text-pt-muted leading-relaxed">{b.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FECHAS — table with live availability */}
      <section id="fechas" className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-clay">Calendario</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 mb-4 text-pt-ink">
              <span className="text-pt-green">8 salidas</span> en 2026.
            </h2>
            <p className="text-pt-muted">Reserva con 300€. Plazas reales actualizadas.</p>
          </div>
          <div className="bg-white rounded-3xl border border-pt-green/10 overflow-hidden shadow-sm">
            {trips2026.map((t, i) => {
              const left = liveAvailability[t.n];
              const fillPct = ((12 - left) / 12) * 100;
              const urgent = left <= 6;
              return (
                <div key={t.n} className={`grid grid-cols-12 items-center gap-3 lg:gap-6 px-5 lg:px-8 py-5 ${i < trips2026.length - 1 ? "border-b border-pt-green/10" : ""} ${urgent ? "bg-pt-clay/5" : ""}`}>
                  <div className="col-span-2 lg:col-span-1 font-display font-bold text-2xl text-pt-green">{String(t.n).padStart(2, "0")}</div>
                  <div className="col-span-7 lg:col-span-5">
                    <div className="font-display font-semibold text-pt-ink">{t.range}</div>
                    <div className="text-xs text-pt-muted">{t.month} · 14 días</div>
                  </div>
                  <div className="col-span-12 lg:col-span-4 order-last lg:order-none">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-pt-green-pale rounded-full overflow-hidden">
                        <div className={`h-full ${urgent ? "bg-pt-clay" : "bg-pt-green"}`} style={{ width: `${fillPct}%` }} />
                      </div>
                      <span className={`text-xs font-display font-semibold whitespace-nowrap ${urgent ? "text-pt-clay" : "text-pt-green"}`}>
                        {left <= 6 ? `Quedan ${left}` : "Disponible"}
                      </span>
                    </div>
                  </div>
                  <a href="#reservar" className={`col-span-3 lg:col-span-2 text-center text-xs font-display font-semibold px-3 py-2 rounded-full ${urgent ? "bg-pt-clay text-white" : "bg-pt-green text-white"} hover:opacity-90 transition`}>
                    Reservar
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRECIO */}
      <section id="precio" className="py-24 px-6 lg:px-12 bg-pt-green text-white relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-pt-clay/20 blur-3xl" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-pt-green-soft/40 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-cream/70">Precio claro</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 leading-tight">
              Un precio. Todo dentro. <span className="font-light text-pt-cream/85">Sin sorpresas.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-9 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-pt-cream/80 text-sm">En pareja / compartiendo</span>
                <span className="text-xs px-3 py-1 rounded-full bg-pt-cream/20">Recomendado</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display font-bold text-6xl">{pricing.base}</span>
                <span className="text-pt-cream/70">/ persona</span>
              </div>
              <p className="text-pt-cream/80 text-sm mb-6">{pricing.baseNote}</p>
              <ul className="space-y-2 text-sm text-pt-cream/90">
                {included.slice(0, 5).map((i) => <li key={i} className="flex gap-2"><span className="text-pt-cream">✓</span>{i}</li>)}
              </ul>
            </div>
            <div className="bg-white text-pt-ink rounded-3xl p-9">
              <span className="text-pt-clay text-sm">Habitación individual</span>
              <div className="flex items-baseline gap-2 mb-3 mt-6">
                <span className="font-display font-bold text-6xl text-pt-green">{pricing.solo}</span>
                <span className="text-pt-muted">/ persona</span>
              </div>
              <p className="text-pt-muted text-sm mb-6">{pricing.soloNote}</p>
              <p className="text-sm text-pt-muted mb-6">Si vienes solo, no compartes con nadie. Tu habitación, tu llave.</p>
              <a href="#reservar" className="block text-center px-6 py-3 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition">
                Reservar plaza
              </a>
            </div>
          </div>
          <div className="mt-10 text-center text-pt-cream/85">
            <span className="font-script italic text-2xl text-pt-cream">{pricing.deposit}</span>
            <span> y plaza confirmada. {pricing.depositNote}</span>
          </div>
        </div>
      </section>

      {/* WHAT'S NOT INCLUDED — small print */}
      <section className="py-16 px-6 lg:px-12 bg-pt-cream/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.18em] text-xs text-pt-clay font-semibold mb-3">No incluido</p>
          <p className="text-pt-muted text-sm leading-relaxed">
            {notIncluded.join(" · ")}
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-clay">Lo que dicen</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 text-pt-ink">
              Volvieron y <span className="text-pt-green">lo cuentan así.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white border border-pt-green/10 rounded-2xl p-6 hover:shadow-xl transition">
                <div className="text-pt-clay text-sm mb-3">★★★★★</div>
                <blockquote className="text-pt-ink leading-relaxed text-sm mb-5">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="text-xs">
                  <div className="font-display font-bold text-pt-green">{r.name}</div>
                  <div className="text-pt-muted">{r.trip}</div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 lg:px-12 bg-pt-cream/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-clay">FAQ</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mt-3 text-pt-ink">
              Preguntas <span className="text-pt-green">frecuentes.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-pt-green/10 px-6 py-5 hover:border-pt-green/30 transition">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-pt-ink">
                  {f.q}
                  <span className="w-7 h-7 rounded-full bg-pt-green-pale text-pt-green flex items-center justify-center text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="mt-4 text-pt-muted leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="reservar" className="relative py-28 px-6 lg:px-12 bg-pt-ink text-white overflow-hidden">
        <div className="absolute inset-0">
          <Img src="/photos/bali/uluwatu/2.jpg" alt="" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-pt-ink via-pt-ink/85 to-pt-green/60" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="font-display uppercase tracking-[0.18em] text-xs font-semibold text-pt-cream/80 mb-4 inline-block">Reservar plaza</span>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-7">
            Tu plaza, <span className="text-pt-cream">por 300€.</span>
          </h2>
          <p className="text-pt-cream/85 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Antes de reservar, hablamos. Una llamada corta con Oriol para que veas si encaja. Si sí, formalizamos plaza.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a href={contact.whatsappLink} className="px-8 py-4 rounded-full bg-pt-cream text-pt-green font-display font-bold hover:bg-white transition shadow-2xl shadow-pt-green/30">
              WhatsApp ahora
            </a>
            <a href={`mailto:${contact.email}`} className="px-8 py-4 rounded-full border-2 border-pt-cream/30 font-display font-bold hover:bg-white/10 transition">
              Email a Oriol
            </a>
          </div>
          <p className="text-sm text-pt-cream/70">Respuesta media: 30 min · Lun a Vie 10:00–20:00 (ES)</p>
        </div>
      </section>

      <footer className="py-12 px-6 lg:px-12 bg-pt-ink text-pt-cream/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2.5">
            <Img src="/logos/monogram.png" alt="" width={28} height={28} className="object-contain" />
            <span className="font-display font-semibold text-pt-cream">Padel Travellers</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={contact.whatsappLink}>WhatsApp</a>
            <a href={`mailto:${contact.email}`}>Email</a>
            <a href={contact.instagram}>Instagram</a>
            <Link href="/" className="text-pt-cream/80 hover:text-white">← Índice</Link>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <a href="#reservar" className="flex items-center justify-between gap-3 bg-pt-green text-white px-5 py-3.5 rounded-full shadow-2xl shadow-pt-green/40">
          <div>
            <div className="font-display font-bold text-sm">Reservar plaza</div>
            <div className="text-xs text-pt-cream/85">300€ · plaza confirmada</div>
          </div>
          <span className="font-bold" aria-hidden>→</span>
        </a>
      </div>
    </main>
  );
}
