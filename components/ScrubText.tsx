"use client";

import { useEffect, useRef } from "react";

// Words sharpen one by one as the block scrolls through the middle of the screen.
// Wrap a word in * to colour it. Opacity only, written straight to the DOM.
export default function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ").map((w) => ({ w: w.replace(/\*/g, ""), em: w.startsWith("*") }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("span"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    const n = spans.length;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.4)));
      spans.forEach((s, i) => {
        const k = Math.min(1, Math.max(0, p * (n + 4) - i));
        s.style.opacity = String(0.16 + k * 0.84);
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
    <p ref={ref} className="scrub" aria-label={text.replace(/\*/g, "")}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className={word.em ? "em" : undefined} style={{ opacity: 0.16 }}>
          {word.w}{" "}
        </span>
      ))}
    </p>
  );
}
