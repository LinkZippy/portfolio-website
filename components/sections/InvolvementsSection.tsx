"use client";
import { motion } from "motion/react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import ScrambleHeading from "@/components/ui/scramble-heading";

const involvements = [
  {
    title: "World Affairs Council",
    image: "/images/involvements/world-affairs-council.jpg",
    label: "world-affairs-council.jpg",
    className: "absolute top-10 left-[15%] rotate-[-5deg]",
  },
  {
    title: "Zeta Psi Fraternity",
    image: "/images/involvements/zeta-psi.jpg",
    label: "zeta-psi.jpg",
    className: "absolute top-40 left-[30%] rotate-[7deg]",
  },
  {
    title: "DartSlam Volleyball",
    image: "/images/involvements/dartslam-volleyball.jpg",
    label: "dartslam-volleyball.jpg",
    className: "absolute top-5 left-[48%] rotate-[-3deg]",
  },
  {
    title: "Office of Pluralism & Leadership",
    image: "/images/involvements/pluralism-leadership.jpg",
    label: "pluralism-leadership.jpg",
    className: "absolute top-32 left-[62%] rotate-[9deg]",
  },
  {
    title: "Aegis Yearbook",
    image: "/images/involvements/aegis-yearbook.jpg",
    label: "aegis-yearbook.jpg",
    className: "absolute top-20 right-[10%] rotate-[-8deg]",
  },
  {
    title: "Thai Student Association",
    image: "/images/involvements/thai-student-association.jpg",
    label: "thai-student-association.jpg",
    className: "absolute top-52 left-[5%] rotate-[4deg]",
  },
  {
    title: "International Student Office",
    image: "/images/involvements/international-student.jpg",
    label: "international-student.jpg",
    className: "absolute top-16 left-[75%] rotate-[-6deg]",
  },
  {
    title: "Dartmouth Chamber Orchestra",
    image: "/images/involvements/chamber-orchestra.jpg",
    label: "chamber-orchestra.jpg",
    className: "absolute top-64 left-[44%] rotate-[3deg]",
  },
];

export default function InvolvementsSection() {
  return (
    <section
      id="involvements"
      className="min-h-screen text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrambleHeading
            className="text-4xl md:text-6xl font-bold text-white text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Off-screen Involvements
          </ScrambleHeading>
          <p
            className="text-sm text-neutral-500 text-center mt-3 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            try dragging the tiles!
          </p>
        </motion.div>
      </div>

      {/* Watermark text */}
      <div className="relative w-full" style={{ minHeight: "700px" }}>
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-[8vw] font-bold text-white opacity-[0.03] whitespace-nowrap"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            DRAG ME
          </span>
        </div>

        {/* Cards */}
        <DraggableCardContainer className="relative w-full h-full">
          {involvements.map((item) => (
            <DraggableCardBody key={item.title} className={item.className}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </p>
              <p
                className="text-xs text-neutral-500 mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Dartmouth College
              </p>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </section>
  );
}
