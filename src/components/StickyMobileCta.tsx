import Link from "next/link";

export default function StickyMobileCta({ label = "Reservar plaza", price = "300€" }: { label?: string; price?: string }) {
  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
      <Link
        href="/reservar"
        className="flex items-center justify-between gap-3 bg-pt-green text-white px-5 py-3.5 rounded-full shadow-2xl shadow-pt-green/40"
      >
        <div>
          <div className="font-display font-bold text-sm">{label}</div>
          <div className="text-xs text-pt-cream/85">{price} · plaza confirmada</div>
        </div>
        <span className="font-bold" aria-hidden>→</span>
      </Link>
    </div>
  );
}
