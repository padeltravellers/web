import Link from "next/link";
import Img from "@/components/Img";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { contact, pricing } from "@/data/content";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Reservar plaza — Padel Travellers",
  description: "Cómo reservar tu plaza paso a paso: llamada inicial, reserva 500€, confirmación del grupo, segundo pago, llamada grupal y pago final.",
};

const steps = [
  {
    n: "01",
    title: "Llamada inicial",
    text: "Videollamada para conocernos, explicarte el viaje en detalle y resolver cualquier duda o pregunta que tengas.",
  },
  {
    n: "02",
    title: "Reserva tu plaza",
    text: "Confirmas la fecha, firmas el contrato y realizas el pago de reserva de 500€ para asegurar tu plaza en el grupo.",
  },
  {
    n: "03",
    title: "Confirmación del grupo",
    text: "Con 4 reservas se confirma el viaje. Es momento de comprar los vuelos — te ayudamos a conseguir las mejores combinaciones y tarifas.",
  },
  {
    n: "04",
    title: "Segundo pago",
    text: "Realizas un segundo pago de 1.000€ al confirmar el grupo.",
  },
  {
    n: "05",
    title: "Llamada grupal",
    text: "Organizamos un encuentro online para que el grupo se conozca, resolver dudas y ultimar detalles del viaje.",
  },
  {
    n: "06",
    title: "Último pago",
    text: "30 días antes del viaje se realiza el pago restante. ¡Y a preparar la maleta!",
  },
];

const cancellationRules = [
  {
    label: "Sin viaje confirmado",
    detail: "Devolución del importe completo de la reserva.",
  },
  {
    label: "Confirmado · más de 90 días",
    detail: "Reembolso parcial.",
  },
  {
    label: "Confirmado · menos de 90 días",
    detail: "No se realizan reembolsos.",
  },
];

export default function ReservarPage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 max-w-5xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6">Cómo reservar</p>
          <h1 className="font-display font-medium text-5xl md:text-7xl text-pt-green leading-[0.92]">
            ¿Te animas?
            <br />
            <span className="font-script italic font-normal text-pt-clay">Estos son los pasos</span>
          </h1>
          <p className="text-lg text-pt-muted max-w-2xl mx-auto mt-7 leading-relaxed">
            Sin sorpresas, en tu ritmo. Después de hablar contigo formalizamos la reserva con 500€ y luego se
            paga en dos plazos más.
          </p>
        </section>

        <section className="px-6 lg:px-12 pb-14 max-w-6xl mx-auto">
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {steps.map((s) => (
              <li key={s.n} className="bg-white border border-pt-green/10 rounded-3xl p-7 flex flex-col hover:shadow-xl transition">
                <span className="font-display font-medium text-5xl text-pt-clay/80 mb-4">{s.n}</span>
                <h3 className="font-display font-bold text-xl text-pt-green mb-3 leading-tight">{s.title}</h3>
                <p className="text-sm text-pt-muted leading-relaxed flex-1">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* DESTINOS */}
        <section className="bg-pt-cream/50 py-14 lg:py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5 text-center">Elige destino</p>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-pt-green text-center leading-[0.95] mb-12">
              ¿A dónde quieres viajar?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={d.status === "open" ? `/${d.slug}#fechas` : `/${d.slug}`}
                  className={`group relative aspect-[4/3] rounded-3xl overflow-hidden ${d.status === "open" ? "" : "opacity-90"}`}
                >
                  <Img src={d.hero} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pt-ink to-pt-ink/10" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-display uppercase tracking-[0.22em] ${d.status === "open" ? "bg-white/20 backdrop-blur text-white" : "bg-pt-clay text-white"}`}>
                      {d.status === "open" ? "Disponible 2026" : "Próximamente 2027"}
                    </span>
                  </div>
                  <div className="absolute left-5 right-5 bottom-5 text-white">
                    <h3 className="font-display font-medium text-5xl mb-2">{d.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{d.shortPitch}</p>
                    <span className="inline-flex items-center gap-2 font-display font-semibold text-sm group-hover:gap-3 transition-all">
                      {d.status === "open" ? "Elegir fechas" : "Lista de espera"}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRECIO + Política de cancelación */}
        <section className="py-14 lg:py-20 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-5">
            <div className="bg-pt-green text-white rounded-3xl p-9 md:p-12 relative overflow-hidden">
              <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-pt-clay/20 blur-3xl" />
              <div className="relative">
                <p className="font-display uppercase tracking-[0.26em] text-xs font-semibold text-pt-cream/70 mb-5">Pagos</p>
                <h2 className="font-display font-medium text-3xl md:text-4xl leading-tight mb-7">
                  Tres plazos.<br/>
                  <span className="font-script italic font-normal text-pt-cream">Sin sorpresas</span>
                </h2>
                <ul className="space-y-3 text-pt-cream/90">
                  <li className="flex justify-between gap-4 border-b border-white/15 pb-3">
                    <span className="font-display">Reserva</span>
                    <span className="font-display font-bold">{pricing.deposit}</span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-white/15 pb-3">
                    <span className="font-display">Confirmación del grupo</span>
                    <span className="font-display font-bold">1.000€</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="font-display">30 días antes del viaje</span>
                    <span className="font-display font-bold">Resto</span>
                  </li>
                </ul>
                <p className="text-pt-cream/75 text-sm mt-7 leading-relaxed">
                  Precio total Bali 2026: <strong className="text-white">{pricing.base}</strong> compartiendo
                  habitación · <strong className="text-white">{pricing.solo}</strong> habitación individual.
                </p>
              </div>
            </div>

            <div className="bg-white border border-pt-green/10 rounded-3xl p-9 md:p-12">
              <p className="font-display uppercase tracking-[0.26em] text-xs font-semibold text-pt-clay mb-5">Política de cancelación</p>
              <h2 className="font-display font-medium text-3xl md:text-4xl text-pt-green leading-tight mb-7">
                Flexibles cuando podemos
              </h2>
              <p className="text-pt-muted text-sm leading-relaxed mb-5">
                Si el grupo mínimo de 4 personas no se forma, te devolvemos el 100% del dinero o te damos
                opción de cambiar de fecha.
              </p>
              <ul className="space-y-3">
                {cancellationRules.map((r) => (
                  <li key={r.label} className="border-t border-pt-green/10 pt-3">
                    <div className="font-display font-semibold text-pt-green text-sm">{r.label}</div>
                    <div className="text-sm text-pt-muted">{r.detail}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FORM DE CONTACTO */}
        <section className="py-14 lg:py-20 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5">Empieza por aquí</p>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-pt-green leading-[0.95] mb-6">
                Déjanos tus datos
                <br />
                <span className="font-script italic font-normal text-pt-clay">y nosotros te llamamos</span>
              </h2>
              <p className="text-pt-muted text-lg max-w-xl mx-auto leading-relaxed">
                Si prefieres ir más rápido, escríbenos por WhatsApp y respondemos el mismo día.
              </p>
            </div>

            <LeadForm />

            <div className="mt-10 text-center text-sm text-pt-muted">
              <span>O directo: </span>
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola! Me interesa el viaje a Bali. ¿Me cuentas?")}`}
                className="font-display font-semibold text-pt-green hover:underline"
              >
                WhatsApp {contact.whatsapp}
              </a>
              <span> · </span>
              <a href={`mailto:${contact.email}`} className="font-display font-semibold text-pt-green hover:underline">
                {contact.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
