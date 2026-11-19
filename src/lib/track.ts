/**
 * Medición (2026-11-19, Oriol: «el píxel quiero arreglarlo»).
 *
 * El píxel de Meta y las cookies de Google Analytics solo se activan si el visitante acepta las
 * cookies (aviso CookieConsent). Sin consentimiento, track() no envía nada a Meta y GA funciona
 * sin cookies (Consent Mode). El script base vive en layout.tsx: window.ptConsent(), ptLoadPixel().
 *
 * Eventos estándar de Meta que usamos:
 *  - PageView          cada página (también en la navegación interna)
 *  - ViewContent       páginas de destino (Bali, Indonesia, Filipinas) y /reservar
 *  - Contact           clic a WhatsApp
 *  - Lead              formulario de contacto / programa
 *  - InitiateCheckout  reserva: ha elegido salida y habitación
 *  - Purchase          reserva enviada (valor = precio del viaje × viajeros)
 */

type Params = Record<string, unknown>;
type TrackWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

const GA_NAMES: Record<string, string> = {
  ViewContent: "view_item",
  Contact: "contact",
  Lead: "generate_lead",
  InitiateCheckout: "begin_checkout",
  Purchase: "purchase",
};

export function hasConsent(): boolean {
  try {
    return localStorage.getItem("pt_consent") === "granted";
  } catch {
    return false;
  }
}

/** Envía un evento a Meta (solo con consentimiento) y a GA4. Devuelve el eventID. */
export function track(event: string, params: Params = {}): string {
  const id = `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  if (typeof window === "undefined") return id;
  const w = window as TrackWindow;
  try {
    if (hasConsent() && typeof w.fbq === "function") w.fbq("track", event, params, { eventID: id });
  } catch {}
  try {
    if (typeof w.gtag === "function") {
      const ga: Params = { ...params, page_location: window.location.pathname };
      if (params.value !== undefined) ga.value = params.value;
      w.gtag("event", GA_NAMES[event] || event, ga);
    }
  } catch {}
  return id;
}
