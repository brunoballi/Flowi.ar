"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { BRAND_ICONS } from "@/content/brandIcons";
import Reveal from "../Reveal";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

function GenericIcon({ name }: { name: string }) {
  if (name === "web") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <path d="M15 15h2.5M15 18.5h6M20 15v2M21 20h-6" strokeLinecap="round" />
    </svg>
  );
}

function Chip({ item, i }: { item: (typeof site.integrations.items)[number]; i: number }) {
  const brand = item.kind === "brand" ? BRAND_ICONS[item.key] : null;
  return (
    <div className="flex flex-none flex-col items-center gap-2 px-5">
      <span
        data-chip
        className="brand-chip grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-ink text-muted"
        style={{ animationDelay: `${i * 0.35}s` }}
      >
        {brand ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={brand.hex} aria-hidden="true">
            <path d={brand.path} />
          </svg>
        ) : (
          <GenericIcon name={item.key} />
        )}
      </span>
      <span className="mono whitespace-nowrap text-[11px] text-dim">{item.name}</span>
    </div>
  );
}

export default function Integrations() {
  const it = site.integrations;
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <Reveal stream="hero">
      <div data-reveal className="wrap pb-20">
        <p className="label mb-5">{it.label}</p>
      </div>
      <div className="marquee-fade -mx-[calc(50vw-50%)] overflow-hidden">
        {reduced ? (
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 px-6">
            {it.items.map((item, i) => (
              <Chip key={item.key} item={item} i={i} />
            ))}
          </div>
        ) : (
          <div className="marquee-track flex w-max py-1">
            {[...it.items, ...it.items].map((item, i) => (
              <Chip key={`${item.key}-${i}`} item={item} i={i % it.items.length} />
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
