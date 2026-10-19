type P = { size?: number };
const base = (size: number, sw = 2) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true,
});

export const Check = ({ size = 14 }: P) => (<svg {...base(size, 2.6)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Copy = ({ size = 14 }: P) => (<svg {...base(size, 2.4)}><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></svg>);
export const Shield = ({ size = 26 }: P) => (<svg {...base(size)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>);
export const Trash = ({ size = 26 }: P) => (<svg {...base(size)}><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13" /><path d="M10 11v5M14 11v5" /></svg>);
export const Lock = ({ size = 26 }: P) => (<svg {...base(size)}><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
export const Github = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>
);

/* feature and stack icons */
export const Hammer = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M14 6l4 4M6 18l7.5-7.5M15.5 3.5l5 5-2.5 2.5-5-5z" /><path d="M5 19l-1.5 1.5" /></svg>);
export const Sliders = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M4 7h9M17 7h3M4 17h3M11 17h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></svg>);
export const Folder = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /></svg>);
export const Broom = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M14.5 3.5l6 6M13 5l6 6-3.2 3.2a3 3 0 0 1-4.2 0l-1.8-1.8a3 3 0 0 1 0-4.2z" /><path d="M10 13l-5.5 5.5M7 16l-2 4M10 17l-2.5 3.5" /></svg>);
export const Chat = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6.5L8 20.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M8 10h8M8 13h5" /></svg>);
export const Globe = ({ size = 20 }: P) => (<svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" /></svg>);
export const Laptop = ({ size = 20 }: P) => (<svg {...base(size)}><rect x="5" y="5" width="14" height="10" rx="2" /><path d="M2.5 19h19" /></svg>);
export const Box = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>);
export const Terminal = ({ size = 20 }: P) => (<svg {...base(size)}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M7 10l3 2.5L7 15M12.5 15H17" /></svg>);
export const Gear = ({ size = 20 }: P) => (<svg {...base(size)}><circle cx="12" cy="12" r="3" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" /></svg>);
export const Layers = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 12.5l9 5 9-5M3 17l9 5 9-5" /></svg>);
export const Arrow = ({ size = 18 }: P) => (<svg {...base(size, 2.4)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Undo = ({ size = 16 }: P) => (<svg {...base(size, 2.4)}><path d="M9 7L4 12l5 5M4 12h10a6 6 0 0 1 0 12" transform="translate(0 -3)" /></svg>);
export const Eye = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></svg>);
