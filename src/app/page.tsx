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
    "Viajes en grupo de pádel y aventura. 15 días en Bali, alojamiento privado, partidos en BPA, cultura, surf y coordinador español de principio a fin.",
};

const heroSlides = [
  { src: "/photos/extra/bpa/aerial.jpg", alt: "Pista de pádel desde arriba — Bali Padel Academy" },
  { src: "/photos/extra/bpa/piscina-atardecer.jpg", alt: "Piscina infinita sobre arrozales al atardecer" },
  { src: "/photos/extra/templos/1.jpg", alt: "Templo balinés" },
  { src: "/photos/extra/arrozales/1.jpg", alt: "Arrozales de Tegallalang" },
];

const ptStats = [
  { value: "3", label: "Años organizando" },
  { value: "7", label: "Viajes completados" },
  { value: "+54", label: "Viajeros con nosotros" },
];

const pillars = [
  {
    icon: "🎾",
    title: "Pádel en clubs premium",
    text:
      "Pistas premium seleccionadas: Bali Padel Academy, 7 pistas cubiertas de clase mundial entre los arrozales de Canggu, con coaches NOX. Solo jugamos donde nosotros jugaríamos.",
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
      "Una persona del equipo Padel Travellers viaja contigo todo el viaje. No es un guía local: conoce la isla, al grupo y resuelve cualquier cosa que surja, día y noche.",
  },
  {
    icon: "✓",
    title: "Todo incluido",
    text:
      "Alojamiento, pádel, actividades, entradas, transporte interno y coordinador. Solo te ocupas de tus vuelos y comidas. Sin bote común. Sin sorpresas en destino.",
  },
];

