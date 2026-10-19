"use client";

import { ReactNode, useState } from "react";
import { Globe, Laptop, Box, Terminal, Gear, Layers } from "./Icons";
import CopyButton from "./CopyButton";

type Stack = { id: string; icon: ReactNode; name: string; finds: string[]; back: string; note: string };

const STACKS: Stack[] = [
  { id: "web", icon: <Globe />, name: "Web and Node", finds: ["node_modules", ".next", ".nuxt", "dist", "npm cache", "pnpm store", "Yarn cache"], back: "npm install", note: "Per project, with last-worked date and git status. Projects with uncommitted changes are skipped." },
  { id: "apple", icon: <Laptop />, name: "iOS and macOS", finds: ["DerivedData", "Archives", "iOS DeviceSupport", "Simulator caches", "Pods", ".build", "SwiftPM cache"], back: "pod install", note: "Old simulator runtimes are removed through xcrun simctl, and the command is named before it runs." },
  { id: "docker", icon: <Box />, name: "Containers", finds: ["Unused images", "Stopped containers", "Build cache", "Dangling volumes"], back: "docker pull", note: "Cleaned with Docker's own commands, never by deleting its files. Volumes are marked Check first." },
  { id: "py", icon: <Terminal />, name: "Python", finds: [".venv", "__pycache__", "pip cache", "Jupyter checkpoints"], back: "pip install -r requirements.txt", note: "A virtualenv is only Safe when your requirements are pinned. Otherwise it is Check first." },
  { id: "rust", icon: <Gear />, name: "Rust", finds: ["target", "Cargo registry cache"], back: "cargo build", note: "The target folder can be huge and always rebuilds. The first build afterwards takes longer." },
  { id: "jvm", icon: <Layers />, name: "Android and JVM", finds: [".gradle", "Gradle caches", "Old system images", "Maven cache"], back: "./gradlew build", note: "Gradle and Maven caches refill on the next build. Old emulator images are shown with their size." },
];

// Single-select tabs with a fixed-height panel, so choosing never moves the page.
export default function StackPicker() {
  const [id, setId] = useState("web");
  const s = STACKS.find((x) => x.id === id)!;

  return (
    <div>
      <div className="sp-tabs" role="tablist" aria-label="Pick your stack">
        {STACKS.map((x) => (
          <button key={x.id} type="button" role="tab" className="pill" aria-selected={x.id === id} onClick={() => setId(x.id)}>
            <span className="pic" aria-hidden="true">{x.icon}</span>
            {x.name}
          </button>
        ))}
      </div>
      <div className="sp-panel" role="tabpanel" key={s.id}>
        <div className="sp-col">
          <h4>OpenBroom looks for</h4>
          <ul className="sp-finds">{s.finds.map((f) => <li key={f}><code>{f}</code></li>)}</ul>
        </div>
        <div className="sp-col">
          <h4>Comes back with</h4>
          <div className="sp-cmd"><span>{s.back}</span><CopyButton text={s.back} /></div>
          <p className="sp-note">{s.note}</p>
        </div>
      </div>
    </div>
  );
}
