import Link from "next/link";
import Img from "@/components/Img";
import { contact } from "@/data/content";

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const base = transparent
    ? "absolute inset-x-0 top-0 z-30 text-white"
    : "sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-pt-green/10 text-pt-ink";
  return (
    <header className={base}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group no-tap-highlight">
          <Img
            src="/logos/monogram.png"
            alt="PT"
            width={36}
            height={36}
            className={`object-contain ${transparent ? "invert brightness-200" : ""}`}
          />
          <span className="font-display font-semibold tracking-tight text-base md:text-lg">
            Padel Travellers
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-display font-medium">
          <Link href="/bali" className="hover:opacity-70">Bali</Link>
          <Link href="/filipinas" className="hover:opacity-70">Filipinas</Link>
          <Link href="/sobre" className="hover:opacity-70">Sobre nosotros</Link>
          <Link href="/preguntas" className="hover:opacity-70">Preguntas</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={contact.whatsappLink}
            className={`hidden md:inline-flex text-xs font-display font-medium px-4 py-2 rounded-full transition ${
              transparent
                ? "border border-white/40 hover:bg-white/10"
                : "text-pt-green hover:bg-pt-green-pale"
            }`}
          >
            WhatsApp
          </a>
          <Link
            href="/reservar"
            className={`inline-flex items-center gap-1.5 text-xs md:text-sm font-display font-semibold px-4 md:px-5 py-2.5 rounded-full transition ${
              transparent
                ? "bg-white text-pt-green hover:bg-pt-cream"
                : "bg-pt-green text-white hover:bg-pt-green-soft"
            }`}
          >
            Reservar
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
