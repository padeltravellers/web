import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";
import { getDestination } from "@/data/destinations";

export const metadata = {
  title: "Filipinas — próximo destino Padel Travellers",
  description:
    "Filipinas será nuestro segundo destino, previsto para 2027. Manila + Palawan + Cebú o Bohol. Buceo, playas, pádel. Lista de espera abierta.",
};

export default function FilipinasPage() {
  const d = getDestination("filipinas")!;
  const filipinasPhotos = [
    "/photos/filipinas/1.jpg",
    "/photos/filipinas/2.jpg",
    "/photos/filipinas/3.jpg",
  ];
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        {/* HERO */}
        <section className="relative h-[90svh] min-h-[600px] overflow-hidden">
          <Img src={d.hero} alt={d.heroAlt} fill priority className="object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-pt-ink/40 via-pt-ink/10 to-pt-ink/85" />
          <div className="absolute inset-0 flex items-end pb-20 lg:pb-28">
            <div className="px-6 lg:px-12 max-w-5xl text-white fade-up">
              <div className="inline-flex items-center gap-2 bg-pt-clay/85 backdrop-blur rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-[0.22em] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Próximamente · 2027
              </div>
              <h1 className="font-display font-extralight text-6xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight">
                Filipinas.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/95">
                {d.shortPitch}
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <a href="#interesado" className="px-9 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-sm hover:bg-pt-cream transition">
                  Lista de espera
                </a>
                <Link href="/bali" className="px-9 py-4 rounded-full border border-white/50 text-white font-display font-semibold text-sm hover:bg-white/10 transition">
                  Mientras tanto, Bali 2026
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="px-6 lg:px-12 py-14 lg:py-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6">El siguiente destino</p>
              <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green">
                7.641 islas. Mucha agua. Pádel.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-8 space-y-5 text-lg leading-relaxed text-pt-ink/85">
              <p>{d.description}</p>
              <p>
                Estamos diseñando el viaje con el mismo cuidado con el que diseñamos Bali. Visitas previas,
                club partner, alojamientos seleccionados, coordinador. Nos lo tomamos con calma — preferimos
                abrirlo cuando esté redondo a hacerlo a medias.
              </p>
              <p>
                Si te suena bien la idea, déjanos tu interés. Cuando abramos plazas, los primeros en saberlo
                serán los de la lista.
              </p>
            </div>
          </div>
        </section>

        {/* QUÉ ESPERAMOS */}
        <section className="bg-pt-cream/50 py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4 text-center">Qué planeamos</p>
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green text-center max-w-3xl mx-auto mb-16 leading-tight">
              Cuatro razones por las que Filipinas.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {d.highlights.map((h) => (
                <div key={h.title} className="bg-white border border-pt-green/10 rounded-2xl p-7 hover:shadow-xl transition">
                  <div className="w-12 h-12 rounded-xl bg-pt-clay/15 flex items-center justify-center text-2xl mb-5">
                    {h.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-pt-ink mb-3">{h.title}</h3>
                  <p className="text-sm text-pt-muted leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERESADO */}
        <section id="interesado" className="py-14 lg:py-20 px-6 lg:px-12 bg-pt-green text-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-script text-pt-cream text-3xl mb-6 -rotate-2">apúntate</p>
            <h2 className="font-display font-extralight text-4xl md:text-6xl leading-[0.95] mb-8">
              ¿Te interesa Filipinas?
            </h2>
            <p className="text-lg text-pt-cream/85 leading-relaxed mb-10 max-w-2xl mx-auto">
              Sin reserva ni compromiso. Solo te avisamos primero cuando abramos fechas y tendrás acceso
              prioritario a las plazas. Por la gracia divina y el orden de llegada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola Marta! Me interesa el destino Filipinas cuando lo abráis. ¿Me avisáis cuando haya fechas?")}`}
                className="px-9 py-4 rounded-full bg-pt-cream text-pt-green font-display font-bold text-sm hover:bg-white transition"
              >
                Lista de espera por WhatsApp
              </a>
              <a
                href={`mailto:${contact.email}?subject=Interés Filipinas 2027`}
                className="px-9 py-4 rounded-full border-2 border-white/40 font-display font-bold text-sm hover:bg-white/10 transition"
              >
                Avísame por email
              </a>
            </div>
          </div>
        </section>

        {/* GALERÍA Filipinas (3 fotos disponibles) */}
        <section className="py-20 px-6 lg:px-12 bg-pt-cream/30">
          <div className="max-w-6xl mx-auto">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4 text-center">Vistazo previo</p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-pt-green text-center mb-12">
              Algunas fotos del viaje de scouting.
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {filipinasPhotos.map((p, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Img src={p} alt="" fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 33vw, 33vw" />
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-pt-muted mt-8">Más fotos vendrán cuando empecemos la operación.</p>
          </div>
        </section>

        {/* CTA cross-link a Bali */}
        <section className="py-24 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-4">Mientras tanto</p>
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green leading-tight mb-6">
              ¿Te animas con Bali 2026?
            </h2>
            <p className="text-pt-muted max-w-xl mx-auto mb-8 leading-relaxed">
              Si lo de Filipinas te ha llamado por la mezcla de pádel + isla + cultura, Bali ya tiene 8 salidas
              abiertas este año.
            </p>
            <Link href="/bali" className="inline-block px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-sm hover:bg-pt-green-soft transition">
              Ver destino Bali 2026
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
