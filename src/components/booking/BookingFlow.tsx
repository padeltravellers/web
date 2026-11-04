"use client";
import { useEffect, useMemo, useState } from "react";
import Img from "@/components/Img";
import {
  departures2027,
  rooms,
  RoomKey,
  DEPOSIT,
  SECOND_PAYMENT,
  padelLevels,
  finalPaymentDate,
  eur,
} from "@/data/booking";

// Web app de Google Apps Script (apps-script/reservas): guarda la reserva en el
// Sheet "Reservas PT 2027", genera el contrato y lo envía desde reservas@.
// GET ?action=plazas devuelve las plazas libres de cada salida.
// Sin URL, el formulario funciona en modo prototipo (simula el envío).
const ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || "";

type Plaza = { codigo: string; libres: number; estado: string };
const code = (n: number) => `BALI-${n}`;

const STEPS = ["Salida", "Habitación", "Tus datos", "Confirmar"] as const;

type Traveller = {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  nacimiento: string;
  nacionalidad: string;
  docTipo: "DNI" | "Pasaporte";
  docNumero: string;
  ciudad: string;
  nivel: string;
  salud: string;
  emergenciaNombre: string;
  emergenciaTelefono: string;
  acompanante: string;
};

const emptyTraveller: Traveller = {
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  nacimiento: "",
  nacionalidad: "Española",
  docTipo: "DNI",
  docNumero: "",
  ciudad: "",
  nivel: "",
  salud: "",
  emergenciaNombre: "",
  emergenciaTelefono: "",
  acompanante: "",
};

