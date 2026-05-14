import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import PhotoCarousel from "@/components/PhotoCarousel";
import PdfLeadMagnet from "@/components/PdfLeadMagnet";
import { contact } from "@/data/content";
import { getDestination, Experience } from "@/data/destinations";

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

const baliHeroSlides = [
  { src: "/photos/hero/1-piscina.jpg", alt: "Piscina del club sobre los arrozales" },
  { src: "/photos/hero/4-grupo-cancha.jpg", alt: "Grupo Padel Travellers en la cancha" },
  { src: "/photos/hero/2-padel.jpg", alt: "Partido de pádel en BPA" },
  { src: "/photos/hero/5-grupo-padel.jpg", alt: "Grupo de pádel", position: "50% 80%" },
  { src: "/photos/hero/3-sunset.jpg", alt: "Atardecer en la costa de Bali" },
];

const GROUP_LABEL = {
  padel:        { title: "Pádel",       kicker: "Nuestra pasión" },
  turismo:      { title: "Turismo",     kicker: "¿Qué descubriremos?" },
  actividades:  { title: "Actividades", kicker: "Y más aventura" },
};

export const metadata = {
  title: "Bali · 15 días",
  description:
    "15 días en Bali. Pádel en BPA con coaches NOX, alojamiento privado con desayuno, cultura, surf y aventura. 8 salidas en 2026, desde 1.725€. Itinerario completo día a día.",
};

function ExperienceCard({ e }: { e: Experience }) {
  return (
    <article className="group bg-white border border-pt-green/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <PhotoCarousel
        photos={e.photos}
        alt={e.title}
        aspectClass="aspect-[4/3] rounded-none"
        sizes="(max-width:1024px) 50vw, 33vw"
      />
      <div className="p-6">
        <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-clay mb-2">{e.short}</p>
        <h3 className="font-display font-bold text-xl text-pt-green mb-3 leading-tight">{e.title}</h3>
        <p className="text-sm text-pt-muted leading-relaxed">{e.text}</p>
      </div>
    </article>
  );
}

