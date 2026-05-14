"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/path";

const ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_FORM_URL ||
  "https://script.google.com/macros/s/AKfycbyDoTntTQ9VVzWzSac6C7dxRHGIAyXtElrKRotFHhSvFsL2_wn6fpXnPle486W2fRnb/exec";

const PDF_URL = asset("/programa-bali-2026.pdf");

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const [wantsPdf, setWantsPdf] = useState<boolean>(false);

  // Si la URL trae ?wants=pdf, pre-marcamos el checkbox del programa
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("wants") === "pdf") setWantsPdf(true);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ENDPOINT) {
      setStatus("err");
      setErrMsg("Form endpoint no configurado. Escríbenos por WhatsApp y nos pones tus datos.");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      // Apps Script requires no preflight → form-urlencoded
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      const r = await fetch(ENDPOINT, {
        method: "POST",
        body,
      });
      if (!r.ok) throw new Error("Network error");
      // Tracking: Meta Pixel + GA4 Lead event
      type TrackWindow = Window & {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };
      const w = window as TrackWindow;
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead", {
          content_name: wantsPdf ? "Web form + PDF" : "Web form",
        });
      }
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          source: wantsPdf ? "web-form-pdf" : "web-form",
          page_location: window.location.pathname,
        });
      }

      // Si pidió el PDF, lo abrimos en pestaña nueva al instante (gratificación inmediata)
      if (wantsPdf) {
        window.open(PDF_URL, "_blank", "noopener");
      }

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
      setErrMsg("No se ha podido enviar. Inténtalo en un momento o escríbenos por WhatsApp.");
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-pt-green text-pt-cream rounded-3xl p-10 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-display font-semibold text-2xl mb-3">¡Recibido!</h3>
        <p className="text-pt-cream/90 max-w-md mx-auto">
          {wantsPdf ? (
            <>
              El programa se ha abierto en una pestaña nueva. Si no lo ves,{" "}
              <a href={PDF_URL} target="_blank" rel="noreferrer" className="underline font-semibold hover:text-white">
                descárgalo aquí
              </a>
              . Y te contactamos en menos de 24h por WhatsApp.
            </>
          ) : (
            <>
              Te contactamos en menos de 24h por WhatsApp o email. Mientras tanto, si prefieres adelantar la
              conversación, escríbenos directamente al +34 614 47 60 68.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-pt-green/10 rounded-3xl p-7 md:p-9 grid gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <label className="block">
          <span className="block font-display font-medium text-sm text-pt-ink mb-1.5">Nombre*</span>
          <input
            required
            name="name"
            type="text"
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-pt-green/20 px-4 py-3 text-base text-pt-ink placeholder:text-pt-muted/60 focus:border-pt-green focus:outline-none transition"
          />
        </label>
        <label className="block">
          <span className="block font-display font-medium text-sm text-pt-ink mb-1.5">Email*</span>
          <input
            required
            name="email"
            type="email"
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-pt-green/20 px-4 py-3 text-base text-pt-ink placeholder:text-pt-muted/60 focus:border-pt-green focus:outline-none transition"
          />
        </label>
        <label className="block">
          <span className="block font-display font-medium text-sm text-pt-ink mb-1.5">Teléfono*</span>
          <input
            required
            name="phone"
            type="tel"
            placeholder="+34 ..."
            className="w-full rounded-xl border border-pt-green/20 px-4 py-3 text-base text-pt-ink placeholder:text-pt-muted/60 focus:border-pt-green focus:outline-none transition"
          />
        </label>
        <label className="block">
          <span className="block font-display font-medium text-sm text-pt-ink mb-1.5">Destino</span>
          <select
            name="destination"
            defaultValue="bali"
            className="w-full rounded-xl border border-pt-green/20 px-4 py-3 text-base text-pt-ink bg-white focus:border-pt-green focus:outline-none transition"
          >
            <option value="bali">Bali 2026</option>
            <option value="filipinas">Filipinas 2027 (lista de espera)</option>
            <option value="aun-no-se">Aún no lo sé</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="block font-display font-medium text-sm text-pt-ink mb-1.5">¿Algo que quieras contarnos?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Si tienes una fecha en mente, si vienes solo o acompañado, nivel de pádel… lo que quieras."
          className="w-full rounded-xl border border-pt-green/20 px-4 py-3 text-base text-pt-ink placeholder:text-pt-muted/60 focus:border-pt-green focus:outline-none transition resize-none"
        />
      </label>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="wants_pdf"
          checked={wantsPdf}
          onChange={(e) => setWantsPdf(e.target.checked)}
          value="1"
          className="mt-1 w-5 h-5 accent-pt-green cursor-pointer"
        />
        <span className="text-sm text-pt-ink leading-snug">
          <span className="font-display font-semibold">Quiero el programa completo del viaje en PDF</span>
          <span className="block text-pt-muted mt-0.5">30 páginas con día a día, hotel, club, fechas y precios. Se abre al enviar el form.</span>
        </span>
      </label>

      <input type="hidden" name="source" value={wantsPdf ? "web-form-pdf" : "web-form"} />
      <input type="hidden" name="page" value={typeof window !== "undefined" ? window.location.pathname : "/"} />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-pt-muted">
          Al enviar aceptas que te contactemos. No te llenamos el correo de spam — solo el viaje.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-9 py-3.5 rounded-full bg-pt-green text-white font-display font-semibold text-base hover:bg-pt-green-soft transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-pt-green/20"
        >
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
      </div>
      {status === "err" && (
        <p className="text-sm text-pt-clay text-center bg-pt-clay/5 rounded-xl p-3 -mt-2">{errMsg}</p>
      )}
    </form>
  );
}
