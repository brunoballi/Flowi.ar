"use client";
import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "./useInView";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

const fmt = new Intl.NumberFormat("es-AR");

export default function Counter({ value, suffix = "", duration = 1.6, className }: { value: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInViewOnce(ref);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setV(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / (duration * 1000));
      setV(Math.round((1 - Math.pow(1 - k, 3)) * value));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {fmt.format(v)}
      {suffix}
    </span>
  );
}
