import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import { contact } from "@/data/content";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Padel Travellers — Viajes en grupo de pádel y aventura",
  description:
    "Viajes en grupo que combinan pádel y aventura. Destinos cuidados, alojamiento privado, coordinador español. Bali abierto 2026, Filipinas próximamente.",
};

const heroSlides = [
  { src: "/photos/extra/bpa/aerial.jpg", alt: "Pista de pádel desde arriba — Bali Padel Academy" },
  { src: "/photos/extra/bpa/piscina-atardecer.jpg", alt: "Piscina infinita sobre arrozales al atardecer" },
  { src: "/photos/extra/templos/1.jpg", alt: "Templo balinés" },
  { src: "/photos/extra/arrozales/1.jpg", alt: "Arrozales de Tegallalang" },
];

const ptStats = [
  { value: "3", label: "Años organizando", suffix: "" },
  { value: "7", label: "Viajes completados", suffix: "" },
  { value: "54", label: "Viajeros con nosotros", suffix: "+" },
];

const pillars = [
  {
    icon: "🎾",
    title: "Pádel en clubs premium",
    text:
      "Pistas premium seleccionadas en cada destino. En Bali jugamos en BPA: 7 pistas cubiertas de clase mundial entre los arrozales de Canggu, con coaches NOX. Solo jugamos donde nosotros jugaríamos.",
  },
  {
    icon: "🏡",
    title: "Alojamientos confort",
    text:
      "Hoteles boutique seleccionados con desayuno incluido. Habitaciones privadas siempre — nunca compartirás con desconocidos. Máximo dos personas por habitación si vais juntos.",
  },
  {
    icon: "🧭",
    title: "Coordinador español",
    text:
      "Una persona del equipo Padel Travellers viaja contigo todo el viaje. No es un guía local: conoce el destino, al grupo y resuelve cualquier cosa que surja, día y noche.",
  },
  {
    icon: "✓",
    title: "Todo incluido",
    text:
      "Alojamiento, pádel, actividades, entradas, transporte interno y coordinador. Solo te ocupas de tus vuelos y comidas. Sin bote común. Sin sorpresas en destino.",
  },
];

const reviews = [
  {
    name: "Pau M.",
    quote:
      "Vine a jugar pádel y volví con un grupo de amigos para toda la vida. El equipo PT lo borda en lo pequeño: que no falte nada, que cada día cuadre.",
    trip: "Bali · agosto 2025",
  },
  {
    name: "Sara R.",
    quote:
      "Iba con miedo de ir sola. A los dos días ya era imposible imaginarse el viaje sin el resto. La pista, los templos, el café, Uluwatu… todo cuadra.",
    trip: "Bali · julio 2025",
  },
  {
    name: "Iker L.",
    quote:
      "El nivel de pádel sorprende. No es \"viaje de jugar a peloteo\": se compite, se aprende. Pero también se desconecta. Está bien medido.",
    trip: "Bali · septiembre 2025",
  },
  {
    name: "Adria V.",
    quote:
      "Volvería mañana mismo. El coordinador hace que no te tengas que preocupar de nada. Llegas al aeropuerto y desconectas hasta el día que vuelves.",
    trip: "Bali · julio 2025",
  },
];

