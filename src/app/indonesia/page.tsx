import Img from "@/components/Img";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Indonesia · próximo destino",
  description: "El gran viaje por Indonesia más allá de Bali: Yogyakarta, Bromo, Lombok y Komodo. Próximamente — lista de espera abierta.",
};

const spots = [
  { photo: "/photos/indonesia/spots/yogyakarta.jpg", title: "Yogyakarta", text: "Borobudur y Prambanan, los templos más impresionantes de Java." },
  { photo: "/photos/indonesia/spots/bromo.jpg", title: "Bromo", text: "Amanecer sobre el mar de nubes y el volcán más icónico de Indonesia." },
  { photo: "/photos/indonesia/spots/lombok.jpg", title: "Lombok", text: "Playas vírgenes, las islas Gili y pádel junto al mar." },
  { photo: "/photos/indonesia/spots/komodo.jpg", title: "Komodo", text: "Tres días en barco por el parque nacional: Padar, Pink Beach, los dragones y snorkel con mantas." },
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
                El gran viaje más allá de Bali: Yogyakarta, Bromo, Lombok y Komodo. Lo estamos diseñando — te avisamos en cuanto abramos fechas.
              </p>
              <div className="mt-12">
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola! Quiero entrar en la lista de espera para el viaje por Indonesia (Yogyakarta, Bromo, Lombok, Komodo). Avisadme cuando abráis fechas.")}`}
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
            <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3 text-center">Qué recorreremos</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {spots.map((s) => (
                <div key={s.title} className="group bg-white border border-pt-green/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Img src={s.photo} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-xl text-pt-green mb-2">{s.title}</h3>
                    <p className="text-pt-muted text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-pt-muted/80 text-center">Fotos de Yogyakarta, Bromo y Lombok: Wikimedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Borobudur_Sunrise_2012-01-05.jpg" target="_blank" rel="noopener" className="underline underline-offset-2">Yogyakarta</a> (Justine Hong, CC BY 2.0), <a href="https://commons.wikimedia.org/wiki/File:Bromo_and_Semeru_volcanoes,_Java,_Indonesia,_20220820_0717_9517.jpg" target="_blank" rel="noopener" className="underline underline-offset-2">Bromo</a> (Jakub Hałun, CC BY-SA 4.0), <a href="https://commons.wikimedia.org/wiki/File:Blue_Water_Hits_the_White_Sand_of_Gili_Trawangan.jpg" target="_blank" rel="noopener" className="underline underline-offset-2">Lombok</a> (Christine Anggeline, CC BY-SA 4.0).</p>
          </div>
        </section>

        <section className="py-12 lg:py-10 px-6 lg:px-12 bg-pt-cream text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Mientras tanto</p>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green leading-[1.05] mb-6">
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
