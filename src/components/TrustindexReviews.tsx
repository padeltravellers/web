"use client";
import { useEffect, useRef } from "react";

const TRUSTINDEX_SRC = "https://cdn.trustindex.io/loader.js?7dfa8a4714ce89033f86df04c22";

/**
 * Widget Trustindex (Google Reviews reales del perfil Padel Travellers).
 * Carga el loader de Trustindex en cliente y renderiza el widget en este punto.
 */
export default function TrustindexReviews() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Evitar duplicado si el componente re-monta
    if (containerRef.current.querySelector("script[data-trustindex]")) return;
    const s = document.createElement("script");
    s.src = TRUSTINDEX_SRC;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-trustindex", "1");
    containerRef.current.appendChild(s);
  }, []);

  return <div ref={containerRef} className="trustindex-host" />;
}