export default function BaliPage() {
  const d = getDestination("bali")!;
  const groups = (["padel", "turismo", "actividades"] as const).map((g) => ({
    key: g,
    label: GROUP_LABEL[g],
    items: d.experiences.filter((e) => e.group === g),
  }));

  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        {/* HERO con carousel */}
        <section className="relative h-[85svh] min-h-[600px] overflow-hidden">
          {baliHeroSlides.map((s, i) => (
            <div key={s.src} className="hero-slide">
              <Img
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className="object-cover"
                sizes="100vw"
                style={(s as { position?: string }).position ? { objectPosition: (s as { position?: string }).position } : undefined}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-pt-ink/30 via-pt-ink/10 to-pt-ink/85" />
          <div className="absolute inset-0 flex items-end pb-12 lg:pb-12">
            <div className="pl-10 md:pl-16 lg:pl-24 pr-6 max-w-6xl text-white fade-up">
              <h1 className="font-display font-medium text-7xl md:text-9xl lg:text-[12rem] leading-[0.88] tracking-tight">
                Bali
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/95">
                {d.shortPitch}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="#itinerario" className="px-8 py-3.5 rounded-full bg-white text-pt-green font-display font-semibold text-sm hover:bg-pt-cream transition">
                  Ver itinerario día a día
                </Link>
                <Link href="#fechas" className="px-8 py-3.5 rounded-full border border-white/50 text-white font-display font-semibold text-sm hover:bg-white/10 transition">
                  Fechas y plazas
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRA ISLA FAVORITA */}
        <section className="px-6 lg:px-12 py-12 lg:py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6">Nuestra isla favorita</p>
              <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-pt-green mb-7">
                Donde empezó
                <br />
                <span className="font-script italic text-pt-clay">Padel Travellers.</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Bali entró en nuestra vida y ya no la dejó. Es el sitio donde el clima permite jugar todo el año,
                la cultura tiene profundidad real, y dos semanas no son suficientes pero ya cambian algo.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed">
                Canggu es nuestro hogar durante el viaje: comunidad internacional, playas a 5 minutos, los
                arrozales detrás. Y entre ellos, el club Bali Padel Academy donde jugamos cada día.
              </p>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Img src="/photos/extra/bpa/aerial.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Img src="/photos/extra/arrozales/2.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCIAS POR GRUPO */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 bg-pt-cream/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4">Experiencias</p>
              <p className="text-pt-muted text-lg leading-relaxed">
                Experiencias incluidas en el viaje, repartidas en pádel, turismo y aventura. Todas pensadas
                para que vivas Bali a fondo.
              </p>
            </div>

            {groups.map((g, gi) => (
              <div key={g.key} className={gi > 0 ? "mt-12" : ""}>
                <div className="mb-6 flex items-baseline justify-between border-b border-pt-green/15 pb-3">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-pt-green">{g.label.title}</h3>
                  <span className="font-display font-semibold text-pt-clay text-base md:text-xl">{g.label.kicker}</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                  {g.items.map((e) => <ExperienceCard key={e.slug} e={e} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ITINERARIO DÍA A DÍA */}
        <section id="itinerario" className="py-12 lg:py-12 px-6 lg:px-12 bg-pt-green-pale/40">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4">Itinerario</p>
              <h2 className="font-display font-light text-4xl md:text-6xl text-pt-green leading-tight mb-6">
                15 días. Día a día.
              </h2>
              <p className="text-pt-muted text-lg max-w-2xl leading-relaxed">
                El viaje está diseñado al detalle. Cada día tiene su sitio: pádel, cultura, naturaleza,
                gastronomía y descanso, en el orden que mejor funciona. Esto es lo que vivirás.
              </p>
            </div>

            <input type="radio" name="itin-tabs" id="tab-w1" defaultChecked className="hidden" />
            <input type="radio" name="itin-tabs" id="tab-w2" className="hidden" />

            <div className="itin-tabs grid grid-cols-2 gap-2 bg-white p-2 rounded-full shadow-sm border border-pt-green/10 mb-10 max-w-xl">
              <label htmlFor="tab-w1" className="cursor-pointer text-center py-3 px-5 rounded-full font-display font-semibold text-sm transition-all">
                Semana 1 · Días 0–7
              </label>
              <label htmlFor="tab-w2" className="cursor-pointer text-center py-3 px-5 rounded-full font-display font-semibold text-sm transition-all">
                Semana 2 · Días 8–14
              </label>
            </div>

            <div className="itin-panels">
              {(["w1", "w2"] as const).map((wk) => {
                const slice = wk === "w1" ? d.itinerary.slice(0, 8) : d.itinerary.slice(8, 15);
                return (
                  <div key={wk} id={`panel-${wk}`} className="itin-tab-panel space-y-3">
                    {slice.map((day, i) => (
                      <details
                        key={day.day}
                        open={wk === "w1" && i === 0}
                        className="day-card bg-white border border-pt-green/10 hover:border-pt-green/30 transition-all overflow-hidden shadow-sm rounded-3xl"
                      >
                        <summary className="day-summary cursor-pointer px-6 md:px-8 py-5 flex items-center justify-between gap-4">
                          <div className="flex items-baseline gap-3 flex-1 min-w-0">
                            <span className="font-display font-bold text-lg md:text-2xl text-pt-green shrink-0">
                              Día {day.day}
                            </span>
                            <span className="font-display text-pt-muted shrink-0">—</span>
                            <span className="font-display font-medium text-pt-ink/85 text-base md:text-lg truncate">
                              {day.title}
                            </span>
                          </div>
                          <span className="day-arrow w-9 h-9 rounded-full bg-pt-green-pale text-pt-green flex items-center justify-center transition-transform duration-300 shrink-0" aria-hidden>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </summary>
                        <div className="border-t border-pt-green/10 p-6 md:p-8 flex flex-col">
                          <p className="font-display text-sm text-pt-muted italic mb-4">{day.subtitle}</p>
                          <p className="text-sm md:text-base text-pt-ink/85 leading-relaxed mb-5">{day.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.tags.map((t) => (
                              <span key={t} className={`px-2.5 py-0.5 rounded-full text-[10px] font-display uppercase tracking-[0.18em] ${TAG_LABEL[t].color}`}>
                                {TAG_LABEL[t].label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link href="/reservar" className="inline-block px-9 py-4 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20">
                Quiero reservar plaza Bali
              </Link>
            </div>
          </div>
        </section>

        {/* NUESTRO HOGAR */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6">Nuestro hogar</p>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-pt-green mb-6">
                Hotel boutique
                <br />
                <span className="font-script italic font-normal text-pt-clay">en Canggu</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-4">
                Hotel pequeño, seleccionado a mano, en el corazón de Canggu. Piscina, terrazas, ambiente
                tranquilo. Habitaciones privadas siempre — nunca compartirás con desconocidos. Si vienes en
                pareja o grupo, compartís entre vosotros; si vienes solo, habitación individual.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed">
                Desayuno incluido cada mañana con productos frescos de la zona. A 2 minutos del club de
                pádel y a 5 minutos de la playa.
              </p>
              <ul className="mt-7 space-y-2.5 text-sm text-pt-ink/85">
                <li className="flex gap-2.5"><span className="text-pt-green">✓</span>Habitación privada</li>
                <li className="flex gap-2.5"><span className="text-pt-green">✓</span>Desayuno incluido</li>
                <li className="flex gap-2.5"><span className="text-pt-green">✓</span>Piscina y terraza</li>
                <li className="flex gap-2.5"><span className="text-pt-green">✓</span>2 min del club de pádel · 5 min de la playa</li>
              </ul>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Img src="/photos/villa/1.jpg" alt="Habitación" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Img src="/photos/villa/2.jpg" alt="Piscina" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Img src="/photos/villa/3.jpg" alt="Hotel" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Img src="/photos/villa/4.jpg" alt="Desayuno" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
            </div>
          </div>
        </section>

        {/* PDF LEAD MAGNET — compacto tras día a día */}
        <section className="px-6 lg:px-12 py-6 lg:py-8">
          <div className="max-w-6xl mx-auto">
            <PdfLeadMagnet variant="dark" kicker="¿Quieres todo el detalle? · PDF" />
          </div>
        </section>

        {/* INCLUIDO / NO INCLUIDO */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 bg-pt-cream/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4">El precio incluye</p>
              <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-pt-green leading-[0.95]">
                Lo que pagas, lo que no.
              </h2>
            </div>
            <div className="grid md:grid-cols-5 gap-5">
              <div className="md:col-span-3 bg-white rounded-3xl p-8 md:p-10 border border-pt-green/10 shadow-sm">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-pt-green text-white flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-pt-green">Incluido</h3>
                </div>
                <ul className="space-y-4">
                  {d.included.map((i) => (
                    <li key={i} className="flex gap-3 text-pt-ink leading-relaxed border-b border-pt-green/10 pb-4 last:border-0 last:pb-0">
                      <span className="text-pt-green text-xl leading-none shrink-0 mt-0.5">✓</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 bg-pt-ink/95 text-pt-cream rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-pt-clay text-white flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-pt-cream">No incluido</h3>
                </div>
                <ul className="space-y-4">
                  {d.notIncluded.map((i) => (
                    <li key={i} className="flex gap-3 leading-relaxed text-pt-cream/85 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <span className="text-pt-clay shrink-0">—</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FECHAS — compacto en cards */}
        <section id="fechas" className="py-12 lg:py-12 px-6 lg:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4">Calendario 2026</p>
              <h2 className="font-display font-light text-4xl md:text-6xl text-pt-green leading-[0.95]">
                Ocho salidas.
                <br />
                <span className="font-script italic text-pt-clay">Elige la tuya.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {d.trips.map((t) => {
                const left = liveAvailability[t.n] ?? 12;
                const fillPct = ((12 - left) / 12) * 100;
                const urgent = left <= 6;
                return (
                  <Link
                    key={t.n}
                    href="/reservar"
                    className={`group flex flex-col rounded-2xl border p-5 hover:-translate-y-0.5 transition-all duration-300 ${
                      urgent
                        ? "bg-pt-clay/5 border-pt-clay/30 hover:border-pt-clay hover:shadow-xl"
                        : "bg-white border-pt-green/10 hover:border-pt-green hover:shadow-xl"
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-3">
                      <span className={`font-display font-extralight text-4xl ${urgent ? "text-pt-clay" : "text-pt-green"}`}>
                        {String(t.n).padStart(2, "0")}
                      </span>
                      <span className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-muted">{t.month}</span>
                    </div>
                    <div className="font-display font-semibold text-pt-ink leading-tight">{t.range}</div>
                    <div className="text-xs text-pt-muted mt-1 mb-4">15 días</div>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1.5 bg-pt-green-pale rounded-full overflow-hidden">
                          <div className={`h-full ${urgent ? "bg-pt-clay" : "bg-pt-green"}`} style={{ width: `${fillPct}%` }} />
                        </div>
                      </div>
                      <div className={`text-[11px] font-display font-semibold ${urgent ? "text-pt-clay" : "text-pt-green"}`}>
                        {urgent ? `🔥 Quedan ${left}` : "Disponible"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <p className="mt-8 text-sm text-pt-muted text-center">
              ¿No sabes cuál te encaja? <a href={contact.whatsappLink} className="text-pt-green font-medium hover:underline">Pregúntanos por WhatsApp</a>.
            </p>
          </div>
        </section>

        {/* PRECIO */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 bg-pt-green text-white relative overflow-hidden">
          <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-pt-clay/20 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-pt-green-soft/40 blur-3xl" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-cream/70">Precio Bali 2026</span>
              <h2 className="font-display font-extralight text-3xl md:text-5xl mt-4 leading-tight">
                Un precio. Todo incluido
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-9 border border-white/20 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-pt-cream/80 text-sm">En pareja / compartiendo</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pt-cream/20">Recomendado</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-bold text-6xl">{d.basePrice}</span>
                  <span className="text-pt-cream/70">/ persona</span>
                </div>
                <p className="text-pt-cream/80 text-sm mb-6 flex-1">Compartiendo habitación con tu pareja, amigo o familiar.</p>
                <Link href="/reservar" className="block text-center px-6 py-3 rounded-full bg-pt-cream text-pt-green font-display font-semibold text-sm hover:bg-white transition">
                  Reservar plaza
                </Link>
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
        <section className="py-10 lg:py-12 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-script text-pt-clay text-3xl mb-5 -rotate-2">cierra tu plaza</p>
            <h2 className="font-display font-light text-4xl md:text-6xl text-pt-green leading-[0.95] mb-7">
              ¿Vamos a Bali?
            </h2>
            <p className="text-pt-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Antes de reservar, hablamos. Una llamada corta y vemos si encaja. Si no, sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/reservar" className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-sm hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20">
                Empezar reserva · 500€
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
