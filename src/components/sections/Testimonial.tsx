import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "../Reveal";

/** Testimonio de un cliente real, debajo de los tres pasos de la promo. */
export default function Testimonial() {
  const t = site.promo.testimonial;
  return (
    <Reveal as="section" className="wrap pb-6">
      <figure data-reveal className="panel flex flex-col items-center gap-8 p-8 md:flex-row md:gap-12 md:p-12">
        <Image src={t.logo} alt={t.logoAlt} width={417} height={352} className="h-auto w-[150px] shrink-0 md:w-[190px]" />
        <div>
          <span className="label">{t.label}</span>
          <blockquote className="h-display mt-4 text-[clamp(24px,3.2vw,38px)] leading-[1.15]">“{t.quote}”</blockquote>
          <figcaption className="mono mt-5 text-[13px] text-muted">
            <span className="text-text">{t.author}</span> · {t.role}
          </figcaption>
        </div>
      </figure>
    </Reveal>
  );
}
