"use client";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import ScrambleHeading from "@/components/ui/scramble-heading";

const Globe = dynamic(() => import("@/components/ui/globe"), { ssr: false });

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen text-white flex items-center py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left column — text */}
        <motion.div
          className="flex-1 lg:w-[60%]"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrambleHeading
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            About Me
          </ScrambleHeading>
          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              I&apos;m a junior from Chiang Mai, Thailand, planning to major in Applied
              Math and Quantitative Social Science at Dartmouth College. My interests
              center around using data science to address sociopolitical challenges
              and optimizing operations through predictive modeling and data
              normalization. I am driven by the challenge of applying different
              modeling approaches to real-world ambiguity, using tools like LightGBM
              and causal analysis to transform raw data into clear and strategic
              narratives.
            </p>
            <p>
              In my free time, I enjoy photography, playing video games and
              volleyball, watching soccer and tennis, running, collecting Magic: The
              Gathering cards, and trying new foods.
            </p>
          </div>
        </motion.div>

        {/* Right column — globe */}
        <motion.div
          className="lg:w-[40%] w-full max-w-sm mx-auto lg:mx-0"
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Globe />
        </motion.div>
      </div>
    </section>
  );
}
