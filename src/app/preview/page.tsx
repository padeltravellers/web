import Link from "next/link";
import Img from "@/components/Img";

const proposals = [
  {
    slug: "a",
    name: "Boutique Premium",
    vibe: "Aman · Aesop · calma",
    palette: ["#0E3B2D", "#F5EFE6", "#E8DCC8"],
    description: "Calma, espacio y silencio. Fotografía a sangre, tipografía extralight, scroll pausado.",
    hero: "/photos/home/hero.jpg",
  },
  {
    slug: "b",
    name: "Editorial Magazine",
    vibe: "Cereal · Kinfolk · NatGeo",
    palette: ["#0E3B2D", "#B8543A", "#F5EFE6"],
    description: "Como hojear una revista. Drop caps, polaroids, narrativa larga, serif Eczar.",
    hero: "/photos/bali/ubud/1.jpg",
  },
  {
    slug: "c",
    name: "Modern Conversion",
    vibe: "Stripe · WeRoad · Airbnb",
    palette: ["#0E3B2D", "#1B5840", "#B8543A"],
    description: "Plazas live, sticky CTA, social proof arriba, cards, micro-animaciones.",
    hero: "/photos/bali/partidos/1.jpg",
  },
  {
    slug: "d",
    name: "Manifiesto · Revolucionaria",
    vibe: "Brutalist · chat-first · scrollytelling",
    palette: ["#0A0F0C", "#B8543A", "#5CFFB0"],
    description: "Dark mode, sin nav, sin cards. Capítulos pantalla completa, tipografía oversize, timeline horizontal, chat bubbles. Para comparar contra la web actual.",
    hero: "/photos/bali/tanah-lot/1.jpg",
  },
];

export const metadata = { title: "Propuestas de diseño · Padel Travellers (preview interno)" };

export default function PreviewIndex() {
  return (
    <main className="min-h-screen bg-pt-cream text-pt-ink">
      <header className="px-6 lg:px-12 py-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Img src="/logos/monogram.png" alt="PT" width={36} height={36} className="object-contain" />
          <span className="font-display font-semibold text-pt-green">Padel Travellers</span>
        </Link>
        <Link href="/" className="text-xs font-display uppercase tracking-[0.22em] text-pt-muted hover:text-pt-green">
          ← Volver a la web
        </Link>
      </header>

      <section className="px-6 lg:px-12 pt-8 pb-16 max-w-5xl">
        <p className="font-display uppercase tracking-[0.32em] text-xs text-pt-clay mb-6">Archivo interno</p>
        <h1 className="font-display text-5xl md:text-7xl font-light leading-[0.95] tracking-tight text-pt-green">
          3 propuestas
          <br />
          <span className="font-script text-pt-clay">de diseño inicial.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pt-muted leading-relaxed">
          Estas son las 3 estéticas que se evaluaron antes de elegir la dirección final (C como base + hero/tipo de A).
          Quedan archivadas como referencia.
        </p>
      </section>

      <section className="px-6 lg:px-12 pb-24 grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
        {proposals.map((p) => (
          <Link
            key={p.slug}
            href={`/preview/${p.slug}`}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Img src={p.hero} alt={p.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-pt-green/70 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white">
                <span className="font-display uppercase tracking-[0.22em] text-[10px] font-semibold">
                  Propuesta {p.slug.toUpperCase()}
                </span>
                <div className="flex gap-1">
                  {p.palette.map((c) => (
                    <span key={c} style={{ backgroundColor: c }} className="w-4 h-4 rounded-full ring-2 ring-white/60" />
                  ))}
                </div>
              </div>
              <h2 className="absolute left-5 right-5 bottom-5 font-display text-3xl font-medium text-white leading-tight">
                {p.name}
              </h2>
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <p className="font-display uppercase tracking-[0.18em] text-xs text-pt-clay mb-3">{p.vibe}</p>
              <p className="text-pt-muted leading-relaxed mb-5 flex-1">{p.description}</p>
              <span className="inline-flex items-center gap-2 font-display font-medium text-pt-green group-hover:gap-3 transition-all">
                Ver propuesta
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
