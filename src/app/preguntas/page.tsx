import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Preguntas frecuentes — Padel Travellers",
  description: "Todas las dudas habituales del viaje: seguro, métodos de pago, visado, vuelos, niveles, vacunas y pasaporte.",
};

const faqs = [
  {
    q: "¿Necesito seguro de viaje?",
    a: "Sí, es obligatorio para todas nuestras experiencias. Cada viajero debe contratar un seguro que cubra el viaje con anterioridad a la fecha de salida. Te recomendamos varias compañías cuando confirmamos la reserva.",
  },
  {
    q: "¿Métodos de pago?",
    a: "Aceptamos tarjeta vía Stripe (pasarela 100% segura, Visa, Mastercard, American Express) y también transferencia bancaria. La reserva se formaliza con 500€ y el resto antes del viaje.",
  },
  {
    q: "¿Necesito visado?",
    a: "Para ciudadanos españoles, el visado a Indonesia se tramita a la llegada o de forma online (https://molina.imigrasi.go.id/) y tiene un coste de 30€. Si tienes otra nacionalidad, te ayudamos a comprobar requisitos.",
  },
  {
    q: "¿Incluye el vuelo?",
    a: "No, los vuelos no se incluyen y cada participante compra su propio billete. Desde Padel Travellers te recomendamos las mejores combinaciones de ida y vuelta para cuadrar con el grupo.",
  },
  {
    q: "¿Cuántos jugadores habrá por clase?",
    a: "Las clases son en grupos reducidos, máximo 4 jugadores del mismo nivel. Así aprovechas al máximo cada sesión con el coach.",
  },
  {
    q: "¿Nivel de pádel?",
    a: "Los clinics están abiertos a cualquier nivel. Da igual si llevas años jugando o si acabas de empezar — adaptamos clases y partidos a tu experiencia.",
  },
  {
    q: "¿Vigencia del pasaporte?",
    a: "Para entrar a Indonesia tu pasaporte debe tener mínimo 6 meses de vigencia desde la fecha del vuelo de regreso. Compruébalo antes de comprar vuelos.",
  },
  {
    q: "¿Hay vacunas obligatorias?",
    a: "No se requiere ninguna vacuna obligatoria para entrar a Indonesia. Consulta con tu centro de salud por si te aconsejan alguna recomendada según tu historial.",
  },
];

export default function PreguntasPage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-14 pb-10 lg:pt-20 lg:pb-12 max-w-4xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5">Preguntas frecuentes</p>
          <h1 className="font-display font-medium text-5xl md:text-7xl text-pt-green leading-[0.92]">
            Lo que nos
            <br />
            <span className="font-script italic font-normal text-pt-clay">preguntáis</span>
          </h1>
        </section>

        <section className="px-6 lg:px-12 pb-16 max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-pt-green/10 hover:border-pt-green/30 transition overflow-hidden"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-5 px-6 md:px-8 py-5 md:py-6">
                  <span className="font-display font-semibold text-lg md:text-xl text-pt-green leading-tight">
                    {f.q}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-pt-green-pale text-pt-green flex items-center justify-center text-xl group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="px-6 md:px-8 pb-6 md:pb-7 -mt-1">
                  <p className="text-pt-muted leading-relaxed text-base">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 lg:py-20 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green leading-tight mb-6">
              ¿No has encontrado tu pregunta?
            </h2>
            <p className="text-pt-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Escríbenos por WhatsApp y te la resolvemos el mismo día.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={contact.whatsappLink} className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-base hover:bg-pt-green-soft transition">
                WhatsApp
              </a>
              <a href={`mailto:${contact.email}`} className="px-9 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-base hover:bg-pt-green hover:text-white transition">
                Email
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
