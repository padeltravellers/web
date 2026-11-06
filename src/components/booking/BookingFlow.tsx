"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Img from "@/components/Img";
import { destinations } from "@/data/destinations";
import {
  departures2027,
  rooms,
  RoomKey,
  DEPOSIT,
  SECOND_PAYMENT,
  padelLevels,
  finalPaymentDate,
  eur,
  countries,
  flag,
  nationalitiesTop,
  nationalitiesAll,
  docError,
  ageOn,
  maxBirthDateISO,
} from "@/data/booking";

// Web app de Google Apps Script (apps-script/reservas): guarda la reserva en el
// Sheet "Reservas PT 2027", genera los contratos y los envía desde reservas@.
// GET ?action=plazas devuelve las plazas libres de cada salida.
// Sin URL, el formulario funciona en modo prototipo (simula el envío).
const ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || "";

const STEPS = ["Destino", "Fecha", "Viajeros", "Confirmar"] as const;
const BOOKABLE = ["bali"];

type Plaza = { codigo: string; libres: number; estado: string };
const code = (n: number) => `BALI-${n}`;
const dial = (iso: string) => countries.find((c) => c.iso === iso)?.code || "";

type Traveller = {
  nombre: string;
  apellidos: string;
  email: string;
  prefijo: string;
  telefono: string;
  nacimiento: string;
  nacionalidad: string;
  docTipo: "DNI" | "NIE" | "Pasaporte";
  docNumero: string;
  ciudad: string;
  nivel: string;
  salud: string;
  emergenciaNombre: string;
  emergenciaPrefijo: string;
  emergenciaTelefono: string;
};

const emptyTraveller = (): Traveller => ({
  nombre: "",
  apellidos: "",
  email: "",
  prefijo: "ES",
  telefono: "",
  nacimiento: "",
  nacionalidad: "España",
  docTipo: "DNI",
  docNumero: "",
  ciudad: "",
  nivel: "",
  salud: "",
  emergenciaNombre: "",
  emergenciaPrefijo: "ES",
  emergenciaTelefono: "",
});

type Errors = Partial<Record<keyof Traveller, string>>;

