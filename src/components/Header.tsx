import Link from "next/link";
import Img from "@/components/Img";
import { contact } from "@/data/content";

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const base = transparent
    ? "absolute inset-x-0 top-0 z-30 text-white"
    : "relative z-30 bg-white border-b border-pt-green/10 text-pt-ink";
  const iconBtn = transparent
    ? "w-11 h-11 rounded-full border border-white/40 hover:bg-white/10 flex items-center justify-center transition"
    : "w-11 h-11 rounded-full border border-pt-green/20 text-pt-green hover:bg-pt-green-pale flex items-center justify-center transition";
  // Logo grande con margen negativo solo cuando hay hero a sangre detrás
  // En páginas sin hero (contacto, sobre, etc) compacto y sin overflow
  const containerClass = transparent
    ? "max-w-[1600px] mx-auto pl-1 lg:pl-2 pr-5 lg:pr-10 pt-0 pb-0 -mt-8 lg:-mt-12 flex items-center justify-between"
    : "max-w-[1600px] mx-auto pl-4 lg:pl-8 pr-5 lg:pr-10 py-3 flex items-center justify-between";
  const logoClass = transparent
    ? "object-contain h-56 md:h-72 lg:h-80 w-auto brightness-0 invert"
    : "object-contain h-28 md:h-36 lg:h-40 w-auto";

  return (
    <header className={base}>
      <div className={containerClass}>
        <Link href="/" className={`flex items-center group no-tap-highlight ${transparent ? "-ml-2 lg:-ml-3" : ""}`}>
          <Img
            src="/logos/logo-main.png"
            alt="Padel Travellers"
            width={400}
            height={400}
            className={logoClass}
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-12 text-xl font-display font-semibold">
          <Link href="/bali" className="hover:opacity-70 transition">Bali</Link>
          <Link href="/filipinas" className="hover:opacity-70 transition">Filipinas</Link>
          <Link href="/sobre" className="hover:opacity-70 transition">Sobre nosotros</Link>
          <Link href="/preguntas" className="hover:opacity-70 transition">Preguntas</Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* Social icons */}
          <a href={contact.whatsappLink} aria-label="WhatsApp" className={iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={transparent ? "text-white" : "text-pt-green"}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
            </svg>
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={transparent ? "text-white" : "text-pt-green"}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email" className={iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={transparent ? "text-white" : "text-pt-green"}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          <Link
            href="/contacto"
            className={`ml-2 inline-flex items-center gap-1.5 text-sm md:text-base font-display font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full transition ${
              transparent
                ? "bg-white text-pt-green hover:bg-pt-cream"
                : "bg-pt-green text-white hover:bg-pt-green-soft"
            }`}
          >
            Contacto
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
