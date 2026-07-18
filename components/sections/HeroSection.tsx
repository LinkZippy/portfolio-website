"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid overlay — sits on top of the global canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center gap-12"
      >
        <TextFlippingBoard text={"HEY THERE!\nI am Phoom :)\nthe h is silent btw"} />

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-xs tracking-[0.3em] uppercase text-neutral-500"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SCROLL
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-neutral-500 to-transparent"
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
