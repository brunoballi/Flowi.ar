"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import Logo from "../Logo";

/** La placa: se abre desde el logo, muestra la frase y se vuelve a plegar (scroll con pin). */
export default function Plate() {
  const root = useRef<HTMLElement>(null);
  const words = site.plate.words.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
          if (reduce) return;
          const q = gsap.utils.selector(root);
          const plate = q("[data-plate]")[0];
          const logo = q("[data-plate-logo]")[0];
          const ws = q("[data-word]");
          gsap.set(plate, { width: 64, height: 64, borderRadius: 18 });
          gsap.set(ws, { opacity: 0, y: 30, filter: "blur(8px)" });
          gsap.set(logo, { scale: 1, top: "50%" });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: desktop ? "+=250%" : "+=150%", pin: true, scrub: 1, anticipatePin: 1 },
          });
          tl.to(plate, { width: () => Math.min(window.innerWidth * 0.92, 1200), height: () => window.innerHeight * 0.78, borderRadius: 24, duration: 1, ease: "power2.inOut" })
            .to(logo, { scale: 1.4, top: "16%", duration: 0.8, ease: "power2.inOut" }, "<0.2")
            .to(ws, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.06, duration: 0.5, ease: "power2.out" }, "-=0.2")
            .to({}, { duration: 0.6 })
            .to(ws, { opacity: 0, y: -20, filter: "blur(8px)", stagger: 0.02, duration: 0.4 })
            .to(logo, { scale: 1, top: "50%", duration: 0.6, ease: "power2.inOut" }, "<0.1")
            .to(plate, { width: 64, height: 64, borderRadius: 18, duration: 1, ease: "power2.inOut" }, "<");
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} data-stream="center" aria-label="Lo que hacemos" className="relative z-[2] grid h-[100svh] place-items-center overflow-hidden">
      <div data-plate className="on-mint dot-grid relative grid h-[78svh] w-[min(92vw,1200px)] place-items-center overflow-hidden rounded-[24px] bg-mint shadow-[0_40px_140px_-30px_rgba(67,227,176,.5)]">
        <div data-plate-logo className="absolute left-1/2 top-[16%] -ml-7 -mt-7">
          <Logo size={56} />
        </div>
        <p className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto max-w-[900px] -translate-y-1/2 px-8 text-center font-display text-[clamp(26px,4.4vw,58px)] font-semibold leading-[1.1] tracking-tight text-ink">
          {words.map((w, i) => (
            <span key={i} data-word className="inline-block whitespace-pre">
              {w === site.plate.accent ? <span className="accent">{w}</span> : w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
