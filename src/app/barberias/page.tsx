import type { Metadata } from "next";
import StreamMount from "@/components/canvas/StreamMount";
import Nav from "@/components/Nav";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PromoHero from "@/components/sections/PromoHero";
import Testimonial from "@/components/sections/Testimonial";
import FlowiGest from "@/components/sections/FlowiGest";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

const { title, description } = site.promo.seo;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/barberias" },
  openGraph: {
    title,
    description,
    url: `https://${site.domain}/barberias`,
    siteName: site.name,
    locale: "es_AR",
    type: "website",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.seo.ogImageAlt }],
  },
};

export default function Barberias() {
  return (
    <>
      <StreamMount />
      <Nav simple />
      <main className="relative z-[1]">
        <PromoHero />
        <Testimonial />
        <FlowiGest />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
