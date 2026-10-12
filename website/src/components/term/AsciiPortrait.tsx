"use client";

import { useEffect, useRef } from "react";
import { portraitRows } from "@/data/asciiPortrait";

const GLYPHS = " .:-=+*#%@";
const SCRAMBLE = "01<>/\\{}[]$#*+=";
const CELL_W = 3;
const CELL_H = 6;
const RADIUS = 9;

export default function AsciiPortrait({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = Math.max(...portraitRows.map((r) => r.length));
    const rows = portraitRows.length;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = cols * CELL_W * dpr;
    canvas.height = rows * CELL_H * dpr;
    canvas.style.width = `${cols * CELL_W}px`;
    canvas.style.height = `${rows * CELL_H}px`;
    ctx.scale(dpr, dpr);

    let mouse: { x: number; y: number } | null = null;
    let reveal = 0;
    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--fg").trim() || "#d4be98";
      const accent = styles.getPropertyValue("--term").trim() || "#b8c572";
      ctx.clearRect(0, 0, cols * CELL_W, rows * CELL_H);
      ctx.font = `${CELL_H + 0.5}px var(--font-mono), monospace`;
      ctx.textBaseline = "top";

      for (let y = 0; y < Math.min(rows, reveal); y++) {
        const row = portraitRows[y];
        for (let x = 0; x < row.length; x++) {
          const ch = row[x];
          if (ch === " ") continue;
          const level = Number(ch) / 9;
          let glyph = GLYPHS[Math.min(GLYPHS.length - 1, 1 + Math.round(level * (GLYPHS.length - 2)))];
          let alpha = 0.18 + level * 0.82;
          let color = fg;
          if (mouse) {
            const dx = x - mouse.x;
            const dy = (y - mouse.y) * 2;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < RADIUS) {
              const t = 1 - d / RADIUS;
              if (Math.random() < t * 0.6) glyph = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
              alpha = Math.min(1, alpha + t * 0.6);
              color = accent;
            }
          }
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.fillText(glyph, x * CELL_W, y * CELL_H);
        }
      }
      ctx.globalAlpha = 1;
    };

    const intro = () => {
      reveal += 2;
      draw();
      if (reveal < rows) frame = requestAnimationFrame(intro);
    };
    if (reduceMotion) {
      reveal = rows;
      draw();
    } else {
      frame = requestAnimationFrame(intro);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: (e.clientX - rect.left) / CELL_W, y: (e.clientY - rect.top) / CELL_H };
      if (reveal >= rows) draw();
    };
    const onLeave = () => {
      mouse = null;
      draw();
    };
    if (!reduceMotion) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }
    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.fonts?.ready.then(draw);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} role="img" aria-label="ASCII portrait of Ved Dave" />;
}
