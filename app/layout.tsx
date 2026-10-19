import type { Metadata, Viewport } from "next";
import "./tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenBroom: the honest Mac cleaner for developers",
  description:
    "OpenBroom shows what fills your Mac (node_modules, Xcode, Docker, caches), explains every item in plain words, and removes only what you pick. Free and open source.",
  icons: { icon: "/assets/logo/openbroom-symbol.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