export default function Home() {
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        {/* HERO con carousel de fondo */}
        <section className="relative h-[100svh] min-h-[680px] overflow-hidden">
          {heroSlides.map((s) => (
            <div key={s.src} className="hero-slide">
              <Img src={s.src} alt={s.alt} fill priority className="object-cover" sizes="100vw" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-pt-green/40 via-pt-green/15 to-pt-green/85" />
          <div className="absolute inset-0 flex items-end pb-20 lg:pb-28">
            <div className="px-6 lg:px-12 max-w-6xl text-white fade-up">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-[0.22em] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                8 salidas 2026 · plazas en vivo
              </div>
              <h1 className="font-display font-extralight text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight">
                Viajes en grupo
                <br />
                <span className="font-script font-normal italic">de pádel y aventura.</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/95">
                Catorce días en Bali con un grupo afín. Pádel real en clubs premium, alojamiento privado con
                desayuno, cultura, surf y una persona del equipo PT contigo de principio a fin.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
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

        {/* STATS rediseñadas */}
        <section className="bg-pt-green text-pt-cream">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14 lg:py-16 grid grid-cols-3 gap-4 md:gap-10 text-center divide-x divide-pt-cream/15">
            {ptStats.map((s) => (
              <div key={s.label} className="px-2">
                <div className="font-display font-extralight text-5xl md:text-7xl tracking-tight">{s.value}</div>
                <div className="font-display uppercase tracking-[0.24em] text-[10px] md:text-xs text-pt-cream/75 mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ¿Qué es Padel Travellers? — copy del PDF */}
        <section className="px-6 lg:px-12 py-20 lg:py-28 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">¿Qué es Padel Travellers?</p>
              <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green mb-8">
                La unión de dos pasiones:
                <br />
                <span className="font-script italic text-pt-clay">Bali y el pádel.</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Somos viajeros, jugadores y apasionados de esta isla mágica. Lo que más ilusión nos hace es
                poder abrir nuestras puertas y mostrar todo esto al resto del mundo.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Para nosotros, Padel Travellers significa vivir e integrarse a Bali como locales: enseñar los
                rincones que nos inspiran, colaborar con proveedores de la zona, apoyar a la comunidad y
                respetar su cultura.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed mb-8">
                Aquí no importa si vienes acompañado o solo, si llevas años jugando al pádel o si acabas de
                empezar. Lo único que necesitas son ganas de vivir la aventura.
              </p>
              <Link href="/sobre" className="inline-flex items-center gap-2 font-display font-medium text-pt-green hover:gap-3 transition-all">
                Conoce el equipo y la historia
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 lg:gap-4">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Img src="/photos/extra/padel-action/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mt-10">
                <Img src="/photos/extra/arrozales/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden -mt-6">
                <Img src="/photos/extra/atardecer/2.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mt-4">
                <Img src="/photos/extra/la-brisa/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 30vw" />
              </div>
            </div>
          </div>
        </section>

        {/* DESTINOS — sin badges, textos grandes */}
        <section id="destinos" className="bg-pt-cream/50 py-20 lg:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay">Destinos</span>
                <h2 className="font-display font-light text-4xl md:text-5xl mt-4 leading-tight text-pt-green">
                  Dónde viajamos.
                </h2>
              </div>
              <p className="text-pt-muted max-w-md">
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

        {/* ¿POR QUÉ ELEGIRNOS? */}
        <section className="py-20 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay">¿Por qué elegirnos?</span>
            <h2 className="font-display font-light text-4xl md:text-5xl mt-5 leading-tight text-pt-green">
              Cuatro razones que cambian el viaje.
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

        {/* CÓMO RESERVAR — título grande */}
        <section className="bg-pt-green text-pt-cream py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70">Cómo reservar</span>
              <h2 className="font-display font-extralight text-5xl md:text-7xl mt-5 leading-[0.95]">
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
              <Link href="/reservar" className="inline-block px-10 py-4 rounded-full bg-pt-cream text-pt-green font-display font-semibold text-sm hover:bg-white transition shadow-2xl shadow-pt-cream/20">
                Empezar el proceso de reserva
              </Link>
            </div>
          </div>
        </section>

        {/* REVIEWS — Google Reviews real link */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay">Reseñas</span>
              <h2 className="font-display font-light text-4xl md:text-5xl mt-4 text-pt-green leading-tight">
                Lo que dicen los que ya volvieron.
              </h2>
              <a
                href="https://maps.app.goo.gl/VKFUsVDmY8sWB2DU7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 mt-7 px-5 py-2.5 rounded-full border border-pt-green/30 bg-white hover:bg-pt-green hover:text-white transition group"
              >
                <span className="inline-flex items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="font-display font-medium text-pt-ink group-hover:text-white">Ver todas las reseñas en Google</span>
                </span>
                <span className="text-pt-clay group-hover:text-white">★★★★★</span>
              </a>
            </div>

            {/* Iframe embed Google maps con reviews */}
            <div className="rounded-3xl overflow-hidden border border-pt-green/10 shadow-sm mx-auto max-w-5xl bg-white">
              <iframe
                title="Padel Travellers en Google"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.07!2d2.0!3d41.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPadel%20Travellers"
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
              <div className="px-6 py-5 flex items-center justify-between gap-4 border-t border-pt-green/10 bg-pt-cream/30">
                <div>
                  <div className="text-pt-clay text-base">★★★★★</div>
                  <div className="text-xs text-pt-muted mt-1">Padel Travellers en Google Maps</div>
                </div>
                <a
                  href="https://maps.app.goo.gl/VKFUsVDmY8sWB2DU7"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-display font-medium text-pt-green hover:underline"
                >
                  Abrir en Google →
                </a>
              </div>
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
            <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70 mb-6 inline-block">Próximas Fechas 2026</span>
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
              <Link href="/bali" className="px-10 py-4 rounded-full bg-white text-pt-green font-display font-bold text-sm hover:bg-pt-cream transition shadow-2xl shadow-pt-green/30">
                Ver fechas Bali 2026
              </Link>
              <a href={contact.whatsappLink} className="px-10 py-4 rounded-full border-2 border-white/40 font-display font-bold text-sm hover:bg-white/10 transition">
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
