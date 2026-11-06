"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Plazas reales de cada salida, leídas del Sheet "Reservas PT 2027" a través del Apps Script.
// El contador aparece cuando ya hay 4 reservas (quedan 8 o menos); en color tierra cuando quedan 4 o menos.
// Sin endpoint (o si falla), las tarjetas se muestran sin contador.
const ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || "";
const MAX = 12;

type Trip = { n: number; range: string; month: string };
type Plaza = { codigo: string; libres: number; estado: string };

export default function TripCards({ trips, prefix = "BALI", bookHref = "/reservar/bali/" }: { trips: Trip[]; prefix?: string; bookHref?: string }) {
  const [plazas, setPlazas] = useState<Record<string, Plaza>>({});

  useEffect(() => {
    if (!ENDPOINT) return;
    fetch(`${ENDPOINT}?action=plazas`)
      .then((r) => r.json())
      .then((d: { ok: boolean; salidas?: Plaza[] }) => {
        if (d.ok && d.salidas) setPlazas(Object.fromEntries(d.salidas.map((s) => [s.codigo, s])));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {trips.map((t) => {
        const p = plazas[`${prefix}-${t.n}`];
        const left = p ? Math.max(0, p.libres) : undefined;
        const full = left === 0;
        const urgent = left !== undefined && left > 0 && left <= 4;
        const counted = left !== undefined && left > 0 && left <= MAX - 4;
        const fillPct = left === undefined || left > MAX - 4 ? 0 : ((MAX - left) / MAX) * 100;
        const body = (
          <>
            <div className="flex items-baseline justify-between mb-3">
              <span className={`font-display font-light text-4xl ${urgent ? "text-pt-clay" : "text-pt-green"}`}>{String(t.n).padStart(2, "0")}</span>
              <span className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-muted">{t.month}</span>
            </div>
            <div className="font-display font-semibold text-pt-ink leading-tight">{t.range}</div>
            <div className="text-xs text-pt-muted mt-1 mb-4">14 días</div>
            <div className="mt-auto">
              {fillPct > 0 && (
                <div className="flex-1 h-1.5 bg-pt-green-pale rounded-full overflow-hidden mb-2">
                  <div className={`h-full transition-all duration-700 ${urgent || full ? "bg-pt-clay" : "bg-pt-green"}`} style={{ width: `${fillPct}%` }} />
                </div>
              )}
              <div className={`text-xs font-display font-semibold ${full ? "text-pt-ink/50" : urgent ? "text-pt-clay" : "text-pt-green"}`}>
                {full ? "Completo" : counted ? (left === 1 ? "Última plaza" : `Quedan ${left} plazas`) : "Plazas disponibles"}
              </div>
            </div>
          </>
        );
        const base = "group flex flex-col rounded-2xl border p-5 transition-all duration-300";
        return full ? (
          <div key={t.n} className={`${base} bg-pt-ink/[0.03] border-pt-green/10 opacity-70`} aria-disabled="true">
            {body}
          </div>
        ) : (
          <Link
            key={t.n}
            href={`${bookHref}?viaje=${t.n}`}
            className={`${base} hover:-translate-y-0.5 ${urgent ? "bg-pt-clay/5 border-pt-clay/30 hover:border-pt-clay hover:shadow-xl" : "bg-white border-pt-green/10 hover:border-pt-green hover:shadow-xl"}`}
          >
            {body}
          </Link>
        );
      })}
    </div>
  );
}
