"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionNine() {
  // Use scroll position to control h2 animation
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // h2 moves down to center, then slides out left as you scroll further
  const whiteSectionHeight = 800; // Use a fixed value for demo, adjust as needed
  const yCenter = whiteSectionHeight * 1; // y center (lowest point)
  // y: 0 to yCenter (first 60% of scroll), then stays
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [0, yCenter, yCenter]);
  // x: stays 0 until 60%, then slides left (last 40% of scroll)
  const x = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, -1400]);
  // Color stays white throughout scroll
  const color = useTransform(scrollYProgress, [0, 1], ["#fff", "#fff"]);

  return (
    <>
      <section className="flex flex-col relative " ref={sectionRef}>
        <div className="min-h-screen flex items-center justify-center p-8 absolute w-full">
          <div className="text-center mx-auto w-full">
            <motion.h2
              className="text-[183px] font-proxima-bold leading-none font-black mx-auto w-full mix-blend-difference "
              id="theHarvest"
              style={{ y, x, color }}
            >
              The Harvest
            </motion.h2>
          </div>
        </div>
        <div className="min-h-screen bg-black flex items-center justify-center p-8"></div>
        <div
          className="min-h-screen bg-white flex items-center justify-center p-8"
          id="section-white"
        ></div>
      </section>
    </>
  );
}
