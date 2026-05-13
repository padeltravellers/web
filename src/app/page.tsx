import Link from "next/link";
import Image from "next/image";

const proposals = [
  {
    slug: "a",
    name: "Boutique Premium",
    vibe: "Aman · Aesop · Calma",
    palette: ["#0E3B2D", "#F5EFE6", "#E8DCC8"],
    description:
      "Calma, espacio y silencio. Fotografía grande a sangre, tipografía Jost elegante, scroll pausado. Para posicionar PT como producto de alta gama.",
    hero: "/photos/home/hero.jpg",
  },
  {
    slug: "b",
    name: "Editorial Magazine",
    vibe: "Cereal · Kinfolk · NatGeo",
    palette: ["#0E3B2D", "#B8543A", "#F5EFE6"],
    description:
      "Como hojear una revista de viajes. Drop caps con Petit Formal, polaroids con cinta, narrativa larga, tipografía serif Eczar para los textos.",
    hero: "/photos/bali/ubud/1.jpg",
  },
  {
    slug: "c",
    name: "Modern Conversion",
    vibe: "Stripe · WeRoad · Airbnb",
    palette: ["#0E3B2D", "#1B5840", "#B8543A"],
    description:
      "Diseño moderno orientado a conversión. Plazas en vivo, sticky CTA, social proof arriba, cards de destinos, micro-animaciones. Vibe Stripe + WeRoad.",
    hero: "/photos/bali/partidos/1.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-pt-cream text-pt-ink">
      <header className="px-6 lg:px-16 py-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logos/monogram.png" alt="PT" width={42} height={42} className="object-contain" />
          <div className="font-display font-semibold tracking-tight text-lg text-pt-green">
            Padel Travellers
          </div>
        </div>
        <span className="font-body text-xs uppercase tracking-[0.18em] text-pt-muted">
          3 propuestas · v1 · 2026-05-13
        </span>
      </header>

      <section className="px-6 lg:px-16 pt-10 pb-20 max-w-6xl">
        <p className="font-display uppercase tracking-[0.22em] text-xs text-pt-clay mb-6">
          Para revisión interna
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-light leading-[0.95] tracking-tight text-pt-green">
          Tres formas de contar
          <br />
          <span className="font-script text-pt-clay">el mismo viaje.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-pt-muted leading-relaxed">
          Mismo contenido, misma arquitectura, mismas fotos. Tres tratamientos visuales distintos.
          Elige una, mezclamos, o iteramos sobre la que te encaje.
        </p>
      </section>

      <section className="px-6 lg:px-16 pb-32 grid gap-10 lg:grid-cols-3 max-w-7xl mx-auto">
        {proposals.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 no-tap-highlight"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={p.hero}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pt-green/70 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white">
                <span className="font-display uppercase tracking-[0.22em] text-[10px] font-semibold">
                  Propuesta {p.slug.toUpperCase()}
                </span>
                <div className="flex gap-1">
                  {p.palette.map((c) => (
                    <span
                      key={c}
                      style={{ backgroundColor: c }}
                      className="w-4 h-4 rounded-full ring-2 ring-white/60"
                    />
                  ))}
                </div>
              </div>
              <h2 className="absolute left-5 right-5 bottom-5 font-display text-3xl font-medium text-white leading-tight">
                {p.name}
              </h2>
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <p className="font-display uppercase tracking-[0.18em] text-xs text-pt-clay mb-3">
                {p.vibe}
              </p>
              <p className="text-pt-muted leading-relaxed mb-6 flex-1">{p.description}</p>
              <span className="inline-flex items-center gap-2 font-display font-medium text-pt-green group-hover:gap-3 transition-all">
                Ver propuesta
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>

      <footer className="px-6 lg:px-16 py-12 border-t border-pt-green/15 text-sm text-pt-muted flex flex-col md:flex-row justify-between gap-4">
        <span>Padel Travellers · {new Date().getFullYear()}</span>
        <span className="font-script text-pt-green text-base">Bali con pádel.</span>
      </footer>
    </main>
  );
}
