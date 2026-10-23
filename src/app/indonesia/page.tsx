import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Indonesia · próximo destino",
  description: "El gran viaje por Indonesia más allá de Bali: Yogyakarta, Bromo, Lombok y Flores. Próximamente — lista de espera abierta.",
};

const spots = [
  { icon: "🛕", title: "Yogyakarta", text: "Borobudur y Prambanan, los templos más impresionantes de Java." },
  { icon: "🌋", title: "Bromo", text: "Amanecer sobre el mar de nubes y el volcán más icónico de Indonesia." },
  { icon: "🎾", title: "Lombok", text: "Playas vírgenes, las islas Gili y pádel junto al mar." },
  { icon: "🦎", title: "Flores", text: "Komodo, el lago Kelimutu y naturaleza salvaje sin masas." },
];

export default function IndonesiaPage() {
  return (
    <>
      <Header transparent />
      <main className="text-pt-ink">
        <section className="relative h-[95svh] min-h-[640px] overflow-hidden">
          <Img src="/photos/extra/arrozales/1.jpg" alt="Paisajes de Indonesia" fill priority className="object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-pt-ink/30 via-pt-ink/10 to-pt-ink/85" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-6 lg:px-12 max-w-3xl text-white fade-up">
              <p className="font-display uppercase tracking-[0.26em] text-pt-cream text-sm md:text-base font-semibold mb-5">Próximamente</p>
              <h1 className="font-display font-medium text-7xl md:text-9xl lg:text-[12rem] leading-[0.88] tracking-tight">
                Indonesia
              </h1>
              <p className="mt-10 text-lg md:text-xl font-light leading-relaxed text-white/95 max-w-xl mx-auto">
                El gran viaje más allá de Bali: Yogyakarta, Bromo, Lombok y Flores. Lo estamos diseñando — te avisamos en cuanto abramos fechas.
              </p>
              <div className="mt-12">
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola! Quiero entrar en la lista de espera para el viaje por Indonesia (Yogyakarta, Bromo, Lombok, Flores). Avisadme cuando abráis fechas.")}`}
                  className="inline-block px-10 py-4 rounded-full bg-white text-pt-green font-display font-semibold text-base hover:bg-pt-cream transition"
                >
                  Avísame cuando abráis
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6 text-center">Qué recorreremos</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {spots.map((s) => (
                <div key={s.title} className="bg-pt-cream rounded-3xl p-7 border border-pt-green/10">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-display font-semibold text-xl text-pt-green mb-2">{s.title}</h3>
                  <p className="text-pt-muted text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
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
              8 salidas entre junio y octubre. Si te gusta la idea de pádel + isla + cultura, ya tienes plan este año.
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
