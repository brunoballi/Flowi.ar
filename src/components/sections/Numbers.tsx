"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import Reveal from "../Reveal";
import SectionHead from "../ui/SectionHead";
import Counter from "../ui/Counter";
import Sparkline from "../ui/Sparkline";
import { useInViewOnce } from "../ui/useInView";

function Segments({ value }: { value: number }) {
  // 12 semanas: de la 8 a la 12 es el rango habitual de implementación.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  return (
    <div ref={ref} className="flex h-12 items-end gap-1.5">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className={`flex-1 rounded-sm ${i >= 7 && i < value ? "bg-gradient-to-t from-teal to-mint" : "bg-white/[.08]"}`}
          style={{ height: seen ? `${30 + i * 6}%` : "10%", transition: `height .8s cubic-bezier(.2,.7,.2,1) ${i * 0.05}s` }}
        />
      ))}
    </div>
  );
}

function Progress({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  return (
    <div ref={ref} className="flex h-12 items-center">
      <div className="h-2 w-full rounded-full bg-white/[.08]">
        <div className="h-full rounded-full bg-gradient-to-r from-teal to-mint" style={{ width: seen ? `${value}%` : "0%", transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }} />
      </div>
    </div>
  );
}

export default function Numbers() {
  const n = site.numbers;
  return (
    <Reveal as="section" stream="left" id="numeros" className="wrap py-24">
      <SectionHead eyebrow={n.eyebrow} title={n.title} lede={n.lede} />
      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3">
        {n.items.map((it) => (
          <div key={it.label} data-reveal>
            <span className="label">{it.label}</span>
            <div className="mb-4 mt-2 font-display text-[clamp(44px,5vw,64px)] font-semibold leading-none tracking-tight">
              {it.lead ? (
                <span className="tabular-nums">
                  {it.lead}
                  {it.value}
                </span>
              ) : (
                <>
                  {it.prefix}
                  <Counter value={it.value} suffix={it.suffix} />
                </>
              )}
            </div>
            {it.viz === "spark" && <Sparkline id="n1" points={[2, 4, 5, 7, 9, 12, 14, 17, 20]} />}
            {it.viz === "segments" && <Segments value={it.value} />}
            {it.viz === "progress" && <Progress value={it.value} />}
          </div>
        ))}
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {n.cases.map(([t, d]) => (
          <div key={t} data-reveal className="border-t border-line pt-5">
            <h3 className="font-display text-[15px] font-semibold">{t}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
          </Reveal>
  );
}
