"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { site } from "@/content/site";
import ReportCard from "../ui/ReportCard";
import Title from "../ui/Title";
import { scrollToHash, useLenis } from "../SmoothScroll";
import { loaderState } from "../Loader";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const h = site.hero;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const outer = root.current!.querySelector("[data-tilt-scroll]")!;
        const inner = root.current!.querySelector<HTMLElement>("[data-tilt-mouse]")!;
        gsap.fromTo(
          outer,
          { rotateX: 10, rotateY: -14 },
          { rotateX: 0, rotateY: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 30%", scrub: 1 } },
        );
        const stage = root.current!.querySelector<HTMLElement>("[data-stage]")!;
        const move = (e: MouseEvent) => {
          const r = stage.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(inner, { rotateY: x * 12, rotateX: -y * 10, duration: 0.8, ease: "power3.out" });
        };
        const leave = () => gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 1, ease: "power3.out" });
        stage.addEventListener("mousemove", move);
        stage.addEventListener("mouseleave", leave);
        return () => {
          stage.removeEventListener("mousemove", move);
          stage.removeEventListener("mouseleave", leave);
        };
      });
      gsap.from("[data-hero-in]", { opacity: 0, y: 24, filter: "blur(10px)", duration: 1.2, ease: "expo.out", stagger: 0.08, delay: loaderState.playing ? 1.9 : 0.2, clearProps: "filter" });
    },
    { scope: root },
  );

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(lenis, href);
  };

  return (
    <header ref={root} id="top" data-stream="hero" className="wrap grid items-center gap-12 pb-24 pt-16 md:pt-20 min-[900px]:grid-cols-[1fr_1.12fr]">
      <div className="min-w-0">
        <span data-hero-in className="pill !whitespace-normal">
          <span className="live-dot" />
          {h.pill}
        </span>
        <div data-hero-in>
          <Title as="h1" parts={h.title} className="mt-6 text-[clamp(40px,5.6vw,72px)]" />
        </div>
        <p data-hero-in className="mt-6 max-w-[34em] text-[17px] leading-relaxed text-muted">
          {h.lede}
        </p>
        <div data-hero-in className="mt-8 flex flex-wrap gap-3">
          <a href={h.primary.href} onClick={(e) => go(e, h.primary.href)} className="btn btn-primary">
            {h.primary.label}
          </a>
          <a href={h.secondary.href} onClick={(e) => go(e, h.secondary.href)} className="btn btn-ghost">
            <span className="text-mint">▶</span> {h.secondary.label}
          </a>
        </div>
        <dl data-hero-in className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
          {h.stats.map((st) => (
            <div key={st.label}>
              <dt className="sr-only">{st.label}</dt>
              <dd className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-none tracking-tight text-text">{st.value}</dd>
              <dd className="mono mt-2 text-[11px] leading-snug text-muted">{st.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div data-stage data-hero-in className="[perspective:1200px]">
        <div data-tilt-scroll className="[transform-style:preserve-3d]">
          <div data-tilt-mouse className="[transform-style:preserve-3d]">
            <ReportCard />
          </div>
        </div>
      </div>
    </header>
  );
}
