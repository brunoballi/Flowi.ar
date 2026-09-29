import Title from "./Title";

export default function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: string[]; lede: string }) {
  return (
    <div data-reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
      <div className="max-w-2xl">
        <span className="pill">
          <span className="live-dot" />
          {eyebrow}
        </span>
        <Title parts={title} className="mt-5 text-[clamp(32px,4.2vw,52px)]" />
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-muted">{lede}</p>
    </div>
  );
}
