"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 1.8;
    let animationId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 5,
      baseColor: [0.12, 0.12, 0.12],
      markerColor: [1, 1, 1],
      glowColor: [0.18, 0.18, 0.18],
      markers: [
        { location: [18.7883, 98.9853], size: 0.07 },  // Chiang Mai
        { location: [43.7022, -72.2896], size: 0.07 }, // Hanover, NH
      ],
    });

    const animate = () => {
      phi += 0.003;
      globe.update({ phi });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "auto", aspectRatio: "1 / 1" }}
      />
    </div>
  );
}
