"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Reveal from "../Reveal";
import SectionHead from "../ui/SectionHead";
import { scrollToHash, useLenis } from "../SmoothScroll";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

const AUTOPLAY_MS = 2000;

function Icon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "#43E3B0", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
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

export default function Services() {
  const s = site.services;
  const lenis = useLenis();
  const [index, setIndex] = useState(0);
  const hovering = useRef(false);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(lenis, href);
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % s.items.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [s.items.length]);

  const it = s.items[index];

  return (
    <Reveal as="section" id="servicios" stream="fan" className="wrap py-24">
      <SectionHead eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
      <div onMouseEnter={() => (hovering.current = true)} onMouseLeave={() => (hovering.current = false)}>
        <article
          key={index}
          data-reveal
          className={`carousel-slide panel relative flex flex-col p-6 md:p-7 ${it.badge ? "!border-mint/50 shadow-[0_0_60px_-24px_#43E3B0]" : ""}`}
        >
          {it.badge && <span className="mono absolute right-5 top-5 rounded-md bg-mint px-2 py-0.5 text-[10px] font-medium text-ink">{it.badge}</span>}
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-ink/60">
            <Icon name={it.icon} />
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{it.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{it.text}</p>
          <ul className="mt-5 flex-1 space-y-2.5 text-[14px] md:columns-2">
            {it.items.map((x) => (
              <li key={x} className="flex gap-2.5 break-inside-avoid">
                <span className="mono text-mint">✓</span>
                {x}
              </li>
            ))}
          </ul>
          {it.link && (
            <a href={it.link.href} onClick={(e) => go(e, it.link!.href)} className="mono mt-6 text-[12px] text-mint underline-offset-4 hover:underline">
              {it.link.label}
            </a>
          )}
        </article>
      </div>
      <div className="carousel-dots mt-6">
        {s.items.map((svc, i) => (
          <button
            key={svc.title}
            type="button"
            aria-label={svc.title}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`carousel-dot ${i === index ? "active" : ""}`}
          />
        ))}
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
