import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { contact } from "@/data/content";

export const metadata = {
  title: "Contacto",
  description: "Déjanos tus datos y te llamamos. Resolvemos cualquier duda sobre los viajes a Bali y Filipinas.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-14 pb-10 lg:pt-14 lg:pb-12 max-w-3xl mx-auto text-center">
          <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-6">
            ¿Hablamos?
          </p>
          <h1 className="font-display font-medium text-5xl md:text-7xl text-pt-green leading-[0.95]">
            Cuéntanos
            <br />
            <span className="font-script italic font-normal text-pt-clay">y te llamamos</span>
          </h1>
          <p className="text-lg text-pt-muted max-w-xl mx-auto mt-7 leading-relaxed">
            Sin compromiso. Te contestamos en menos de 24h por WhatsApp o email para resolver tus dudas
            y ayudarte a elegir la fecha que mejor encaje.
          </p>
        </section>

        <section className="px-6 lg:px-12 pb-12 lg:pb-12">
          <div className="max-w-3xl mx-auto">
            <LeadForm />

            <div className="mt-10 text-center text-sm text-pt-muted">
              <span>O si prefieres ir directo: </span>
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
