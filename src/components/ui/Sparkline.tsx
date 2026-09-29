export default function Sparkline({ points, id }: { points: number[]; id: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const xy = points.map((v, i) => [2 + (i / (points.length - 1)) * 196, 44 - ((v - min) / (max - min || 1)) * 36]);
  const d = xy.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = xy[xy.length - 1];
  return (
    <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`sp-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#43E3B0" stopOpacity=".35" />
          <stop offset="1" stopColor="#43E3B0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="46" x2="200" y2="46" stroke="rgba(255,255,255,.08)" />
      <path d={`${d} L198 50 L2 50 Z`} fill={`url(#sp-${id})`} />
      <path d={d} fill="none" stroke="#43E3B0" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0]} cy={last[1]} r="2.6" fill="#43E3B0" />
    </svg>
  );
}
