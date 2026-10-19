import Image from "next/image";
import ScanDemo from "@/components/ScanDemo";
import StackPicker from "@/components/StackPicker";
import LabelGame from "@/components/LabelGame";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import ScrubText from "@/components/ScrubText";
import Explorer from "@/components/Explorer";
import HowItWorks from "@/components/HowItWorks";
import AppStack from "@/components/AppStack";
import Hero3D from "@/components/Hero3D";
import { Github, Lock, Shield, Trash, Hammer, Folder, Broom } from "@/components/Icons";

const REPO = "https://github.com/rokib16x/openbroom";
const S = (n: string) => `/assets/shots/${n}.webp`;

const PILLS = [
  "Trash first, with undo", "Every item explained", "Scanning never deletes", "Free and open source", "No account",
  "Native, written in Swift", "Protected paths refused in code", "Dry run before every clean", "Put anything back",
];

const EXPLORE = [
  { title: "Project junk", text: "node_modules, build output and virtualenvs, per project, with last-worked date and git status.", img: S("developer"), alt: "Developer screen listing node_modules and build folders with Safe and Check first labels", icon: <Hammer /> },
  { title: "Caches and logs", text: "One item per app, with a plain note on what it is and whether it comes back.", img: S("cleanup"), alt: "Cleanup screen listing app caches, logs, old downloads and device backups", icon: <Broom /> },
  { title: "Files you decide on", text: "Large and old files, duplicates and similar photos. Never preselected.", img: S("files"), alt: "Files screen with large and old files", icon: <Folder /> },
  { title: "Review, not a scare", text: "Startup items and recent downloads checked, plus optional ClamAV.", img: S("protection"), alt: "Protection screen", icon: <Shield size={22} /> },
];

const HOW = [
  { title: "Scan", text: "Press Smart Scan. OpenBroom looks through Developer, Cleanup, Applications and Performance. Cancel any time.", img: S("overview"), alt: "Overview with a Start Smart Scan button", hot: { left: 33.5, top: 38.5, w: 20, h: 28, round: true } },
  { title: "Understand", text: "Every item has a label, a path and a plain explanation. Only Safe items are preselected.", img: S("developer"), alt: "Developer results with labels", hot: { left: 28.5, top: 20.5, w: 30, h: 6.6 } },
  { title: "Clean", text: "Check the total, try a dry run, then move your selection to the Trash. The last cleanup can be undone.", img: S("overview-scanned"), alt: "Overview after a scan, with a Clean safe items button", hot: { left: 54.6, top: 87.2, w: 12, h: 6.4 } },
];

const APPS = [
  { title: "Overview", text: "One scan, one total, and a quick look at system health.", bullets: ["Smart Scan across Developer, Cleanup, Applications and Performance", "Cancel any time", "Nothing is deleted until you press Clean"], img: S("overview-scanned"), alt: "Overview screen after a scan" },
  { title: "Developer", text: "Junk with context: which project, how old, and how it comes back.", bullets: ["node_modules, build output and virtualenvs per project", "Package caches, Xcode and Docker through their own tools", "Projects with uncommitted changes are skipped"], img: S("developer"), alt: "Developer screen" },
  { title: "Cleanup", text: "App caches, logs, old downloads, device backups and the Trash.", bullets: ["One item per app, each explained", "Old iOS updates and device backups, clearly marked", "Safe items are preselected, the rest are your call"], img: S("cleanup"), alt: "Cleanup screen" },
  { title: "Files", text: "Large and old files that are yours to decide on.", bullets: ["Large and old files, filtered by size and last opened", "Exact duplicates and similar photos", "Never preselected"], img: S("files"), alt: "Files screen" },
  { title: "Protection", text: "A review of what starts on your Mac and what you downloaded.", bullets: ["Startup items and recent downloads", "Optional ClamAV scan if you install it", "A review, not a real-time malware engine"], img: S("protection"), alt: "Protection screen" },
  { title: "Assistant", text: "Ask what is safe to remove and get an answer from your own scan.", bullets: ["Runs on your Mac with rules, not an online AI", "Try: what can I delete safely?", "Nothing leaves your Mac"], img: S("assistant"), alt: "Assistant screen" },
  { title: "Settings", text: "Your folders, your rules, your pace.", bullets: ["Choose scan folders and how old a project must be", "A never-suggest list for anything you want left alone", "Dry run, and an optional daily scan"], img: S("settings"), alt: "Settings screen" },
];

