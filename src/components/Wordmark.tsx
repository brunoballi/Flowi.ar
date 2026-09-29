import { site } from "@/content/site";

/**
 * "Flowi estudio" sin el isotipo al lado: el segundo término lleva el mismo
 * tratamiento en itálica mint que usan las palabras destacadas del resto del
 * sitio (ver .accent en globals.css), para que la marca pese más sin volver
 * a sumar un ícono.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  const [first, ...rest] = site.wordmark.split(" ");
  return (
    <span className={`font-display font-semibold ${className}`}>
      {first} <span className="accent">{rest.join(" ")}</span>
    </span>
  );
}
