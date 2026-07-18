"use client";
import { useEffect, useState } from "react";
import { Menu, X, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Involvements", href: "#involvements" },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm",
          scrolled
            ? "bg-black/80 border-b border-neutral-800"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-14 relative">

            {/* Desktop nav — centered */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest font-[var(--font-space-grotesk)] text-neutral-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download="pattapol_sirimangklanurak_resume.pdf"
                className="text-xs uppercase tracking-widest font-[var(--font-space-grotesk)] border border-neutral-600 px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors text-neutral-400 hover:text-black"
              >
                Download Resume
              </a>
              {/* Social icons */}
              <a href="mailto:pattapol2006@gmail.com" aria-label="Email"
                className="text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/pattapol-sirimangklanurak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-neutral-400 hover:text-white transition-colors">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/LinkZippy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="text-neutral-400 hover:text-white transition-colors">
                <GithubIcon />
              </a>
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-3 absolute right-0">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-1.5"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl uppercase tracking-widest text-white font-[var(--font-space-grotesk)] hover:text-neutral-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="text-sm uppercase tracking-widest border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-black transition-colors"
            >
              Download Resume
            </a>
            <div className="flex items-center gap-6 mt-2">
              <a href="mailto:pattapol2006@gmail.com" className="text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/pattapol-sirimangklanurak" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/LinkZippy" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
