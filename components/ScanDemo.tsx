"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Undo } from "./Icons";

type Label = "safe" | "check" | "yours";
type Item = { id: string; name: string; path: string; gb: number; l: Label; why: string };

const ITEMS: Item[] = [
  { id: "dd", name: "Xcode DerivedData", path: "~/Library/Developer/Xcode/DerivedData", gb: 6.4, l: "safe", why: "Build products Xcode recreates on the next build. Your first build afterwards is a little slower." },
  { id: "nm", name: "api-server · node_modules", path: "~/Projects/api-server/node_modules", gb: 1.8, l: "safe", why: "Rebuilt by npm install. No uncommitted changes and untouched for over 30 days." },
  { id: "pods", name: "mobile-app · Pods", path: "~/Projects/mobile-app/ios/Pods", gb: 1.0, l: "safe", why: "Rebuilt by pod install. Nothing in it is yours." },
  { id: "dock", name: "Docker build cache", path: "docker builder prune", gb: 12.3, l: "check", why: "Removed with Docker's own command, named before it runs. Your next image builds start cold." },
  { id: "venv", name: "data-lab · .venv", path: "~/Projects/data-lab/.venv", gb: 1.2, l: "check", why: "It rebuilds from requirements.txt, but check that your versions are pinned first." },
  { id: "ai", name: "Local AI models", path: "~/.ollama/models", gb: 18.6, l: "yours", why: "Models you chose to download. OpenBroom shows them but never selects them." },
];

const SCAN_PATHS = [
  "~/Library/Caches/Homebrew", "~/Library/Developer/Xcode/DerivedData", "~/Projects/api-server/node_modules",
  "~/Projects/mobile-app/ios/Pods", "docker system df", "~/Projects/data-lab/.venv", "~/.ollama/models",
];

// A made-up disk so the bar has something to show. Nothing here is read from your Mac.
const TOTAL = 494.4;
const OTHER = 290.0;
const JUNK = ITEMS.reduce((s, i) => s + i.gb, 0);

const LABEL: Record<Label, [string, string]> = { safe: ["Safe", "t-safe"], check: ["Check first", "t-check"], yours: ["Your files", "t-yours"] };
const fmt = (n: number) => `${n.toFixed(1)} GB`;
const safeSet = () => new Set(ITEMS.filter((i) => i.l === "safe").map((i) => i.id));
const pct = (gb: number) => `${(gb / TOTAL) * 100}%`;

function useCountUp(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 480);
      const e = 1 - Math.pow(1 - k, 3);
      const val = start + (target - start) * e;
      from.current = val;
      setV(val);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

