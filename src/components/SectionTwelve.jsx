"user client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  useMotionValueEvent,
} from "framer-motion";
import SectionContact from "./SctionContact";

export default function SectionTwelve({ setHideFinalpage }) {
  const sectionRef = useRef(null);
  const sectionContainerRef = useRef(null);
  const sectionWhiteDivRef = useRef(null);
  const treesRef = useRef(null);
  const tree1Ref = useRef(null);
  const tree2Ref = useRef(null);
  const tree3Ref = useRef(null);
  const svgLogo = useRef(null);
  const growTextRef = useRef(null);
  const sectionContactRef = useRef(null);
  const treesContentRef = useRef(null);
  const treesTextOneRef = useRef(null);
  const treesTextTwoRef = useRef(null);

  // Animate when section center hits viewport center
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    console.log("Section Harvest scroll:", progress);


  });

  const sectionX = useTransform(
    scrollYProgress,
    [0.32, 0.33],
    ["0vw", "-100vw"]
  );




  return (
    <div className="relative w-full  -z-10 overfl" ref={sectionRef}>
      <motion.section
        className="sticky top-0 w-full bg-black min-h-screen overflow-x-clip z-30"
        ref={sectionContainerRef}
        style={{ x: sectionX }}
        transition={{ x: { type: "spring", stiffness: 60, damping: 24 } }}
      >
        <div className="sticky -top-40 w-full mix-blend-difference h-screen flex items-center justify-center isolate z-30">
          <motion.h2 className="mix-blend-difference text-white text-[183px] font-proxima-bold leading-none text-center">
            The Harvest
          </motion.h2>
        </div>
        <motion.div
          className={`min-h-screen  bg-white `}
          ref={sectionWhiteDivRef}
        ></motion.div>
      </motion.section>
    </div>
  );
}
