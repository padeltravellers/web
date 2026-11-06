"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Img from "@/components/Img";
import SocialIcons from "@/components/SocialIcons";

const NAV = [
  { href: "/bali/", label: "Bali" },
  { href: "/indonesia/", label: "Indonesia" },
  { href: "/filipinas/", label: "Filipinas" },
  { href: "/sobre/", label: "Sobre nosotros" },
  { href: "/preguntas/", label: "Preguntas" },
  { href: "/contacto/", label: "Contacto" },
];

/**
 * Cabecera fija en todas las páginas.
 * - transparent: empieza sobre la foto de portada (texto blanco) y al bajar pasa a fondo blanco.
 * - Al bajar se compacta (menos alto y logo más pequeño).
 * - En móvil, botón de menú con desplegable.
 */
export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = transparent && !scrolled && !open; // texto blanco sobre la foto
  const position = transparent ? "fixed" : "sticky";

  return (
    <>
      <header
        className={`${position} top-0 inset-x-0 z-50 transition-all duration-300 ${
          light ? "bg-transparent text-white" : "bg-white/95 backdrop-blur text-pt-ink border-b border-pt-green/10"
        } ${scrolled ? "shadow-[0_6px_24px_-12px_rgba(14,59,45,0.35)]" : ""}`}
      >
        <div className={`max-w-[1600px] mx-auto px-5 lg:px-10 flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4 lg:py-5"}`}>
          <Link href="/" className="flex items-center shrink-0 no-tap-highlight" onClick={() => setOpen(false)}>
            <Img
              src="/logos/logo-header.png"
              alt="Padel Travellers"
              width={703}
              height={232}
              priority
              className={`object-contain w-auto transition-all duration-300 ${scrolled ? "h-10 lg:h-12" : "h-12 md:h-14 lg:h-[72px]"} ${light ? "brightness-0 invert" : ""}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-lg font-display font-semibold">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:opacity-70 transition">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <SocialIcons tone={light ? "light" : "dark"} size={scrolled ? "sm" : "md"} />
            </div>
            <Link
              href="/reservar/"
              className={`ml-1 hidden sm:inline-flex items-center gap-1.5 font-display font-semibold rounded-full transition ${
                scrolled ? "text-sm px-5 py-2.5" : "text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3"
              } ${light ? "bg-white text-pt-green hover:bg-pt-cream" : "bg-pt-clay text-white hover:brightness-105"}`}
            >
              Reservar
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className={`lg:hidden w-11 h-11 rounded-full grid place-items-center border transition ${
                light ? "border-white/40 text-white hover:bg-white/10" : "border-pt-green/20 text-pt-green hover:bg-pt-green-pale"
              }`}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {open && (
          <div className="lg:hidden border-t border-pt-green/10 bg-white text-pt-ink max-h-[calc(100svh-72px)] overflow-y-auto">
            <nav className="px-6 py-4 flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 border-b border-pt-green/10 font-display font-semibold text-xl text-pt-green flex items-center justify-between"
                >
                  {n.label}
                  <span className="text-pt-clay" aria-hidden>→</span>
                </Link>
              ))}
            </nav>
            <div className="px-6 pb-6 pt-2 flex flex-col gap-5">
              <Link
                href="/reservar/"
                onClick={() => setOpen(false)}
                className="block text-center font-display font-semibold text-lg bg-pt-clay text-white px-6 py-4 rounded-full"
              >
                Reservar plaza
              </Link>
              <div className="flex justify-center">
                <SocialIcons />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
