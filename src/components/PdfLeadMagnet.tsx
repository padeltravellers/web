"use client";
import { useState } from "react";
import { asset } from "@/lib/path";

const ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_FORM_URL ||
  "https://script.google.com/macros/s/AKfycbyDoTntTQ9VVzWzSac6C7dxRHGIAyXtElrKRotFHhSvFsL2_wn6fpXnPle486W2fRnb/exec";

const PDF_URL = asset("/programa-bali-2026.pdf");

interface Props {
  /** "card" para bloque destacado, "inline" para insertar más discreto */
  variant?: "card" | "inline" | "dark";
  /** override del título */
  title?: React.ReactNode;
  /** override del kicker */
  kicker?: string;
}

export default function PdfLeadMagnet({
  variant = "card",
  title,
  kicker,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      body.append("source", "pdf-request");
      body.append("page", typeof window !== "undefined" ? window.location.pathname : "/");
      await fetch(ENDPOINT, { method: "POST", body });

      // Tracking
      type T = Window & {
        fbq?: (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };
      const w = window as T;
      if (typeof w.fbq === "function") w.fbq("track", "Lead", { content_name: "PDF programa Bali" });
      if (typeof w.gtag === "function")
        w.gtag("event", "pdf_request", { source: "lead_magnet", page: window.location.pathname });

      setStatus("ok");
      // Abre el PDF en pestaña nueva (gratificación inmediata)
      window.open(PDF_URL, "_blank", "noopener");
    } catch {
      setStatus("err");
    }
  }

  // === VARIANT: dark (bloque verde profundo, alto contraste) ===
  if (variant === "dark") {
    return (
      <div className="bg-pt-green text-pt-cream rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-pt-clay/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="font-display uppercase tracking-[0.26em] text-xs md:text-sm font-semibold text-pt-cream/70 mb-4">
            {kicker || "Programa completo"}
          </p>
          <h3 className="font-display font-medium text-3xl md:text-5xl leading-[1.05] mb-5">
            {title || (
              <>
                Recibe el dossier
                <br />
                <span className="font-script italic font-normal text-pt-cream">en tu email</span>
              </>
            )}
          </h3>
          <p className="text-pt-cream/85 mb-7 leading-relaxed max-w-lg">
            PDF de 30 páginas con todo: día a día, hotel, club, fechas, precios y política de cancelación.
            Para que lo leas con calma.
          </p>
          {status === "ok" ? (
            <SuccessBlock onDark />
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-[1fr_auto] gap-3 max-w-lg">
              <input
                required
                type="email"
                name="email"
                placeholder="tu@email.com"
                className="w-full rounded-full px-5 py-3.5 bg-white/95 text-pt-ink placeholder:text-pt-muted text-base focus:outline-none focus:ring-2 focus:ring-pt-cream"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-7 py-3.5 rounded-full bg-pt-cream text-pt-green font-display font-bold text-base hover:bg-white transition disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Quiero el programa →"}
              </button>
              <input type="hidden" name="name" value="(PDF request)" />
              {status === "err" && (
                <p className="text-sm text-pt-clay sm:col-span-2 -mt-1">
                  No se ha podido. <a href={PDF_URL} target="_blank" rel="noreferrer" className="underline">Descarga el PDF directamente</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }

  // === VARIANT: inline (compacto, en línea con resto de página) ===
  if (variant === "inline") {
    return (
      <div className="bg-pt-cream border border-pt-green/15 rounded-2xl px-6 py-5 md:flex md:items-center md:justify-between gap-6">
        <div className="mb-4 md:mb-0">
          <p className="font-display font-semibold text-pt-green text-base md:text-lg">
            {title || "¿Quieres el programa completo en PDF?"}
          </p>
          <p className="text-pt-muted text-sm">Te lo enviamos a tu email en 30 segundos.</p>
        </div>
        {status === "ok" ? (
          <SuccessBlock />
        ) : (
          <form onSubmit={onSubmit} className="flex gap-2 shrink-0">
            <input
              required
              type="email"
              name="email"
              placeholder="tu@email.com"
              className="rounded-full px-4 py-2.5 bg-white border border-pt-green/20 text-pt-ink text-sm placeholder:text-pt-muted/60 focus:outline-none focus:border-pt-green w-48"
            />
            <input type="hidden" name="name" value="(PDF request)" />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-5 py-2.5 rounded-full bg-pt-green text-white font-display font-semibold text-sm hover:bg-pt-green-soft transition disabled:opacity-60 whitespace-nowrap"
            >
              {status === "sending" ? "..." : "Recibir"}
            </button>
          </form>
        )}
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
            Lo abres ahora mismo + te llega copia al email.
          </p>
          {status === "ok" ? (
            <SuccessBlock />
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-[1fr_auto] gap-3 max-w-lg">
              <input
                required
                type="email"
                name="email"
                placeholder="tu@email.com"
                className="w-full rounded-full px-5 py-3.5 bg-pt-cream/60 border border-pt-green/15 text-pt-ink placeholder:text-pt-muted text-base focus:outline-none focus:border-pt-green focus:bg-white transition"
              />
              <input type="hidden" name="name" value="(PDF request)" />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-7 py-3.5 rounded-full bg-pt-green text-white font-display font-bold text-base hover:bg-pt-green-soft transition disabled:opacity-60 shadow-lg shadow-pt-green/20"
              >
                {status === "sending" ? "Enviando…" : "Quiero el programa →"}
              </button>
              {status === "err" && (
                <p className="text-sm text-pt-clay sm:col-span-2 -mt-1">
                  No se ha podido enviar. <a href={PDF_URL} target="_blank" rel="noreferrer" className="underline font-semibold">Descarga el PDF aquí</a>.
                </p>
              )}
            </form>
          )}
          <p className="text-xs text-pt-muted/80 mt-4">
            Solo te escribimos sobre el viaje. Sin spam, sin terceros.
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

function SuccessBlock({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${onDark ? "text-pt-cream" : "text-pt-green"}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${onDark ? "bg-pt-cream text-pt-green" : "bg-pt-green text-white"}`}>
        ✓
      </div>
      <div>
        <p className="font-display font-semibold">¡Programa abierto!</p>
        <p className={`text-sm ${onDark ? "text-pt-cream/80" : "text-pt-muted"}`}>
          También te llega copia al email en 1-2 minutos.
        </p>
      </div>
    </div>
  );
}
