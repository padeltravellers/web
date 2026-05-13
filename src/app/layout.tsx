import type { Metadata } from "next";
import { Jost, Inter, Petit_Formal_Script, Eczar } from "next/font/google";
import "./globals.css";

// Jost ≈ Futura | Inter ≈ Helvetica | Petit Formal Script ≈ Sloop | Eczar ≈ Vintage
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const petit = Petit_Formal_Script({
  variable: "--font-petit",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Padel Travellers — Viajes de pádel a Bali",
  description: "Viajes en grupo a Bali con pádel. 14 días, alojamiento premium, partidos diarios, cultura, surf y aventura. Desde 1.725€.",
  openGraph: {
    title: "Padel Travellers — Bali con pádel",
    description: "14 días en Bali. Pádel + cultura + aventura. Grupos de 8–12. Coordinador español.",
    images: ["/photos/home/Banner_Principal.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${jost.variable} ${inter.variable} ${petit.variable} ${eczar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-pt-ink">{children}</body>
    </html>
  );
}
