"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionThree() {
  const sectionRef = useRef(null);

  // Framer Motion scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scale from 0.5 to 1.25 as section scrolls into view
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.5, 1.25]);
  // Opacity: visible only when in viewport
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.99, 1],
    [0, 1, 1, 0]
  );
  // Y offset for h3
  const y = useTransform(scale, (s) => -40 * (s - 0.5));

  return (
    <section
      id="section-three"
      className="min-h-screen flex items-center justify-center px-8 py-4 scroll-smooth"
      ref={sectionRef}
    >
      <div className="text-center max-w-4xl text-white">
        <motion.h3
          className="text-[45px] font-proxima-regular font-semibold"
          style={{
            y, // Pass the MotionValue directly for translateY
            transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          That’s not a reward.
        </motion.h3>
        <motion.h2
          className="text-[90px] font-proxima-bold leading-none font-bold"
          style={{
            scale,
            opacity,
            transition:
              "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s",
          }}
        >
          It’s a penalty for doing everything right.
        </motion.h2>
      </div>
    </section>
  );
}
