"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { botFlows, type BotFlow } from "@/content/botFlows";
import Reveal from "../Reveal";
import Title from "../ui/Title";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { scrollToHash, useLenis } from "../SmoothScroll";

type Msg = { id: number; from: "bot" | "user"; text: string };

const clean = (s: string) => s.replace(/^[^\p{L}\p{N}↩]+/u, "").trim();

function initial(flow: BotFlow): Msg[] {
  return flow.nodes.start.bot.map((text, i) => ({ id: i, from: "bot", text }));
}

export default function BotDemo() {
  const b = site.bot;
  const lenis = useLenis();
  const [flowIdx, setFlowIdx] = useState(0);
  const flow = botFlows[flowIdx];
  const [msgs, setMsgs] = useState<Msg[]>(() => initial(botFlows[0]));
  const [node, setNode] = useState("start");
  const [typing, setTyping] = useState(false);
  const timers = useRef<number[]>([]);
  const nextId = useRef(100);
  const scroller = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [msgs, typing]);

  const playNode = (f: BotFlow, id: string, pick: string) => {
    const n = f.nodes[id];
    const reduced = prefersReducedMotion();
    setNode("");
    let delay = 0;
    n.bot.forEach((raw) => {
      const text = raw.replaceAll("{pick}", pick);
      const typeFor = reduced ? 0 : Math.min(1100, 350 + text.length * 12);
      timers.current.push(window.setTimeout(() => setTyping(true), delay));
      delay += typeFor;
      timers.current.push(
        window.setTimeout(() => {
          setTyping(false);
          setMsgs((m) => [...m, { id: nextId.current++, from: "bot", text }]);
        }, delay),
      );
      delay += reduced ? 0 : 250;
    });
    timers.current.push(window.setTimeout(() => setNode(id), delay));
  };

  const choose = (label: string, next: string) => {
    clearTimers();
    setMsgs((m) => [...m, { id: nextId.current++, from: "user", text: label }]);
    playNode(flow, next, clean(label));
  };

  const switchFlow = (i: number) => {
    clearTimers();
    setFlowIdx(i);
    setMsgs([]);
    setTyping(false);
    playNode(botFlows[i], "start", "");
  };

  const restart = () => switchFlow(flowIdx);
  const options = node ? flow.nodes[node].options : [];

  return (
    <Reveal as="section" id="bot-demo" stream="left" className="wrap py-24">
      <div className="grid items-start gap-14 min-[1000px]:grid-cols-[1fr_1fr]">
        <div data-reveal>
          <span className="pill">
            <span className="live-dot" />
            {b.eyebrow}
          </span>
          <Title parts={b.title} className="mt-5 text-[clamp(32px,4vw,50px)]" />
          <p className="mt-5 max-w-[34em] leading-relaxed text-muted">{b.lede}</p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Elegí tu rubro">
            {botFlows.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={i === flowIdx}
                onClick={() => switchFlow(i)}
                className={`rounded-full border px-4 py-2 text-[14px] transition-all ${i === flowIdx ? "border-mint bg-mint/10 text-mint shadow-[0_0_24px_-8px_#43E3B0]" : "border-line-strong text-muted hover:text-text"}`}
              >
                {f.emoji} {f.tab}
              </button>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {b.features.map((it) => (
              <li key={it} className="flex gap-3 text-[15px]">
                <span className="mono text-mint">✓</span>
                {it}
              </li>
            ))}
          </ul>
          <a
            href={b.cta.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(lenis, b.cta.href);
            }}
            className="btn btn-primary mt-9"
          >
            {b.cta.label}
          </a>
        </div>

        <div data-reveal className="mx-auto w-full max-w-[440px]">
          <div className="overflow-hidden rounded-[26px] border border-line-strong bg-panel/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-line bg-teal/20 px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-lg">{flow.emoji}</span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium">Flowi Bot · {flow.name}</p>
                <p className="mono flex items-center gap-1.5 text-[10px] text-mint">
                  <span className="live-dot" /> en línea
                </p>
              </div>
            </div>
            <div ref={scroller} data-lenis-prevent className="chat-bg flex h-[400px] flex-col gap-2.5 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m) => (
                <div
                  key={m.id}
                  className={`bubble-in max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${m.from === "bot" ? "self-start rounded-bl-md bg-white/[.07]" : "self-end rounded-br-md border border-mint/25 bg-teal/35"}`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <span className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white/[.07] px-3 py-3" aria-label="escribiendo">
                  {[0, 1, 2].map((i) => (
                    <i key={i} className="typing-dot" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              )}
              {options.length > 0 && (
                <div className="bubble-in mt-1 flex flex-col items-start gap-2">
                  {options.map(([label, next]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => choose(label, next)}
                      className="rounded-full border border-mint/40 bg-ink/40 px-3.5 py-1.5 text-left text-[13px] text-mint transition-colors hover:bg-mint hover:text-ink"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
              <span className="mono text-[10px] text-dim">{b.disclaimer}</span>
              <button type="button" onClick={restart} className="mono text-[11px] text-muted underline underline-offset-4 hover:text-text">
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
