import Link from "next/link";
import Img from "@/components/Img";
import { contact } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-pt-ink text-pt-cream/75 pt-20 pb-10 px-5 lg:px-10 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <Img src="/logos/monogram.png" alt="PT" width={40} height={40} className="object-contain" />
            <span className="font-display font-semibold text-pt-cream text-lg">Padel Travellers</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm mb-6">
            Viajes en grupo a Bali con pádel. 14 días, 8–12 personas, alojamiento premium, coordinador
            español. Hechos con calma, vividos con intensidad.
          </p>
          <p className="font-script text-pt-cream text-lg">Bali con pádel.</p>
        </div>

        <div className="md:col-span-3">
          <div className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/60 mb-4">
            Destinos
          </div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/bali" className="hover:text-pt-cream">Bali · abierto 2026</Link></li>
            <li><Link href="/filipinas" className="hover:text-pt-cream">Filipinas · próximamente</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/60 mb-4">
            La empresa
          </div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/sobre" className="hover:text-pt-cream">Sobre nosotros</Link></li>
            <li><Link href="/preguntas" className="hover:text-pt-cream">Preguntas frecuentes</Link></li>
            <li><Link href="/reservar" className="hover:text-pt-cream">Reservar</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/60 mb-4">
            Contacto
          </div>
          <ul className="space-y-2.5 text-sm">
            <li><a href={contact.whatsappLink} className="hover:text-pt-cream">WhatsApp</a></li>
            <li><a href={`mailto:${contact.email}`} className="hover:text-pt-cream break-all">{contact.email}</a></li>
            <li><a href={contact.instagram} target="_blank" rel="noreferrer" className="hover:text-pt-cream">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-pt-cream/50">
        <span>© {new Date().getFullYear()} Padel World Experience LLC. Todos los derechos reservados.</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/aviso-legal" className="hover:text-pt-cream/80">Aviso legal</Link>
          <Link href="/privacidad" className="hover:text-pt-cream/80">Privacidad</Link>
          <Link href="/cookies" className="hover:text-pt-cream/80">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
