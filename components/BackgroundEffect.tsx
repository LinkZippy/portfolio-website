"use client";
import { useEffect, useRef, useState } from "react";

// ─── Tunnel constants ───────────────────────────────────────────────────────
const FOCAL      = 580;  // camera focal length (px)
const TW         = 920;  // tunnel half-width  (world units)
const TH         = 600;  // tunnel half-height
const NEAR       = 160;  // closest visible ring
const SEG_DEPTH  = 900;  // world-unit gap between rings
const NUM_SEGS   = 8;    // total rings in the cycle
const W_COLS     = 5;    // vertical divisions per segment (block columns)
const H_ROWS     = 3;    // horizontal divisions (block rows)
const SCROLL_SPD = 0.55; // camera units per scroll px

// ─── Helpers ────────────────────────────────────────────────────────────────
function project(
  wx: number, wy: number, wz: number,
  cx: number, cy: number
): [number, number] {
  const f = FOCAL / wz;
  return [cx + wx * f, cy + wy * f];
}

function ringAlpha(z: number, far: number): number {
  const t = 1 - (z - NEAR) / (far - NEAR);
  return Math.max(0, Math.min(1, t)) ** 1.6 * 0.92;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let cameraZ   = 0;
    let targetZ   = 0;
    let walkCycle = 0;
    let rafId: number;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => { targetZ = window.scrollY * SCROLL_SPD; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const FAR       = NUM_SEGS * SEG_DEPTH + NEAR;
    const STONE     = [148, 136, 112] as const;
    const STONE_DIM = [90,  82,  68 ] as const;

    const rgba = (col: readonly [number,number,number], a: number) =>
      `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(3)})`;

    const line = (
      x1: number, y1: number, x2: number, y2: number,
      color: string, width: number
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth   = width;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const draw = () => {
      cameraZ  += (targetZ - cameraZ) * 0.07;
      walkCycle = cameraZ * 0.004;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2 + Math.sin(walkCycle) * 6; // gentle bob

      // Ambient torch glow at the tunnel's end
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.4);
      glow.addColorStop(0,   "rgba(72, 58, 32, 0.18)");
      glow.addColorStop(0.5, "rgba(30, 24, 12, 0.08)");
      glow.addColorStop(1,   "rgba(0,   0,  0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Build z-list for this frame
      const cycleLen = NUM_SEGS * SEG_DEPTH;
      const offset   = cameraZ % cycleLen;
      const zList: number[] = [];
      for (let i = 0; i < NUM_SEGS; i++) {
        let z = i * SEG_DEPTH - offset + NEAR;
        if (z < NEAR) z += cycleLen;
        if (z >= NEAR && z < FAR) zList.push(z);
      }
      zList.sort((a, b) => a - b); // near → far

      // Wall faces between adjacent rings (drawn far→near)
      for (let si = zList.length - 2; si >= 0; si--) {
        const zN = zList[si];
        const zF = zList[si + 1];
        const a  = (ringAlpha(zN, FAR) + ringAlpha(zF, FAR)) / 2;
        if (a < 0.01) continue;

        // Ceiling columns
        for (let c = 0; c <= W_COLS; c++) {
          const wx = -TW + 2 * TW * (c / W_COLS);
          const [x1, y1] = project(wx, -TH, zN, cx, cy);
          const [x2, y2] = project(wx, -TH, zF, cx, cy);
          line(x1, y1, x2, y2, rgba(STONE, a * 0.50), 0.7);
        }
        // Floor columns
        for (let c = 0; c <= W_COLS; c++) {
          const wx = -TW + 2 * TW * (c / W_COLS);
          const [x1, y1] = project(wx,  TH, zN, cx, cy);
          const [x2, y2] = project(wx,  TH, zF, cx, cy);
          line(x1, y1, x2, y2, rgba(STONE_DIM, a * 0.38), 0.7);
        }
        // Left wall rows
        for (let r = 0; r <= H_ROWS; r++) {
          const wy = -TH + 2 * TH * (r / H_ROWS);
          const [x1, y1] = project(-TW, wy, zN, cx, cy);
          const [x2, y2] = project(-TW, wy, zF, cx, cy);
          line(x1, y1, x2, y2, rgba(STONE, a * 0.52), 0.7);
        }
        // Right wall rows
        for (let r = 0; r <= H_ROWS; r++) {
          const wy = -TH + 2 * TH * (r / H_ROWS);
          const [x1, y1] = project( TW, wy, zN, cx, cy);
          const [x2, y2] = project( TW, wy, zF, cx, cy);
          line(x1, y1, x2, y2, rgba(STONE, a * 0.52), 0.7);
        }
      }

      // Ring cross-sections (far→near)
      for (let zi = zList.length - 1; zi >= 0; zi--) {
        const z = zList[zi];
        const a = ringAlpha(z, FAR);
        if (a < 0.01) continue;

        const [x1, y1] = project(-TW, -TH, z, cx, cy);
        const [x2, y2] = project( TW, -TH, z, cx, cy);
        const [x3, y3] = project( TW,  TH, z, cx, cy);
        const [x4, y4] = project(-TW,  TH, z, cx, cy);

        ctx.strokeStyle = rgba(STONE, a);
        ctx.lineWidth   = a > 0.55 ? 1.4 : 0.9;
        ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3); ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.stroke();

        // Inner horizontal block lines
        for (let r = 1; r < H_ROWS; r++) {
          const wy = -TH + 2 * TH * (r / H_ROWS);
          const [lx, ly] = project(-TW, wy, z, cx, cy);
          const [rx, ry] = project( TW, wy, z, cx, cy);
          line(lx, ly, rx, ry, rgba(STONE, a * 0.40), 0.55);
        }
        // Inner vertical block lines
        for (let c = 1; c < W_COLS; c++) {
          const wx = -TW + 2 * TW * (c / W_COLS);
          const [tx, ty] = project(wx, -TH, z, cx, cy);
          const [bx, by] = project(wx,  TH, z, cx, cy);
          line(tx, ty, bx, by, rgba(STONE, a * 0.40), 0.55);
        }
      }

      // Edge vignette
      const vig = ctx.createRadialGradient(
        cx, cy, Math.min(W, H) * 0.28,
        cx, cy, Math.max(W, H) * 0.82
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.70)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.5s ease-in",
      }}
    />
  );
}
