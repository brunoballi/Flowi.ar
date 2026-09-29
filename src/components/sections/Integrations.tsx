"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { site } from "@/content/site";
import Reveal from "../Reveal";

export default function Integrations() {
  const root = useRef<HTMLDivElement>(null);
  const it = site.integrations;
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const chips = gsap.utils.toArray<HTMLElement>("[data-chip]");
      const dot = root.current!.querySelector("[data-dot]");
      const D = 4.2;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      tl.fromTo(dot, { left: "0%", opacity: 0 }, { left: "100%", opacity: 1, duration: D, ease: "none" });
      tl.to(dot, { opacity: 0, duration: 0.3 }, D - 0.3);
      chips.forEach((c, i) => {
        tl.to(c, { borderColor: "#43E3B0", color: "#43E3B0", boxShadow: "0 0 22px -6px #43E3B0", duration: 0.2, yoyo: true, repeat: 1, repeatDelay: 0.5 }, (i / (chips.length - 1)) * D - 0.1);
      });
    },
    { scope: root },
  );
  return (
    <Reveal stream="hero">
      <div ref={root} data-reveal className="wrap pb-20">
        <p className="label mb-5">{it.label}</p>
        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <div className="relative flex min-w-[560px] items-start justify-between">
            <div className="absolute left-6 right-6 top-6 border-t border-dashed border-line-strong" aria-hidden="true">
              <span data-dot className="absolute -top-[3.5px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-mint opacity-0 shadow-[0_0_12px_#43E3B0]" />
            </div>
            {it.items.map(([abbr, name]) => (
              <div key={abbr} className="relative flex flex-col items-center gap-2">
                <span data-chip className="mono grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-ink text-sm text-muted">
                  {abbr}
                </span>
                <span className="mono text-[11px] text-dim">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
