"use client";
import { useState } from "react";
import Img from "@/components/Img";

interface PhotoCarouselProps {
  photos: string[];
  alt: string;
  aspectClass?: string;
  sizes?: string;
}

export default function PhotoCarousel({
  photos,
  alt,
  aspectClass = "aspect-[4/3]",
  sizes = "(max-width:1024px) 50vw, 33vw",
}: PhotoCarouselProps) {
  const [i, setI] = useState(0);
  if (!photos.length) return null;
  const multi = photos.length > 1;
  const prev = () => setI((i - 1 + photos.length) % photos.length);
  const next = () => setI((i + 1) % photos.length);

  return (
    <div className={`relative ${aspectClass} overflow-hidden bg-pt-cream/40 rounded-2xl`}>
      <Img
        src={photos[i]}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        sizes={sizes}
      />
      {multi && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-pt-green flex items-center justify-center shadow-md transition active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-pt-green flex items-center justify-center shadow-md transition active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, j) => (
              <button
                key={j}
                type="button"
                aria-label={`Foto ${j + 1}`}
                onClick={() => setI(j)}
                className={`h-1.5 rounded-full transition-all ${j === i ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/85"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
