import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import { contact } from "@/data/content";
import { getDestination } from "@/data/destinations";

const liveAvailability: Record<number, number> = {
  1: 12, 2: 6, 3: 12, 4: 10, 5: 7, 6: 5, 7: 6, 8: 12,
};

const TAG_LABEL: Record<string, { label: string; color: string }> = {
  padel:      { label: "Pádel",       color: "bg-pt-green text-white" },
  cultura:    { label: "Cultura",     color: "bg-pt-clay text-white" },
  naturaleza: { label: "Naturaleza",  color: "bg-pt-green-soft text-white" },
  playa:      { label: "Playa",       color: "bg-pt-sand text-pt-ink" },
  libre:      { label: "Libre",       color: "bg-pt-green-pale text-pt-green" },
  social:     { label: "Social",      color: "bg-pt-cream text-pt-ink" },
};

export const metadata = {
  title: "Bali — destino Padel Travellers · 14 días",
  description:
    "14 días en Bali. Pádel en BPA, alojamiento privado con desayuno, 11 experiencias culturales y de naturaleza. 8 salidas en 2026, desde 1.725€. Itinerario día a día completo.",
};

export default function BaliPage() {
  const d = getDestination("bali")!;
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        {/* HERO destino */}
        <section className="relative h-[95svh] min-h-[640px] overflow-hidden">
          <Image src={d.hero} alt={d.heroAlt} fill priority className="object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-pt-ink/30 via-pt-ink/10 to-pt-ink/85" />
          <div className="absolute inset-0 flex items-end pb-20 lg:pb-28">
            <div className="px-6 lg:px-12 max-w-6xl text-white fade-up">
              <p className="font-display uppercase tracking-[0.32em] text-[11px] mb-6 opacity-90">
                Destino · 01 · {d.duration}
              </p>
              <h1 className="font-display font-extralight text-6xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight">
                Bali.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/95">
                {d.shortPitch}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-display">
                <span><span className="opacity-60 uppercase tracking-[0.18em] text-[10px] mr-2">Duración</span>{d.duration}</span>
                <span><span className="opacity-60 uppercase tracking-[0.18em] text-[10px] mr-2">Grupo</span>{d.groupSize}</span>
                <span><span className="opacity-60 uppercase tracking-[0.18em] text-[10px] mr-2">Desde</span>{d.basePrice}</span>
                <span><span className="opacity-60 uppercase tracking-[0.18em] text-[10px] mr-2">Salidas 2026</span>{d.trips.length}</span>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="#itinerario" className="px-8 py-3.5 rounded-full bg-white text-pt-green font-display font-semibold text-sm hover:bg-pt-cream transition">
                  Ver itinerario 14 días
                </Link>
                <Link href="#fechas" className="px-8 py-3.5 rounded-full border border-white/50 text-white font-display font-semibold text-sm hover:bg-white/10 transition">
                  Fechas y plazas
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO BALI */}
        <section className="px-6 lg:px-12 py-24 lg:py-36 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">Por qué Bali</p>
              <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green">
                La isla que entendimos primero.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-10 space-y-5 text-lg leading-relaxed text-pt-ink/85">
              <p>{d.description}</p>
              <p>
                Bali permite hacer un viaje al ritmo de cada uno. Por la mañana puedes estar en pista; por la
                tarde, en un templo del siglo XI; al día siguiente, surfeando o snorkelando. Y todo en una isla
                lo bastante pequeña como para no perder media semana en traslados.
              </p>
              <p>
                En estos años hemos llevado 54 viajeros y refinado el viaje cada vez. Lo que vas a leer abajo no
                es teoría: es lo que funciona.
              </p>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS DESTINO */}
        <section className="bg-pt-cream/50 py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4 text-center">Qué hace este viaje</p>
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green text-center max-w-3xl mx-auto mb-14 leading-tight">
              Cuatro razones para venir a Bali con nosotros.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {d.highlights.map((h) => (
                <div key={h.title} className="bg-white border border-pt-green/10 rounded-2xl p-7 hover:shadow-xl transition">
                  <div className="w-12 h-12 rounded-xl bg-pt-green-pale flex items-center justify-center text-2xl mb-5">
                    {h.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-pt-ink mb-3">{h.title}</h3>
                  <p className="text-sm text-pt-muted leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ITINERARIO DÍA A DÍA */}
        <section id="itinerario" className="py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Itinerario</p>
              <h2 className="font-display font-light text-4xl md:text-5xl text-pt-green leading-tight">
                14 días. Día a día.
              </h2>
              <p className="text-pt-muted mt-6 max-w-2xl mx-auto leading-relaxed">
                Esto es un viaje tipo. El coordinador adapta detalles según el grupo, la climatología y los
                planes paralelos que vayan surgiendo. La columna vertebral siempre es la misma.
              </p>
            </div>

            <ol className="relative">
              {/* timeline vertical line */}
              <div className="absolute left-[27px] md:left-[55px] top-2 bottom-2 w-px bg-pt-green/20" aria-hidden />

              {d.itinerary.map((day) => (
                <li key={day.day} className="relative pl-16 md:pl-32 pb-12 last:pb-0">
                  <div className="absolute left-0 md:left-3 top-0 w-[55px] h-[55px] rounded-full bg-pt-cream border-2 border-pt-green/30 flex items-center justify-center font-display font-bold text-pt-green text-sm shadow-sm">
                    {String(day.day).padStart(2, "0")}
                  </div>

                  <article className="group bg-white border border-pt-green/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="grid md:grid-cols-12 gap-0">
                      <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[260px]">
                        <Image src={day.photo} alt={day.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-[0.22em] text-pt-green">
                          {day.weekday}
                        </div>
                      </div>
                      <div className="md:col-span-7 p-6 md:p-8 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {day.tags.map((t) => (
                            <span key={t} className={`px-2.5 py-0.5 rounded-full text-[10px] font-display uppercase tracking-[0.18em] ${TAG_LABEL[t].color}`}>
                              {TAG_LABEL[t].label}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-display font-medium text-2xl md:text-3xl text-pt-green leading-tight mb-2">
                          {day.title}
                        </h3>
                        <p className="font-display text-sm text-pt-muted italic mb-4">{day.subtitle}</p>
                        <p className="text-sm text-pt-ink/85 leading-relaxed mb-5 flex-1">{day.description}</p>
                        {day.highlights.length > 0 && (
                          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-pt-muted">
                            {day.highlights.map((h) => (
                              <li key={h} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-pt-clay" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>

            <div className="mt-16 text-center">
              <Link href="/reservar" className="inline-block px-9 py-4 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20">
                Quiero reservar plaza Bali
              </Link>
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="bg-pt-cream/40 py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Galería</p>
              <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green leading-tight">
                Bali en imágenes.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {d.experiences.slice(0, 8).map((e, i) => (
                <div key={e.slug} className={`relative ${i % 5 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"} rounded-2xl overflow-hidden`}>
                  <Image src={e.photos[0]} alt={e.title} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INCLUIDO */}
        <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Qué incluye</p>
              <h2 className="font-display font-light text-3xl text-pt-green mb-8 leading-tight">Todo lo importante.</h2>
              <ul className="space-y-4">
                {d.included.map((i) => (
                  <li key={i} className="flex gap-3 text-pt-ink leading-relaxed">
                    <span className="text-pt-green font-bold mt-0.5">✓</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:border-l md:border-pt-green/15 md:pl-16">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">No incluye</p>
              <h2 className="font-display font-light text-3xl text-pt-green mb-8 leading-tight">Lo dejamos a tu criterio.</h2>
              <ul className="space-y-4">
                {d.notIncluded.map((i) => (
                  <li key={i} className="flex gap-3 text-pt-muted leading-relaxed">
                    <span className="text-pt-clay">—</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              {(d.weather || d.gettingThere) && (
                <div className="mt-10 space-y-5">
                  {d.weather && (
                    <div>
                      <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-clay mb-2">Clima</p>
                      <p className="text-sm text-pt-ink/80 leading-relaxed">{d.weather}</p>
                    </div>
                  )}
                  {d.gettingThere && (
                    <div>
                      <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-clay mb-2">Cómo llegar</p>
                      <p className="text-sm text-pt-ink/80 leading-relaxed">{d.gettingThere}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FECHAS LIVE */}
        <section id="fechas" className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-4">Salidas 2026</p>
              <h2 className="font-display font-light text-4xl md:text-5xl text-pt-green leading-tight">
                Ocho fechas. Plazas actualizadas.
              </h2>
            </div>
            <div className="bg-pt-cream/40 rounded-3xl border border-pt-green/10 overflow-hidden">
              {d.trips.map((t, i) => {
                const left = liveAvailability[t.n] ?? 12;
                const fillPct = ((12 - left) / 12) * 100;
                const urgent = left <= 6;
                return (
                  <div key={t.n} className={`grid grid-cols-12 items-center gap-3 lg:gap-6 px-5 lg:px-8 py-5 ${i < d.trips.length - 1 ? "border-b border-pt-green/10" : ""} ${urgent ? "bg-pt-clay/5" : ""}`}>
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
                    <Link href="/reservar" className={`col-span-3 lg:col-span-2 text-center text-xs font-display font-semibold px-3 py-2 rounded-full ${urgent ? "bg-pt-clay text-white" : "bg-pt-green text-white"} hover:opacity-90 transition`}>
                      Reservar
                    </Link>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-pt-muted text-center">
              ¿No sabes cuál te encaja? <a href={contact.whatsappLink} className="text-pt-green font-medium hover:underline">Pregúntale a Marta por WhatsApp</a>.
            </p>
          </div>
        </section>

        {/* PRECIO */}
        <section className="py-24 px-6 lg:px-12 bg-pt-green text-white relative overflow-hidden">
          <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-pt-clay/20 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-pt-green-soft/40 blur-3xl" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70">Precio Bali 2026</span>
              <h2 className="font-display font-extralight text-3xl md:text-5xl mt-4 leading-tight">
                Un precio. Todo dentro.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-9 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-pt-cream/80 text-sm">En pareja / compartiendo</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pt-cream/20">Recomendado</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-bold text-6xl">{d.basePrice}</span>
                  <span className="text-pt-cream/70">/ persona</span>
                </div>
                <p className="text-pt-cream/80 text-sm mb-6">Compartiendo habitación con tu pareja, amigo o familiar.</p>
              </div>
              <div className="bg-white text-pt-ink rounded-3xl p-9">
                <span className="text-pt-clay text-sm">Habitación individual</span>
                <div className="flex items-baseline gap-2 mb-3 mt-6">
                  <span className="font-display font-bold text-6xl text-pt-green">{d.solo}</span>
                  <span className="text-pt-muted">/ persona</span>
                </div>
                <p className="text-pt-muted text-sm mb-6">Suplemento individual de 250€. Tu habitación, tu llave.</p>
                <Link href="/reservar" className="block text-center px-6 py-3 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition">
                  Reservar plaza
                </Link>
              </div>
            </div>
            <div className="mt-10 text-center text-pt-cream/85">
              <span className="font-script italic text-2xl text-pt-cream">{d.deposit}</span>
              <span> reserva. El resto antes del viaje. Sin bote común, sin recargos.</span>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-28 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-script text-pt-clay text-3xl mb-5 -rotate-2">cierra tu plaza</p>
            <h2 className="font-display font-light text-4xl md:text-6xl text-pt-green leading-[0.95] mb-8">
              ¿Vamos a Bali?
            </h2>
            <p className="text-pt-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Antes de cobrar nada, hablamos. Una llamada con Oriol y vemos si encaja. Si no, sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/reservar" className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-sm hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20">
                Empezar reserva · 300€
              </Link>
              <a href={contact.whatsappLink} className="px-9 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-sm hover:bg-pt-green hover:text-white transition">
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta label="Reservar Bali" />
    </>
  );
}