export default function ScanDemo() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "results" | "cleaned">("idle");
  const [progress, setProgress] = useState(0);
  const [sel, setSel] = useState<Set<string>>(safeSet);
  const [gone, setGone] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<string | null>(null);
  const [freed, setFreed] = useState(0);

  const discovered = phase === "idle" ? 0 : phase === "scanning" ? Math.floor((progress / 100) * (ITEMS.length + 0.001)) : ITEMS.length;
  const known = (i: number) => i < discovered;
  const live = ITEMS.filter((it) => !gone.has(it.id));
  const selGb = live.filter((i) => sel.has(i.id)).reduce((s, i) => s + i.gb, 0);
  const discoveredGb = ITEMS.filter((_, i) => known(i) && !gone.has(ITEMS[i].id)).reduce((s, i) => s + i.gb, 0);
  const goneGb = ITEMS.filter((i) => gone.has(i.id)).reduce((s, i) => s + i.gb, 0);
  const neutral = OTHER + (JUNK - goneGb - discoveredGb);
  const free = TOTAL - OTHER - (JUNK - goneGb);
  const freeAfter = free + (phase === "results" ? selGb : 0);

  const selShown = useCountUp(selGb);
  const freeShown = useCountUp(phase === "results" ? freeAfter : free);
  const foundShown = useCountUp(phase === "scanning" ? discoveredGb : JUNK);

  useEffect(() => {
    if (phase !== "scanning") return;
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 2.4 + Math.random() * 2.6)), 70);
    return () => clearInterval(id);
  }, [phase]);
  useEffect(() => {
    if (phase === "scanning" && progress >= 100) {
      const t = setTimeout(() => setPhase("results"), 400);
      return () => clearTimeout(t);
    }
  }, [phase, progress]);

  const start = () => {
    setProgress(0);
    setSel(safeSet());
    setGone(new Set());
    setOpen(null);
    setPhase("scanning");
  };
  const toggle = (id: string) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clean = () => {
    setFreed(selGb);
    setGone((g) => new Set([...g, ...sel]));
    setPhase("cleaned");
  };
  const undo = () => {
    setGone(new Set());
    setPhase("results");
  };

  const pathIdx = Math.min(SCAN_PATHS.length - 1, Math.floor((progress / 100) * SCAN_PATHS.length));

  return (
    <div className="gwin" aria-label="Interactive sample scan">
      <div className="gwin-top">
        <i /><i /><i />
        <b>Sample Mac · nothing real is touched</b>
      </div>

      <div className="gdisk">
        <div className="gdisk-row">
          <span className="gdisk-name"><span className="gdisk-ic" /> Macintosh HD <em>sample</em></span>
          <span className="gdisk-free"><b>{fmt(freeShown)}</b> free of {TOTAL} GB</span>
        </div>
        <div className="gbar-wrap">
          <div className={`gbar${phase === "scanning" ? " sweep" : ""}`}>
            <span className="seg other" style={{ width: pct(neutral) }} />
            {ITEMS.map((it, i) => (
              <span
                key={it.id}
                className={`seg ${it.l}${phase === "results" && !sel.has(it.id) ? " dim" : ""}`}
                style={{ width: gone.has(it.id) || !known(i) ? "0%" : pct(it.gb), marginLeft: gone.has(it.id) || !known(i) ? 0 : 2 }}
              />
            ))}
          </div>
        </div>
        <div className="glegend">
          <span><i className="seg other" /> Used</span>
          <span><i className="seg safe" /> Safe</span>
          <span><i className="seg check" /> Check first</span>
          <span><i className="seg yours" /> Your files</span>
          <span className="free"><i className="seg freeKey" /> Free</span>
        </div>
      </div>

      <div className="gbody">
        {phase === "idle" && (
          <div className="gcenter">
            <Image className="gmark" src="/assets/logo/openbroom-symbol-white.svg" width={58} height={58} alt="" unoptimized />
            <h3>Ready when you are</h3>
            <p>OpenBroom only looks. Nothing is removed until you press Clean.</p>
            <button className="btn" type="button" onClick={start}>Scan</button>
          </div>
        )}

        {phase === "scanning" && (
          <div className="gcenter" role="status" aria-live="polite">
            <div className="gnum">{fmt(foundShown)}</div>
            <p>found so far · {Math.round(progress)}%</p>
            <div className="gpath">{SCAN_PATHS[pathIdx]}</div>
          </div>
        )}

        {phase === "results" && (
          <>
            <ul className="glist">
              {ITEMS.map((it, i) => {
                const on = sel.has(it.id);
                return (
                  <li key={it.id} className={`gitem${on ? " on" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="gitem-row">
                      <button type="button" className="gchk" role="checkbox" aria-checked={on} aria-label={`Select ${it.name}`} onClick={() => toggle(it.id)}>
                        <Check size={13} />
                      </button>
                      <div className="gitem-main">
                        <div className="gitem-name">{it.name} <span className={`tag ${LABEL[it.l][1]}`}>{LABEL[it.l][0]}</span></div>
                        <div className="gitem-path">{it.path}</div>
                      </div>
                      <span className="gitem-size">{fmt(it.gb)}</span>
                      <button type="button" className="gwhy" aria-expanded={open === it.id} onClick={() => setOpen(open === it.id ? null : it.id)}>Why?</button>
                    </div>
                    {open === it.id && <p className="gitem-why">{it.why}</p>}
                  </li>
                );
              })}
            </ul>
            <div className="gfoot">
              <div>
                <div className="gfoot-big">{fmt(selShown)} <small>selected</small></div>
                <small>Free after cleaning: {fmt(freeShown)}</small>
              </div>
              <button className="btn" type="button" disabled={sel.size === 0} onClick={clean}>Move to Trash</button>
            </div>
          </>
        )}

        {phase === "cleaned" && (
          <div className="gcenter gdone" role="status">
            <div className="gcheck"><Check size={34} /></div>
            <h3>{fmt(freed)} moved to the Trash</h3>
            <p>Sample only, so nothing on your Mac changed. In the real app you can put it all back from the Trash.</p>
            <div className="gacts">
              <button className="btn" type="button" onClick={undo}><Undo /> Undo</button>
              <button className="btn line" type="button" onClick={start}>Scan again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
