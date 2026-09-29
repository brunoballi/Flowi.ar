"use client";
import { useEffect, useRef, useState } from "react";
import { site, wa } from "@/content/site";
import Reveal from "../Reveal";
import SectionHead from "../ui/SectionHead";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type Ball = { n: number; x: number; y: number; vx: number; vy: number; c: string };
type Prize = (typeof site.bolillero.prizes)[number];

const COLORS = ["#43E3B0", "#4FB3FF", "#E8B04A", "#B79CF2", "#F08A7E", "#E4F1EC"];
const R = 150; // radio del tambor (px de canvas lógico)
const BR = 17; // radio de cada bolilla

function initBalls(): Ball[] {
  // Posiciones fijas en espiral: nada aleatorio en render.
  return Array.from({ length: 12 }, (_, i) => {
    const a = i * 2.4;
    const r = 30 + (i % 4) * 26;
    return { n: i + 1, x: Math.cos(a) * r, y: Math.sin(a) * r + 30, vx: 0, vy: 0, c: COLORS[i % COLORS.length] };
  });
}

export default function Bolillero() {
  const b = site.bolillero;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls = useRef<Ball[]>(initBalls());
  const stir = useRef(0); // energía de mezcla (hover y giro)
  const spin = useRef(0); // giro tangencial
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle");
  const [result, setResult] = useState<{ n: number; c: string; prize: Prize } | null>(null);

  // Física simple en canvas: gravedad, rebote contra el tambor y entre bolillas.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const S = 340;
    cv.width = S * dpr;
    cv.height = S * dpr;
    ctx.scale(dpr, dpr);
    const reduced = prefersReducedMotion();
    let raf = 0;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;

    const step = () => {
      const bs = balls.current;
      if (!reduced) {
        for (const p of bs) {
          p.vy += 0.25;
          if (stir.current > 0) {
            p.vx += rnd() * stir.current;
            p.vy += rnd() * stir.current - stir.current * 0.25;
          }
          if (spin.current > 0) {
            const d = Math.hypot(p.x, p.y) || 1;
            p.vx += (-p.y / d) * spin.current;
            p.vy += (p.x / d) * spin.current;
          }
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.x += p.vx;
          p.y += p.vy;
          const d = Math.hypot(p.x, p.y);
          const lim = R - BR - 4;
          if (d > lim) {
            const nx = p.x / d;
            const ny = p.y / d;
            p.x = nx * lim;
            p.y = ny * lim;
            const dot = p.vx * nx + p.vy * ny;
            p.vx -= 1.7 * dot * nx;
            p.vy -= 1.7 * dot * ny;
          }
        }
        for (let i = 0; i < bs.length; i++) {
          for (let j = i + 1; j < bs.length; j++) {
            const a = bs[i];
            const c = bs[j];
            const dx = c.x - a.x;
            const dy = c.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.01;
            if (dist < BR * 2) {
              const push = (BR * 2 - dist) / 2;
              const nx = dx / dist;
              const ny = dy / dist;
              a.x -= nx * push;
              a.y -= ny * push;
              c.x += nx * push;
              c.y += ny * push;
              const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
              if (rv < 0) {
                a.vx += rv * nx * 0.9;
                a.vy += rv * ny * 0.9;
                c.vx -= rv * nx * 0.9;
                c.vy -= rv * ny * 0.9;
              }
            }
          }
        }
        stir.current *= 0.96;
        spin.current *= 0.97;
      }

      // Dibujo
      ctx.clearRect(0, 0, S, S);
      ctx.save();
      ctx.translate(S / 2, S / 2);
      const g = ctx.createRadialGradient(0, -40, 10, 0, 0, R);
      g.addColorStop(0, "rgba(67,227,176,.10)");
      g.addColorStop(1, "rgba(5,13,11,.85)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(67,227,176,.45)";
      ctx.stroke();
      // rayos del tambor
      ctx.strokeStyle = "rgba(120,200,170,.10)";
      ctx.lineWidth = 1;
      for (let k = 0; k < 8; k++) {
        const a = k * (Math.PI / 4) + (reduced ? 0 : performance.now() / 1000) * spin.current * 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R);
        ctx.stroke();
      }
      for (const p of balls.current) {
        const bg = ctx.createRadialGradient(p.x - 5, p.y - 6, 2, p.x, p.y, BR);
        bg.addColorStop(0, "#ffffff");
        bg.addColorStop(0.35, p.c);
        bg.addColorStop(1, "#0b1714");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, BR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#050D0B";
        ctx.font = "700 10px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(p.n), p.x, p.y + 0.5);
      }
      // brillo del vidrio
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, R - 10, Math.PI * 1.1, Math.PI * 1.45);
      ctx.stroke();
      ctx.restore();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const spinNow = () => {
    if (phase === "spinning") return;
    const reduced = prefersReducedMotion();
    const bs = balls.current;
    const pick = bs[Math.floor(Math.random() * bs.length)];
    const prize = b.prizes[pick.n % b.prizes.length];
    const finish = () => {
      balls.current = balls.current.filter((x) => x !== pick);
      setResult({ n: pick.n, c: pick.c, prize });
      setPhase("done");
    };
    setPhase("spinning");
    setResult(null);
    if (reduced) return finish();
    stir.current = 3.2;
    spin.current = 1.1;
    window.setTimeout(finish, 2200);
  };

  const reset = () => {
    balls.current = initBalls();
    setResult(null);
    setPhase("idle");
  };

  return (
    <Reveal as="section" stream="left" className="wrap py-24">
      <SectionHead eyebrow={b.eyebrow} title={b.title} lede={b.lede} />
      <div data-reveal className="panel grid items-center gap-10 p-6 md:grid-cols-[360px_1fr] md:p-10">
        <div className="flex flex-col items-center">
          <canvas
            ref={canvasRef}
            onMouseMove={() => {
              if (phase !== "spinning") stir.current = Math.min(2.2, stir.current + 0.25);
            }}
            className="aspect-square w-[340px] max-w-full cursor-grab"
            aria-label="Bolillero con 12 bolillas numeradas"
            role="img"
          />
          {/* bandeja */}
          <div className="relative -mt-2 grid h-14 w-40 place-items-center rounded-b-3xl border border-t-0 border-line-strong bg-ink/60">
            {result ? (
              <span className="bubble-in grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-semibold text-ink shadow-[0_0_24px_-4px_currentColor]" style={{ background: result.c, color: "#050D0B" }}>
                {result.n}
              </span>
            ) : (
              <span className="mono text-[11px] text-dim">{phase === "spinning" ? "girando…" : "tu bolilla"}</span>
            )}
          </div>
        </div>

        <div className="min-h-[220px]">
          {result ? (
            <div className="bubble-in">
              <span className="label">salió la bolilla {result.n}</span>
              <h3 className="mt-3 font-display text-[clamp(26px,3vw,36px)] font-semibold leading-tight tracking-tight">{result.prize.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{result.prize.text}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a href={wa(`Hola Flowi, giré el bolillero y me salió: ${result.prize.title}`)} target="_blank" rel="noreferrer" className="btn btn-primary">
                  {b.claim}
                </a>
                <button type="button" onClick={reset} className="mono text-[12px] text-muted underline underline-offset-4 hover:text-text">
                  {b.again}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span className="label">3 premios posibles</span>
              <ul className="mt-4 space-y-3">
                {b.prizes.map((p) => (
                  <li key={p.title} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-mint shadow-[0_0_10px_#43E3B0]" />
                    <span>
                      <span className="text-text">{p.title}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={spinNow} disabled={phase === "spinning"} className="btn btn-primary mt-8 min-w-40 disabled:opacity-60">
                {phase === "spinning" ? "Girando…" : b.button}
              </button>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
