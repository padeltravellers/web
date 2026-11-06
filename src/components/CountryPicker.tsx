"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { countries, flag } from "@/data/booking";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Selector de prefijo con buscador: acepta "+34", "34", "esp", "españa"… */
export default function CountryPicker({ iso, onChange }: { iso: string; onChange: (iso: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hi, setHi] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const current = countries.find((c) => c.iso === iso) || countries[0];

  const list = useMemo(() => {
    const n = norm(q.trim()).replace(/^\+/, "");
    if (!n) return countries;
    return countries.filter((c) => norm(c.name).includes(n) || c.code.replace("+", "").startsWith(n) || c.iso.toLowerCase() === n);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  function pick(c: { iso: string }) {
    onChange(c.iso);
    setOpen(false);
    setQ("");
  }

  return (
    <div ref={box} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Prefijo: ${current.name} ${current.code}`}
        onClick={() => {
          setOpen((o) => !o);
          setHi(0);
        }}
        className="h-full flex items-center gap-1.5 pl-3 pr-2 py-3 text-[15px] rounded-l-2xl border-r border-pt-green/10 hover:bg-pt-green/[0.03] focus:outline-none"
      >
        <span aria-hidden>{flag(current.iso)}</span>
        <span className="text-pt-ink">{current.code}</span>
        <span className="text-pt-muted text-xs" aria-hidden>▾</span>
      </button>
      {open && (
        <div className="absolute z-50 left-0 top-full mt-2 w-72 bg-white border border-pt-green/15 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-pt-green/10">
            <input
              autoFocus
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setHi(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHi((h) => Math.min(h + 1, list.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHi((h) => Math.max(h - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (list[hi]) pick(list[hi]);
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
              placeholder="Busca país o prefijo (Esp, +34…)"
              className="w-full rounded-xl border border-pt-green/15 px-3 py-2 text-sm focus:outline-none focus:border-pt-green"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {list.length === 0 && <li className="px-4 py-3 text-sm text-pt-muted">Sin resultados</li>}
            {list.map((c, i) => (
              <li key={c.iso} role="option" aria-selected={c.iso === iso}>
                <button
                  type="button"
                  onMouseEnter={() => setHi(i)}
                  onClick={() => pick(c)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left ${i === hi ? "bg-pt-cream" : ""} ${c.iso === iso ? "font-semibold text-pt-green" : "text-pt-ink"}`}
                >
                  <span aria-hidden>{flag(c.iso)}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-pt-muted">{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

