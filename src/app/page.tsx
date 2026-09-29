import StreamMount from "@/components/canvas/StreamMount";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Hero from "@/components/sections/Hero";
import Integrations from "@/components/sections/Integrations";
import Bolillero from "@/components/sections/Bolillero";
import FlowiGest from "@/components/sections/FlowiGest";
import BotDemo from "@/components/sections/BotDemo";
import Plate from "@/components/sections/Plate";
import Process from "@/components/sections/Process";
import Numbers from "@/components/sections/Numbers";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <StreamMount />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <Integrations />
        <Bolillero />
        <FlowiGest />
        <BotDemo />
        <Plate />
        <Process />
        <Numbers />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
