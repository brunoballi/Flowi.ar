import { site } from "@/content/site";
import Wordmark from "../Wordmark";

export default function Footer() {
  const f = site.footer;
  return (
    <footer data-stream="fan" className="wrap relative z-[1] pb-12">
      <div className="mono flex flex-wrap justify-between gap-4 border-y border-line py-4 text-[11px] text-muted">
        {f.status.map((s) => (
          <span key={s} className="flex items-center gap-2">
            <span className="live-dot" /> {s}
          </span>
        ))}
      </div>
      <div className="grid gap-10 py-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          <Wordmark className="text-2xl tracking-tight" />
          <p className="mt-3 max-w-xs text-[14px] text-muted">{f.tagline}</p>
          <p className="mono mt-3 text-[11px] text-dim">{site.city}</p>
        </div>
        {f.cols.map((c) => (
          <div key={c.title}>
            <p className="label mb-3">{c.title}</p>
            <ul className="space-y-2 text-[14px] text-muted">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-text">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mono flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-[11px] text-dim">
        <span>{f.copy}</span>
        <a href={site.instagram.url} target="_blank" rel="noreferrer" className="hover:text-text">
          ig {site.instagram.handle}
        </a>
      </div>
    </footer>
  );
}
