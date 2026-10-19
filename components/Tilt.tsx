"use client";

import { ReactNode, useEffect, useRef } from "react";

// Starts tipped back and small, then settles flat as it scrolls into view. Writes straight to the DOM, no re-renders.
export default function Tilt({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    const inn = inner.current;
    if (!el || !inn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.98 - el.getBoundingClientRect().top) / (vh * 0.7)));
      const e = 1 - Math.pow(1 - p, 3);
      inn.style.transform = `perspective(1800px) rotateX(${(1 - e) * 24}deg) translateY(${(1 - e) * 50}px) scale(${0.9 + e * 0.1})`;
      inn.style.opacity = String(0.4 + e * 0.6);
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
    <div ref={outer}>
      <div ref={inner} className="tilt-in">{children}</div>
    </div>
  );
}
