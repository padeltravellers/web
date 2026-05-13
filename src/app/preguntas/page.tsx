import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { faqs, contact } from "@/data/content";

export const metadata = {
  title: "Preguntas frecuentes — Padel Travellers",
  description: "Todo lo que normalmente preguntan los viajeros antes de reservar. Nivel de pádel, viajar solo, vuelos, alojamiento, pagos, cancelación.",
};

const categories = [
  {
    title: "Antes del viaje",
    items: [
      ...faqs.slice(0, 4),
      {
        q: "¿Y si no tengo a nadie con quien venir?",
        a: "Más de la mitad del grupo viene en solitario. Es lo más común y lo que más recomendamos a quien duda. A los 2-3 días ya os conocéis todos.",
      },
      {
        q: "¿Hay que tener material propio?",
        a: "Tu pala, sí. Zapatillas de pádel también. Lo demás (pelotas, agua, toallas) lo pone el club. Si vienes sin pala, el club tiene alquiler.",
      },
    ],
  },
  {
    title: "Durante el viaje",
    items: [
      {
        q: "¿Qué pasa si me lesiono o no puedo jugar?",
        a: "El programa tiene siempre planes alternativos no-pádel (templos, cultura, surf, descanso). Y si necesitas médico, el coordinador te acompaña y te ayuda con el seguro.",
      },
      {
        q: "¿Se puede llevar pareja no jugadora?",
        a: "Sí. Cada vez tenemos más casos. El programa tiene actividades para no jugar (cultura, surf, spa, días libres). Hablamos del precio en estos casos para ajustar.",
      },
      {
        q: "¿El nivel medio del grupo es alto?",
        a: "Tenemos de todo, nivel 2 a 5. Lo importante es que rotamos parejas para que cada uno juegue siempre con gente de su nivel. Nadie se queda fuera.",
      },
      {
        q: "¿Hay conexión / WiFi / cobertura?",
        a: "En todas las villas hay WiFi decente. Cobertura móvil en casi toda la isla. Si necesitas trabajar algún día, hay zonas con muy buena conexión.",
      },
    ],
  },
  {
    title: "Pagos y reserva",
    items: [
      ...faqs.slice(4, 7),
      {
        q: "¿Cómo se paga el resto del viaje?",
        a: "Por transferencia, antes de la salida. Te avisamos con tiempo y te pasamos toda la documentación. Sin recargos por método de pago.",
      },
      {
        q: "¿Hay seguro de viaje incluido?",
        a: "No, pero te recomendamos uno específico y te pasamos las opciones que mejor funcionan para Bali. Es obligatorio para entrar a Indonesia.",
      },
      {
        q: "¿Política de cancelación?",
        a: "Antes de cierto plazo (te lo explicamos en la llamada), reembolso total menos gastos de gestión. Después, depende del momento. Lo importante: te lo decimos antes de cobrar nada.",
      },
    ],
  },
];

export default function PreguntasPage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16 max-w-5xl mx-auto">
          <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6">Preguntas frecuentes</p>
          <h1 className="font-display font-extralight text-5xl md:text-7xl text-pt-green leading-[0.9]">
            Lo que <span className="font-script italic">nos preguntáis.</span>
          </h1>
          <p className="mt-8 text-lg text-pt-muted max-w-2xl leading-relaxed">
            Si tu duda no está aquí, escríbenos por WhatsApp y te la resolvemos. Las respuestas las redacta el
            equipo, no un bot.
          </p>
        </section>

        <section className="px-6 lg:px-12 py-12 max-w-4xl mx-auto">
          {categories.map((cat, ci) => (
            <div key={cat.title} className={ci > 0 ? "mt-16" : ""}>
              <h2 className="font-display font-light text-3xl text-pt-green mb-8 leading-tight border-b border-pt-green/15 pb-4">
                {cat.title}
              </h2>
              <div className="space-y-3">
                {cat.items.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-white rounded-2xl border border-pt-green/10 px-6 py-5 hover:border-pt-green/30 transition"
                  >
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-pt-ink">
                      {f.q}
                      <span className="w-7 h-7 rounded-full bg-pt-green-pale text-pt-green flex items-center justify-center text-lg group-open:rotate-45 transition-transform shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-pt-muted leading-relaxed text-sm">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="py-24 px-6 lg:px-12 bg-pt-cream mt-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green leading-tight mb-6">
              ¿No has encontrado tu pregunta?
            </h2>
            <p className="text-pt-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Escríbenos por WhatsApp y te la resolvemos en el mismo día. Sin formularios largos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={contact.whatsappLink} className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-sm hover:bg-pt-green-soft transition">
                WhatsApp Marta
              </a>
              <a href={`mailto:${contact.email}`} className="px-9 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-sm hover:bg-pt-green hover:text-white transition">
                Email a Oriol
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
