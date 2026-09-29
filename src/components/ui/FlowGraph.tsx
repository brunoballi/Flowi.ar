"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { site } from "@/content/site";

const W = 620;
const H = 320;
const NW = 138;
const NH = 54;

const NODES = {
  trigger: { x: 4, y: 133 },
  cond: { x: 166, y: 133 },
  yes1: { x: 330, y: 49 },
  yes2: { x: 480, y: 49 },
  no: { x: 330, y: 217 },
} as const;
type NodeId = keyof typeof NODES;

const EDGES: { id: string; d: string; to: NodeId }[] = [
  { id: "e1", d: "M142 160 L166 160", to: "cond" },
  { id: "yes", d: "M304 160 C320 160 314 76 330 76", to: "yes1" },
  { id: "yes2", d: "M468 76 L480 76", to: "yes2" },
  { id: "no", d: "M304 160 C320 160 314 244 330 244", to: "no" },
];

const pct = (v: number, t: number) => `${(v / t) * 100}%`;

// Reloj de ejemplo (18:42:10) para que las ejecuciones se vean coherentes sin depender de la hora del servidor.
const START = 18 * 3600 + 42 * 60 + 10;
const two = (n: number) => String(n).padStart(2, "0");
const clock = (s: number) => `${two(Math.floor(s / 3600) % 24)}:${two(Math.floor(s / 60) % 60)}:${two(s % 60)}`;

export default function FlowGraph() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<NodeId[]>([]);
  const g = site.hero.graph;
  const [runs, setRuns] = useState(() => g.runs.slice(0, 3).map((r, i) => ({ key: i, name: r[0], dur: r[1], time: clock(START - i * 47) })));

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const dot = el.querySelector<SVGCircleElement>("[data-pulse]")!;
      const paths = Object.fromEntries(EDGES.map((e) => [e.id, el.querySelector<SVGPathElement>(`[data-edge="${e.id}"]`)!]));
      if (prefersReducedMotion()) {
        setActive(["trigger", "cond", "yes1", "yes2"]);
        return;
      }
      let branchYes = true;
      const along = (id: string, dur: number) => {
        const p = paths[id];
        const len = p.getTotalLength();
        const o = { t: 0 };
        return gsap.to(o, {
          t: 1,
          duration: dur,
          ease: "power1.inOut",
          onStart: () => {
            gsap.set(dot, { opacity: 1 });
            p.classList.add("edge-hot");
          },
          onUpdate: () => {
            const pt = p.getPointAtLength(o.t * len);
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
          },
          onComplete: () => {
            p.classList.remove("edge-hot");
          },
        });
      };
      const build = () => {
        const tl = gsap.timeline({ onComplete: () => { branchYes = !branchYes; build(); } });
        tl.add(() => setActive(["trigger"]))
          .to({}, { duration: 0.6 })
          .add(along("e1", 0.5))
          .add(() => setActive(["trigger", "cond"]))
          .to({}, { duration: 0.5 });
        if (branchYes) {
          tl.add(along("yes", 0.7)).add(() => setActive(["trigger", "cond", "yes1"])).to({}, { duration: 0.4 }).add(along("yes2", 0.35)).add(() => setActive(["trigger", "cond", "yes1", "yes2"]));
        } else {
          tl.add(along("no", 0.7)).add(() => setActive(["trigger", "cond", "no"]));
        }
        tl.to(dot, { opacity: 0, duration: 0.3 }).to({}, { duration: 1.8 });
      };
      build();
    },
    { scope: root },
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 3;
    let n = 3;
    const id = setInterval(() => {
      const r = g.runs[i % g.runs.length];
      const time = clock(START + (i - 2) * 23);
      setRuns((prev) => [{ key: n++, name: r[0], dur: r[1], time }, ...prev].slice(0, 3));
      i++;
    }, 2500);
    return () => clearInterval(id);
  }, [g.runs]);

  const labels = g.nodes;

  return (
    <div ref={root} className="overflow-hidden rounded-[20px] border border-line-strong bg-panel/60 shadow-[0_40px_120px_-40px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3 text-xs">
        <span className="mono text-text">{g.title}</span>
        <span className="mono text-dim">|</span>
        <span className="mono text-muted">{g.meta}</span>
        <span className="mono ml-auto flex items-center gap-2 text-mint">
          <span className="live-dot" /> corriendo
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
        <div className="relative flex-1 p-3">
          <span className="mono absolute right-3 top-3 rounded-md border border-line px-2 py-0.5 text-[10px] text-muted">100%</span>
          <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: `${W}/${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              {EDGES.map((e) => (
                <path key={e.id} data-edge={e.id} d={e.d} fill="none" className="edge" />
              ))}
              <text x="312" y="108" className="mono fill-[#5B746C] text-[11px]">sí</text>
              <text x="312" y="220" className="mono fill-[#5B746C] text-[11px]">no</text>
              <circle data-pulse r="4.5" cx="142" cy="160" fill="#43E3B0" opacity="0" style={{ filter: "drop-shadow(0 0 6px #43E3B0)" }} />
            </svg>
            {(Object.keys(NODES) as NodeId[]).map((id) => {
              const n = NODES[id];
              const on = active.includes(id);
              return (
                <div
                  key={id}
                  className={`absolute flex flex-col justify-center gap-[0.4cqw] rounded-lg border px-2.5 transition-all duration-300 ${on ? "border-mint/70 bg-teal/15 shadow-[0_0_24px_-6px_#43E3B0]" : "border-line-strong bg-ink/70"}`}
                  style={{ left: pct(n.x, W), top: pct(n.y, H), width: pct(NW, W), height: pct(NH, H) }}
                >
                  <span className="font-display text-[2.05cqw] font-medium leading-tight text-text">{labels[id].title}</span>
                  <span className="mono truncate text-[1.6cqw] leading-tight text-dim">{labels[id].sub}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="label mb-2">últimas ejecuciones</div>
        <ul className="mono space-y-1.5 text-[11.5px]">
          {runs.map((r) => (
            <li key={r.key} className="run-row grid grid-cols-[6px_64px_1fr_48px] items-center gap-3 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              <span className="tabular-nums text-dim">{r.time}</span>
              <span className="truncate text-text">{r.name}</span>
              <span className="text-right tabular-nums">{r.dur}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
