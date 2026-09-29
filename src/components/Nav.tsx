"use client";
import { site } from "@/content/site";
import Wordmark from "./Wordmark";
import { scrollToHash, useLenis } from "./SmoothScroll";

export default function Nav() {
  const lenis = useLenis();
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(lenis, href);
  };
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-gradient-to-b from-ink/85 to-ink/40 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center gap-6">
        <a href="#top" onClick={(e) => go(e, "#top")} aria-label={`${site.wordmark}, inicio`}>
          <Wordmark className="text-xl tracking-tight" />
        </a>
        <div className="ml-auto hidden items-center gap-6 text-sm text-muted md:flex">
          {site.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </div>
        <span className="pill hidden lg:inline-flex">
          <span className="live-dot" />
          {site.nav.status}
        </span>
        <a href={site.nav.cta.href} onClick={(e) => go(e, site.nav.cta.href)} className="btn btn-primary ml-auto md:ml-0">
          {site.nav.cta.label}
        </a>
      </div>
    </nav>
  );
}