function validate(t: Traveller): Errors {
  const e: Errors = {};
  const req: (keyof Traveller)[] = ["nombre", "apellidos", "email", "telefono", "nacimiento", "nacionalidad", "ciudad", "nivel", "emergenciaNombre", "emergenciaTelefono"];
  req.forEach((k) => {
    if (!String(t[k]).trim()) e[k] = "Obligatorio";
  });
  if (t.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email.trim())) e.email = "Revisa el email";
  const digits = (s: string) => s.replace(/\D/g, "").length;
  if (t.telefono && digits(t.telefono) < 6) e.telefono = "Número demasiado corto";
  if (t.emergenciaTelefono && digits(t.emergenciaTelefono) < 6) e.emergenciaTelefono = "Número demasiado corto";
  if (t.nacimiento) {
    const a = ageOn(t.nacimiento);
    if (a < 0 || a > 100) e.nacimiento = "Revisa la fecha";
    else if (a < 18) e.nacimiento = "Tienes que ser mayor de edad para reservar";
  }
  const d = docError(t.docTipo, t.docNumero);
  if (d) e.docNumero = d;
  return e;
}

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [dest, setDest] = useState<string | null>(null);
  const [tripN, setTripN] = useState<number | null>(null);
  const [room, setRoom] = useState<RoomKey | null>(null);
  const [travellers, setTravellers] = useState<Traveller[]>([emptyTraveller()]);
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
        if (d.ok && d.salidas) setPlazas(Object.fromEntries(d.salidas.map((s) => [s.codigo, s])));
      })
      .catch(() => {});
  }, []);

  // Habitación compartida = 2 viajeros obligatorios.
  useEffect(() => {
    setTravellers((tv) => {
      const n = room === "compartida" ? 2 : 1;
      if (tv.length === n) return tv;
      return n === 2 ? [tv[0], tv[1] || emptyTraveller()] : [tv[0]];
    });
  }, [room]);

  const trip = departures2027.find((d) => d.n === tripN) || null;
  const destination = destinations.find((d) => d.slug === dest) || null;
  const pax = room === "compartida" ? 2 : 1;
  const price = room ? rooms[room].price : null;
  const libres = (n: number) => plazas[code(n)]?.libres;
  const fits = (n: number) => libres(n) === undefined || (libres(n) as number) >= pax;

  const errors = useMemo(() => travellers.map(validate), [travellers]);
  const travellersOk = errors.every((e) => Object.keys(e).length === 0);
  const tripOk = tripN !== null && room !== null && fits(tripN);
  const canNext = [dest !== null, tripOk, travellersOk, accepted][step];

  function setField<K extends keyof Traveller>(i: number, k: K, v: Traveller[K]) {
    setTravellers((tv) => tv.map((t, j) => (j === i ? { ...t, [k]: v } : t)));
  }

  function go(to: number) {
    setTouched(false);
    setStep(to);
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    if (!canNext) {
      setTouched(true);
      return;
    }
    go(Math.min(step + 1, STEPS.length - 1));
  }

  async function submit() {
    if (!accepted || !trip || !room) return;
    setStatus("sending");
    setErrMsg("");
    const body = new URLSearchParams({
      destino: "Bali",
      salida: code(trip.n),
      habitacion: room,
      viajeros: JSON.stringify(
        travellers.map((t) => ({
          ...t,
          telefono: `${dial(t.prefijo)} ${t.telefono.trim()}`,
          emergenciaTelefono: `${dial(t.emergenciaPrefijo)} ${t.emergenciaTelefono.trim()}`,
          docNumero: t.docNumero.replace(/[\s-]/g, "").toUpperCase(),
        })),
      ),
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
            setPlazas((p) => ({ ...p, [code(trip.n)]: { codigo: code(trip.n), libres: d.libres ?? 0, estado: "Completa" } }));
            setErrMsg("Justo se han ocupado las últimas plazas de esta salida. Elige otra fecha o escríbenos por WhatsApp para la lista de espera.");
          } else {
            setErrMsg("No hemos podido registrar tu reserva. Revisa los datos o escríbenos por WhatsApp.");
          }
          setStatus("err");
          return;
        }
      } else {
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
    return <Confirmation travellers={travellers} trip={trip} price={rooms[room].price} />;
  }

  return (
    <div id="reserva" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-28 lg:pb-20 scroll-mt-24">
      <Stepper step={step} onJump={(i) => i < step && go(i)} />

      <div className={`grid gap-8 lg:gap-12 mt-8 ${step === 1 || step === 2 ? "lg:grid-cols-[1fr_360px]" : ""}`}>
        <div className={`min-w-0 ${step === 3 ? "max-w-5xl w-full mx-auto" : ""}`}>
          {/* PASO 1 · DESTINO */}
          {step === 0 && (
            <section>
              <StepTitle eyebrow="Paso 1" title="Elige destino" />
              <div className="grid md:grid-cols-3 gap-5">
                {destinations.map((d) => {
                  const open = BOOKABLE.includes(d.slug);
                  return (
                    <button
                      key={d.slug}
                      type="button"
                      disabled={!open}
                      onClick={() => {
                        setDest(d.slug);
                        go(1);
                      }}
                      className={`group relative text-left rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] transition ${open ? "cursor-pointer hover:shadow-2xl hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-pt-clay/40 outline-none" : "cursor-not-allowed"}`}
                    >
                      <Img src={d.hero} alt={d.name} fill sizes="(max-width:768px) 100vw, 33vw" className={`object-cover transition-transform duration-700 ${open ? "group-hover:scale-105" : "grayscale-[60%]"}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-pt-ink/90 via-pt-ink/25 to-transparent" />
                      <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-display uppercase tracking-[0.22em] ${open ? "bg-white text-pt-green" : "bg-white/20 backdrop-blur text-white"}`}>
                        {open ? "Reserva abierta 2027" : "Próximamente"}
                      </span>
                      <div className="absolute left-6 right-6 bottom-6 text-white">
                        <h3 className="font-display font-medium text-5xl leading-none">{d.name}</h3>
                        <p className="text-white/90 text-base mt-3 leading-relaxed">{d.shortPitch}</p>
                        {open ? (
                          <span className="inline-flex items-center gap-2 mt-6 font-display font-semibold text-lg bg-pt-clay text-white px-7 py-3.5 rounded-full shadow-lg group-hover:gap-3 group-hover:brightness-105 transition-all">
                            Reservar {d.name} <span aria-hidden>→</span>
                          </span>
                        ) : (
                          <span className="inline-block mt-6 font-display font-semibold text-base text-white/80">Lista de espera en su página</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* PASO 2 · FECHA + HABITACIÓN */}
          {step === 1 && (
            <section className="space-y-10">
              <div>
                <StepTitle eyebrow="Paso 2" title="Elige tu fecha" text="14 días y 13 noches. Cada viajero vuela desde su ciudad y nos juntamos en Bali." />
                <div className="bg-white border border-pt-green/10 rounded-3xl divide-y divide-pt-green/8 overflow-hidden">
                  {departures2027.map((d) => {
                    const active = d.n === tripN;
                    const l = libres(d.n);
                    const isFull = l === 0;
                    return (
                      <button
                        key={d.n}
                        type="button"
                        disabled={isFull}
                        onClick={() => setTripN(d.n)}
                        aria-pressed={active}
                        className={`w-full flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-4 sm:py-5 text-left transition ${active ? "bg-pt-cream/70" : "hover:bg-pt-green/[0.03]"} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <span className={`w-6 h-6 rounded-full border-2 shrink-0 grid place-items-center ${active ? "border-pt-clay" : "border-pt-green/25"}`}>
                          {active && <span className="w-3 h-3 rounded-full bg-pt-clay" />}
                        </span>
                        <span className={`shrink-0 w-[84px] text-center rounded-full py-1.5 font-display font-semibold text-sm ${active ? "bg-pt-clay text-white" : "bg-pt-green/[0.07] text-pt-green"}`}>Viaje {d.n}</span>
                        <span className="flex-1 min-w-0 flex items-center gap-3 sm:gap-4">
                          <DateMark iso={d.start} />
                          <span className="text-pt-clay text-lg" aria-hidden>→</span>
                          <DateMark iso={d.end} />
                        </span>
                        {l !== undefined && (isFull || l <= 4) && (
                          <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-display font-semibold ${isFull ? "bg-pt-ink/10 text-pt-ink/60" : "bg-pt-clay/15 text-pt-clay"}`}>
                            {isFull ? "Completo" : l === 1 ? "Última plaza" : `Quedan ${l}`}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-display font-medium text-2xl md:text-3xl text-pt-green mb-2">Elige tu habitación</h3>
                <p className="text-pt-muted mb-5">Siempre habitación privada con desayuno, en villas u hoteles con piscina.</p>
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
                        className={`text-left rounded-3xl p-6 border-2 transition hover:shadow-lg ${active ? "border-pt-clay bg-pt-cream/60" : "border-pt-green/10 bg-white hover:border-pt-green/30"}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-display font-bold text-lg text-pt-green">{k === "compartida" ? "Compartida · 2 personas" : "Individual · 1 persona"}</h4>
                            <p className="text-sm text-pt-muted mt-1">{k === "compartida" ? "Para dos personas que viajan juntas." : "Una habitación solo para ti."}</p>
                          </div>
                          <span className={`w-6 h-6 rounded-full border-2 grid place-items-center shrink-0 ${active ? "border-pt-clay bg-pt-clay text-white" : "border-pt-green/25"}`}>
                            {active && <span className="text-xs">✓</span>}
                          </span>
                        </div>
                        <p className="font-display font-medium text-3xl text-pt-green mt-5">
                          {eur(r.price)} <span className="text-sm font-body text-pt-muted">/ persona</span>
                        </p>
                      </button>
                    );
                  })}
                </div>
                {tripN !== null && room === "compartida" && !fits(tripN) && (
                  <p className="text-sm text-red-700 mt-4" role="alert">En esta salida solo queda 1 plaza. Elige habitación individual u otra fecha.</p>
                )}
              </div>
              {touched && !tripOk && (
                <p className="text-sm text-red-700" role="alert">Elige una fecha y el tipo de habitación.</p>
              )}
            </section>
          )}

          {/* PASO 3 · VIAJEROS */}
          {step === 2 && (
            <section>
              <StepTitle
                eyebrow="Paso 3"
                title={pax === 2 ? "Vuestros datos" : "Tus datos"}
                text={`Tal como aparecen en el pasaporte: con ellos se hacen el contrato y las reservas a ${pax === 2 ? "vuestro" : "tu"} nombre.`}
              />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] w-px h-px opacity-0" value={hp} onChange={(e) => setHp(e.target.value)} />
              <div className="space-y-6">
                {travellers.map((t, i) => (
                  <TravellerForm
                    key={i}
                    index={i}
                    total={travellers.length}
                    t={t}
                    errors={touched ? errors[i] : {}}
                    onChange={(k, v) => setField(i, k, v)}
                  />
                ))}
              </div>
              {touched && !travellersOk && (
                <p className="text-sm text-red-700 mt-4" role="alert">Revisa los campos marcados en rojo.</p>
              )}
            </section>
          )}

          {/* PASO 4 · CONFIRMAR */}
          {step === 3 && trip && room && destination && (
            <section>
              <StepTitle eyebrow="Paso 4" title={pax === 2 ? "Vuestro viaje, en un vistazo" : "Tu viaje, en un vistazo"} text={`Revisa que todo esté bien. Al confirmar, ${pax === 2 ? "cada uno recibe su contrato" : "recibes tu contrato"} por email.`} />
              <Ticket destinationName={destination.name} hero={destination.hero} trip={trip} room={room} travellers={travellers} />
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card title="Qué incluye">
                  <ul className="space-y-2.5 text-[15px] text-pt-ink/85">
                    {[
                      ["🏝", "13 noches en habitación privada con desayuno"],
                      ["🎾", "4 partidos con el grupo y 2 h de clase a la semana"],
                      ["🛕", "Ubud, Uluwatu, norte de Bali, Amed, Tanah Lot"],
                      ["🏄", "Clase de surf, Taman Ayun y plantación de café"],
                      ["🚐", "Traslados del aeropuerto y a las actividades"],
                      ["🧭", "Coordinador local con el grupo todo el viaje"],
                    ].map(([i, x]) => (
                      <li key={x} className="flex gap-3 sm:whitespace-nowrap"><span aria-hidden>{i}</span>{x}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-pt-muted mt-4">No incluye vuelos, comidas y cenas, seguro (obligatorio, con pádel) ni visado (aprox. 30 €).</p>
                </Card>
                <Card title="Si hay que cancelar">
                  <ul className="space-y-2.5 text-[15px] text-pt-ink/85">
                    <li><strong className="text-pt-green">Antes de confirmarse el grupo:</strong> devolvemos todo, también la reserva.</li>
                    <li><strong className="text-pt-green">Una vez confirmado el grupo:</strong> no hay devolución. Aun así, intentamos recuperar lo posible de los proveedores y estudiamos cada caso.</li>
                    <li><strong className="text-pt-green">Si no llegamos a 8 viajeros:</strong> devolvemos el 100 % o te pasamos a otra salida.</li>
                  </ul>
                </Card>
              </div>
              <label className="flex gap-4 items-start bg-pt-cream/60 border border-pt-clay/30 rounded-3xl p-6 cursor-pointer mt-6">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-[var(--pt-green)] shrink-0" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <span className="text-sm text-pt-ink/90 leading-relaxed">
                  {pax === 2 ? "Los dos hemos leído y aceptamos" : "He leído y acepto"} el{" "}
                  <a href="/condiciones-de-contratacion/" target="_blank" className="underline underline-offset-2 text-pt-green font-medium">contrato de organización y coordinación del viaje</a> y la{" "}
                  <a href="/politica-de-privacidad-y-proteccion-de-datos/" target="_blank" className="underline underline-offset-2 text-pt-green font-medium">política de privacidad</a>. Marcar esta casilla y confirmar la reserva equivale a firmar el contrato.
                </span>
              </label>
              {touched && !accepted && <p className="text-sm text-red-700 mt-3" role="alert">Tienes que aceptar el contrato para reservar.</p>}
              {status === "err" && <p className="text-sm text-red-700 mt-3" role="alert">{errMsg}</p>}
            </section>
          )}

          {/* Navegación */}
          {step > 0 && (
            <div className="flex items-center justify-between gap-4 mt-10">
              <button type="button" onClick={() => go(step - 1)} className="font-display font-semibold text-pt-green px-6 py-3.5 rounded-full border border-pt-green/20 hover:bg-pt-green/5 hover:border-pt-green/40 transition">
                ← Atrás
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" onClick={next} className={`hidden lg:inline-flex font-display font-semibold text-lg bg-pt-green text-white px-9 py-4 rounded-full shadow-md hover:bg-pt-ink hover:shadow-lg transition ${canNext ? "" : "opacity-50"}`}>
                  Continuar →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => (accepted ? submit() : setTouched(true))}
                  disabled={status === "sending"}
                  className={`hidden lg:inline-flex font-display font-semibold text-lg bg-pt-clay text-white px-9 py-4 rounded-full shadow-md hover:brightness-95 hover:shadow-lg transition disabled:opacity-50 ${accepted ? "" : "opacity-50"}`}
                >
                  {status === "sending" ? "Reservando…" : `Reservar ${pax === 2 ? "2 plazas" : "mi plaza"} · ${eur(DEPOSIT * pax)}`}
                </button>
              )}
            </div>
          )}
        </div>

        {(step === 1 || step === 2) && (
          <aside className="hidden lg:block">
            <Summary destinationName={destination?.name || "Bali"} trip={trip} room={room} price={price} pax={pax} />
          </aside>
        )}
      </div>

      {/* Barra móvil */}
      {step > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-pt-green/10 pl-4 pr-24 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-pt-muted font-display truncate">{trip ? `Bali · ${trip.range}` : "Bali 2027"}</p>
            <p className="font-display font-bold text-pt-green truncate">{price ? `${eur(price * pax)} · hoy ${eur(DEPOSIT * pax)}` : `Reserva con ${eur(DEPOSIT)}`}</p>
          </div>
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className={`shrink-0 font-display font-semibold bg-pt-green text-white px-5 py-3 rounded-full ${canNext ? "" : "opacity-50"}`}>
              Continuar
            </button>
          ) : (
            <button type="button" onClick={() => (accepted ? submit() : setTouched(true))} disabled={status === "sending"} className={`shrink-0 font-display font-semibold bg-pt-clay text-white px-5 py-3 rounded-full ${accepted ? "" : "opacity-50"}`}>
              {status === "sending" ? "…" : "Reservar"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- Formulario de un viajero ----------

const inputCls =
  "block w-full min-w-0 rounded-2xl border bg-white px-4 py-3 text-[15px] text-pt-ink placeholder:text-pt-muted/60 focus:outline-none focus:ring-2 transition";
const okCls = "border-pt-green/15 focus:border-pt-green focus:ring-pt-green/15";
const errCls = "border-red-400 focus:border-red-500 focus:ring-red-200";

function TravellerForm({
  index,
  total,
  t,
  errors,
  onChange,
}: {
  index: number;
  total: number;
  t: Traveller;
  errors: Errors;
  onChange: <K extends keyof Traveller>(k: K, v: Traveller[K]) => void;
}) {
  const cls = (k: keyof Traveller) => `${inputCls} ${errors[k] ? errCls : okCls}`;
  const title = total === 1 ? "Tus datos" : `Viajero ${index + 1}`;
  return (
    <div className="bg-white border border-pt-green/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-7">
        <span className="w-9 h-9 rounded-full bg-pt-green text-white grid place-items-center font-display font-bold">{index + 1}</span>
        <h3 className="font-display font-bold text-xl text-pt-green">{title}</h3>
        {index === 0 && <span className="ml-auto text-xs text-pt-muted"><span className="text-pt-clay font-bold">*</span> obligatorio</span>}
      </div>

      <div className="space-y-8">
        <Group title="Datos personales">
          <Field label="Nombre" error={errors.nombre}>
            <input className={cls("nombre")} value={t.nombre} onChange={(e) => onChange("nombre", e.target.value)} autoComplete={index === 0 ? "given-name" : "off"} />
          </Field>
          <Field label="Apellidos" error={errors.apellidos}>
            <input className={cls("apellidos")} value={t.apellidos} onChange={(e) => onChange("apellidos", e.target.value)} autoComplete={index === 0 ? "family-name" : "off"} />
          </Field>
          <Field label="Email" hint={index === 0 ? "Aquí recibes el contrato." : "También recibe su contrato."} error={errors.email}>
            <input type="email" inputMode="email" className={cls("email")} value={t.email} onChange={(e) => onChange("email", e.target.value)} autoComplete={index === 0 ? "email" : "off"} />
          </Field>
          <Field label="Teléfono (WhatsApp)" error={errors.telefono}>
            <PhoneInput prefix={t.prefijo} number={t.telefono} invalid={!!errors.telefono} onPrefix={(v) => onChange("prefijo", v)} onNumber={(v) => onChange("telefono", v)} />
          </Field>
          <Field label="Fecha de nacimiento" hint="Hay que ser mayor de edad." error={errors.nacimiento}>
            <input type="date" max={maxBirthDateISO()} min="1930-01-01" className={cls("nacimiento")} value={t.nacimiento} onChange={(e) => onChange("nacimiento", e.target.value)} autoComplete={index === 0 ? "bday" : "off"} />
          </Field>
          <Field label="Ciudad desde la que viajas" error={errors.ciudad}>
            <input className={cls("ciudad")} value={t.ciudad} onChange={(e) => onChange("ciudad", e.target.value)} placeholder="Barcelona, Madrid…" />
          </Field>
        </Group>

        <Group title="Documento">
          <Field label="Nacionalidad" error={errors.nacionalidad}>
            <select className={cls("nacionalidad")} value={t.nacionalidad} onChange={(e) => onChange("nacionalidad", e.target.value)}>
              <option value="">Elige país</option>
              <optgroup label="Más habituales">
                {nationalitiesTop.map((n) => (
                  <option key={`top-${n}`} value={n}>{n}</option>
                ))}
              </optgroup>
              <optgroup label="Todos los países">
                {nationalitiesAll.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </optgroup>
            </select>
          </Field>
          <Field label="Tipo de documento">
            <select className={`${inputCls} ${okCls}`} value={t.docTipo} onChange={(e) => onChange("docTipo", e.target.value as Traveller["docTipo"])}>
              <option value="DNI">DNI</option>
              <option value="NIE">NIE</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </Field>
          <Field label={`Número de ${t.docTipo}`} hint="Para viajar necesitarás pasaporte con 6 meses de validez." error={errors.docNumero}>
            <input
              className={`${cls("docNumero")} uppercase tracking-wide`}
              value={t.docNumero}
              onChange={(e) => onChange("docNumero", e.target.value.toUpperCase())}
              placeholder={t.docTipo === "DNI" ? "12345678Z" : t.docTipo === "NIE" ? "X1234567L" : "PAA123456"}
              autoComplete="off"
              spellCheck={false}
            />
          </Field>
        </Group>

        <Group title="Pádel y salud">
          <Field label="Nivel de pádel" hint="Para organizar los partidos." error={errors.nivel}>
            <select className={cls("nivel")} value={t.nivel} onChange={(e) => onChange("nivel", e.target.value)}>
              <option value="">Elige nivel</option>
              {padelLevels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>
          <Field label="Lesiones o alergias" hint="Solo para tu seguridad durante el viaje." optional>
            <input className={`${inputCls} ${okCls}`} value={t.salud} onChange={(e) => onChange("salud", e.target.value)} placeholder="Nada que destacar" />
          </Field>
        </Group>

        <Group title="Contacto de emergencia">
          <Field label="Nombre" error={errors.emergenciaNombre}>
            <input className={cls("emergenciaNombre")} value={t.emergenciaNombre} onChange={(e) => onChange("emergenciaNombre", e.target.value)} />
          </Field>
          <Field label="Teléfono" error={errors.emergenciaTelefono}>
            <PhoneInput prefix={t.emergenciaPrefijo} number={t.emergenciaTelefono} invalid={!!errors.emergenciaTelefono} onPrefix={(v) => onChange("emergenciaPrefijo", v)} onNumber={(v) => onChange("emergenciaTelefono", v)} />
          </Field>
        </Group>
      </div>
    </div>
  );
}

function PhoneInput({ prefix, number, invalid, onPrefix, onNumber }: { prefix: string; number: string; invalid: boolean; onPrefix: (v: string) => void; onNumber: (v: string) => void }) {
  return (
    <div className={`relative flex rounded-2xl border bg-white focus-within:ring-2 transition ${invalid ? "border-red-400 focus-within:ring-red-200" : "border-pt-green/15 focus-within:border-pt-green focus-within:ring-pt-green/15"}`}>
      <CountryPicker iso={prefix} onChange={onPrefix} />
      <input type="tel" inputMode="tel" value={number} onChange={(e) => onNumber(e.target.value.replace(/[^\d\s]/g, ""))} placeholder="600 000 000" className="flex-1 min-w-0 bg-transparent px-3 py-3 text-[15px] text-pt-ink placeholder:text-pt-muted/60 rounded-r-2xl focus:outline-none" />
    </div>
  );
}

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Selector de prefijo con buscador: acepta "+34", "34", "esp", "españa"… */
function CountryPicker({ iso, onChange }: { iso: string; onChange: (iso: string) => void }) {
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

// ---------- Piezas ----------

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Pasos de la reserva">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={s} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
            <button type="button" onClick={() => onJump(i)} disabled={!done} aria-current={active ? "step" : undefined} className="flex items-center gap-2 shrink-0 disabled:cursor-default">
              <span className={`w-8 h-8 rounded-full grid place-items-center text-sm font-display font-bold transition ${active ? "bg-pt-green text-white" : done ? "bg-pt-clay text-white" : "bg-white text-pt-green/50 border border-pt-green/15"}`}>
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

function StepTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <header className="mb-7">
      <p className="font-display uppercase tracking-[0.14em] text-sm font-semibold text-pt-clay mb-2">{eyebrow}</p>
      <h2 className="font-display font-medium text-3xl md:text-4xl text-pt-green leading-tight">{title}</h2>
      {text && <p className="text-pt-muted text-[17px] mt-3 leading-relaxed">{text}</p>}
    </header>
  );
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

/** Fecha en bloque: día grande, mes y día de la semana debajo. */
function DateMark({ iso }: { iso: string }) {
  const d = new Date(iso + "T12:00:00Z");
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-display font-semibold text-2xl sm:text-[28px] leading-none text-pt-green tabular-nums">{d.getUTCDate()}</span>
      <span className="flex flex-col leading-tight">
        <span className="font-display font-semibold text-sm text-pt-green">{MESES[d.getUTCMonth()]}</span>
        <span className="text-[11px] text-pt-muted">{DIAS[d.getUTCDay()]}</span>
      </span>
    </span>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="font-display uppercase tracking-[0.14em] text-xs font-semibold text-pt-clay mb-4">{title}</legend>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 items-start">{children}</div>
    </fieldset>
  );
}

function Field({ label, hint, error, optional, children }: { label: string; hint?: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label className="block">
        <span className="block text-sm font-medium text-pt-ink mb-1.5">
          {label}
          {optional ? <span className="font-normal text-pt-muted"> (opcional)</span> : <span className="text-pt-clay font-bold" aria-hidden> *</span>}
        </span>
        {children}
      </label>
      {error ? <p className="text-xs text-red-700 mt-1.5">{error}</p> : hint ? <p className="text-xs text-pt-muted mt-1.5">{hint}</p> : null}
    </div>
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

type Trip = (typeof departures2027)[number];

/** Resumen final en formato "billete". */
function Ticket({ destinationName, hero, trip, room, travellers }: { destinationName: string; hero: string; trip: Trip; room: RoomKey; travellers: Traveller[] }) {
  const pax = travellers.length;
  const price = rooms[room].price;
  const total = price * pax;
  const resto = price - DEPOSIT - SECOND_PAYMENT;
  return (
    <div className="rounded-[28px] overflow-hidden shadow-[0_30px_60px_-25px_rgba(14,59,45,0.45)] bg-white">
      <div className="relative h-64">
        <Img src={hero} alt="" fill sizes="(max-width:1024px) 100vw, 700px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pt-green via-pt-green/40 to-transparent" />
        <div className="absolute top-5 left-6 right-6 flex justify-between text-white/90 font-display uppercase tracking-[0.22em] text-[10px]">
          <span>Padel Travellers</span>
          <span>Viaje {trip.n} · 2027</span>
        </div>
        <div className="absolute left-6 right-6 bottom-5 text-white flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="font-display font-medium text-5xl sm:text-6xl md:text-7xl leading-none">{destinationName}</p>
            <p className="font-script text-pt-cream text-xl sm:text-2xl mt-1 whitespace-nowrap">pádel y aventura</p>
          </div>
          <div className="sm:text-right">
            <p className="font-display font-semibold text-xl md:text-2xl leading-tight">{trip.range}</p>
            <p className="text-white/80 text-sm">14 días · 13 noches</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 py-6 grid sm:grid-cols-3 gap-5 bg-pt-green text-white">
        <TicketItem k={pax === 2 ? "Viajeros" : "Viajero"} v={travellers.map((t) => `${t.nombre} ${t.apellidos}`.trim()).join(" y ")} />
        <TicketItem k="Habitación" v={room === "compartida" ? "Compartida, 2 personas" : "Individual"} />
        <TicketItem k="Total" v={pax === 2 ? `${eur(total)} (${eur(price)} por persona)` : eur(total)} />
      </div>

      {/* perforado */}
      <div className="relative h-0 border-t-2 border-dashed border-pt-green/15">
        <span className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-[#FBFAF5]" />
        <span className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-[#FBFAF5]" />
      </div>

      <div className="px-6 md:px-8 py-7">
        <p className="font-display uppercase tracking-[0.2em] text-[10px] text-pt-muted mb-5">Calendario de pagos {pax === 2 ? "(por persona)" : ""}</p>
        <ol className="grid grid-cols-3 gap-3 relative">
          <span className="absolute left-[16%] right-[16%] top-4 h-px bg-pt-green/15" aria-hidden />
          {[
            { t: "Hoy", a: eur(DEPOSIT), n: "Reserva reembolsable hasta confirmar grupo", on: true },
            { t: "Grupo confirmado", a: eur(SECOND_PAYMENT), n: "Al llegar a 8 viajeros" },
            { t: `Antes del ${finalPaymentDate(trip.start).replace(/ de 2027$/, "")}`, a: eur(resto), n: "Pago final" },
          ].map((p) => (
            <li key={p.t} className="relative text-center">
              <span className={`relative z-10 mx-auto w-8 h-8 rounded-full grid place-items-center text-xs font-bold ${p.on ? "bg-pt-clay text-white ring-4 ring-pt-clay/20" : "bg-white border-2 border-pt-green/20 text-pt-green"}`}>
                {p.on ? "✓" : "·"}
              </span>
              <p className="font-display font-bold text-xl md:text-2xl text-pt-green mt-3">{p.a}</p>
              <p className="text-xs font-semibold text-pt-ink mt-1">{p.t}</p>
              <p className="text-[11px] text-pt-muted mt-1 leading-snug hidden sm:block">{p.n}</p>
            </li>
          ))}
        </ol>
        {pax === 2 && (
          <p className="text-sm text-pt-ink/80 mt-6 text-center">
            Hoy reserváis los dos: <strong className="text-pt-green">{eur(DEPOSIT * 2)}</strong> en total.
          </p>
        )}
      </div>
    </div>
  );
}

function TicketItem({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0">
      <p className="font-display uppercase tracking-[0.2em] text-[10px] text-pt-cream/70">{k}</p>
      <p className="font-display font-semibold mt-1 leading-snug break-words">{v}</p>
    </div>
  );
}

function Summary({ destinationName, trip, room, price, pax }: { destinationName: string; trip: Trip | null; room: RoomKey | null; price: number | null; pax: number }) {
  return (
    <div className="sticky top-24 bg-pt-green text-white rounded-3xl overflow-hidden">
      <div className="relative h-32">
        <Img src={trip?.photo || "/photos/extra/atardecer/1.jpg"} alt="" fill sizes="360px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pt-green to-pt-green/10" />
        <div className="absolute left-6 bottom-4">
          <p className="font-display uppercase tracking-[0.22em] text-[10px] text-pt-cream/80">{destinationName} 2027</p>
          <p className="font-display font-medium text-2xl leading-tight">{trip ? trip.range : "Elige fecha"}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-pt-cream/75">{room ? (room === "compartida" ? "Compartida · 2 personas" : "Individual") : "Habitación"}</span>
            <span className="font-display font-bold">{price ? `${eur(price)}${pax === 2 ? " por persona" : ""}` : "—"}</span>
          </div>
          {price && pax === 2 && (
            <div className="flex justify-between border-t border-white/15 pt-2">
              <span className="text-pt-cream/75">Total, 2 personas</span>
              <span className="font-display font-bold">{eur(price * 2)}</span>
            </div>
          )}
        </div>
        <div>
          <p className="font-display uppercase tracking-[0.2em] text-[10px] text-pt-cream/70 mb-3">Cómo pagas {pax === 2 ? "(por persona)" : ""}</p>
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

function Confirmation({ travellers, trip, price }: { travellers: Traveller[]; trip: Trip; price: number }) {
  const pax = travellers.length;
  const names = travellers.map((t) => t.nombre).join(" y ");
  return (
    <div id="reserva" className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 text-center fade-up scroll-mt-24">
      <span className="inline-grid place-items-center w-16 h-16 rounded-full bg-pt-clay text-white text-2xl mb-6" aria-hidden>✓</span>
      <h2 className="font-display font-medium text-4xl md:text-5xl text-pt-green leading-tight">
        ¡Hecho, {names}!
        <br />
        <span className="font-script font-normal text-pt-clay text-3xl md:text-4xl">nos vemos en Bali</span>
      </h2>
      <p className="text-pt-muted mt-6 text-lg">
        {pax === 2 ? "Tenéis vuestras plazas" : "Tenemos tu plaza"} para el Viaje {trip.n} · {trip.range}.
      </p>
      <ol className="text-left mt-10 space-y-4">
        {[
          ["Revisa tu email", pax === 2 ? `Cada uno recibe su contrato y los datos de la reserva (${travellers.map((t) => t.email).join(" y ")}).` : `Te hemos enviado el contrato y los datos de tu reserva a ${travellers[0].email}.`],
          [`Paga la reserva de ${eur(DEPOSIT)}${pax === 2 ? " por persona" : ""}`, "En el mismo email tienes cómo pagarla. Hasta que se confirme el grupo, es 100 % reembolsable."],
          ["Te avisamos al confirmarse el grupo", `Entonces se abonan ${eur(SECOND_PAYMENT)} y el resto (${eur(price - DEPOSIT - SECOND_PAYMENT)}) antes del ${finalPaymentDate(trip.start)}${pax === 2 ? ", por persona" : ""}.`],
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
