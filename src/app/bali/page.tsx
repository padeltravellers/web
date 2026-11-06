import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoCarousel from "@/components/PhotoCarousel";
import PdfLeadMagnet from "@/components/PdfLeadMagnet";
import TripCards from "@/components/TripCards";
import GoogleReviews, { RatingSummary } from "@/components/GoogleReviews";
import { contact } from "@/data/content";
import { getDestination, Experience } from "@/data/destinations";


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
  title: "Bali · 14 días",
  description:
    "14 días en Bali. Pádel en BPA con coaches NOX, alojamiento privado con desayuno, cultura, surf y aventura. 8 salidas en 2027, desde 1.490€. Itinerario completo día a día.",
  openGraph: {
    images: [{ url: "https://padeltravellers.com/og/bali.jpg", width: 1200, height: 630, alt: "Bali con Padel Travellers — piscina del club sobre los arrozales" }],
  },
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
                <Link href="#itinerario" className="px-9 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-base md:text-lg text-center hover:bg-pt-cream transition">
                  Ver itinerario
                </Link>
                <Link href="#fechas" className="px-9 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-base md:text-lg text-center hover:bg-pt-cream transition">
                  Fechas y plazas
                </Link>
                <Link href="/reservar/bali/" className="px-9 py-4 rounded-full bg-pt-clay text-white font-display font-semibold text-base md:text-lg text-center hover:brightness-105 shadow-lg shadow-pt-ink/30 transition">
                  Reservar plaza
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DATOS CLAVE */}
        <section className="bg-pt-green text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-center">
            {[
              ["14 días", "13 noches en Canggu"],
              ["8 salidas", "de junio a octubre"],
              ["8 a 12", "viajeros por grupo"],
              ["Coordinador", "local, todo el viaje"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-display font-semibold text-xl md:text-2xl leading-tight">{a}</p>
                <p className="text-pt-cream/75 text-sm mt-0.5">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NUESTRA ISLA FAVORITA */}
        <section className="px-6 lg:px-12 py-12 lg:py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Nuestra isla favorita</p>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-pt-green mb-7">
                Donde empezó
                <br />
                <span className="accent text-pt-clay inline-block mt-1">Padel Travellers</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Bali fue nuestro primer destino y sigue siendo el favorito. Aquí se juega al pádel todo el año,
                la cultura se vive en cada rincón y en dos semanas da tiempo a enamorarse de la isla.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed">
                Durante el viaje vivimos en Canggu, entre arrozales y a pocos minutos de la playa. Muy cerca está
                Bali Padel Academy, el club donde jugamos los partidos y las clases.
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

        {/* EXPERIENCIAS: EL PÁDEL */}
        <section className="py-12 lg:py-14 px-6 lg:px-12 bg-pt-cream/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">El pádel</p>
              <p className="text-pt-muted text-lg leading-relaxed">Jugamos en Bali Padel Academy, entre arrozales: partidos con el grupo, clases con coach y el mejor ambiente de la isla.</p>
            </div>
            {groups.filter((g) => ["padel"].includes(g.key)).map((g, gi) => (
              <div key={g.key} className={gi > 0 ? "mt-12" : ""}>
                <div className="mb-6 flex items-baseline justify-between border-b border-pt-green/15 pb-3">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-pt-green">{g.label.title}</h3>
                  <span className="font-display font-semibold text-pt-clay text-base md:text-xl">{g.label.kicker}</span>
                </div>
                <div className={`grid gap-5 lg:gap-6 ${g.items.length <= 2 ? "sm:grid-cols-2 max-w-3xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {g.items.map((e) => <ExperienceCard key={e.slug} e={e} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ITINERARIO DÍA A DÍA */}
        <section id="itinerario" className="py-12 lg:py-14 px-6 lg:px-12 bg-pt-green-pale/40 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Itinerario</p>
              <h2 className="font-display font-medium text-4xl md:text-6xl text-pt-green leading-tight">
                14 días. Día a día.
              </h2>
              <p className="text-pt-muted mt-3">Pulsa cada día para ver el detalle.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 items-start">
              {([
                ["Semana 1", d.itinerary.slice(0, 7)],
                ["Semana 2", d.itinerary.slice(7, 14)],
              ] as const).map(([label, days]) => (
                <div key={label}>
                  <p className="font-display font-semibold text-pt-green mb-3">{label}</p>
                  <div className="space-y-2">
                    {days.map((day) => (
                      <details key={day.day} className="day-card bg-white border border-pt-green/10 hover:border-pt-green/30 rounded-2xl overflow-hidden">
                        <summary className="day-summary cursor-pointer p-2 pr-4 flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-pt-green-pale">
                            <Img src={day.photo} alt="" fill className="object-cover" sizes="44px" loading="lazy" />
                          </div>
                          <span className="font-display font-bold text-xs uppercase tracking-[0.1em] text-pt-clay w-12 shrink-0">Día {day.day}</span>
                          <span className="flex-1 min-w-0 font-display font-medium text-pt-ink/90 leading-snug">{day.title}</span>
                          <span className="day-arrow w-7 h-7 rounded-full bg-pt-green-pale text-pt-green flex items-center justify-center transition-transform duration-300 shrink-0" aria-hidden>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </summary>
                        <div className="border-t border-pt-green/10 p-5">
                          <div className="space-y-3 text-[15px] text-pt-ink/85 leading-relaxed mb-4">
                            {day.description.split("\n\n").map((para, pi) => (
                              <p key={pi}>
                                {para.split(/\*\*(.+?)\*\*/g).map((chunk, ci) =>
                                  ci % 2 === 1 ? <strong key={ci} className="font-semibold text-pt-ink">{chunk}</strong> : chunk
                                )}
                              </p>
                            ))}
                          </div>
                          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-pt-green-pale">
                            <Img src={day.photo} alt={day.title} fill className="object-cover" sizes="(max-width:768px) 90vw, 560px" loading="lazy" />
                          </div>
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
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/reservar/bali/" className="inline-block px-10 py-4 rounded-full bg-pt-green text-white font-display font-semibold text-lg md:text-xl hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20">
                Reservar plaza
              </Link>
            </div>
          </div>
        </section>

        {/* EXPERIENCIAS: ADEMÁS DEL PÁDEL */}
        <section className="py-12 lg:py-14 px-6 lg:px-12 bg-pt-cream/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Además del pádel</p>
              <p className="text-pt-muted text-lg leading-relaxed">Templos, arrozales, playas y aventura: lo mejor de Bali, incluido en el viaje.</p>
            </div>
            {groups.filter((g) => ["turismo", "actividades"].includes(g.key)).map((g, gi) => (
              <div key={g.key} className={gi > 0 ? "mt-12" : ""}>
                <div className="mb-6 flex items-baseline justify-between border-b border-pt-green/15 pb-3">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-pt-green">{g.label.title}</h3>
                  <span className="font-display font-semibold text-pt-clay text-base md:text-xl">{g.label.kicker}</span>
                </div>
                <div className={`grid gap-5 lg:gap-6 ${g.items.length <= 2 ? "sm:grid-cols-2 max-w-3xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {g.items.map((e) => <ExperienceCard key={e.slug} e={e} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NUESTRO HOGAR */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Nuestro hogar</p>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-pt-green mb-6">
                Hotel
                <br />
                <span className="accent text-pt-clay">en Canggu</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-4">
                Hotel seleccionado a mano, en el corazón de Canggu. Piscina, terrazas, ambiente
                tranquilo. Habitaciones privadas siempre — nunca compartirás con desconocidos. Si vienes en
                pareja o grupo, compartís entre vosotros; si vienes solo, habitación individual.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed">
                Desayuno incluido cada mañana con productos frescos de la zona. A 2 minutos del club de
                pádel y a 5 minutos de la playa.
              </p>
              <ul className="mt-7 space-y-2.5 text-sm text-pt-ink/85">
                <li className="flex gap-2.5"><span className="text-pt-green">✓</span>Nunca compartes con desconocidos</li>
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

        {/* INCLUIDO / NO INCLUIDO */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 bg-pt-cream/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Qué incluye</p>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-pt-green leading-[1.05]">
                Todo lo que incluye tu viaje
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

        {/* RESEÑAS */}
        <section className="py-12 lg:py-14 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay">Reseñas</span>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl mt-2 text-pt-green leading-[1.05]">
                Lo que dicen los que
                <br />
                <span className="accent text-pt-clay">ya volvieron</span>
              </h2>
              <div className="mt-8 flex justify-center divide-x divide-pt-green/15">
                {[
                  ["4", "años"],
                  ["9", "viajes"],
                  ["61", "viajeros"],
                ].map(([n, l]) => (
                  <div key={l} className="px-6 md:px-10">
                    <p className="font-display font-semibold text-4xl md:text-5xl text-pt-green leading-none">{n}</p>
                    <p className="font-display uppercase tracking-[0.18em] text-xs text-pt-clay mt-2">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-center"><RatingSummary /></div>
            </div>
            <GoogleReviews />
          </div>
        </section>

        {/* PRECIO */}
        <section className="py-12 lg:py-12 px-6 lg:px-12 bg-pt-green text-white relative overflow-hidden">
          <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-pt-clay/20 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-pt-green-soft/40 blur-3xl" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-cream/70">Precio Bali 2027</span>
              <h2 className="font-display font-medium text-3xl md:text-5xl mt-2 leading-tight">
                Un precio cerrado, sin sorpresas
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8 md:p-9 border border-white/20 flex flex-col">
                <div className="flex items-center justify-between h-7 mb-5">
                  <span className="text-pt-cream/85 text-sm font-display font-semibold uppercase tracking-[0.12em]">Habitación compartida</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pt-cream/20">Recomendado</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-bold text-6xl">{d.basePrice}</span>
                  <span className="text-pt-cream/70">/ persona</span>
                </div>
                <p className="text-pt-cream/80 text-[15px] mb-7 whitespace-nowrap">Para dos personas que viajan juntas.</p>
                <Link href="/reservar/bali/" className="mt-auto block text-center px-6 py-3.5 rounded-full bg-pt-cream text-pt-green font-display font-semibold text-lg hover:bg-white transition">
                  Reservar plaza
                </Link>
              </div>
              <div className="bg-white text-pt-ink rounded-3xl p-8 md:p-9 flex flex-col">
                <div className="flex items-center h-7 mb-5">
                  <span className="text-pt-clay text-sm font-display font-semibold uppercase tracking-[0.12em]">Habitación individual</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-bold text-6xl text-pt-green">{d.solo}</span>
                  <span className="text-pt-muted">/ persona</span>
                </div>
                <p className="text-pt-muted text-[15px] mb-7 whitespace-nowrap">Una habitación solo para ti.</p>
                <Link href="/reservar/bali/" className="mt-auto block text-center px-6 py-3.5 rounded-full bg-pt-green text-white font-display font-semibold text-lg hover:bg-pt-green-soft transition">
                  Reservar plaza
                </Link>
              </div>
            </div>
            <div className="mt-10 text-center text-pt-cream/85">
              <span className="accent text-2xl text-pt-cream">{d.deposit}</span>
              <span> de reserva, reembolsables hasta que se confirma el grupo. El resto, en dos pagos.</span>
            </div>
          </div>
        </section>

        {/* FECHAS — compacto en cards */}
        <section id="fechas" className="py-12 lg:py-12 px-6 lg:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Calendario 2027</p>
              <h2 className="font-display font-medium text-4xl md:text-6xl text-pt-green leading-[1.05]">
                Ocho salidas.
                <br />
                <span className="accent text-pt-clay">Elige la tuya</span>
              </h2>
            </div>

            <TripCards trips={d.trips} />

            <p className="mt-8 text-sm text-pt-muted text-center">
              ¿No sabes cuál te encaja? <a href={contact.whatsappLink} className="text-pt-green font-medium hover:underline">Pregúntanos por WhatsApp</a>.
            </p>
          </div>
        </section>

        {/* PDF LEAD MAGNET */}
        <section className="px-6 lg:px-12 py-6 lg:py-8">
          <div className="max-w-6xl mx-auto">
            <PdfLeadMagnet variant="dark" kicker="¿Quieres todo el detalle? · PDF" />
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-10 lg:py-12 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-medium text-4xl md:text-6xl text-pt-green leading-[1.05] mb-7">
              ¿Vamos a Bali?
            </h2>
            <p className="text-pt-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Reserva online en unos minutos con 100 € reembolsables. Y si antes quieres hablar, escríbenos por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/reservar/bali/" className="px-10 py-4 rounded-full bg-pt-green text-white font-display font-bold text-lg hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20">
                Empezar reserva · 100€
              </Link>
              <a href={contact.whatsappLink} className="px-10 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-lg hover:bg-pt-green hover:text-white transition">
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
