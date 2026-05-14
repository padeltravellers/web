import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Sobre nosotros",
  description: "Quiénes somos, cómo nació Padel Travellers, qué nos diferencia. Equipo pequeño con base en España y operativa en Bali.",
};

const principles = [
  {
    n: "01",
    title: "Cada viaje primero lo viajamos nosotros",
    text:
      "Antes de abrir un destino, lo recorremos. Probamos los clubes, dormimos en los hoteles, comemos donde proponemos comer. Si no nos convence a nosotros, no se abre.",
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

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        {/* HERO */}
        <section className="px-6 lg:px-12 pt-12 pb-10 lg:pt-14 lg:pb-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-7">Sobre nosotros</p>
              <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-pt-green">
                Pequeños,
                <br />
                cuidadosos,
                <br />
                <span className="font-script italic font-normal text-pt-clay">honestos</span>
              </h1>
            </div>
            <div className="lg:col-span-5 space-y-5 text-lg leading-relaxed text-pt-ink/85">
              <p>
                Padel Travellers nació en 2023 de una idea sencilla: si íbamos a viajar igualmente para jugar al
                pádel, qué tal si lo abríamos a más gente.
              </p>
              <p>
                Tres temporadas después somos un equipo pequeño con base en España, operativa en Bali y un
                puñado de viajeros que ya nos han dado la confianza para volver una segunda vez.
              </p>
            </div>
          </div>
        </section>

        {/* PRINCIPIOS */}
        <section className="px-6 lg:px-12 py-10 lg:py-10 max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5">Filosofía</p>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-pt-green max-w-3xl">
              Cuatro decisiones
              <br />
              <span className="font-script italic font-normal text-pt-clay">que no negociamos</span>
            </h2>
          </div>
          <ol className="space-y-10">
            {principles.map((p) => (
              <li key={p.n} className="grid grid-cols-[64px_1fr] md:grid-cols-[100px_1fr] gap-5 md:gap-8 items-start border-t border-pt-green/15 pt-8">
                <span className="font-display font-medium text-5xl md:text-7xl text-pt-clay leading-none">{p.n}</span>
                <div>
                  <h3 className="font-display font-semibold text-2xl text-pt-green mb-3">{p.title}</h3>
                  <p className="text-pt-muted leading-relaxed text-lg">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="py-10 lg:py-10 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green mb-6 leading-tight">
              ¿Te encajan estos principios?
            </h2>
            <p className="text-pt-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Si te has reconocido en cómo trabajamos, posiblemente tengamos que hablar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/bali" className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-base hover:bg-pt-green-soft transition">
                Ver Bali 2026
              </Link>
              <a href={contact.whatsappLink} className="px-9 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-base hover:bg-pt-green hover:text-white transition">
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
