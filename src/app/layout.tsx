import type { Metadata } from "next";
import { Jost, Inter, Petit_Formal_Script, Eczar } from "next/font/google";
import "./globals.css";

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

const SITE_URL = "https://padeltravellers.com";
const SITE_OG = `${SITE_URL}/photos/extra/atardecer/1.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Padel Travellers — Viajes en grupo de pádel y aventura",
    template: "%s · Padel Travellers",
  },
  description:
    "Viajes en grupo que combinan pádel y aventura. Destinos cuidados, alojamiento privado con desayuno, coordinador español. Bali abierto 2026, Filipinas próximamente.",
  keywords: [
    "viajes pádel",
    "padel bali",
    "viajes en grupo pádel",
    "viaje padel bali",
    "vacaciones pádel",
    "padel travellers",
    "viajes deportivos",
    "padel viaje",
    "bali padel",
    "retiros pádel",
    "padel y aventura",
  ],
  authors: [{ name: "Padel Travellers" }],
  creator: "Padel Travellers",
  publisher: "Padel Travellers",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Padel Travellers",
    title: "Padel Travellers — Viajes en grupo de pádel y aventura",
    description:
      "Viajes premium en grupo que combinan pádel y aventura. Bali 2026, Filipinas próximamente. Alojamiento privado, coordinador español de principio a fin.",
    images: [{ url: SITE_OG, width: 1200, height: 630, alt: "Padel Travellers — viajes a Bali" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padel Travellers — Viajes en grupo de pádel y aventura",
    description: "Pádel, cultura y aventura. Bali 2026, Filipinas próximamente.",
    images: [SITE_OG],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Padel Travellers",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/monogram.png`,
  image: SITE_OG,
  description:
    "Viajes en grupo que combinan pádel y aventura. Bali 2026, Filipinas 2027. Alojamiento privado, coordinador español.",
  telephone: "+34 614 47 60 68",
  email: "info@padeltravellers.com",
  address: { "@type": "PostalAddress", addressCountry: "ES" },
  areaServed: ["ES", "AD", "ID", "PH"],
  sameAs: [
    "https://instagram.com/padeltravellers",
    "https://maps.app.goo.gl/VKFUsVDmY8sWB2DU7",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "8",
    bestRating: "5",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Google Analytics 4 — Padel Travellers */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TLNXCY4BM8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TLNXCY4BM8');
            `,
          }}
        />
        {/* Meta Pixel — Padel Travellers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1251864486670086');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1251864486670086&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Auto-tracking — clicks, scroll depth, WhatsApp, outbound */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var origin = window.location.hostname;

                function track(eventName, params) {
                  try {
                    if (typeof window.gtag === 'function') {
                      window.gtag('event', eventName, params || {});
                    }
                  } catch (e) {}
                }

                // === Click tracking ===
                document.addEventListener('click', function(e) {
                  var el = e.target;
                  while (el && el !== document) {
                    var tag = el.tagName;
                    if (tag === 'A' || tag === 'BUTTON') break;
                    el = el.parentNode;
                  }
                  if (!el || el === document) return;

                  var text = (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 80);
                  var href = el.getAttribute('href') || '';
                  var section = '';
                  var ancestor = el.closest('section');
                  if (ancestor && ancestor.id) section = ancestor.id;

                  // WhatsApp
                  if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
                    track('whatsapp_click', {
                      link_text: text,
                      link_url: href,
                      page_path: window.location.pathname,
                      section: section
                    });
                    return;
                  }

                  // Email
                  if (href.indexOf('mailto:') === 0) {
                    track('email_click', {
                      link_text: text,
                      page_path: window.location.pathname
                    });
                    return;
                  }

                  // Phone
                  if (href.indexOf('tel:') === 0) {
                    track('phone_click', {
                      link_text: text,
                      page_path: window.location.pathname
                    });
                    return;
                  }

                  // Outbound link
                  if (href.indexOf('http') === 0 && href.indexOf(origin) === -1) {
                    track('outbound_click', {
                      link_text: text,
                      link_url: href,
                      page_path: window.location.pathname
                    });
                    return;
                  }

                  // Internal CTA (a or button)
                  if (text) {
                    track('cta_click', {
                      link_text: text,
                      link_url: href,
                      element: el.tagName.toLowerCase(),
                      page_path: window.location.pathname,
                      section: section
                    });
                  }
                }, { passive: true, capture: true });

                // === Scroll depth ===
                var depths = [25, 50, 75, 100];
                var fired = {};
                function checkScroll() {
                  var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
                  if (docH <= 0) return;
                  var pct = Math.round((window.scrollY / docH) * 100);
                  depths.forEach(function(d) {
                    if (pct >= d && !fired[d]) {
                      fired[d] = true;
                      track('scroll_depth', { percent: d, page_path: window.location.pathname });
                    }
                  });
                }
                window.addEventListener('scroll', function() {
                  if (window._scrollT) return;
                  window._scrollT = setTimeout(function() { window._scrollT = null; checkScroll(); }, 400);
                }, { passive: true });

                // === Form interactions ===
                document.addEventListener('focusin', function(e) {
                  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) {
                    var name = e.target.getAttribute('name') || 'unknown';
                    if (!window._formStarted) {
                      window._formStarted = true;
                      track('form_start', { field: name, page_path: window.location.pathname });
                    }
                  }
                }, { passive: true });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-pt-ink">{children}</body>
    </html>
  );
}
