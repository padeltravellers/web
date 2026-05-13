import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { legalCompany } from "@/data/legal";

interface LegalLayoutProps {
  kicker: string;
  title: string;
  children: React.ReactNode;
}

export default function LegalLayout({ kicker, title, children }: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main className="text-pt-ink">
        <section className="px-6 lg:px-12 pt-12 pb-10 lg:pt-16 lg:pb-12 max-w-4xl mx-auto">
          <p className="font-display uppercase tracking-[0.26em] text-base md:text-lg font-semibold text-pt-clay mb-5">{kicker}</p>
          <h1 className="font-display font-extralight text-4xl md:text-6xl text-pt-green leading-[0.95]">{title}</h1>
          <p className="mt-6 text-sm text-pt-muted">Última actualización: {legalCompany.updatedAt}</p>
        </section>

        <section className="px-6 lg:px-12 pb-20 max-w-3xl mx-auto">
          <article className="prose-legal">{children}</article>
        </section>
      </main>
      <Footer />
    </>
  );
}
