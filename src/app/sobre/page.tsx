import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { stats, contact } from "@/data/content";

export const metadata = {
  title: "Sobre nosotros — Padel Travellers",
  description: "Quiénes somos, cómo nació Padel Travellers, qué nos diferencia. Equipo pequeño con base en España y operativa en Bali.",
};

const principles = [
  {
    n: "01",
    title: "Cada viaje primero lo viajamos nosotros",
    text:
      "Antes de abrir un destino, lo recorremos. Probamos los clubes, dormimos en las villas, comemos donde proponemos comer. Si no nos convence a nosotros, no se abre.",
  },
  {
    n: "02",
    title: "Sin bote común. Sin sorpresas en destino.",
    text:
      "Lo que pagas es lo que vale el viaje. No hay segunda factura en el aeropuerto. Las comidas y vuelos los pagas tú porque queremos que cada uno mantenga su libertad.",
  },
  {
    n: "03",
    title: "Grupos pequeños siempre",
    text:
      "Máximo 12 personas por viaje. Es el número que nos permite mantener calidad: alojamiento, transporte, pista, atención. Más no.",
  },
  {
    n: "04",
    title: "Una persona del equipo viaja contigo",
    text:
      "No un guía local que se va a las 18:00. Alguien de Padel Travellers que conoce el grupo desde antes y resuelve cualquier cosa hasta el último día.",
  },
];

const team = [
  {
    name: "Oriol",
    role: "Fundador y dirección",
    bio: "Cofundador y cara visible. Es con quien hablas antes de reservar. Vive entre Barcelona y Bali según la temporada.",
    photo: "/photos/extra/bpa/2.jpg",
  },
  {
    name: "Marta",
    role: "Atención y onboarding",
    bio: "Tu primera conversación con PT seguramente es con Marta. Te ayuda a elegir destino, fecha y a entender si te encaja antes de hablar con Oriol.",
    photo: "/photos/extra/padel-action/3.jpg",
  },
  {
    name: "Coordinador en destino",
    role: "Persona PT en el viaje",
    bio: "Cambia según la salida. Siempre alguien del equipo, español, que ya conoce el grupo desde antes y os acompaña los 14 días.",
    photo: "/photos/extra/la-brisa/2.jpg",
  },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        {/* HERO */}
        <section className="px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-28 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-7">Sobre nosotros</p>
              <h1 className="font-display font-extralight text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-pt-green">
                Pequeños,
                <br />
                cuidadosos,
                <br />
                <span className="font-script italic text-pt-clay">honestos.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 space-y-5 text-lg leading-relaxed text-pt-ink/85">
              <p>
                Padel Travellers nació en 2023 de una idea sencilla: si íbamos a viajar igualmente para jugar al
                pádel, qué tal si lo abríamos a más gente.
              </p>
              <p>
                Cuatro temporadas después somos un equipo pequeño con base en España, operativa en Bali y un
                puñado de viajeros que ya nos han dado la confianza para volver una segunda vez.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-pt-green text-pt-cream py-14">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl md:text-6xl font-light mb-2">{s.value}</div>
                <div className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/70">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRINCIPIOS */}
        <section className="px-6 lg:px-12 py-24 lg:py-36 max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-5">Filosofía</p>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight text-pt-green max-w-3xl">
              Cuatro decisiones que no negociamos.
            </h2>
          </div>
          <ol className="space-y-10">
            {principles.map((p) => (
              <li key={p.n} className="grid grid-cols-[64px_1fr] md:grid-cols-[100px_1fr] gap-5 md:gap-8 items-start border-t border-pt-green/15 pt-8">
                <span className="font-display font-extralight text-5xl md:text-7xl text-pt-clay leading-none">{p.n}</span>
                <div>
                  <h3 className="font-display font-medium text-2xl text-pt-green mb-3">{p.title}</h3>
                  <p className="text-pt-muted leading-relaxed text-lg">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* EQUIPO */}
        <section className="bg-pt-cream/50 py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-5">El equipo</p>
              <h2 className="font-display font-light text-4xl md:text-5xl text-pt-green leading-tight">
                Tres personas detrás del viaje.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {team.map((m) => (
                <article key={m.name} className="bg-white border border-pt-green/10 rounded-3xl overflow-hidden hover:shadow-xl transition">
                  <div className="relative aspect-[4/5]">
                    <Image src={m.photo} alt={m.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display font-bold text-2xl text-pt-green mb-1">{m.name}</h3>
                    <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-clay mb-4">{m.role}</p>
                    <p className="text-sm text-pt-muted leading-relaxed">{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-pt-muted max-w-2xl mx-auto">
              Por detrás también tenemos partners locales en Bali (club, transporte, alojamientos) que llevan
              años con nosotros y son parte de la familia.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green mb-6 leading-tight">
              ¿Te encajan estos principios?
            </h2>
            <p className="text-pt-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Si te has reconocido en cómo trabajamos, posiblemente tengamos que hablar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/bali" className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-sm hover:bg-pt-green-soft transition">
                Ver Bali 2026
              </Link>
              <a href={contact.whatsappLink} className="px-9 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-sm hover:bg-pt-green hover:text-white transition">
                Hablamos por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
