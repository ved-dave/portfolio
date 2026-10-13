import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { THEME_STORAGE_KEY } from "@/lib/themes";
import { siteDesign } from "@/lib/design";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata =
  siteDesign === "terminal"
    ? { title: "ved dave", description: "engineer · founder · photographer" }
    : { title: "Ved Dave", description: "Software Engineer" };

const classicThemeScript = `(function(){try{var hex=localStorage.getItem('portfolio-theme')||'#F6FF00';var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;var h=0,s=0,l=(max+min)/2;if(d){if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;s=d/(1-Math.abs(2*l-1));}var hsl=((h*60+360)%360|0)+' '+(s*100|0)+'% '+(l*100|0)+'%';document.documentElement.style.setProperty('--primary',hsl);document.documentElement.style.setProperty('--accent',hsl);document.documentElement.style.setProperty('--ring',hsl);}catch(e){}})();`;

const terminalThemeScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTerminal = siteDesign === "terminal";
  return (
    <html
      lang="en"
      data-design={siteDesign}
      data-theme={isTerminal ? "void" : undefined}
      className={`${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: isTerminal ? terminalThemeScript : classicThemeScript,
          }}
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
        <Analytics />
      </body>
    </html>
  );
}
