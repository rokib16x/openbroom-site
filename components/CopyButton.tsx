"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1600);
    } catch {
      /* clipboard blocked: leave the label unchanged */
    }
  };
  return (
    <button type="button" className={`copy${ok ? " ok" : ""}`} onClick={copy} aria-label={`${label}: ${text}`}>
      {ok ? <Check /> : <Copy />}
      {ok ? "Copied" : label}
    </button>
  );
}
