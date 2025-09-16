"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useInView,
} from "framer-motion";

export default function SectionFive() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const [pathLine, setPathLine] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newPathLine = latest > 0.6 ? 1 : scrollYProgress;
    setPathLine(newPathLine);
  });

  return (
    <section
      className="h-screen flex items-center overflow-hidden"
      ref={sectionRef}
    >
      <div className="track w-full">
        <div className="flex flex-col gap-32 items-center justify-center">
          <div className="text-center max-w-4xl">
            <h2 className="text-[90px] font-proxima-bold leading-none font-black text-white">
              You can be buried. Or you can be planted.
            </h2>
          </div>
          <div className="relative w-full h-8 mt-8">
            <svg
              width="100%"
              height="8"
              viewBox="0 0 1000 8"
              className="absolute left-0 top-0"
            >
              <motion.line
                x1="0"
                y1="4"
                x2="1000"
                y2="4"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  pathLength: pathLine,
                }}
                initial={{ pathLength: 0 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
