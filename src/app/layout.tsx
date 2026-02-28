import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ved Dave",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var hex=localStorage.getItem('portfolio-theme')||'#FF2020';var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;var h=0,s=0,l=(max+min)/2;if(d){if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;s=d/(1-Math.abs(2*l-1));}var hsl=((h*60+360)%360|0)+' '+(s*100|0)+'% '+(l*100|0)+'%';document.documentElement.style.setProperty('--primary',hsl);document.documentElement.style.setProperty('--accent',hsl);document.documentElement.style.setProperty('--ring',hsl);}catch(e){}})();`
        }} />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
