import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Filipinas · 1 salida 2027",
  description: "Una única salida a Filipinas en 2027: del 25 de julio al 7 de agosto. Pádel y travesía por las islas. Plazas limitadas, lista de espera abierta.",
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
              <p className="font-script text-pt-cream text-4xl md:text-5xl mb-4 -rotate-2">1 salida · 2027</p>
              <h1 className="font-display font-medium text-7xl md:text-9xl lg:text-[12rem] leading-[0.88] tracking-tight">
                Filipinas
              </h1>
              <p className="mt-10 text-lg md:text-xl font-light leading-relaxed text-white/95 max-w-xl mx-auto">
                Una única salida en 2027: del <strong className="font-semibold">25 de julio al 7 de agosto</strong>. Pádel en Manila y travesía por las islas. Plazas limitadas.
              </p>
              <div className="mt-12">
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola! Me interesa el viaje a Filipinas del 25 de julio al 7 de agosto de 2027. ¿Me contáis más?")}`}
                  className="inline-block px-10 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-base hover:bg-pt-cream transition"
                >
                  Quiero más información
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-10 px-6 lg:px-12 bg-pt-cream text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5">Mientras tanto</p>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green leading-[0.95] mb-6">
              Bali 2027 abierto
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
