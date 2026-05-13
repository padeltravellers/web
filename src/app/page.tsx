import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import { stats, reviews, valuePillars, contact } from "@/data/content";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Padel Travellers — Viajes en grupo de pádel a Bali",
  description:
    "Viajes premium en grupo de pádel a Bali. 14 días, 8-12 personas, alojamiento privado con desayuno, partidos en BPA, cultura, surf y coordinador español de principio a fin. Desde 1.725€.",
};

export default function Home() {
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        {/* HERO — calma A + badge live C */}
        <section className="relative h-[100svh] min-h-[680px] overflow-hidden">
          <Image src="/photos/extra/atardecer/1.jpg" alt="Atardecer en Bali" fill priority className="object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-pt-green/40 via-pt-green/15 to-pt-green/85" />
          <div className="absolute inset-0 flex items-end pb-20 lg:pb-28">
            <div className="px-6 lg:px-12 max-w-6xl text-white fade-up">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-[0.22em] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                8 salidas 2026 · plazas en vivo
              </div>
              <h1 className="font-display font-extralight text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight">
                Viajes de pádel,
                <br />
                <span className="font-script font-normal italic">contados despacio.</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/95">
                Catorce días en Bali con un grupo afín. Pádel real, alojamiento premium con desayuno, cultura,
                surf, aventura y una persona del equipo PT contigo de principio a fin.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link href="/bali" className="px-9 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-sm hover:bg-pt-cream transition">
                  Ver destino Bali
                </Link>
                <Link href="/reservar" className="px-9 py-4 rounded-full border border-white/50 text-white font-display font-semibold text-sm hover:bg-white/10 transition">
                  Reservar plaza · 300€
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-y border-pt-green/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl md:text-5xl font-light text-pt-green">{s.value}</div>
                <div className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-muted mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* QUÉ ES PT */}
        <section className="px-6 lg:px-12 py-24 lg:py-36 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">¿Qué es Padel Travellers?</p>
              <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green mb-8">
                Viajes de pádel en grupo
                <br />
                <span className="font-script italic text-pt-clay">a destinos pensados.</span>
              </h2>
              <p className="text-pt-muted text-lg leading-relaxed mb-5">
                Padel Travellers no es una agencia. Somos un grupo pequeño con base en España que diseña viajes a
                medida para personas que juegan al pádel y quieren conocer el mundo con otros que comparten ese
                hilo.
              </p>
              <p className="text-pt-muted text-lg leading-relaxed mb-8">
                Cada destino lo viajamos primero nosotros, lo cuidamos en lo pequeño y mandamos a una persona
                del equipo que va con vosotros las dos semanas. Por eso ningún viaje se parece a otro y todos
                tienen el mismo nivel de atención.
              </p>
              <Link href="/sobre" className="inline-flex items-center gap-2 font-display font-medium text-pt-green hover:gap-3 transition-all">
                Conoce el equipo y la historia
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-6 gap-3 lg:gap-4">
              <div className="col-span-4 aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image src="/photos/extra/padel-action/1.jpg" alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" />
              </div>
              <div className="col-span-2 aspect-square relative rounded-2xl overflow-hidden mt-12">
                <Image src="/photos/extra/arrozales/1.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="col-span-3 aspect-square relative rounded-2xl overflow-hidden -mt-6">
                <Image src="/photos/extra/atardecer/2.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="col-span-3 aspect-[3/4] relative rounded-2xl overflow-hidden">
                <Image src="/photos/extra/la-brisa/1.jpg" alt="" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* DESTINOS */}
        <section id="destinos" className="bg-pt-cream/50 py-24 lg:py-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
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
              {destinations.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group relative aspect-[4/5] lg:aspect-[4/3] rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 no-tap-highlight"
                >
                  <Image src={d.hero} alt={d.heroAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pt-ink via-pt-ink/30 to-transparent" />
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white">
                    <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-display uppercase tracking-[0.22em] backdrop-blur ${d.status === "open" ? "bg-white/20" : "bg-pt-clay/80"}`}>
                      {d.status === "open" ? "Abierto · 2026" : "Próximamente · 2027"}
                    </span>
                    <span className="font-display uppercase tracking-[0.18em] text-[10px] opacity-80">
                      Destino · {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute left-5 right-5 bottom-5 text-white">
                    <h3 className="font-display text-5xl md:text-6xl font-light leading-none mb-3">{d.name}</h3>
                    <p className="text-white/90 leading-relaxed mb-5 max-w-md">{d.shortPitch}</p>
                    <div className="flex flex-wrap items-center gap-5 text-sm">
                      <span><span className="opacity-60">Duración </span>{d.duration}</span>
                      <span><span className="opacity-60">Grupo </span>{d.groupSize}</span>
                      {d.status === "open" && (
                        <span><span className="opacity-60">Desde </span>{d.basePrice}</span>
                      )}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-sm group-hover:gap-3 transition-all">
                      {d.status === "open" ? "Ver destino" : "Apúntate a la lista de espera"}
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TODO INCLUIDO */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay">Todo incluido en tu experiencia</span>
            <h2 className="font-display font-light text-4xl md:text-5xl mt-5 leading-tight text-pt-green">
              Cuatro decisiones que cambian el viaje.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {valuePillars.map((p) => (
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

        {/* CÓMO RESERVAR */}
        <section className="bg-pt-green text-pt-cream py-24 lg:py-32 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70">Cómo reservar</span>
              <h2 className="font-display font-extralight text-4xl md:text-5xl mt-4 leading-tight">
                Cuatro pasos. <span className="font-script italic">Sin sorpresas.</span>
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
            <div className="mt-16 text-center">
              <Link href="/reservar" className="inline-block px-10 py-4 rounded-full bg-pt-cream text-pt-green font-display font-semibold text-sm hover:bg-white transition shadow-2xl shadow-pt-cream/20">
                Empezar el proceso de reserva
              </Link>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay">Lo que dicen</span>
              <h2 className="font-display font-light text-4xl md:text-5xl mt-4 text-pt-green max-w-3xl mx-auto leading-tight">
                Los que ya volvieron lo cuentan así.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {reviews.map((r) => (
                <figure key={r.name} className="bg-white border border-pt-green/10 rounded-2xl p-6 hover:shadow-xl transition flex flex-col">
                  <div className="text-pt-clay text-sm mb-3">★★★★★</div>
                  <blockquote className="text-pt-ink leading-relaxed text-sm mb-5 flex-1">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="text-xs pt-4 border-t border-pt-green/10">
                    <div className="font-display font-bold text-pt-green">{r.name}</div>
                    <div className="text-pt-muted">{r.trip}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative py-32 lg:py-44 overflow-hidden bg-pt-ink text-white">
          <div className="absolute inset-0">
            <Image src="/photos/extra/atardecer/3.jpg" alt="" fill className="object-cover opacity-35" />
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
