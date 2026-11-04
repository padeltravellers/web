import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/data/content";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Qué incluye el viaje, cómo se reserva y se paga, cancelaciones, nivel de pádel, habitaciones, vuelos, seguro, visado y pasaporte.",
};

type Faq = { q: string; a: string };

const groups: { title: string; items: Faq[] }[] = [
  {
    title: "El viaje",
    items: [
      {
        q: "¿Qué incluye el precio?",
        a: "13 noches en habitación privada con desayuno, 4 partidos con el grupo y 2 h de clase a la semana, todas las actividades y entradas del itinerario (Ubud, Uluwatu, norte de Bali, Amed, Tanah Lot, Taman Ayun, plantación de café y clase de surf), los traslados del aeropuerto y a las actividades, y el coordinador local con el grupo todo el viaje.",
      },
      {
        q: "¿Qué no incluye?",
        a: "Los vuelos, las comidas y cenas, el seguro de viaje (obligatorio), el visado (unos 30 €) y los planes opcionales de los días libres. No hay bote común ni recargos: lo que no está incluido lo pagas tú directamente, solo si lo quieres.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "1.490 € por persona en habitación compartida y 1.690 € en habitación individual (suplemento de 200 €).",
      },
      {
        q: "¿Cuántas personas sois en cada grupo?",
        a: "Entre 8 y 12 viajeros. El viaje se confirma cuando el grupo llega a 8.",
      },
      {
        q: "Voy solo o sola, ¿es raro?",
        a: "Al contrario: mucha gente viene sola y es la mejor forma de conocer a todo el grupo. Te asignamos habitación individual y desde el primer partido ya no vas solo.",
      },
      {
        q: "¿Cómo son las habitaciones?",
        a: "Villas u hoteles con piscina y desayuno, siempre en habitación privada. Si vienes con alguien, compartís habitación entre vosotros. Nunca te ponemos con alguien que no conoces.",
      },
      {
        q: "¿Quién nos acompaña?",
        a: "Un coordinador local balinés, que también juega al pádel, está con el grupo durante todo el viaje. Además, el equipo de Padel Travellers vive en Bali y está disponible por si necesitas algo.",
      },
      {
        q: "¿Y las comidas y cenas?",
        a: "Son libres. Bali tiene muchísima oferta y muy buen precio. El coordinador propone sitios y planes cada día, y vas con quien quieras.",
      },
      {
        q: "¿Los días libres son realmente libres?",
        a: "Sí. Hay varios días libres para ir a tu aire. Te proponemos planes (Nusa Penida, quads por Ubud, Cretya, beach clubs, spa, surf…), pero no son obligatorios y se pagan aparte si los haces.",
      },
      {
        q: "¿Organizáis viajes a otros destinos?",
        a: "Sí. En 2027 hay una salida a Filipinas (del 25 de julio al 7 de agosto) y estamos preparando rutas por otras zonas de Indonesia: Yogyakarta, Bromo, Lombok y Flores. Puedes apuntarte a la lista de espera en su página.",
      },
    ],
  },
  {
    title: "Pádel",
    items: [
      {
        q: "¿Necesito un nivel concreto?",
        a: "No. Vienen jugadores de todos los niveles. Hacemos las parejas por nivel para que los partidos estén equilibrados y todo el mundo disfrute.",
      },
      {
        q: "¿Cómo es el pádel durante el viaje?",
        a: "4 partidos con el grupo de 1,5 h y 2 h de clase a la semana con los entrenadores del club, en Bali Padel Academy. Las clases son en grupos de máximo 4 jugadores del mismo nivel.",
      },
    ],
  },
  {
    title: "Reserva y pagos",
    items: [
      {
        q: "¿Cómo reservo?",
        a: "Desde la web: eliges destino, fecha y habitación, rellenas tus datos, aceptas el contrato y pagas la reserva de 100 € con tarjeta. Si vienes con alguien en habitación compartida, reserváis los dos a la vez. Te llega el contrato por email. También puedes escribirnos por WhatsApp y te ayudamos.",
      },
      {
        q: "¿Cómo se paga?",
        a: "En tres pagos: 100 € para reservar, 1.000 € cuando se confirma el grupo y el resto 30 días antes del viaje. La reserva se paga con tarjeta en la web, con la pasarela segura de Stripe. Los otros dos pagos, por transferencia bancaria a la cuenta que te indicamos por email.",
      },
      {
        q: "¿Y si el grupo no llega a 8 personas?",
        a: "Te devolvemos el 100 % de lo pagado o, si lo prefieres, te pasamos a otra salida.",
      },
      {
        q: "¿Qué pasa si tengo que cancelar?",
        a: "Si cancelas antes de que se confirme el grupo, te devolvemos todo, también la reserva. Una vez confirmado el grupo no hay devolución, aunque intentamos recuperar lo posible de los proveedores y estudiamos cada caso.",
      },
      {
        q: "¿Firmo algún contrato?",
        a: "Sí. Al reservar aceptas el contrato de organización y coordinación del viaje y te lo enviamos por email. Puedes leerlo antes en las condiciones de contratación.",
      },
      {
        q: "¿Quién organiza el viaje?",
        a: "Padel Travellers, un equipo español que vive en Bali. Llevamos 4 temporadas organizando viajes y más de 61 viajeros han venido con nosotros.",
      },
    ],
  },
  {
    title: "Documentación y salud",
    items: [
      {
        q: "¿Necesito seguro de viaje?",
        a: "Sí, es obligatorio. Tiene que cubrir asistencia médica, repatriación y la práctica de pádel, y nos envías una copia al menos 15 días antes de salir. Nuestros viajeros suelen ir con IATI o Heymondo.",
      },
      {
        q: "¿Necesito visado?",
        a: "Los ciudadanos españoles necesitan un visado de turista de unos 30 €, que se puede sacar online en la web oficial de inmigración de Indonesia o a la llegada al aeropuerto. Si tienes otra nacionalidad, te ayudamos a comprobar los requisitos.",
      },
      {
        q: "¿Hay alguna tasa al llegar a Bali?",
        a: "Sí. Bali cobra a los turistas extranjeros una tasa de 150.000 rupias (menos de 10 €) por persona, que se paga online o al llegar. No está incluida en el precio.",
      },
      {
        q: "¿Qué validez tiene que tener el pasaporte?",
        a: "Al menos 6 meses desde la fecha de entrada en Indonesia. Compruébalo antes de comprar los vuelos.",
      },
      {
        q: "¿Hay vacunas obligatorias?",
        a: "No hay ninguna vacuna obligatoria para entrar en Indonesia. Consulta con tu centro de salud o de vacunación internacional por si te recomiendan alguna.",
      },
      {
        q: "¿Incluye los vuelos?",
        a: "No. Cada viajero compra su vuelo desde su ciudad. Te decimos la ventana ideal de llegada y salida para coincidir con el grupo. Lo mejor es comprarlos cuando el grupo esté confirmado.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((g) => g.items).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function slug(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PreguntasPage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-14 pb-10 lg:pt-14 lg:pb-12 max-w-4xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.12em] text-base md:text-lg font-semibold text-pt-clay mb-3">Preguntas frecuentes</p>
          <h1 className="font-display font-medium text-5xl md:text-7xl text-pt-green leading-[0.92]">
            Lo que nos
            <br />
            <span className="font-script italic font-normal text-pt-clay">preguntáis</span>
          </h1>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <section className="px-6 lg:px-12 pb-12 max-w-3xl mx-auto">
          <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Temas">
            {groups.map((g) => (
              <a key={g.title} href={`#${slug(g.title)}`} className="px-4 py-2 rounded-full border border-pt-green/20 text-pt-green font-display font-semibold text-sm hover:bg-pt-green hover:text-white transition">
                {g.title}
              </a>
            ))}
          </nav>
          <div className="space-y-12">
            {groups.map((g) => (
              <div key={g.title} id={slug(g.title)} className="scroll-mt-28">
                <h2 className="font-display uppercase tracking-[0.14em] text-sm font-semibold text-pt-clay mb-4">{g.title}</h2>
                <div className="space-y-3">
                  {g.items.map((f) => (
                    <details
                      key={f.q}
                      className="group bg-white rounded-2xl border border-pt-green/10 hover:border-pt-green/30 transition overflow-hidden"
                    >
                      <summary className="cursor-pointer list-none flex items-center justify-between gap-5 px-6 md:px-8 py-5 md:py-6">
                        <span className="font-display font-semibold text-lg md:text-xl text-pt-green leading-tight">{f.q}</span>
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
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-pt-muted mt-12">
            ¿Quieres leer el contrato completo? Está en las <Link href="/condiciones-de-contratacion" className="underline underline-offset-2 text-pt-green">condiciones de contratación</Link>.
          </p>
        </section>

        <section className="py-10 lg:py-10 px-6 lg:px-12 bg-pt-cream">
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
