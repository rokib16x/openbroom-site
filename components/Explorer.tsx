"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

type Tab = { title: string; text: string; img: string; alt: string; icon: ReactNode };
const DUR = 7000;

// Fixed-size stage: tabs on the left, one big sharp screenshot on the right. Plays through, click to take over.
export default function Explorer({ tabs }: { tabs: Tab[] }) {
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
    const t = setTimeout(() => setActive((a) => (a + 1) % tabs.length), DUR);
    return () => clearTimeout(t);
  }, [active, auto, visible, tabs.length]);

  const pick = (i: number) => { setActive(i); setAuto(false); };

  return (
    <div className="explorer" ref={root}>
      <div className="ex-tabs" role="tablist" aria-label="What OpenBroom finds">
        {tabs.map((t, i) => (
          <button key={t.title} type="button" role="tab" id={`ex-t${i}`} aria-selected={i === active} aria-controls="ex-stage" className="ex-tab" onClick={() => pick(i)}>
            <span className="ex-ic" aria-hidden="true">{t.icon}</span>
            <b>{t.title}</b>
            <span className="d">{t.text}</span>
            <span className="bar" aria-hidden="true">
              <i key={`${active}-${auto}`} style={auto ? { animationDuration: `${DUR}ms`, animationPlayState: visible ? "running" : "paused" } : { animation: "none", width: "100%" }} />
            </span>
          </button>
        ))}
      </div>
      <div className="ex-stage" id="ex-stage" role="tabpanel" aria-labelledby={`ex-t${active}`}>
        {tabs.map((t, i) => (
          <Image key={t.img} className={i === active ? "on" : undefined} src={t.img} alt={t.alt} width={2400} height={1550} unoptimized loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </div>
    </div>
  );
}
