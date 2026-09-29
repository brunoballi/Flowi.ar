type Props = { size?: number; className?: string; id?: string };

export function WaveGlyph({ className, stroke = "#43E3B0", width = 2.4 }: { className?: string; stroke?: string; width?: number }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M8 13.5c2.7-3.4 5.3-3.4 8 0s5.3 3.4 8 0" stroke={stroke} strokeWidth={width} strokeLinecap="round" />
      <path d="M8 19.5c2.7-3.4 5.3-3.4 8 0s5.3 3.4 8 0" stroke={stroke} strokeWidth={width} strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export default function Logo({ size = 30, className, id }: Props) {
  return (
    <svg id={id} width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#050D0B" stroke="#43E3B0" strokeWidth="1.5" />
      <path d="M8 13.5c2.7-3.4 5.3-3.4 8 0s5.3 3.4 8 0" stroke="#43E3B0" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8 19.5c2.7-3.4 5.3-3.4 8 0s5.3 3.4 8 0" stroke="#43E3B0" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}