export default function Home() {
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        {/* HERO — carousel, sin badge, altura reducida */}
        <section className="relative h-[85svh] min-h-[600px] overflow-hidden">
          {heroSlides.map((s) => (
            <div key={s.src} className="hero-slide">
              <Img src={s.src} alt={s.alt} fill priority className="object-cover" sizes="100vw" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-pt-green/40 via-pt-green/15 to-pt-green/85" />
          <div className="absolute inset-0 flex items-end pb-16 lg:pb-20">
            <div className="px-6 lg:px-12 max-w-6xl text-white fade-up">
              <h1 className="font-display font-extralight text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight">
                Viajes en grupo
                <br />
                <span className="font-script font-normal italic">de pádel y aventura.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/95">
                Destinos cuidados, alojamiento privado, coordinador español y un grupo afín. El pádel como hilo,
                la aventura como destino.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/bali" className="px-9 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-base hover:bg-pt-cream transition">
                  Ver destino Bali
                </Link>
                <Link href="/reservar" className="px-9 py-4 rounded-full border border-white/50 text-white font-display font-semibold text-base hover:bg-white/10 transition">
                  Reservar plaza · 300€
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS rediseñadas — cards con número grande y caja */}
        <section className="bg-pt-cream/50 border-b border-pt-green/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ptStats.map((s) => (
                <div
                  key={s.label}
                  className="relative bg-white rounded-3xl p-8 lg:p-10 border border-pt-green/10 hover:border-pt-green hover:shadow-xl transition-all group overflow-hidden"
                >
                  <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-pt-green-pale opacity-50 group-hover:scale-125 transition-transform duration-500" />
                  <div className="relative">
                    <div className="flex items-baseline gap-1">
                      {s.suffix && (
                        <span className="font-display font-light text-3xl md:text-4xl text-pt-clay">{s.suffix}</span>
                      )}
                      <span className="font-display font-extralight text-7xl md:text-8xl text-pt-green tracking-tight leading-none">
                        {s.value}
                      </span>
                    </div>
                    <div className="font-display font-medium uppercase tracking-[0.22em] text-xs text-pt-muted mt-5">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ¿Qué es Padel Travellers? — copy genérico, título grande, fotos alineadas */}
        <section className="px-6 lg:px-12 py-20 lg:py-28 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.28em] text-sm md:text-base font-semibold text-pt-clay mb-6">¿Qué es Padel Travellers?</p>
              <h2 className="font-display font-light text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-pt-green mb-8">
                Viajes que combinan
                <br />
                <span className="font-script italic text-pt-clay">pádel y aventura.</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Padel Travellers nació como la unión de dos pasiones: viajar y el pádel. Diseñamos viajes en
                grupo a destinos pensados, donde cada día combina pista, cultura y descubrimiento.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Somos viajeros, jugadores y apasionados de los sitios que elegimos. Nuestra misión es abrir
                esas puertas al resto del mundo, vivir cada destino como locales: enseñar los rincones que nos
                inspiran, colaborar con proveedores de la zona y respetar la cultura del lugar.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed mb-8">
                Aquí no importa si vienes acompañado o solo, si llevas años jugando al pádel o si acabas de
                empezar. Lo único que necesitas son ganas de vivir la aventura.
              </p>
              <Link href="/sobre" className="inline-flex items-center gap-2 font-display font-medium text-base text-pt-green hover:gap-3 transition-all">
                Conoce el equipo y la historia
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Img src="/photos/extra/padel-action/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Img src="/photos/extra/arrozales/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Img src="/photos/extra/atardecer/2.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Img src="/photos/extra/la-brisa/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
            </div>
          </div>
        </section>

        {/* DESTINOS — título más grande */}
        <section id="destinos" className="bg-pt-cream/50 py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <span className="font-display uppercase tracking-[0.28em] text-sm md:text-base font-semibold text-pt-clay">Destinos</span>
                <h2 className="font-display font-light text-5xl md:text-6xl lg:text-7xl mt-4 leading-[0.95] text-pt-green">
                  Dónde viajamos.
                </h2>
              </div>
              <p className="text-pt-muted max-w-md text-lg">
                Empezamos en Bali porque era el destino que mejor conocíamos. Filipinas viene en 2027. Cada
                destino, una temporada.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group relative aspect-[4/5] lg:aspect-[4/3] rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 no-tap-highlight"
                >
                  <Img src={d.hero} alt={d.heroAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pt-ink via-pt-ink/30 to-transparent" />
                  <div className="absolute left-6 right-6 bottom-6 text-white">
                    <h3 className="font-display text-6xl md:text-7xl font-light leading-none mb-4">{d.name}</h3>
                    <p className="text-white/95 text-lg leading-relaxed mb-5 max-w-md font-light">{d.shortPitch}</p>
                    <div className="flex flex-wrap items-center gap-5 text-base mb-6">
                      <span><span className="opacity-70">Duración </span>{d.duration}</span>
                      <span><span className="opacity-70">Grupo </span>{d.groupSize}</span>
                      {d.status === "open" && (
                        <span><span className="opacity-70">Desde </span>{d.basePrice}</span>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-2 font-display font-semibold text-base group-hover:gap-3 transition-all">
                      {d.status === "open" ? "Ver destino" : "Apúntate a la lista de espera"}
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ¿POR QUÉ ELEGIRNOS? — título grande */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-display uppercase tracking-[0.28em] text-sm md:text-base font-semibold text-pt-clay">¿Por qué elegirnos?</span>
            <h2 className="font-display font-light text-5xl md:text-6xl lg:text-7xl mt-5 leading-[0.95] text-pt-green">
              Cuatro razones
              <br />
              <span className="font-script italic text-pt-clay">que cambian el viaje.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <div key={p.title} className="group bg-white border border-pt-green/10 rounded-2xl p-7 hover:border-pt-green hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-pt-green-pale flex items-center justify-center text-2xl mb-5 group-hover:bg-pt-green group-hover:scale-105 transition">
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-pt-ink mb-3">{p.title}</h3>
                <p className="text-sm text-pt-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CÓMO RESERVAR — título grande ya */}
        <section className="bg-pt-green text-pt-cream py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-display uppercase tracking-[0.28em] text-sm md:text-base font-semibold text-pt-cream/70">Cómo reservar</span>
              <h2 className="font-display font-extralight text-5xl md:text-7xl lg:text-8xl mt-5 leading-[0.92]">
                Cuatro pasos.
                <br />
                <span className="font-script italic text-pt-cream">Sin sorpresas.</span>
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8">
              {[
                { n: "01", title: "Eliges destino", text: "Bali abierto, Filipinas en lista de espera. Si dudas, te ayudamos a elegir." },
                { n: "02", title: "Hablamos contigo", text: "Una llamada con Oriol para entender qué buscas y qué fecha encaja." },
                { n: "03", title: "Reserva 300€", text: "Plaza confirmada. El resto se abona antes del viaje, sin prisas." },
                { n: "04", title: "Vives el viaje", text: "El coordinador te espera al aterrizar y no te suelta hasta volver." },
              ].map((s) => (
                <li key={s.n}>
                  <div className="font-display font-extralight text-6xl text-pt-cream/40 mb-4">{s.n}</div>
                  <h3 className="font-display font-medium text-xl mb-3">{s.title}</h3>
                  <p className="text-pt-cream/85 leading-relaxed text-sm">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 text-center">
              <Link href="/reservar" className="inline-block px-10 py-4 rounded-full bg-pt-cream text-pt-green font-display font-semibold text-base hover:bg-white transition shadow-2xl shadow-pt-cream/20">
                Empezar el proceso de reserva
              </Link>
            </div>
          </div>
        </section>

        {/* REVIEWS — embed Maps con CID real + cards */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-display uppercase tracking-[0.28em] text-sm md:text-base font-semibold text-pt-clay">Reseñas</span>
              <h2 className="font-display font-light text-5xl md:text-6xl lg:text-7xl mt-4 text-pt-green leading-[0.95]">
                Lo que dicen los que
                <br />
                <span className="font-script italic text-pt-clay">ya volvieron.</span>
              </h2>
              <div className="mt-7 inline-flex items-center gap-3">
                <span className="text-pt-clay text-xl">★★★★★</span>
                <a
                  href="https://maps.app.goo.gl/VKFUsVDmY8sWB2DU7"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display font-medium text-pt-green hover:underline"
                >
                  Ver todas en Google →
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {reviews.map((r) => (
                <figure key={r.name} className="bg-white border border-pt-green/10 rounded-2xl p-6 hover:shadow-xl transition flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="text-pt-clay text-sm">★★★★★</span>
                  </div>
                  <blockquote className="text-pt-ink leading-relaxed text-sm mb-5 flex-1">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="text-xs pt-4 border-t border-pt-green/10">
                    <div className="font-display font-bold text-pt-green">{r.name}</div>
                    <div className="text-pt-muted">{r.trip}</div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="rounded-3xl overflow-hidden border border-pt-green/10 shadow-sm max-w-5xl mx-auto">
              <iframe
                title="Padel Travellers en Google Maps"
                src="https://maps.google.com/maps?cid=16711842810824693452&hl=es&output=embed"
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-pt-ink text-white">
          <div className="absolute inset-0">
            <Img src="/photos/extra/atardecer/3.jpg" alt="" fill className="object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-br from-pt-ink via-pt-ink/85 to-pt-green/60" />
          </div>
          <div className="relative px-6 lg:px-12 max-w-4xl mx-auto text-center">
            <span className="font-display uppercase tracking-[0.28em] text-sm md:text-base font-semibold text-pt-cream/70 mb-6 inline-block">Próximas fechas 2026</span>
            <h2 className="font-display font-extralight text-5xl md:text-7xl leading-[0.95] mb-10">
              Ocho salidas.
              <br />
              <span className="font-script italic text-pt-cream">Elige la tuya.</span>
            </h2>
            <p className="text-lg text-pt-cream/85 max-w-2xl mx-auto mb-12 leading-relaxed">
              De junio a octubre. Cada quincena, un viaje. Los del verano se llenan antes — si te encaja agosto,
              mejor que hablemos pronto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bali" className="px-10 py-4 rounded-full bg-white text-pt-green font-display font-bold text-base hover:bg-pt-cream transition shadow-2xl shadow-pt-green/30">
                Ver fechas Bali 2026
              </Link>
              <a href={contact.whatsappLink} className="px-10 py-4 rounded-full border-2 border-white/40 font-display font-bold text-base hover:bg-white/10 transition">
                WhatsApp Marta
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
