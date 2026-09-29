"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

const KEY = "flowi-loader-seen";
/** Otras animaciones de entrada leen esto para esperar al loader. */
export const loaderState = { playing: false };
const C = 2 * Math.PI * 54;

/** Anillo que cuenta 0→100% y se pliega (FLIP) hasta el logo del nav. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      let seen = false;
      try {
        seen = sessionStorage.getItem(KEY) === "1";
      } catch {}
      if (seen || prefersReducedMotion()) {
        setGone(true);
        return;
      }
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      loaderState.playing = true;

      const ring = el.querySelector<HTMLDivElement>("[data-ring]")!;
      const arc = el.querySelector<SVGCircleElement>("[data-arc]")!;
      const num = el.querySelector<HTMLSpanElement>("[data-num]")!;
      const logo = document.getElementById("nav-logo");
      document.documentElement.style.overflow = "hidden";
      if (logo) gsap.set(logo, { opacity: 0 });

      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          loaderState.playing = false;
          setGone(true);
        },
      });
      tl.to(counter, {
        v: 100,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          num.textContent = `${Math.round(counter.v)}%`;
          arc.style.strokeDashoffset = String(C * (1 - counter.v / 100));
        },
      })
        .to(num, { opacity: 0, duration: 0.2 })
        .add(() => {
          if (!logo) return;
          const a = ring.getBoundingClientRect();
          const b = logo.getBoundingClientRect();
          gsap.to(ring, {
            x: b.left + b.width / 2 - (a.left + a.width / 2),
            y: b.top + b.height / 2 - (a.top + a.height / 2),
            scale: b.width / a.width,
            duration: 0.8,
            ease: "expo.inOut",
          });
        })
        .to(el, { backgroundColor: "rgba(5,13,11,0)", duration: 0.7, ease: "power2.inOut" }, "<")
        .to(logo ?? {}, { opacity: 1, duration: 0.25 }, "-=0.1")
        .to(ring, { opacity: 0, duration: 0.2 }, "<");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} id="loader" className="fixed inset-0 z-[100] grid place-items-center bg-ink" aria-hidden="true">
      <noscript>
        <style>{`#loader{display:none}`}</style>
      </noscript>
      <div data-ring className="relative h-[120px] w-[120px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="3" />
          <circle data-arc cx="60" cy="60" r="54" fill="none" stroke="#43E3B0" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
        </svg>
        <span data-num className="mono absolute inset-0 grid place-items-center text-lg text-mint tabular-nums">
          0%
        </span>
      </div>
    </div>
  );
}
