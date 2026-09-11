"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Perspective-projected code field: adds depth without a second WebGL context. */
export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, last = 0, time = 0;
    let pointerX = 0, pointerY = 0, tiltX = 0, tiltY = 0;
    let scroll = window.scrollY;
    const glyphs = "01<>/{}[]:+=ABCDEF";
    // Stable positions avoid random layout changes during resize and hydration.
    const seed = (n: number) => ((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;
    const streams = Array.from({ length: 72 }, (_, i) => ({
      x: seed(i + 1) * 2 - 1,
      y: seed(i + 90),
      depth: .55 + seed(i + 170) * 1.65,
      speed: .012 + seed(i + 210) * .018,
      length: 5 + Math.floor(seed(i + 310) * 12),
    })).sort((a, b) => b.depth - a.depth);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const still = paused || motion.matches;
      tiltX += ((still ? 0 : pointerX) - tiltX) * .055;
      tiltY += ((still ? 0 : pointerY) - tiltY) * .055;
      const mobile = width < 768;
      const count = mobile ? 28 : streams.length;
      ctx.textAlign = "center";
      for (let i = 0; i < count; i++) {
        const column = streams[i];
        const perspective = 1 / column.depth;
        const x = width * .5 + column.x * width * .68 * perspective + tiltX * 22 * perspective;
        const gap = 17 * Math.min(perspective, 1.4);
        const span = height + column.length * gap + 120;
        const head = ((column.y * span + time * column.speed * 160 + scroll * .035 * perspective) % span) - 40;
        ctx.font = `${Math.max(9, 12 * perspective)}px ui-monospace, monospace`;
        for (let j = 0; j < column.length; j++) {
          const y = head - j * gap + tiltY * 16 * perspective;
          if (y < 0 || y > height) continue;
          const edge = Math.min(1, Math.abs(x / width - .5) * 2 + .18);
          const alpha = (1 - j / column.length) * (.085 + .155 * perspective) * edge;
          ctx.fillStyle = j === 0 ? `rgba(203,213,225,${alpha * 1.7})` : `rgba(74,151,163,${alpha})`;
          ctx.fillText(glyphs[(i * 7 + j * 3 + Math.floor(time * .45)) % glyphs.length], x, y);
        }
      }
      // A sparse vanishing-point grid anchors the floating code in space.
      const horizon = height * .62 + tiltY * 4;
      const vanishingX = width * .58 + tiltX * 10;
      ctx.lineWidth = .6;
      ctx.strokeStyle = "rgba(104,163,178,.12)";
      ctx.beginPath();
      for (let i = -8; i <= 8; i++) {
        ctx.moveTo(vanishingX + i * 15, horizon);
        ctx.lineTo(vanishingX + i * width * .19, height);
      }
      for (let i = 1; i <= 9; i++) {
        const y = horizon + (height - horizon) * (i / 9) ** 2;
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();
    }
    function tick(now: number) {
      if (document.hidden || paused || motion.matches) return;
      const interval = width < 768 ? 1000 / 12 : 1000 / 24;
      if (now - last >= interval) {
        time += Math.min((now - last) / 1000, .1);
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function restart() {
      cancelAnimationFrame(frame);
      draw();
      last = performance.now();
      if (!document.hidden && !paused && !motion.matches) frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      restart();
    }
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX / width - .5; pointerY = event.clientY / height - .5;
    };
    const onScroll = () => { scroll = window.scrollY; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
    };
  }, [paused]);

  return <>
    <div className="matrix-background" aria-hidden="true"><canvas ref={canvasRef} /></div>
    <button type="button" className="matrix-motion-control" aria-label={paused ? "Play matrix background" : "Pause matrix background"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      {paused ? <Play size={12} /> : <Pause size={12} />}<span>Matrix motion</span>
    </button>
  </>;
}
