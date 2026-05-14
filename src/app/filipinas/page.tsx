import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Filipinas · próximo destino",
  description: "Filipinas será nuestro próximo destino. Te avisamos cuando abramos fechas.",
};

export default function FilipinasPage() {
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        <section className="relative h-[95svh] min-h-[640px] overflow-hidden">
          <Img src="/photos/filipinas/1.jpg" alt="Filipinas" fill priority className="object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-pt-ink/30 via-pt-ink/10 to-pt-ink/85" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-6 lg:px-12 max-w-3xl text-white fade-up">
              <p className="font-script text-pt-cream text-4xl md:text-5xl mb-4 -rotate-2">próximamente</p>
              <h1 className="font-display font-medium text-7xl md:text-9xl lg:text-[12rem] leading-[0.88] tracking-tight">
                Filipinas
              </h1>
              <p className="mt-10 text-lg md:text-xl font-light leading-relaxed text-white/95 max-w-xl mx-auto">
                Estamos diseñando el próximo destino. Te avisaremos en cuanto abramos fechas.
              </p>
              <div className="mt-12">
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola! Quiero entrar en la lista de espera para el viaje a Filipinas. Avísame cuando abráis fechas.")}`}
                  className="inline-block px-10 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-base hover:bg-pt-cream transition"
                >
                  Avísame cuando abráis
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 lg:px-12 bg-pt-cream text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5">Mientras tanto</p>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green leading-[0.95] mb-6">
              Bali 2026 abierto
            </h2>
            <p className="text-pt-muted text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              8 salidas entre junio y octubre. Si te gusta la idea de pádel + isla + cultura, ya tienes plan
              este año.
            </p>
            <Link href="/bali" className="inline-block px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-base hover:bg-pt-green-soft transition">
              Ver destino Bali
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
