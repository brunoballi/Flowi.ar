"use client";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { site } from "@/content/site";
import Counter from "./Counter";
import Sparkline from "./Sparkline";

// Reloj de ejemplo (18:42:10) para que las ejecuciones se vean coherentes sin depender de la hora del servidor.
const START = 18 * 3600 + 42 * 60 + 10;
const two = (n: number) => String(n).padStart(2, "0");
const clock = (s: number) => `${two(Math.floor(s / 3600) % 24)}:${two(Math.floor(s / 60) % 60)}:${two(s % 60)}`;

export default function ReportCard() {
  const r = site.hero.report;
  const [runs, setRuns] = useState(() => r.runs.slice(0, 3).map((run, i) => ({ key: i, name: run[0], dur: run[1], time: clock(START - i * 47) })));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 3;
    let n = 3;
    const id = setInterval(() => {
      const run = r.runs[i % r.runs.length];
      const time = clock(START + (i - 2) * 23);
      setRuns((prev) => [{ key: n++, name: run[0], dur: run[1], time }, ...prev].slice(0, 3));
      i++;
    }, 2500);
    return () => clearInterval(id);
  }, [r.runs]);

  return (
    <div className="overflow-hidden rounded-[20px] border border-line-strong bg-panel/60 shadow-[0_40px_120px_-40px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3 text-xs">
        <span className="mono text-text">{r.title}</span>
        <span className="mono text-dim">|</span>
        <span className="mono text-muted">{r.meta}</span>
        <span className="mono ml-auto flex items-center gap-2 text-mint">
          <span className="live-dot" /> al día
        </span>
      </div>

      <div className="relative flex">
        <div className="flex flex-col gap-2 border-r border-line p-2.5" aria-hidden="true">
          {["↖", "+", "⌥"].map((s) => (
            <span key={s} className="mono grid h-7 w-7 place-items-center rounded-md border border-line text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
        <div className="relative flex-1 p-4">
          <span className="mono absolute right-4 top-4 rounded-md border border-line px-2 py-0.5 text-[10px] text-muted">{r.badge}</span>
          <div className="grid grid-cols-3 gap-3 pr-16">
            {r.kpis.map((k) => (
              <div key={k.label}>
                <Counter value={k.value} suffix={k.suffix} className="font-display text-[clamp(20px,2.6vw,28px)] font-semibold leading-none text-text" />
                <p className="mono mt-2 text-[10.5px] leading-snug text-dim">{k.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-line bg-ink/40 p-3">
            <div className="label mb-1">{r.trendLabel}</div>
            <Sparkline points={r.trend} id="hero-report" />
          </div>
        </div>
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="label mb-2">últimas ejecuciones</div>
        <ul className="mono space-y-1.5 text-[11.5px]">
          {runs.map((run) => (
            <li key={run.key} className="run-row grid grid-cols-[6px_64px_1fr_48px] items-center gap-3 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              <span className="tabular-nums text-dim">{run.time}</span>
              <span className="truncate text-text">{run.name}</span>
              <span className="text-right tabular-nums">{run.dur}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
