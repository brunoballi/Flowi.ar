/** Título con una palabra acentuada en serif italic: [antes, acento, después] */
export default function Title({ parts, as: Tag = "h2", className = "" }: { parts: string[]; as?: "h1" | "h2"; className?: string }) {
  const [a, b, c] = parts;
  return (
    <Tag className={`h-display ${className}`}>
      {a}
      {a && !a.endsWith(" ") ? " " : ""}
      <span className="accent">{b}</span>
      {c}
    </Tag>
  );
}
