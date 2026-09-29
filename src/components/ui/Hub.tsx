import Logo from "../Logo";

export default function Hub({ nodes }: { nodes: string[] }) {
  const pos = [
    [70, 60],
    [330, 60],
    [70, 200],
    [330, 200],
  ];
  const c = [200, 130];
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full" aria-hidden="true">
      {pos.map(([x, y], i) => {
        const d = `M${x} ${y} C${(x + c[0]) / 2} ${y} ${(x + c[0]) / 2} ${c[1]} ${c[0]} ${c[1]}`;
        return (
          <g key={i}>
            <path id={`hub-${i}`} d={d} fill="none" stroke="rgba(120,200,170,.25)" strokeWidth="1.2" strokeDasharray="3 4" />
            <circle r="3" fill="#43E3B0">
              <animateMotion dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                <mpath href={`#hub-${i}`} />
              </animateMotion>
            </circle>
            <g transform={`translate(${x - 22} ${y - 22})`}>
              <rect width="44" height="44" rx="12" fill="#050D0B" stroke="rgba(120,200,170,.3)" />
              <text x="22" y="26" textAnchor="middle" className="mono text-[12px]" fill="#8AA59C">
                {nodes[i]}
              </text>
            </g>
          </g>
        );
      })}
      <foreignObject x={c[0] - 34} y={c[1] - 34} width="68" height="68">
        <div className="grid h-full w-full place-items-center rounded-[18px] bg-mint shadow-[0_0_40px_-6px_#43E3B0]">
          <Logo size={34} />
        </div>
      </foreignObject>
    </svg>
  );
}
