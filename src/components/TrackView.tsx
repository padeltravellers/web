"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";

/** ViewContent al abrir una página de destino o de reserva (y otra vez si acepta las cookies estando en ella). */
export default function TrackView({ name, category = "destino" }: { name: string; category?: string }) {
  useEffect(() => {
    const fire = () => track("ViewContent", { content_name: name, content_category: category });
    fire();
    window.addEventListener("pt-consent-granted", fire);
    return () => window.removeEventListener("pt-consent-granted", fire);
  }, [name, category]);
  return null;
}