const FAQ = [
  ["Is it safe?", "It is built to be careful: scans never delete, files go to the Trash, protected locations are refused in code, projects with uncommitted changes are skipped, and only Safe items are preselected. The code is open and has tests on fixture folders, so you can read exactly what it does."],
  ["What exactly does it remove?", "Only what you select and confirm. Typical items are node_modules, build output, package caches, Xcode DerivedData and simulators, unused Docker data, old installers and app leftovers."],
  ["Why might it ask for Full Disk Access?", "Only for Mail data, Safari data and the app-permission audit, which macOS protects. Everything else works without it, and you can say no."],
  ["Why is it not notarized?", "There is no Apple Developer ID signing yet. The build is ad-hoc signed, so the first launch needs right-click, then Open. Notarization is on the list before any public release."],
  ["Will it speed up my Mac?", "It frees disk space and shows login items and heavy processes. It does not promise a faster Mac, and it does not offer memory cleaning."],
  ["What does it cost?", "Nothing. It is MIT licensed. If it saves you a day, a star on GitHub is a lovely thank you."],
  ["Who makes it?", "Rokibul Hasan, as an open-source project. Issues and pull requests are welcome."],
];

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="nav-in">
          <a href="#top" aria-label="OpenBroom home">
            <Image className="logo" src="/assets/logo/openbroom-lockup-white.svg" alt="openbroom" width={138} height={26} style={{ height: 26, width: "auto" }} unoptimized />
          </a>
          <div className="nav-links">
            <a href="#developers">For developers</a>
            <a href="#how">How it works</a>
            <a href="#app">The app</a>
            <a href="#get">Get it</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <a className="btn paper sm" href={REPO}><Github /> GitHub</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <header className="hero">
          <Hero3D />
          <div className="wrap">
            <div className="hero-copy">
              <h1>Your Mac is full. <em>Let&rsquo;s see why.</em></h1>
              <p className="lead">
                OpenBroom finds what is eating your disk (node_modules, Xcode, Docker, caches), explains each thing in plain words, and removes only what you pick.
              </p>
              <div className="cta">
                <a className="btn" href="#get">Get OpenBroom</a>
                <a className="btn line" href="#try">Try it in your browser</a>
              </div>
              <p className="fine"><span>Free and open source</span><span>macOS 14 or later</span><span>No account</span></p>
            </div>
          </div>
          <div className="hero-stage">
            <Tilt>
              <div className="shot-frame">
                <Image src={S("overview-scanned")} width={2400} height={1550} priority unoptimized alt="OpenBroom overview after a scan, showing how much can be cleaned" />
              </div>
            </Tilt>
          </div>
        </header>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...PILLS, ...PILLS].map((p, i) => <span className="mq" key={i}>{p}</span>)}
          </div>
        </div>

        {/* STATEMENT */}
        <section className="statement">
          <div className="wrap">
            <ScrubText text="Most of what fills your disk is stuff your tools can *rebuild.* OpenBroom finds it, tells you what it is, and leaves the *decision* to you." />
          </div>
        </section>

        {/* TRY IT */}
        <div className="dark-panel dark" id="try">
          <section className="try">
            <div className="wrap">
              <Reveal className="sec-head center">
                <h2>Press Scan. Click anything.</h2>
                <p className="lead">This runs in your browser on a made-up Mac, so nothing real is touched. Watch the disk bar fill, tick items, read why each got its label, then clean.</p>
              </Reveal>
              <Reveal className="try-stage"><ScanDemo /></Reveal>
            </div>
          </section>
        </div>

        {/* DEVELOPERS */}
        <section id="developers">
          <div className="wrap">
            <Reveal className="sec-head">
              <h2>Made for developers&rsquo; Macs.</h2>
              <p className="lead">Xcode, Docker and node_modules leave a lot behind. OpenBroom knows where each tool keeps it, and how it comes back.</p>
            </Reveal>
            <Reveal><Explorer tabs={EXPLORE} /></Reveal>
          </div>
        </section>

        {/* STACK */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="sec-head">
              <h2>What do you build with?</h2>
              <p className="lead">Pick a stack to see what OpenBroom looks for, and the command that brings it back.</p>
            </Reveal>
            <Reveal><StackPicker /></Reveal>
          </div>
        </section>

        {/* LABELS */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="sec-head center">
              <h2>Every item gets a label, not a guess.</h2>
              <p className="lead">Each one says what it is, whether it is safe to remove, and whether it comes back. Sort six everyday things and see if you agree.</p>
            </Reveal>
            <Reveal><LabelGame /></Reveal>
          </div>
        </section>

        {/* PROMISES */}
        <div className="dark-panel dark">
          <section>
            <div className="wrap">
              <Reveal className="sec-head">
                <h2>OpenBroom never cleans behind your back.</h2>
              </Reveal>
              <div className="promises">
                <Reveal className="promise">
                  <div className="phead"><div className="ic"><Shield /></div><h3>Scanning only scans</h3></div>
                  <p>Nothing is removed until you press Clean. Dry-run mode and an exportable report show exactly what would happen first.</p>
                </Reveal>
                <Reveal className="promise" delay={80}>
                  <div className="phead"><div className="ic"><Trash /></div><h3>Trash first, with undo</h3></div>
                  <p>Files move to the Trash so you can put them back. If something cannot be trashed, the tool&rsquo;s own command is named before it runs.</p>
                </Reveal>
                <Reveal className="promise" delay={160}>
                  <div className="phead"><div className="ic"><Lock /></div><h3>Zero network calls</h3></div>
                  <p>No account and no analytics. Symlinks are never followed, and system, Photos, iCloud Drive, Mail and Time Machine paths are refused in code.</p>
                </Reveal>
              </div>
            </div>
          </section>
        </div>

        {/* HOW */}
        <section id="how">
          <div className="wrap">
            <Reveal className="sec-head">
              <h2>Scan. Understand. Clean.</h2>
              <p className="lead">It plays through on its own. Click a step to jump to it.</p>
            </Reveal>
            <Reveal><HowItWorks steps={HOW} /></Reveal>
          </div>
        </section>

        {/* THE APP */}
        <section id="app" className="apps">
          <div className="wrap">
            <Reveal className="sec-head">
              <h2>The whole app, one card at a time.</h2>
              <p className="lead">Native, quick and quiet. Keep scrolling and each screen slides over the last.</p>
            </Reveal>
            <AppStack cards={APPS} />
          </div>
        </section>

        {/* GET */}
        <section id="get">
          <div className="wrap">
            <Reveal className="sec-head center">
              <h2>Free. Built in a minute.</h2>
              <p className="lead">No price and no license key. Clone, build, open.</p>
            </Reveal>
            <Reveal className="get-grid">
              <div className="terminal">
                <div className="term-top">
                  <i /><i /><i />
                  <CopyButton label="Copy all" text={"git clone https://github.com/rokib16x/openbroom\ncd openbroom\n./scripts/bundle.sh\nopen build/OpenBroom.app"} />
                </div>
                <div className="term-body">
                  <div><span className="c"># builds build/OpenBroom.app</span></div>
                  <div><span className="k">$ </span>git clone {REPO}</div>
                  <div><span className="k">$ </span>cd openbroom</div>
                  <div><span className="k">$ </span>./scripts/bundle.sh</div>
                  <div><span className="k">$ </span>open build/OpenBroom.app</div>
                </div>
              </div>
              <div className="card know">
                <div><b>Needs</b><span>macOS 14 or later, and a Swift toolchain to build.</span></div>
                <div><b>First launch</b><span>Not notarized yet. Right-click the app and choose Open.</span></div>
                <div><b>Full Disk Access</b><span>Only for Mail data, Safari data and the permission audit.</span></div>
                <div><b>Not built yet</b><span>Cloud-drive cleanup, email cleanup, language-file removal, per-runtime simulator removal.</span></div>
                <div><b>Not offered</b><span>A real-time malware engine, and memory &ldquo;freeing&rdquo;.</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap faq-grid">
            <Reveal className="faq-side">
              <h2>Questions, answered plainly.</h2>
              <p className="lead" style={{ marginTop: 18 }}>Can&rsquo;t find yours? Open an issue and ask. It is an open-source project, so the answer ends up here.</p>
              <a className="btn ghost" style={{ marginTop: 26 }} href={`${REPO}/issues`}>Ask on GitHub</a>
            </Reveal>
            <Reveal className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <div className="wrap in">
            <Image className="sym" src="/assets/logo/openbroom-symbol-white.svg" alt="" width={88} height={88} unoptimized />
            <h2>Give your Mac its space back.</h2>
            <div className="cta">
              <a className="btn paper" href="#get">Get OpenBroom</a>
              <a className="btn line" href={REPO}><Github /> Read the source</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <Image className="logo" src="/assets/logo/openbroom-lockup.svg" alt="openbroom" width={157} height={30} style={{ height: 30, width: "auto" }} unoptimized />
              <p className="tl">The honest Mac cleaner for developers. Open source, made by Rokibul Hasan.</p>
            </div>
            <div><h4>Explore</h4><ul><li><a href="#developers">For developers</a></li><li><a href="#how">How it works</a></li><li><a href="#app">The app</a></li></ul></div>
            <div><h4>Project</h4><ul><li><a href={REPO}>GitHub</a></li><li><a href={`${REPO}/issues`}>Issues</a></li><li><a href={`${REPO}/blob/main/LICENSE`}>MIT license</a></li></ul></div>
            <div><h4>Help</h4><ul><li><a href="#get">Install</a></li><li><a href="#faq">FAQ</a></li></ul></div>
          </div>
          <div className="legal"><span>&copy; 2026 Rokibul Hasan. MIT licensed.</span><span>OpenBroom does not send your data anywhere.</span></div>
        </div>
      </footer>
    </>
  );
}
