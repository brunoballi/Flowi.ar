"use client";
import { useRef } from "react";
import Counter from "./Counter";
import { useInViewOnce } from "./useInView";

export default function Ring({ value, size = 150 }: { value: number; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const r = 64;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="ring-g" x1="0" x2="1">
            <stop offset="0" stopColor="#1D9E75" />
            <stop offset="1" stopColor="#43E3B0" />
          </linearGradient>
        </defs>
        <circle cx="75" cy="75" r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="9" />
        <circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke="url(#ring-g)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={seen ? c * (1 - value / 100) : c}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-3xl font-semibold">
        <Counter value={value} suffix="%" />
      </span>
    </div>
  );
}
