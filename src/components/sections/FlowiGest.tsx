"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Reveal from "../Reveal";
import Title from "../ui/Title";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { useHydrated, useMediaQuery } from "@/lib/useMediaQuery";
import { trackDemo } from "@/lib/track";
import { scrollToHash, useLenis } from "../SmoothScroll";

/**
 * Video de la demo (cliente, barbero y admin). En escritorio va horizontal y a todo el ancho de la
 * sección; en celular se usa la versión vertical, porque la horizontal quedaba de ~358 px y no se leía.
 * Las proporciones del recuadro (9/16 y 16/9) tienen que coincidir con las de los archivos (site.ts).
 */
function DemoVideo() {
  const v = site.flowigest.video;
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced] = useState(() => typeof window !== "undefined" && prefersReducedMotion());
  const hydrated = useHydrated();
  const mobile = useMediaQuery("(max-width: 767px)");
  const cfg = mobile ? v.mobile : v;

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
  }, [reduced, hydrated, mobile]);

  return (
    <div ref={wrap} className="relative">
      {/* halo bajo los equipos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] bottom-[4%] h-[30%] rounded-[50%] bg-mint/20 blur-3xl" />
      <div className="relative mx-auto aspect-[9/16] max-w-[440px] rounded-2xl border border-line-strong bg-panel/50 md:aspect-video md:max-w-none">
        {/* El video se pide recién al saber qué dispositivo es, para no bajar el horizontal en un celular. */}
        {hydrated && (
          <video
            key={mobile ? "mobile" : "desktop"}
            ref={vid}
            className="h-full w-full rounded-2xl object-contain"
            poster={cfg.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={v.label}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={cfg.webm} type="video/webm" />
            <source src={cfg.src} type="video/mp4" />
          </video>
        )}
        <button
          type="button"
          onClick={() => {
            const el = vid.current;
            if (!el) return;
            if (el.paused) el.play().catch(() => {});
            else el.pause();
          }}
          className="mono absolute bottom-[3%] left-[4%] flex items-center gap-2 rounded-full border border-line-strong bg-ink/70 px-3 py-2 text-[12px] text-muted backdrop-blur transition-colors hover:border-mint hover:text-text"
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
          <div className="mt-6 max-w-[36em] rounded-2xl border border-mint/30 bg-mint/5 p-4">
            <span className="label">{f.promo.pill}</span>
            <p className="mt-2 text-[15px] leading-relaxed">{f.promo.text}</p>
          </div>
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
            <a href={f.primary.href} onClick={() => trackDemo("seccion")} target="_blank" rel="noreferrer" className="btn btn-primary">
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
        <p className="mono mt-4 text-center text-[12px] text-muted">{f.caption}</p>
      </div>
    </Reveal>
  );
}
