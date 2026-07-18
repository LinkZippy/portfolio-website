"use client";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import ScrambleHeading from "@/components/ui/scramble-heading";

export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="min-h-screen text-white py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <ScrambleHeading
            className="text-4xl md:text-6xl font-bold text-white text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            My Resume
          </ScrambleHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* PDF viewer placeholder */}
          <div className="w-full bg-neutral-900 border border-neutral-700 rounded-xl flex flex-col items-center justify-center gap-4" style={{ minHeight: "80vh" }}>
            <span
              className="text-neutral-500 text-sm text-center px-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ resume.pdf — drop file at /public/resume.pdf ]
            </span>
            <p className="text-neutral-600 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
              The PDF will render here once the file is added.
            </p>
          </div>

          {/* Download button */}
          <div className="flex justify-center mt-8">
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2 border border-neutral-600 text-white px-8 py-4 rounded-lg text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
