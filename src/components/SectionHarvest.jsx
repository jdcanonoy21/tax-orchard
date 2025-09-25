"user client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function SectionHarvest() {
  const sectionRef = useRef(null);

  // Animate when section center hits viewport center
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["center center", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);

  return (
    <div className="relative w-full h-screen -z-10">
      <motion.section className="relative bg-black min-h-screen overflow-x-clip z-30">
        <div className="sticky top-0 w-full mix-blend-difference h-screen flex items-center justify-center isolate z-30">
          <motion.h2
            style={{ x }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mix-blend-difference text-white text-[183px] font-proxima-bold leading-none text-center"
          >
            The Harvest
          </motion.h2>
        </div>
        <motion.div
          ref={sectionRef}
          className="min-h-screen bg-white flex items-center justify-center p-80"
        ></motion.div>
      </motion.section>
    </div>
  );
}
