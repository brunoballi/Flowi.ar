"use client";
import { site } from "@/content/site";
import Title from "../ui/Title";
import { trackDemo } from "@/lib/track";
import { scrollToHash, useLenis } from "../SmoothScroll";

/** Encabezado de la página de la promo (/barberias): explica la oferta en tres pasos y lleva al WhatsApp. */
export default function PromoHero() {
  const p = site.promo;
  const lenis = useLenis();
  return (
    <section className="wrap pt-36 pb-12 md:pt-44">
      <span className="pill">
        <span className="live-dot" />
        {p.pill}
      </span>
      <Title as="h1" parts={p.title} className="mt-5 max-w-[16em] text-[clamp(38px,6vw,76px)]" />
      <p className="mt-6 max-w-[38em] text-lg leading-relaxed text-muted">{p.lede}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={p.cta.href} onClick={() => trackDemo("promo")} target="_blank" rel="noreferrer" className="btn btn-primary">
          {p.cta.label}
        </a>
        <a
          href="#flowigest"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash(lenis, "#flowigest");
          }}
          className="btn btn-ghost"
        >
          {p.secondary.label}
        </a>
      </div>
      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {p.steps.map((s) => (
          <li key={s.n} className="panel p-6">
            <span className="mono text-mint">{s.n}</span>
            <h2 className="mt-3 text-[19px] font-semibold leading-snug">{s.title}</h2>
            <p className="mt-2 text-[15px] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="mono mt-6 text-[12px] text-muted">{p.note}</p>
    </section>
  );
}
