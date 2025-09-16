"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
export default function SectionNine() {
  const [showSecondSection, setShowSecondSection] = useState(true);
  // Use scroll position to control h2 animation
  const sectionNineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionNineRef,
    offset: ["start start", "end end"],
  });
  // h2 moves down to center, then slides out left as you scroll further
  const whiteSectionHeight = 800; // Use a fixed value for demo, adjust as needed
  const yCenter = whiteSectionHeight * 1; // y center (lowest point)
  // y: 0 to yCenter (first 60%), steady at yCenter (60%-80%), then stays
  const y = useTransform(
    scrollYProgress,
    [0, 0.6, 0.8, 1],
    [0, yCenter, yCenter, yCenter]
  );
  // x: stays 0 until 80%, then slides left (last 20% of scroll)
  const x = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, -1400]);
  // Color stays white throughout scroll
  const color = useTransform(scrollYProgress, [0, 1], ["#fff", "#fff"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Element is in view nine: ", latest);

    if (latest >= 1) {
      setShowSecondSection(false);
    }
  });

  return (
    <AnimatePresence>
      <motion.section
        className="flex flex-col relative"
        ref={sectionNineRef}
        key="section-nine"
        initial={{ opacity: 1 }}
        animate={{
          opacity: 1,
          position: showSecondSection ? "relative" : "absolute",
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.6 },
          position: showSecondSection ? "relative" : "absolute",
        }}
      >
        <div className="min-h-screen flex items-center justify-center p-8 absolute w-full">
          <div className="text-center mx-auto w-full">
            <motion.h2
              className="text-[183px] font-proxima-bold leading-none font-black mx-auto w-full mix-blend-difference "
              id="theHarvest"
              style={{
                y,
                x,
                color,
                display: showSecondSection ? "block" : "none",
                left: showSecondSection ? undefined : "-100vw",
                position: "relative",
              }}
              onAnimationComplete={() => {
                setShowSecondSection(false);
              }}
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
      </motion.section>

      {!showSecondSection && (
        <section
          className="bg-white min-h-screen flex items-center justify-center p-8 relative w-full"
          key="section-two"
        >
          <div
            className="text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 1 }}
          >
            <div
              className="flex justify-center items-end relative"
              id="threeTrees"
            >
              <img
                src="/images/year-ten-tree.svg"
                alt="Year 10"
                className="w-full  h-[370px]"
                id="tree1"
              />
              <img
                src="/images/year-ten-tree.svg"
                alt="Year 10"
                className="w-full h-[430px] relative !z-50"
                id="tree2"
              />
              <img
                src="/images/tree-behind.svg"
                alt="Year 10"
                className="w-full h-[430px] absolute top-[34px] z-10"
                id="tree2"
              />
              <img
                src="/images/year-ten-tree.svg"
                alt="Year 10"
                className="w-full  h-[370px]"
                id="tree3"
              />
            </div>
          </div>
        </section>
      )}
    </AnimatePresence>
  );
}
