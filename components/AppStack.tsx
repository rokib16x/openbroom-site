"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Card = { title: string; text: string; bullets: string[]; img: string; alt: string };
const TOP = 92;
const STEP = 20;

// Cards pin to the top as you scroll and the next one slides over, shrinking and dimming the one beneath.
export default function AppStack({ cards }: { cards: Card[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".scard"));
    let raf = 0;
    const calc = () => {
      raf = 0;
      const vh = window.innerHeight;
      const on = window.innerWidth > 640;
      items.forEach((it, i) => {
        if (!on || i === items.length - 1) {
          it.style.transform = "";
          it.style.setProperty("--p", "0");
          return;
        }
        const next = items[i + 1].getBoundingClientRect().top;
        const stuck = TOP + (i + 1) * STEP;
        const p = Math.min(1, Math.max(0, 1 - (next - stuck) / (vh * 0.55)));
        it.style.transform = `scale(${1 - p * 0.05})`;
        it.style.setProperty("--p", p.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="stack-cards" ref={root}>
      {cards.map((c, i) => (
        <article className="scard" key={c.title} style={{ ["--i" as string]: i }}>
          <div className="scard-in">
            <div>
              <div className="scard-no">{String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
            <div className="scard-img">
              <Image src={c.img} alt={c.alt} width={2400} height={1550} unoptimized loading={i < 2 ? "eager" : "lazy"} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
