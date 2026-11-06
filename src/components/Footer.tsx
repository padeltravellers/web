import Link from "next/link";
import Img from "@/components/Img";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-pt-ink text-pt-cream/60 px-5 lg:px-10 pt-10 pb-8 mt-14">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" aria-label="Padel Travellers">
          <Img src="/logos/logo-white.png" alt="Padel Travellers" width={703} height={232} className="object-contain h-12 w-auto opacity-95" />
        </Link>
        <SocialIcons tone="light" />
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-center md:text-left">
        <span>© {new Date().getFullYear()} Padel World Experience LLC. Todos los derechos reservados.</span>
        <nav className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
          <Link href="/aviso-legal/" className="hover:text-pt-cream/90">Aviso legal</Link>
          <Link href="/condiciones-de-contratacion/" className="hover:text-pt-cream/90">Condiciones de contratación</Link>
          <Link href="/politica-de-privacidad-y-proteccion-de-datos/" className="hover:text-pt-cream/90">Privacidad</Link>
          <Link href="/politica-de-cookies/" className="hover:text-pt-cream/90">Cookies</Link>
        </nav>
      </div>
    </footer>
  );
}
