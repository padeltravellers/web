import Img from "@/components/Img";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata = {
  title: "Reserva tu plaza · 2027",
  description: "Reserva online tu plaza en el viaje de pádel y Bali 2027 con 100 € reembolsables hasta que se confirma el grupo.",
  robots: { index: false, follow: false }, // prototipo
};

export default function ReservarBaliPage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink bg-[#FBFAF5]">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Img src="/photos/extra/arrozales/1.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-pt-green/85 via-pt-green/75 to-pt-green/80" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[#FBFAF5]" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-14 lg:pt-20 lg:pb-16 text-white">
            <p className="font-display uppercase tracking-[0.16em] text-sm font-semibold text-pt-cream/85 mb-3">Reserva online · Temporada 2027</p>
            <h1 className="font-display font-medium text-5xl md:text-7xl leading-[0.92]">
              Reserva tu plaza,
              <br />
              <span className="font-script font-normal text-pt-cream">en cuatro pasos</span>
            </h1>
            <p className="text-white/85 text-lg max-w-xl mt-6 leading-relaxed">
              Reservas con 100 €, reembolsables hasta que se confirma el grupo. Sin pagar nada más hasta entonces.
            </p>
          </div>
        </section>
        <BookingFlow />
      </main>
      <Footer />
    </>
  );
}
