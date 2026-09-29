"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Reveal from "../Reveal";
import SectionHead from "../ui/SectionHead";
import Hub from "../ui/Hub";
import { useInViewOnce } from "../ui/useInView";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/** Avanza un contador de pasos cuando el bloque entra en pantalla. */
function useSteps(ref: React.RefObject<HTMLElement | null>, times: number[]) {
  const seen = useInViewOnce(ref);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(times.length);
      return;
    }
    const ts = times.map((t, i) => window.setTimeout(() => setStep(i + 1), t));
    return () => ts.forEach(clearTimeout);
  }, [seen, times]);
  return step;
}

const CHAT_TIMES = [200, 1300, 2300, 3400];
function Chat() {
  const c = site.process.chat;
  const ref = useRef<HTMLDivElement>(null);
  const step = useSteps(ref, CHAT_TIMES);
  return (
    <div ref={ref} className="panel p-5">
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <span className="mono text-[12px] text-text">primera charla · sin cargo</span>
        <span className="label">30 min</span>
      </div>
      <div className="flex min-h-[200px] flex-col gap-3">
        {step >= 1 && <div className="bubble-in max-w-[85%] rounded-2xl rounded-bl-md bg-white/[.06] px-4 py-2.5 text-[14px]">{c.q}</div>}
        {step >= 2 && <div className="bubble-in ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-line-strong bg-white/[.03] px-4 py-2.5 text-[14px] text-muted">{c.a}</div>}
        {step === 2 && (
          <span className="flex w-fit gap-1 rounded-2xl bg-white/5 px-3 py-2.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <i key={i} className="typing-dot" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </span>
        )}
        {step >= 3 && <div className="bubble-in max-w-[85%] rounded-2xl rounded-bl-md border border-mint/25 bg-teal/25 px-4 py-2.5 text-[14px]">{c.r}</div>}
      </div>
    </div>
  );
}

function Audit() {
  const a = site.process.audit;
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const total = a.rows.reduce((s, r) => s + r[1], 0);
  return (
    <div ref={ref} className="panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="label">{a.title}</span>
        <span className="mono text-[11px] text-warn">{total} h / semana</span>
      </div>
      <div className="space-y-3.5">
        {a.rows.map(([name, h], i) => (
          <div key={name} className="grid grid-cols-[150px_1fr_44px] items-center gap-3 text-[12px]">
            <span className="mono truncate text-muted">{name}</span>
            <div className="h-2 rounded-full bg-white/[.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-warn/70 to-warn"
                style={{ width: seen ? `${(h / a.max) * 100}%` : "0%", transition: `width .9s cubic-bezier(.2,.7,.2,1) ${i * 0.18}s` }}
              />
            </div>
            <span className="mono text-right tabular-nums text-text">{h} h</span>
          </div>
        ))}
      </div>
      <p className="mono mt-5 text-[10px] text-dim">{a.note}</p>
    </div>
  );
}

const HANDOFF_TIMES = [300, 800, 1300, 1800];
function Handoff() {
  const items = site.process.handoff;
  const ref = useRef<HTMLDivElement>(null);
  const step = useSteps(ref, HANDOFF_TIMES);
  return (
    <div ref={ref} className="panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="label">entrega</span>
        <span className="mono text-[11px] text-mint">{Math.min(step, items.length)}/{items.length}</span>
      </div>
      <ul className="space-y-3">
        {items.map((it, i) => {
          const on = step > i;
          return (
            <li key={it} className="flex items-center gap-3 text-[14px]">
              <span className={`grid h-6 w-6 flex-none place-items-center rounded-full border text-[12px] transition-all duration-300 ${on ? "border-mint bg-mint text-ink" : "border-line-strong text-transparent"}`}>✓</span>
              <span className={on ? "text-text" : "text-muted"}>{it}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const AUTOPLAY_MS = 2000;

export default function Process() {
  const p = site.process;
  const [index, setIndex] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % p.steps.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [p.steps.length]);

  const visuals = [
    <Chat key="c" />,
    <Audit key="a" />,
    <div key="h" className="panel p-5">
      <Hub nodes={p.build.nodes} />
      <p className="mono mt-3 flex items-center gap-2 border-t border-line pt-4 text-[11px] text-dim">
        <span className="live-dot" /> {p.build.foot}
      </p>
    </div>,
    <Handoff key="d" />,
  ];
  const s = p.steps[index];

  return (
    <Reveal as="section" id="como-funciona" stream="right" className="wrap py-24">
      <SectionHead eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
      <div
        data-reveal
        className="border-y border-line py-14"
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
      >
        <div key={index} className="carousel-slide grid items-center gap-10 md:grid-cols-2">
          <div className="max-w-md">
            <span className="mono text-xs text-mint">{s.n}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
          </div>
          <div>{visuals[index]}</div>
        </div>
      </div>
      <div className="carousel-dots mt-6">
        {p.steps.map((st, i) => (
          <button
            key={st.n}
            type="button"
            aria-label={`Paso ${st.n}: ${st.title}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`carousel-dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </Reveal>
  );
}
