// Fonts are self-hosted from npm (no Google request at build time).
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import { cv } from "@/data/cv";

// Shown in the browser tab, on Google, and in link previews.
export const metadata = {
  title: `${cv.name} | Portfolio`,
  description: cv.summary,
  openGraph: {
    title: `${cv.name} | Portfolio`,
    description: cv.summary,
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0d" },
  ],
};

// Runs before the page paints: applies the saved/system theme (no flash)
// and adds the "js" class that enables scroll animations.
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    // Building an Arabic version? Use lang="ar" dir="rtl".
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
