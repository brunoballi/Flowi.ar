"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Reveal from "../Reveal";
import Title from "../ui/Title";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { scrollToHash, useLenis } from "../SmoothScroll";

/** Video de la demo (cliente, barbero y admin). Va a todo el ancho de la sección para que se lea. */
function DemoVideo() {
  const v = site.flowigest.video;
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced] = useState(() => typeof window !== "undefined" && prefersReducedMotion());

  // Reproduce solo mientras se ve en pantalla (ahorra batería y datos).
  useEffect(() => {
    const el = vid.current;
    const box = wrap.current;
    if (!el || !box || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={wrap} className="relative">
      {/* halo bajo los equipos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] bottom-[4%] h-[30%] rounded-[50%] bg-mint/20 blur-3xl" />
      <div className="relative" style={{ aspectRatio: `${v.width}/${v.height}` }}>
        <video
          ref={vid}
          className="h-full w-full rounded-2xl border border-line-strong object-contain"
          poster={v.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={v.label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={v.webm} type="video/webm" />
          <source src={v.src} type="video/mp4" />
        </video>
        <button
          type="button"
          onClick={() => {
            const el = vid.current;
            if (!el) return;
            if (el.paused) el.play().catch(() => {});
            else el.pause();
          }}
          className="mono absolute bottom-[3%] left-[4%] flex items-center gap-2 rounded-full border border-line-strong bg-ink/70 px-3 py-1.5 text-[11px] text-muted backdrop-blur transition-colors hover:border-mint hover:text-text"
          aria-label={playing ? "Pausar video" : "Reproducir video"}
        >
          <span className="text-mint">{playing ? "❚❚" : "▶"}</span> {playing ? "pausar" : "ver la demo"}
        </button>
      </div>
    </div>
  );
}

export default function FlowiGest() {
  const f = site.flowigest;
  const lenis = useLenis();
  return (
    <Reveal as="section" id="flowigest" stream="right" className="wrap py-24">
      <div className="grid items-start gap-10 min-[1000px]:grid-cols-[1.05fr_0.95fr] min-[1000px]:gap-16">
        <div data-reveal>
          <span className="pill">
            <span className="live-dot" />
            {f.eyebrow}
          </span>
          <Title parts={f.title} className="mt-5 text-[clamp(32px,4vw,50px)]" />
          <p className="mt-5 max-w-[36em] leading-relaxed text-muted">{f.lede}</p>
        </div>
        <div data-reveal>
          <ul className="space-y-3">
            {f.features.map((it) => (
              <li key={it} className="flex gap-3 text-[15px]">
                <span className="mono text-mint">✓</span>
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={f.primary.href} target="_blank" rel="noreferrer" className="btn btn-primary">
              {f.primary.label}
            </a>
            <a
              href={f.secondary.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(lenis, f.secondary.href);
              }}
              className="btn btn-ghost"
            >
              {f.secondary.label}
            </a>
          </div>
        </div>
      </div>
      <div data-reveal className="mt-14">
        <DemoVideo />
        <p className="mono mt-4 text-center text-[11px] text-dim">{f.caption}</p>
      </div>
    </Reveal>
  );
}
