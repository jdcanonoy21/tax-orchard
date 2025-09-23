"use client";

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useScroll, useMotionValueEvent } from "motion/react";

export default function SectionEight({
  setFlippedJourney = () => {},
  setFlippedCalendar = () => {},
  setIsSticky = () => {},
  setFlipToBlankPage = () => {},
}) {
  const sectionCalendarRef = useRef(null);
  // const flipBookRef = useRef(null);
  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionCalendarRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Section 8 scroll:", latest);

    if (latest >= 0.3) {
      setFlippedJourney(true);
    }

    if (latest >= 0.4) {
      setFlipToBlankPage(true);
    }

    // if (latest < 0.3) {
    //   setFlippedJourney(false);
    // }

    // if (latest >= 0.8) {
    //   setFlippedCalendar(true);
    // }

    // if (latest >= 1) {
    //   setIsSticky(false);
    // }
  });

  return (
    <div className={`overflow-hidden `} ref={sectionCalendarRef}>
      <div className="min-h-screen bg-white w-screen flex justify-center items-center relative"></div>
    </div>
  );
}
