"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

interface Props {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrambleHeading({ children, className, style }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Blank the text immediately so it scrambles in (not out)
    el.textContent = "";

    const trig = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          duration: 1.2,
          scrambleText: {
            text: children,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            speed: 0.5,
            revealDelay: 0.15,
          },
        });
      },
    });

    return () => trig.kill();
  }, [children]);

  return (
    <h2 ref={ref} className={className} style={style}>
      {children}
    </h2>
  );
}
