"use client";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import ScrambleHeading from "@/components/ui/scramble-heading";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const links = [
  {
    label: "Email",
    value: "pattapol2006@gmail.com",
    href: "mailto:pattapol2006@gmail.com",
    Icon: ({ className }: { className?: string }) => <Mail className={className} />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/pattapol-sirimangklanurak",
    href: "https://linkedin.com/in/pattapol-sirimangklanurak",
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "github.com/LinkZippy",
    href: "https://github.com/LinkZippy",
    Icon: GithubIcon,
  },
];

// Floating geometric shapes
const shapes = [
  { type: "circle", size: 120, top: "10%", left: "5%", delay: 0 },
  { type: "square", size: 80, top: "70%", left: "8%", delay: 2 },
  { type: "circle", size: 60, top: "20%", right: "8%", delay: 1 },
  { type: "square", size: 100, top: "60%", right: "5%", delay: 3 },
  { type: "circle", size: 40, top: "45%", left: "15%", delay: 1.5 },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen text-white py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Floating geometric shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: shape.top,
            left: "left" in shape ? shape.left : undefined,
            right: "right" in shape ? (shape as { right: string }).right : undefined,
            width: shape.size,
            height: shape.size,
            borderRadius: shape.type === "circle" ? "50%" : "4px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: shape.type === "square" ? [0, 45, 0] : [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrambleHeading
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {"Let's Connect"}
          </ScrambleHeading>
          <p className="text-neutral-400 text-lg mb-12">
            Feel free to reach out — I&apos;m always open to new conversations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          {links.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
            >
              <Icon className="w-5 h-5" />
              <div className="text-left">
                <p
                  className="text-xs text-neutral-600 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {label}
                </p>
                <p className="text-sm">{value}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p
          className="text-xs text-neutral-700"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © 2026 Pattapol (Phoom) Sirimangklanurak · Built with Next.js
        </p>
      </div>
    </section>
  );
}
