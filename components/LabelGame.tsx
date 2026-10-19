"use client";

import { ReactNode, useState } from "react";
import { Check, Eye, Folder, Shield } from "./Icons";

type Label = "safe" | "check" | "yours";
type Q = { name: string; path: string; ctx: string; answer: Label; why: string };

const QS: Q[] = [
  { name: "Xcode DerivedData", path: "~/Library/Developer/Xcode/DerivedData", ctx: "Build products from every project you have opened in Xcode.", answer: "safe", why: "Xcode recreates all of it on the next build. The only cost is a slower first build." },
  { name: "thesis-final-v3.pdf", path: "~/Downloads/thesis-final-v3.pdf", ctx: "A large file in Downloads. 180 MB, opened last month.", answer: "yours", why: "OpenBroom cannot rebuild a document with a command, so it is never preselected. Only you know if it matters." },
  { name: "web-shop · node_modules", path: "~/Projects/web-shop/node_modules", ctx: "You committed to this project yesterday.", answer: "check", why: "It rebuilds with npm install, but you are working here right now. OpenBroom asks before it touches active projects." },
  { name: "Homebrew download cache", path: "~/Library/Caches/Homebrew", ctx: "Old installers Homebrew already unpacked.", answer: "safe", why: "Homebrew downloads them again only if it ever needs them. Nothing here is yours." },
  { name: "Docker volumes", path: "docker volume ls", ctx: "Two volumes no container is using right now.", answer: "check", why: "Unused does not mean unwanted. A volume can hold a local database. OpenBroom shows it and lets you decide." },
  { name: "Local AI models", path: "~/.ollama/models", ctx: "Models you downloaded over the last year, 18 GB.", answer: "yours", why: "Re-downloading takes time and bandwidth, and you chose them. They are shown as your files and never selected." },
];

const BINS: { id: Label; name: string; text: string; icon: ReactNode }[] = [
  { id: "safe", name: "Safe", text: "Rebuilds itself. Selected for you.", icon: <Shield size={22} /> },
  { id: "check", name: "Check first", text: "Probably fine. You look first.", icon: <Eye size={22} /> },
  { id: "yours", name: "Your files", text: "Not ours to judge. Never selected.", icon: <Folder size={22} /> },
];

export default function LabelGame() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Label | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= QS.length;
  const q = QS[Math.min(i, QS.length - 1)];

  const pick = (c: Label) => {
    if (picked) return;
    setPicked(c);
    if (c === q.answer) setScore((s) => s + 1);
  };
  const next = () => { setPicked(null); setI((n) => n + 1); };
  const reset = () => { setI(0); setScore(0); setPicked(null); };
  const rightName = BINS.find((b) => b.id === q.answer)!.name;

  return (
    <div className="quiz">
      {!done ? (
        <>
          <div className="quiz-bar">
            <div className="quiz-dots" aria-label={`Question ${i + 1} of ${QS.length}`}>
              {QS.map((_, k) => <i key={k} className={k < i ? "done" : k === i ? "now" : ""} />)}
            </div>
            <span>{score} right</span>
          </div>

          <div className="quiz-file" key={i}>
            <div className="quiz-fic" aria-hidden="true"><Folder size={26} /></div>
            <div>
              <div className="q-name">{q.name}</div>
              <div className="q-path">{q.path}</div>
              <p className="q-ctx">{q.ctx}</p>
            </div>
          </div>

          <p className="quiz-ask">Where does OpenBroom put it?</p>
          <div className="bins" role="group" aria-label="Choose a label">
            {BINS.map((b) => {
              const state = !picked ? "" : b.id === q.answer ? "right" : b.id === picked ? "wrong" : "dim";
              return (
                <button key={b.id} type="button" className={`bin ${b.id} ${state}`} disabled={!!picked} onClick={() => pick(b.id)}>
                  <span className="bin-ic" aria-hidden="true">{state === "right" ? <Check size={20} /> : b.icon}</span>
                  <b>{b.name}</b>
                  <span>{b.text}</span>
                </button>
              );
            })}
          </div>

          <div className="quiz-foot">
            {picked ? (
              <>
                <div className="verdict" role="status">
                  <b>{picked === q.answer ? "Yes, that is what OpenBroom does." : `Not quite. OpenBroom marks this ${rightName}.`}</b>
                  <p>{q.why}</p>
                </div>
                <button className="btn sm" type="button" onClick={next}>{i === QS.length - 1 ? "See my score" : "Next one"}</button>
              </>
            ) : (
              <p className="quiz-hint">Pick the label you think it gets.</p>
            )}
          </div>
        </>
      ) : (
        <div className="score" role="status">
          <div className="n">{score}/{QS.length}</div>
          <h3>{score >= 5 ? "You think like OpenBroom." : score >= 3 ? "Good instincts." : "Tricky, right?"}</h3>
          <p className="muted" style={{ maxWidth: "40ch" }}>That is the point of the labels: you should never have to guess what is safe to delete.</p>
          <button className="btn sm" type="button" onClick={reset}>Play again</button>
        </div>
      )}
    </div>
  );
}
