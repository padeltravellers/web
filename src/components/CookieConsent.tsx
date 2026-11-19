"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { hasConsent } from "@/lib/track";

type ConsentWindow = Window & {
  ptConsent?: (v: "granted" | "denied") => void;
  fbq?: (...args: unknown[]) => void;
};

/** Aviso de cookies (LSSI art. 22.2): Meta y las cookies de GA solo tras aceptar.
 * Aceptar y Rechazar con el mismo peso. Se vuelve a abrir desde «Configurar cookies» del pie. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("pt_consent");
    } catch {}
    if (!stored) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("pt-open-cookies", reopen);
    return () => window.removeEventListener("pt-open-cookies", reopen);
  }, []);

  // PageView en la navegación interna (la primera la manda el script base al cargar)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as ConsentWindow;
    if (hasConsent() && typeof w.fbq === "function") w.fbq("track", "PageView");
  }, [pathname]);

  function choose(v: "granted" | "denied") {
    (window as ConsentWindow).ptConsent?.(v);
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md z-[60] rounded-2xl bg-pt-ink text-pt-cream shadow-2xl p-5 text-sm leading-relaxed"
    >
      <p>
        Usamos cookies propias y de terceros (Google y Meta) para medir las visitas y mostrarte anuncios
        de nuestros viajes. Puedes aceptarlas o rechazarlas.{" "}
        <Link href="/politica-de-cookies/" className="underline underline-offset-2 text-pt-cream/90 hover:text-white">
          Más información
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-pt-cream/40 px-4 py-2.5 font-semibold hover:bg-white/10"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full border border-pt-cream bg-pt-cream text-pt-ink px-4 py-2.5 font-semibold hover:bg-white"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

/** Enlace del pie para cambiar la elección. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("pt-open-cookies"))}>
      Configurar cookies
    </button>
  );
}
