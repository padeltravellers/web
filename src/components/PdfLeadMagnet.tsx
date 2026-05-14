import Link from "next/link";

interface Props {
  /** "card" para bloque destacado, "inline" para insertar más discreto */
  variant?: "card" | "inline" | "dark";
  /** override del título */
  title?: React.ReactNode;
  /** override del kicker */
  kicker?: string;
}

// === CTA hacia el form único de contacto ===
// El usuario hace click → /contacto?wants=pdf → form único (LeadForm)
// Apps Script lee el query string y, si wants=pdf, adjunta el PDF al email de confirmación.

const CTA_HREF = "/contacto?wants=pdf";

export default function PdfLeadMagnet({
  variant = "card",
  title,
  kicker,
}: Props) {
  // === VARIANT: dark (fondo verde profundo) — COMPACTO ===
  if (variant === "dark") {
    return (
      <div className="bg-pt-green text-pt-cream rounded-2xl p-6 md:p-7 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-pt-clay/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="md:flex-1">
            <p className="font-display uppercase tracking-[0.22em] text-[10px] md:text-xs font-semibold text-pt-cream/70 mb-2">
              {kicker || "Programa completo · PDF"}
            </p>
            <h3 className="font-display font-medium text-xl md:text-2xl leading-snug">
              {title || (
                <>Recibe el dossier completo del viaje <span className="font-script italic font-normal text-pt-cream">al instante</span></>
              )}
            </h3>
          </div>
          <Link
            href={CTA_HREF}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pt-cream text-pt-green font-display font-bold text-sm md:text-base hover:bg-white transition shrink-0 self-start md:self-auto"
          >
            Quiero el programa
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  // === VARIANT: inline (compacto) ===
  if (variant === "inline") {
    return (
      <div className="bg-pt-cream border border-pt-green/15 rounded-2xl px-6 py-5 md:flex md:items-center md:justify-between gap-6">
        <div className="mb-4 md:mb-0">
          <p className="font-display font-semibold text-pt-green text-base md:text-lg">
            {title || "¿Quieres el programa completo en PDF?"}
          </p>
          <p className="text-pt-muted text-sm">
            Déjanos tu email y te lo enviamos.
          </p>
        </div>
        <Link
          href={CTA_HREF}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition whitespace-nowrap shrink-0"
        >
          Pedir programa
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  // === VARIANT: card (default, bloque destacado claro) ===
  return (
    <div className="bg-white border border-pt-green/15 rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <p className="font-display uppercase tracking-[0.26em] text-xs md:text-sm font-semibold text-pt-clay mb-4">
            {kicker || "Programa completo"}
          </p>
          <h3 className="font-display font-medium text-3xl md:text-5xl leading-[1.05] text-pt-green mb-5">
            {title || (
              <>
                Recibe el dossier de Bali 2026
                <br />
                <span className="font-script italic font-normal text-pt-clay">en tu email</span>
              </>
            )}
          </h3>
          <p className="text-pt-muted text-lg leading-relaxed mb-7 max-w-md">
            PDF de 30 páginas con todo: día a día, hotel, club, fechas, precios y política de cancelación.
            Déjanos tu contacto y se te abre al instante.
          </p>
          <Link
            href={CTA_HREF}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-pt-green text-white font-display font-bold text-base hover:bg-pt-green-soft transition shadow-lg shadow-pt-green/20"
          >
            Quiero el programa
            <span aria-hidden>→</span>
          </Link>
          <p className="text-xs text-pt-muted/80 mt-4">
            Solo te escribimos sobre el viaje. Sin spam.
          </p>
        </div>

        {/* Mockup PDF — visual hint */}
        <div className="hidden md:flex relative">
          <div className="relative w-44 lg:w-52 aspect-[3/4] bg-pt-cream rounded-xl shadow-2xl shadow-pt-green/20 overflow-hidden rotate-3 border border-pt-green/10">
            <div className="absolute inset-0 bg-gradient-to-br from-pt-green via-pt-green-soft to-pt-ink" />
            <div className="absolute inset-5 flex flex-col text-pt-cream">
              <p className="font-script text-xl mb-1">Padel & Bali</p>
              <p className="font-display font-bold text-lg leading-tight">Programa<br/>2026</p>
              <div className="mt-auto">
                <div className="h-0.5 bg-pt-cream/40 w-12 mb-2" />
                <p className="font-mono text-[10px] opacity-70">30 páginas · PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
