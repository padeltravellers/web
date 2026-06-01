"use client";
import { useRef } from "react";

const REVIEWS = [
  { name: "Sandra Garcia", badge: "Local Guide", meta: "169 reseñas", when: "hace 3 meses", color: "#0E3B2D",
    text: "Si te gusta el pádel y viajar, esto es otro nivel. Entrenas, juegas partidos… y al mismo tiempo estás en Bali, comiendo increíble, viendo atardeceres y compartiendo la experiencia con un grupo brutal. Organización de 10!! Gracias Miriam y Oriol 🙏 100% recomendado." },
  { name: "Eva Lopez", badge: null, meta: "13 reseñas · 4 fotos", when: "hace 6 meses", color: "#B45309",
    text: "Mejor experiencia en años, se creó otra familia, la familia Pádel Travellers. Miriam y Oriol diez sobre diez. Divertidos, atentos, súper amables, fue genial genial. Top ten." },
  { name: "Soledad Valverde", badge: "Local Guide", meta: "18 reseñas", when: "hace 6 meses", color: "#1a5841",
    text: "¡Una experiencia increíble en Bali! El viaje en grupo fue espectacular: combinamos turismo, relax y pádel, y no pudo salir mejor. Destacable la dedicación detrás de cada detalle de Oriol y Miriam, unos auténticos cracks: siempre atentos, flexibles y dispuestos a adaptarse. Un planazo todo el viaje, y además conocí personas estupendas. Sin duda repetiría mil destinos más con ellos. ¡Recomendadísimo!" },
  { name: "Mar Cosp Pons", badge: "Local Guide", meta: "22 reseñas", when: "hace 6 meses", color: "#0E3B2D",
    text: "¡Uno de los mejores viajes de mi vida! Compartir experiencias con gente nueva, conocer un país nuevo y mucho pádel. Está todo organizado meticulosamente para que funcione sin ningún fallo. Recomiendo este viaje 100%, Bali + Pádel, gran combinación 😊" },
  { name: "Laia", badge: null, meta: "3 reseñas · 7 fotos", when: "hace 6 meses", color: "#B45309",
    text: "Dos semanas en Bali que se sintieron como un sueño 🌴✨ El viaje, con el pádel como punto de unión, nos regaló un grupo increíble y momentos que recordaré siempre. Entre templos, arrozales, cascadas y risas infinitas, descubrimos una isla mágica. Nuestro coordinador fue clave: siempre atento y positivo. Vuelvo con el corazón lleno, nuevos amigos y ganas locas de repetir 💚 Terima kasih!" },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 de 5 estrellas">
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}
function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88z"/>
      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z"/>
    </svg>
  );
}
function Chevron({ dir }: { dir: "l" | "r" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "l" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

export function RatingSummary() {
  return (
    <a href="https://maps.app.goo.gl/VKFUsVDmY8sWB2DU7" target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-3.5 rounded-2xl bg-white border border-black/5 shadow-[0_2px_18px_rgba(14,59,45,0.08)] px-5 py-3.5 hover:shadow-[0_4px_24px_rgba(14,59,45,0.12)] transition">
      <GoogleG />
      <div className="text-left leading-tight">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl text-pt-ink">5,0</span>
          <Stars />
        </div>
        <span className="text-xs text-black/50">Excelente · Reseñas verificadas en Google</span>
      </div>
    </a>
  );
}

export default function GoogleReviews() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: d * amount, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <button onClick={() => scroll(-1)} aria-label="Reseña anterior"
        className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white text-pt-green shadow-lg shadow-pt-green/15 border border-black/5 hover:bg-pt-green hover:text-white transition">
        <Chevron dir="l" />
      </button>
      <button onClick={() => scroll(1)} aria-label="Reseña siguiente"
        className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white text-pt-green shadow-lg shadow-pt-green/15 border border-black/5 hover:bg-pt-green hover:text-white transition">
        <Chevron dir="r" />
      </button>

      <div ref={track}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {REVIEWS.map((r) => (
          <div key={r.name} data-card
            className="snap-start shrink-0 w-[86%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)] h-[264px] flex flex-col rounded-2xl bg-white border border-black/5 shadow-[0_2px_18px_rgba(14,59,45,0.07)] p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-semibold text-base shrink-0" style={{ backgroundColor: r.color }}>
                {r.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-pt-ink text-sm truncate">{r.name}</span>
                  {r.badge && <span className="text-[10px] font-medium text-pt-green bg-pt-green-pale rounded-full px-1.5 py-0.5 shrink-0">{r.badge}</span>}
                </div>
                <span className="text-xs text-black/45">{r.meta}</span>
              </div>
              <GoogleG />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Stars />
              <span className="text-xs text-black/40">{r.when}</span>
            </div>
            <p className="mt-2.5 text-[14px] leading-relaxed text-pt-ink/80 line-clamp-4 overflow-hidden">{r.text}</p>
            <a href="https://maps.app.goo.gl/VKFUsVDmY8sWB2DU7" target="_blank" rel="noreferrer"
              className="mt-auto pt-2 text-xs font-display font-medium text-pt-green/70 hover:text-pt-green transition">
              Leer completa en Google →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
