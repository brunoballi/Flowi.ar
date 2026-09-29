import Link from "next/link";
import Nav from "./Nav";
import Footer from "./sections/Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="wrap py-16 md:py-24">
        <article className="legal">
          <Link href="/" className="mono mb-8 inline-block text-[13px] text-muted transition-colors hover:text-text">
            ← Volver a Flowi
          </Link>
          <h1>{title}</h1>
          <p className="updated">Última actualización: {updated}</p>
          {children}
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
