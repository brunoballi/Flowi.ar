"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Envuelve bloques: cada hijo con [data-reveal] entra desde fuera de foco y "se asienta".
 * El estado inicial se aplica solo por JS, así el HTML sin JS se ve completo.
 */
export default function Reveal({ children, className, as: Tag = "div", id, stream }: { children: React.ReactNode; className?: string; as?: "div" | "section"; id?: string; stream?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const items = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
      const below = Array.from(items).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
      if (!below.length) return;
      gsap.set(below, { opacity: 0, filter: "blur(14px)", y: 28, scale: 0.985 });
      ScrollTrigger.batch(below, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, clearProps: "filter,transform" }),
      });
    },
    { scope: ref },
  );
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} id={id} data-stream={stream}>
      {children}
    </Tag>
  );
}
