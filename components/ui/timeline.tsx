"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-transparent" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto px-4 pb-20">

        {/* Center line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-1/2 -translate-x-px top-0 w-[2px] overflow-hidden
            bg-[linear-gradient(to_bottom,transparent_0%,rgb(64,64,64)_10%,rgb(64,64,64)_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-white via-neutral-400 to-transparent rounded-full"
          />
        </div>

        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className="relative flex items-start pt-20 md:pt-32">

              {/* Dot on center line — always visible */}
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-neutral-700 z-10 mt-1" />

              {isLeft ? (
                <>
                  <motion.div
                    className="w-[calc(50%-3rem)] mr-12 text-left"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <h3 className="text-2xl md:text-4xl font-bold text-neutral-500 mb-4"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {item.title}
                    </h3>
                    {item.content}
                  </motion.div>
                  <div className="flex-1" />
                </>
              ) : (
                <>
                  <div className="flex-1" />
                  <motion.div
                    className="w-[calc(50%-3rem)] ml-12 text-left"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <h3 className="text-2xl md:text-4xl font-bold text-neutral-500 mb-4"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {item.title}
                    </h3>
                    {item.content}
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
