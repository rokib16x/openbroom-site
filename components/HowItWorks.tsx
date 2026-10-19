"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Hot = { left: number; top: number; w: number; h: number; round?: boolean };
type Step = { title: string; text: string; img: string; alt: string; hot: Hot };
const DUR = 6000;

// Three steps that play on their own and jump when clicked. A ring points at the part of the app each step is about.
export default function HowItWorks({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), DUR);
    return () => clearTimeout(t);
  }, [active, auto, visible, steps.length]);

  const pick = (i: number) => { setActive(i); setAuto(false); };
  const h = steps[active].hot;

  return (
    <div className="how" ref={root}>
      <div className="how-steps" role="tablist" aria-label="How it works">
        {steps.map((s, i) => (
          <button key={s.title} type="button" role="tab" aria-selected={i === active} className="how-step" onClick={() => pick(i)}>
            <span className="how-n">{i + 1}</span>
            <b>{s.title}</b>
            <span className="d">{s.text}</span>
            <span className="bar" aria-hidden="true">
              <i key={`${active}-${auto}`} style={auto ? { animationDuration: `${DUR}ms`, animationPlayState: visible ? "running" : "paused" } : { animation: "none", width: "100%" }} />
            </span>
          </button>
        ))}
      </div>
      <div className="how-stage" role="tabpanel">
        {steps.map((s, i) => (
          <Image key={s.img} className={i === active ? "on" : undefined} src={s.img} alt={s.alt} width={2400} height={1550} unoptimized loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <span
          className="ring-hot"
          aria-hidden="true"
          style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${h.w}%`, height: `${h.h}%`, borderRadius: h.round ? "50%" : undefined }}
        />
      </div>
    </div>
  );
}
