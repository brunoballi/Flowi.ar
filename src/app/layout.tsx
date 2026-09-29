import type { Metadata, Viewport } from "next";
import { Poppins, Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

const SITE_URL = `https://${site.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: SITE_URL,
    siteName: site.name,
    locale: "es_AR",
    type: "website",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.seo.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: SITE_URL,
  image: `${SITE_URL}${site.seo.ogImage}`,
  description: site.seo.description,
  areaServed: { "@type": "Country", name: "Argentina" },
  telephone: `+${site.whatsapp.number}`,
  email: site.email,
  sameAs: [site.instagram.url],
};

export const viewport: Viewport = {
  themeColor: "#050D0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${poppins.variable} ${instrument.variable} ${dmSans.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
