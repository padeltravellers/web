const REVIEWS = [
  {
    name: "Sandra Garcia",
    badge: "Local Guide",
    meta: "169 reseñas",
    when: "hace 3 meses",
    color: "#0E3B2D",
    text: "Si te gusta el pádel y viajar, esto es otro nivel. Entrenas, juegas partidos… y al mismo tiempo estás en Bali, comiendo increíble, viendo atardeceres y compartiendo la experiencia con un grupo brutal. Organización de 10!! Gracias Miriam y Oriol 🙏 100% recomendado.",
  },
  {
    name: "Eva Lopez",
    badge: null,
    meta: "13 reseñas · 4 fotos",
    when: "hace 6 meses",
    color: "#B45309",
    text: "Mejor experiencia en años, se creó otra familia, la familia Pádel Travellers. Miriam y Oriol diez sobre diez. Divertidos, atentos, súper amables, fue genial genial. Top ten.",
  },
  {
    name: "Soledad Valverde",
    badge: "Local Guide",
    meta: "18 reseñas",
    when: "hace 6 meses",
    color: "#1a5841",
    text: "¡Una experiencia increíble en Bali! El viaje en grupo fue espectacular: combinamos turismo, relax y pádel, y no pudo salir mejor. Destacable la dedicación detrás de cada detalle de Oriol y Miriam, los organizadores, unos auténticos cracks: siempre atentos, flexibles y dispuestos a adaptarse a nuestros gustos. Un planazo todo el viaje, y además conocí personas estupendas. Sin duda repetiría mil destinos más con ellos. ¡Recomendadísimo!",
  },
  {
    name: "Mar Cosp Pons",
    badge: "Local Guide",
    meta: "22 reseñas",
    when: "hace 6 meses",
    color: "#0E3B2D",
    text: "¡Uno de los mejores viajes de mi vida! Compartir experiencias con gente nueva, conocer un país nuevo y mucho pádel. Está todo organizado meticulosamente para que funcione sin ningún fallo. Recomiendo este viaje 100%, Bali + Pádel, gran combinación 😊",
  },
  {
    name: "Ghg",
    badge: null,
    meta: "3 reseñas · 7 fotos",
    when: "hace 6 meses",
    color: "#B45309",
    text: "Dos semanas en Bali que se sintieron como un sueño 🌴✨ El viaje, con el pádel como punto de unión, nos regaló un grupo increíble y momentos que recordaré siempre. Entre templos, arrozales, cascadas y risas infinitas, descubrimos una isla mágica. Nuestro coordinador fue clave: siempre atento y positivo. Vuelvo con el corazón lleno, nuevos amigos y ganas locas de repetir 💚 Terima kasih!",
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88z" />
      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
    </svg>
  );
}

export default function GoogleReviews() {
  return (
    <div className="[column-count:1] md:[column-count:2] lg:[column-count:3] [column-gap:1.25rem]">
      {REVIEWS.map((r) => (
        <div
          key={r.name}
          className="mb-5 break-inside-avoid rounded-2xl bg-white border border-black/5 shadow-[0_2px_18px_rgba(14,59,45,0.07)] p-5"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-semibold text-base shrink-0"
              style={{ backgroundColor: r.color }}
            >
              {r.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-semibold text-pt-ink text-sm truncate">{r.name}</span>
                {r.badge && (
                  <span className="text-[10px] font-medium text-pt-green bg-pt-green-pale rounded-full px-1.5 py-0.5 shrink-0">
                    {r.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-black/45">{r.meta}</span>
            </div>
            <GoogleG />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Stars />
            <span className="text-xs text-black/40">{r.when}</span>
          </div>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-pt-ink/80">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
