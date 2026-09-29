"use client";
import { useState } from "react";
import { site, wa } from "@/content/site";
import Reveal from "../Reveal";
import Wordmark from "../Wordmark";
import { WaveGlyph } from "../Logo";
import Title from "../ui/Title";

type Form = { name: string; whatsapp: string; business: string; process: string; privacy: boolean };
const empty: Form = { name: "", whatsapp: "", business: "", process: "", privacy: false };

const input =
  "w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder:text-ink/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink";

export default function Contact() {
  const c = site.contact;
  const f = c.fields;
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((s) => ({ ...s, [k]: v }));

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = `Hola Flowi, soy ${form.name} (${form.business}). Quiero automatizar: ${form.process}`;
    // Se abre acá adentro del submit, sin ningún await antes: si lo demoramos
    // (por ejemplo esperando la respuesta de /api/lead), el navegador bloquea
    // el popup por no venir ya directo del gesto del usuario.
    window.open(wa(text), "_blank");
    setSent(true);
    const payload = form;
    setForm(empty);
    // Best-effort en segundo plano, para cuando haya un LEAD_WEBHOOK_URL real
    // configurado. La consulta ya se mandó por WhatsApp pase lo que pase acá.
    fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
  }

  return (
    <Reveal as="section" id="contacto" stream="fan" className="wrap py-24">
      <div className="grid gap-4 min-[900px]:grid-cols-[1fr_1.4fr]">
        <div data-reveal className="panel relative flex min-h-[320px] flex-col justify-between overflow-hidden p-7">
          <Wordmark className="text-2xl tracking-tight" />
          <WaveGlyph className="pointer-events-none absolute -right-10 top-6 h-64 w-64" stroke="rgba(255,255,255,.07)" width={3} />
          <div className="relative">
            <p className="max-w-[18em] text-lg leading-snug">{c.brandLine}</p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5">
              {c.info.map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline justify-between gap-2">
                  <dt className="label">{k}</dt>
                  <dd className="text-[14px] text-text">
                    {k === "instagram" ? (
                      <a href={site.instagram.url} target="_blank" rel="noreferrer" className="hover:text-mint">
                        {v}
                      </a>
                    ) : (
                      <span className="select-all">{v}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <a href={site.whatsapp.general} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6 w-full">
              <span className="text-mint">●</span> {c.waButton}
            </a>
          </div>
        </div>

        <div data-reveal className="on-mint rounded-[24px] bg-mint p-7 text-ink md:p-10">
          <span className="mono text-[12px] opacity-70">{c.eyebrow}</span>
          <Title parts={c.title} className="mt-2 text-[clamp(30px,3.6vw,44px)] text-ink" />
          <p className="mt-3 max-w-[34em] text-[15px] leading-relaxed text-ink/75">{c.text}</p>

          <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-[13px] font-medium">
              {f.name}
              <input id="lead-name" required value={form.name} onChange={(e) => set("name", e.target.value)} className={input} autoComplete="name" />
            </label>
            <label className="grid gap-1.5 text-[13px] font-medium">
              {f.whatsapp}
              <input id="lead-wa" required type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="341 555 5555" className={input} autoComplete="tel" />
            </label>
            <label className="grid gap-1.5 text-[13px] font-medium sm:col-span-2">
              {f.business}
              <select id="lead-business" required value={form.business} onChange={(e) => set("business", e.target.value)} className={`${input} appearance-none`}>
                <option value="" disabled>
                  {f.businessPlaceholder}
                </option>
                {f.businessOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-[13px] font-medium sm:col-span-2">
              {f.process}
              <textarea id="lead-process" required rows={3} value={form.process} onChange={(e) => set("process", e.target.value)} className={`${input} resize-y`} />
            </label>
            <label className="flex items-start gap-2.5 text-[13px] leading-snug text-ink/80 sm:col-span-2">
              <input id="lead-privacy" required type="checkbox" checked={form.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#050D0B]" />
              <span>
                {f.privacy.split("Política de Privacidad")[0]}
                <a href="/privacidad" className="underline underline-offset-2">
                  Política de Privacidad
                </a>
                {f.privacy.split("Política de Privacidad")[1]}
              </span>
            </label>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" className="btn btn-dark">
                {c.button}
              </button>
              <p className="mono text-[12px]" role="status">
                {sent && c.success}
              </p>
            </div>
          </form>
        </div>
      </div>
    </Reveal>
  );
}