const required: (keyof Traveller)[] = [
  "nombre",
  "apellidos",
  "email",
  "telefono",
  "nacimiento",
  "nacionalidad",
  "docNumero",
  "ciudad",
  "nivel",
  "emergenciaNombre",
  "emergenciaTelefono",
];

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [tripN, setTripN] = useState<number | null>(null);
  const [room, setRoom] = useState<RoomKey | null>(null);
  const [t, setT] = useState<Traveller>(emptyTraveller);
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [plazas, setPlazas] = useState<Record<string, Plaza>>({});
  const [hp, setHp] = useState(""); // honeypot anti-bots

  useEffect(() => {
    if (!ENDPOINT) return;
    fetch(`${ENDPOINT}?action=plazas`)
      .then((r) => r.json())
      .then((d: { ok: boolean; salidas?: Plaza[] }) => {
        if (!d.ok || !d.salidas) return;
        setPlazas(Object.fromEntries(d.salidas.map((s) => [s.codigo, s])));
      })
      .catch(() => {});
  }, []);

  const full = (n: number) => plazas[code(n)]?.libres === 0;

  const trip = departures2027.find((d) => d.n === tripN) || null;
  const price = room ? rooms[room].price : null;

  const missing = useMemo(() => {
    const m = required.filter((k) => !String(t[k]).trim());
    if (t.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) m.push("email");
    return new Set(m);
  }, [t]);

  const roomOk = room !== null && (room !== "compartida" || t.acompanante.trim() !== "");
  const canNext = [tripN !== null, roomOk, missing.size === 0, accepted][step];

  function set<K extends keyof Traveller>(k: K, v: Traveller[K]) {
    setT((p) => ({ ...p, [k]: v }));
  }

  function next() {
    if ((step === 2 && missing.size > 0) || (step === 1 && room === "compartida" && !roomOk)) {
      setTouched(true);
      return;
    }
    if (!canNext) return;
    setTouched(false);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    if (!accepted || !trip || !room) return;
    setStatus("sending");
    setErrMsg("");
    const body = new URLSearchParams({
      salida: code(trip.n),
      habitacion: room,
      ...t,
      acepta: "si",
      website: hp,
    });
    try {
      if (ENDPOINT) {
        // form-urlencoded: Apps Script no admite preflight CORS.
        const r = await fetch(ENDPOINT, { method: "POST", body });
        const d = (await r.json()) as { ok: boolean; error?: string; libres?: number };
        if (!d.ok) {
          if (d.error === "completo") {
            setPlazas((p) => ({ ...p, [code(trip.n)]: { codigo: code(trip.n), libres: 0, estado: "Completa" } }));
            setErrMsg("Justo se acaba de completar esta salida. Elige otra fecha o escríbenos por WhatsApp para la lista de espera.");
          } else {
            setErrMsg("No hemos podido registrar tu reserva. Revisa los datos o escríbenos por WhatsApp.");
          }
          setStatus("err");
          return;
        }
      } else {
        // Prototipo: simulamos el envío.
        await new Promise((res) => setTimeout(res, 900));
        console.info("[reserva prototipo]", Object.fromEntries(body));
      }
      setStatus("done");
      document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setErrMsg("No hemos podido registrar tu reserva. Prueba de nuevo o escríbenos por WhatsApp.");
      setStatus("err");
    }
  }

  if (status === "done" && trip && room) {
    return <Confirmation name={t.nombre} email={t.email} tripN={trip.n} range={trip.range} start={trip.start} price={rooms[room].price} />;
  }

  return (
    <div id="reserva" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-28 lg:pb-20 scroll-mt-24">
      <Stepper step={step} onJump={(i) => i < step && setStep(i)} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 mt-8">
        <div className="min-w-0">
          {step === 0 && (
            <section>
              <StepTitle eyebrow="Paso 1" title="Elige tu salida" text="Ocho salidas de 14 días entre junio y octubre de 2027. Cada viajero vuela desde su ciudad y nos juntamos en Bali." />
              <div className="grid sm:grid-cols-2 gap-4">
                {departures2027.map((d) => {
                  const active = d.n === tripN;
                  const p = plazas[code(d.n)];
                  const isFull = full(d.n);
                  return (
                    <button
                      key={d.n}
                      type="button"
                      onClick={() => !isFull && setTripN(d.n)}
                      disabled={isFull}
                      aria-pressed={active}
                      className={`group relative text-left rounded-3xl overflow-hidden aspect-[16/10] transition ring-offset-2 disabled:cursor-not-allowed ${active ? "ring-4 ring-pt-clay" : "ring-0 hover:shadow-xl"} ${isFull ? "grayscale opacity-70" : ""}`}
                    >
                      <Img src={d.photo} alt="" fill sizes="(max-width:640px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className={`absolute inset-0 transition ${active ? "bg-pt-green/70" : "bg-gradient-to-t from-pt-ink/85 via-pt-ink/30 to-transparent"}`} />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-display uppercase tracking-[0.22em]">Viaje {d.n}</span>
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-display uppercase tracking-[0.22em]">{d.month}</span>
                      </div>
                      {active && (
                        <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pt-clay text-white grid place-items-center text-sm" aria-hidden>✓</span>
                      )}
                      {!active && p && (isFull || p.libres <= 4) && (
                        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-[0.18em] text-white ${isFull ? "bg-pt-ink/80" : "bg-pt-clay"}`}>
                          {isFull ? "Completo" : p.libres === 1 ? "Última plaza" : `Quedan ${p.libres} plazas`}
                        </span>
                      )}
                      <div className="absolute left-5 right-5 bottom-4 text-white">
                        <p className="font-display font-medium text-2xl md:text-3xl leading-tight">{d.range}</p>
                        <p className="text-white/80 text-sm mt-1">14 días · 13 noches</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <StepTitle eyebrow="Paso 2" title="¿Cómo duermes?" text="Siempre en habitación privada, con desayuno, en villas u hoteles con piscina." />
              <div className="grid md:grid-cols-2 gap-4">
                {(Object.keys(rooms) as RoomKey[]).map((k) => {
                  const r = rooms[k];
                  const active = room === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setRoom(k)}
                      aria-pressed={active}
                      className={`text-left rounded-3xl p-7 border-2 transition ${active ? "border-pt-clay bg-pt-cream/60" : "border-pt-green/10 bg-white hover:border-pt-green/30"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display font-bold text-xl text-pt-green">{r.label}</h3>
                        <span className={`w-6 h-6 rounded-full border-2 grid place-items-center shrink-0 ${active ? "border-pt-clay bg-pt-clay text-white" : "border-pt-green/25"}`}>
                          {active && <span className="text-xs">✓</span>}
                        </span>
                      </div>
                      <p className="font-display font-medium text-4xl text-pt-green mt-5">{eur(r.price)}</p>
                      <p className="text-sm text-pt-muted mt-1">por persona</p>
                      <p className="text-sm text-pt-ink/80 mt-5 leading-relaxed">{r.note}</p>
                    </button>
                  );
                })}
              </div>
              {room === "compartida" && (
                <div className="mt-6 bg-white border border-pt-green/10 rounded-3xl p-6">
                  <Field label="¿Con quién compartes habitación?" hint="Nombre y apellidos. Tu acompañante hace su propia reserva." error={touched && !t.acompanante.trim()}>
                    <input className={inputCls} value={t.acompanante} onChange={(e) => set("acompanante", e.target.value)} placeholder="Nombre de tu acompañante" />
                  </Field>
                </div>
              )}
            </section>
          )}

          {step === 2 && (
            <section>
              <StepTitle eyebrow="Paso 3" title="Tus datos" text="Los usamos para tu contrato y para reservar alojamiento, pádel y traslados a tu nombre." />
              <div className="bg-white border border-pt-green/10 rounded-3xl p-6 md:p-8 space-y-8">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] w-px h-px opacity-0" value={hp} onChange={(e) => setHp(e.target.value)} />
                <Group title="Sobre ti">
                  <Field label="Nombre" error={touched && missing.has("nombre")}>
                    <input className={inputCls} value={t.nombre} onChange={(e) => set("nombre", e.target.value)} autoComplete="given-name" />
                  </Field>
                  <Field label="Apellidos" error={touched && missing.has("apellidos")}>
                    <input className={inputCls} value={t.apellidos} onChange={(e) => set("apellidos", e.target.value)} autoComplete="family-name" />
                  </Field>
                  <Field label="Email" hint="Aquí te enviamos el contrato." error={touched && missing.has("email")}>
                    <input type="email" className={inputCls} value={t.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                  </Field>
                  <Field label="Teléfono (WhatsApp)" error={touched && missing.has("telefono")}>
                    <input type="tel" className={inputCls} value={t.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="+34 600 000 000" autoComplete="tel" />
                  </Field>
                  <Field label="Fecha de nacimiento" error={touched && missing.has("nacimiento")}>
                    <input type="date" className={inputCls} value={t.nacimiento} onChange={(e) => set("nacimiento", e.target.value)} autoComplete="bday" />
                  </Field>
                  <Field label="Ciudad desde la que viajas" error={touched && missing.has("ciudad")}>
                    <input className={inputCls} value={t.ciudad} onChange={(e) => set("ciudad", e.target.value)} placeholder="Barcelona, Madrid…" />
                  </Field>
                </Group>

                <Group title="Documento">
                  <Field label="Nacionalidad" error={touched && missing.has("nacionalidad")}>
                    <input className={inputCls} value={t.nacionalidad} onChange={(e) => set("nacionalidad", e.target.value)} />
                  </Field>
                  <Field label="Tipo y número" hint="Para el viaje necesitarás pasaporte con 6 meses de validez." error={touched && missing.has("docNumero")}>
                    <div className="flex gap-2">
                      <select className={`${inputCls} w-36 shrink-0`} value={t.docTipo} onChange={(e) => set("docTipo", e.target.value as Traveller["docTipo"])}>
                        <option>DNI</option>
                        <option>Pasaporte</option>
                      </select>
                      <input className={inputCls} value={t.docNumero} onChange={(e) => set("docNumero", e.target.value.toUpperCase())} />
                    </div>
                  </Field>
                </Group>

                <Group title="Pádel y salud">
                  <Field label="Tu nivel de pádel" hint="Para hacer parejas equilibradas." error={touched && missing.has("nivel")}>
                    <select className={inputCls} value={t.nivel} onChange={(e) => set("nivel", e.target.value)}>
                      <option value="">Elige tu nivel</option>
                      {padelLevels.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Lesiones, alergias o algo que debamos saber" hint="Opcional. Solo lo usamos para tu seguridad.">
                    <input className={inputCls} value={t.salud} onChange={(e) => set("salud", e.target.value)} placeholder="Nada que destacar" />
                  </Field>
                </Group>

                <Group title="Contacto de emergencia">
                  <Field label="Nombre" error={touched && missing.has("emergenciaNombre")}>
                    <input className={inputCls} value={t.emergenciaNombre} onChange={(e) => set("emergenciaNombre", e.target.value)} />
                  </Field>
                  <Field label="Teléfono" error={touched && missing.has("emergenciaTelefono")}>
                    <input type="tel" className={inputCls} value={t.emergenciaTelefono} onChange={(e) => set("emergenciaTelefono", e.target.value)} />
                  </Field>
                </Group>
              </div>
              {touched && missing.size > 0 && (
                <p className="text-sm text-red-700 mt-4" role="alert">Revisa los campos marcados en rojo.</p>
              )}
            </section>
          )}

          {step === 3 && trip && room && (
            <section>
              <StepTitle eyebrow="Paso 4" title="Revisa y confirma" text="Lo esencial del contrato, en claro. El contrato completo te llega por email al confirmar." />
              <div className="space-y-4">
                <Card title="Tu viaje">
                  <Row k="Salida" v={`Viaje ${trip.n} · ${trip.range} 2027`} />
                  <Row k="Habitación" v={room === "compartida" ? `Compartida con ${t.acompanante}` : "Individual"} />
                  <Row k="Viajero" v={`${t.nombre} ${t.apellidos}`} />
                  <Row k="Email" v={t.email} />
                </Card>
                <Card title="Qué incluye">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-pt-ink/85">
                    {[
                      "13 noches en habitación privada con desayuno",
                      "4 partidos del grupo + 2 h semanales de clase",
                      "Ubud, Uluwatu, norte de Bali, Amed, Tanah Lot…",
                      "Clase de surf, Taman Ayun y plantación de café",
                      "Traslados del aeropuerto y a las actividades",
                      "Coordinador local con el grupo todo el viaje",
                    ].map((x) => (
                      <li key={x} className="flex gap-2"><span className="text-pt-clay">●</span>{x}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-pt-muted mt-4">No incluye vuelos, comidas y cenas, seguro de viaje (obligatorio, que cubra pádel) ni visado (aprox. 30 €).</p>
                </Card>
                <Card title="Si tienes que cancelar">
                  <ul className="space-y-2 text-sm text-pt-ink/85">
                    <li><strong>Antes de confirmarse el grupo:</strong> te devolvemos todo, también la reserva.</li>
                    <li><strong>Grupo confirmado, más de 90 días antes:</strong> pierdes los 100 € de reserva y te devolvemos el resto menos los gastos ya comprometidos con proveedores.</li>
                    <li><strong>90 días o menos:</strong> no hay devolución, salvo lo que recuperemos de proveedores.</li>
                    <li><strong>Si el grupo no llega a 8 personas:</strong> te devolvemos el 100 % o te pasamos a otra salida.</li>
                  </ul>
                </Card>
                <label className="flex gap-4 items-start bg-pt-cream/60 border border-pt-clay/30 rounded-3xl p-6 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 accent-[var(--pt-green)] shrink-0" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                  <span className="text-sm text-pt-ink/90 leading-relaxed">
                    He leído y acepto el <a href="/condiciones-de-contratacion/" target="_blank" className="underline underline-offset-2 text-pt-green font-medium">contrato de organización y coordinación del viaje</a> y la{" "}
                    <a href="/politica-de-privacidad-y-proteccion-de-datos/" target="_blank" className="underline underline-offset-2 text-pt-green font-medium">política de privacidad</a>. Marcar esta casilla y confirmar la reserva equivale a firmar el contrato.
                  </span>
                </label>
                {status === "err" && (
                  <p className="text-sm text-red-700" role="alert">{errMsg}</p>
                )}
              </div>
            </section>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-between gap-4 mt-10">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="font-display font-semibold text-pt-green px-5 py-3 rounded-full hover:bg-pt-green/5">
                ← Atrás
              </button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={step !== 2 && !(step === 1 && room === "compartida") && !canNext}
                className="hidden lg:inline-flex font-display font-semibold bg-pt-green text-white px-8 py-4 rounded-full disabled:opacity-35 disabled:cursor-not-allowed hover:bg-pt-ink transition"
              >
                Continuar →
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={!accepted || status === "sending"}
                className="hidden lg:inline-flex font-display font-semibold bg-pt-clay text-white px-8 py-4 rounded-full disabled:opacity-35 disabled:cursor-not-allowed hover:brightness-95 transition"
              >
                {status === "sending" ? "Registrando…" : `Reservar mi plaza · ${eur(DEPOSIT)}`}
              </button>
            )}
          </div>
        </div>

        {/* Resumen */}
        <aside className="hidden lg:block">
          <Summary trip={trip} room={room} price={price} />
        </aside>
      </div>

      {/* Barra móvil */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-pt-green/10 pl-4 pr-24 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] text-pt-muted font-display">{trip ? `Viaje ${trip.n} · ${trip.range}` : "Bali 2027"}</p>
          <p className="font-display font-bold text-pt-green truncate">{price ? `${eur(price)} · reserva ${eur(DEPOSIT)}` : `Reserva con ${eur(DEPOSIT)}`}</p>
        </div>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} disabled={step !== 2 && !(step === 1 && room === "compartida") && !canNext} className="shrink-0 font-display font-semibold bg-pt-green text-white px-5 py-3 rounded-full disabled:opacity-35">
            Continuar
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={!accepted || status === "sending"} className="shrink-0 font-display font-semibold bg-pt-clay text-white px-5 py-3 rounded-full disabled:opacity-35">
            {status === "sending" ? "…" : "Reservar"}
          </button>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-pt-green/15 bg-white px-4 py-3 text-[15px] text-pt-ink placeholder:text-pt-muted/60 focus:border-pt-green focus:outline-none focus:ring-2 focus:ring-pt-green/15";

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Pasos de la reserva">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={s} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={!done}
              aria-current={active ? "step" : undefined}
              className="flex items-center gap-2 shrink-0 disabled:cursor-default"
            >
              <span className={`w-8 h-8 rounded-full grid place-items-center text-sm font-display font-bold transition ${active ? "bg-pt-green text-white" : done ? "bg-pt-clay text-white" : "bg-pt-green/8 text-pt-green/50 border border-pt-green/15"}`}>
                {done ? "✓" : i + 1}
              </span>
              <span className={`hidden sm:inline font-display text-sm font-semibold ${active ? "text-pt-green" : "text-pt-muted"}`}>{s}</span>
            </button>
            {i < STEPS.length - 1 && <span className={`h-px flex-1 ${done ? "bg-pt-clay" : "bg-pt-green/15"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

function StepTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="mb-7">
      <p className="font-display uppercase tracking-[0.14em] text-sm font-semibold text-pt-clay mb-2">{eyebrow}</p>
      <h2 className="font-display font-medium text-3xl md:text-4xl text-pt-green leading-tight">{title}</h2>
      <p className="text-pt-muted mt-3 max-w-xl leading-relaxed">{text}</p>
    </header>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-display font-bold text-pt-green mb-4">{title}</legend>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5">{children}</div>
    </fieldset>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${error ? "[&_input]:border-red-400 [&_select]:border-red-400" : ""}`}>
      <span className="block text-sm font-medium text-pt-ink mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-pt-muted mt-1.5">{hint}</span>}
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-pt-green/10 rounded-3xl p-6">
      <h3 className="font-display font-bold text-pt-green mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-pt-green/8 last:border-0 text-sm">
      <span className="text-pt-muted">{k}</span>
      <span className="text-pt-ink font-medium text-right">{v}</span>
    </div>
  );
}

function Summary({ trip, room, price }: { trip: (typeof departures2027)[number] | null; room: RoomKey | null; price: number | null }) {
  return (
    <div className="sticky top-24 bg-pt-green text-white rounded-3xl overflow-hidden">
      <div className="relative h-36">
        <Img src={trip?.photo || "/photos/extra/atardecer/1.jpg"} alt="" fill sizes="360px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pt-green to-pt-green/10" />
        <div className="absolute left-6 bottom-4">
          <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/80">Pádel y Bali 2027</p>
          <p className="font-display font-medium text-2xl leading-tight">{trip ? trip.range : "Elige tu salida"}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">
        <div className="flex justify-between text-sm">
          <span className="text-pt-cream/75">{room ? rooms[room].label : "Habitación"}</span>
          <span className="font-display font-bold">{price ? eur(price) : "—"}</span>
        </div>
        <div>
          <p className="font-display uppercase tracking-[0.2em] text-[10px] text-pt-cream/70 mb-3">Cómo pagas</p>
          <ol className="relative border-l border-white/20 ml-1.5 space-y-4">
            <Pay title="Hoy, para reservar" amount={eur(DEPOSIT)} note="Reembolsable hasta que se confirme el grupo" highlight />
            <Pay title="Al confirmarse el grupo" amount={eur(SECOND_PAYMENT)} note="Mínimo 8 viajeros" />
            <Pay title={trip ? `Antes del ${finalPaymentDate(trip.start)}` : "30 días antes del viaje"} amount={price ? eur(price - DEPOSIT - SECOND_PAYMENT) : "Resto"} note="Pago final" />
          </ol>
        </div>
        <p className="text-xs text-pt-cream/65 leading-relaxed border-t border-white/15 pt-4">Vuelos desde tu ciudad, comidas y cenas, seguro y visado van aparte.</p>
      </div>
    </div>
  );
}

function Pay({ title, amount, note, highlight }: { title: string; amount: string; note: string; highlight?: boolean }) {
  return (
    <li className="pl-5 relative">
      <span className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full ${highlight ? "bg-pt-clay ring-4 ring-pt-clay/30" : "bg-white/40"}`} />
      <div className="flex justify-between gap-3">
        <span className="text-sm">{title}</span>
        <span className="font-display font-bold">{amount}</span>
      </div>
      <p className="text-xs text-pt-cream/60 mt-0.5">{note}</p>
    </li>
  );
}

function Confirmation({ name, email, tripN, range, start, price }: { name: string; email: string; tripN: number; range: string; start: string; price: number }) {
  return (
    <div id="reserva" className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 text-center fade-up scroll-mt-24">
      <span className="inline-grid place-items-center w-16 h-16 rounded-full bg-pt-clay text-white text-2xl mb-6" aria-hidden>✓</span>
      <h2 className="font-display font-medium text-4xl md:text-5xl text-pt-green leading-tight">
        ¡Hecho, {name}!
        <br />
        <span className="font-script italic font-normal text-pt-clay text-3xl md:text-4xl">nos vemos en Bali</span>
      </h2>
      <p className="text-pt-muted mt-6 text-lg">Tenemos tu plaza para el Viaje {tripN} · {range}.</p>
      <ol className="text-left mt-10 space-y-4">
        {[
          ["Revisa tu email", `Te hemos enviado el contrato y los datos de tu reserva a ${email}.`],
          ["Paga la reserva de 100 €", "En el mismo email tienes cómo pagarla. Hasta que se confirme el grupo, es 100 % reembolsable."],
          ["Te avisamos al confirmarse el grupo", `Entonces se abonan 1.000 € y el resto (${eur(price - DEPOSIT - SECOND_PAYMENT)}) antes del ${finalPaymentDate(start)}.`],
          ["Compra tus vuelos", "Cuando el grupo esté confirmado. Te diremos la ventana ideal de llegada y salida."],
          ["Contrata tu seguro de viaje", "Es obligatorio y tiene que cubrir la práctica de pádel. Envíanos una copia al menos 15 días antes de salir."],
        ].map(([title, text], i) => (
          <li key={title} className="flex gap-4 bg-white border border-pt-green/10 rounded-3xl p-5">
            <span className="font-display font-medium text-3xl text-pt-clay/80 w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display font-bold text-pt-green">{title}</p>
              <p className="text-sm text-pt-muted mt-1 leading-relaxed">{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 bg-pt-green text-white rounded-3xl p-6 md:p-7 text-left">
        <p className="font-display font-bold text-lg">¿Aún sin seguro?</p>
        <p className="text-sm text-pt-cream/80 mt-1 leading-relaxed">
          Nuestros viajeros suelen ir con IATI o Heymondo. Elige una modalidad que incluya deportes como el pádel, asistencia médica y repatriación.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <a href="https://www.iatiseguros.com/" target="_blank" rel="noreferrer" className="font-display font-semibold bg-white text-pt-green px-5 py-2.5 rounded-full hover:bg-pt-cream transition">IATI Seguros →</a>
          <a href="https://heymondo.es/" target="_blank" rel="noreferrer" className="font-display font-semibold bg-white/10 border border-white/30 text-white px-5 py-2.5 rounded-full hover:bg-white/20 transition">Heymondo →</a>
        </div>
      </div>
    </div>
  );
}
