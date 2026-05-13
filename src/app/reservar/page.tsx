import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact, pricing } from "@/data/content";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Reservar plaza — Padel Travellers",
  description: "Tres pasos para reservar tu plaza: elige destino y fecha, hablamos contigo por WhatsApp, formalizas reserva con 300€.",
};

export default function ReservarPage() {
  const openDestinations = destinations.filter((d) => d.status === "open");
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-16 pb-16 lg:pt-24 lg:pb-20 max-w-6xl mx-auto">
          <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">Reservar plaza</p>
          <h1 className="font-display font-extralight text-5xl md:text-7xl text-pt-green leading-[0.9] mb-8">
            Tu plaza,
            <br />
            <span className="font-script italic">en tres pasos.</span>
          </h1>
          <p className="text-lg text-pt-muted max-w-2xl leading-relaxed">
            No usamos formularios largos ni cobro automático antes de hablar contigo. Primero conversamos por
            WhatsApp y aseguramos que el viaje encaja. Después, plaza confirmada con 300€.
          </p>
        </section>

        {/* STEPS */}
        <section className="px-6 lg:px-12 max-w-6xl mx-auto pb-20">
          <ol className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Elige destino y fecha tentativa",
                text: "Bali tiene 8 salidas en 2026. Si no estás seguro, no pasa nada — lo afinamos juntos en la llamada.",
                action: { label: "Ver fechas Bali", href: "/bali#fechas" },
              },
              {
                n: "02",
                title: "Hablamos por WhatsApp",
                text: "Marta te responde el mismo día y, si encaja, organizamos una llamada corta con Oriol. Cero presión: si no te convence, no pasa nada.",
                action: { label: "Abrir WhatsApp", href: contact.whatsappLink, external: true },
              },
              {
                n: "03",
                title: "Reserva con 300€",
                text: "Cuando esté claro qué fecha y qué destino, te mandamos los datos para transferir 300€. Plaza confirmada. El resto se abona antes del viaje.",
                action: { label: "Hablar con Oriol", href: `mailto:${contact.email}` },
              },
            ].map((step) => (
              <li key={step.n} className="bg-white border border-pt-green/10 rounded-3xl p-8 flex flex-col hover:shadow-xl transition">
                <span className="font-display font-extralight text-5xl text-pt-clay mb-5">{step.n}</span>
                <h3 className="font-display font-bold text-xl text-pt-green mb-3 leading-tight">{step.title}</h3>
                <p className="text-sm text-pt-muted leading-relaxed mb-6 flex-1">{step.text}</p>
                <Link
                  href={step.action.href}
                  className="inline-flex items-center gap-2 font-display font-medium text-pt-green hover:gap-3 transition-all text-sm"
                >
                  {step.action.label}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* DESTINOS PICK */}
        <section className="bg-pt-cream/50 py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-5 text-center">Paso 1</p>
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green text-center leading-tight mb-14">
              ¿Qué destino?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={d.status === "open" ? `/${d.slug}#fechas` : `/${d.slug}`}
                  className={`group relative aspect-[4/3] rounded-3xl overflow-hidden ${d.status === "open" ? "" : "opacity-90"}`}
                >
                  <Image src={d.hero} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pt-ink to-pt-ink/10" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-display uppercase tracking-[0.22em] ${d.status === "open" ? "bg-white/20 backdrop-blur text-white" : "bg-pt-clay text-white"}`}>
                      {d.status === "open" ? "Disponible 2026" : "Próximamente 2027"}
                    </span>
                  </div>
                  <div className="absolute left-5 right-5 bottom-5 text-white">
                    <h3 className="font-display font-light text-5xl mb-2">{d.name}</h3>
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

        {/* PRECIO RESUMEN */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto bg-pt-green text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-pt-clay/20 blur-3xl" />
            <div className="relative">
              <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-cream/70 mb-5">Recordatorio</p>
              <h2 className="font-display font-extralight text-4xl md:text-5xl leading-tight mb-8">
                {pricing.deposit} reserva.
                <br />
                <span className="font-script italic text-pt-cream">El resto, antes de salir.</span>
              </h2>
              <p className="text-pt-cream/85 max-w-xl mx-auto leading-relaxed mb-2">
                Precio total Bali 2026: <strong className="text-white">{pricing.base}</strong> compartiendo
                habitación, <strong className="text-white">{pricing.solo}</strong> habitación individual.
              </p>
              <p className="text-pt-cream/70 text-sm">Sin bote común. Sin recargos. Sin sorpresas en destino.</p>
            </div>
          </div>
        </section>

        {/* CTA WHATSAPP DIRECTO */}
        <section className="py-24 px-6 lg:px-12 bg-pt-cream">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-light text-3xl md:text-5xl text-pt-green leading-tight mb-6">
              ¿Listo para hablar?
            </h2>
            <p className="text-pt-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Mánda un WhatsApp con tu nombre y tu pregunta. Marta responde el mismo día.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent("Hola Marta! Me interesa el viaje a Bali. ¿Me cuentas?")}`}
                className="px-9 py-4 rounded-full bg-pt-green text-white font-display font-bold text-sm hover:bg-pt-green-soft transition shadow-xl shadow-pt-green/20"
              >
                WhatsApp · {contact.whatsapp}
              </a>
              <a href={`mailto:${contact.email}`} className="px-9 py-4 rounded-full border-2 border-pt-green text-pt-green font-display font-bold text-sm hover:bg-pt-green hover:text-white transition">
                Email a Oriol
              </a>
            </div>
            <p className="mt-6 text-xs text-pt-muted">Respuesta media: 30 min · Lun a Vie 10:00–20:00 (ES)</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
