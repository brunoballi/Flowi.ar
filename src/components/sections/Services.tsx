"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import Reveal from "../Reveal";
import SectionHead from "../ui/SectionHead";
import { scrollToHash, useLenis } from "../SmoothScroll";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

function Icon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "#43E3B0", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 flex-none" aria-hidden="true">
      {name === "sistemas" && (
        <g {...common}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4M7 12l3-3 2 2 4-4" />
        </g>
      )}
      {name === "bot" && (
        <g {...common}>
          <path d="M4 18l1.5-3.5A7.5 7.5 0 1 1 9 19z" />
          <path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" />
        </g>
      )}
      {name === "web" && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" />
        </g>
      )}
      {name === "tienda" && (
        <g {...common}>
          <path d="M4 5h2l2 10h10l2-7H7" />
          <circle cx="10" cy="19" r="1.2" />
          <circle cx="17" cy="19" r="1.2" />
        </g>
      )}
    </svg>
  );
}

function Card({ item, go }: { item: (typeof site.services.items)[number]; go: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  return (
    <a
      href="#contacto"
      onClick={(e) => go(e, "#contacto")}
      className="panel flex w-[260px] flex-none flex-col gap-3 p-5 transition-colors hover:border-mint/50"
    >
      <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line-strong bg-ink/60">
        <Icon name={item.icon} />
      </span>
      <h3 className="font-display text-[17px] font-semibold tracking-tight">{item.title}</h3>
      <p className="text-[14px] leading-relaxed text-muted">{item.text}</p>
    </a>
  );
}

export default function Services() {
  const s = site.services;
  const lenis = useLenis();
  const [reduced, setReduced] = useState(true);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(lenis, href);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <Reveal as="section" id="servicios" stream="fan" className="wrap py-24">
      <SectionHead eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
      <div data-reveal className="marquee-fade -mx-[calc(50vw-50%)] overflow-hidden">
        {reduced ? (
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {s.items.map((item) => (
              <Card key={item.title} item={item} go={go} />
            ))}
          </div>
        ) : (
          <div className="marquee-track-once flex w-max gap-4 py-1">
            {s.items.map((item) => (
              <Card key={item.title} item={item} go={go} />
            ))}
          </div>
        )}
      </div>
      <p data-reveal className="mt-8 max-w-2xl text-[15px] text-muted">
        {s.extra}{" "}
        <a href={s.extraLink.href} onClick={(e) => go(e, s.extraLink.href)} className="text-mint underline-offset-4 hover:underline">
          {s.extraLink.label}
        </a>
      </p>
    </Reveal>
  );
}
