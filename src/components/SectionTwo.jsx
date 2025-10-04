"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { scroller } from "react-scroll";

export default function SectionTwo() {
  const revealText =
    "landed a major contract or are a high wage earner, you could be facing a";
  const revealWords = revealText.split(" ");
  const revealTextTwo = "tax bill that takes up to half of your earnings.";
  const revealWordsTwo = revealTextTwo.split(" ");

  const [revealIndex, setRevealIndex] = useState(0);
  const [revealIndexTwo, setRevealIndexTwo] = useState(0);

  const sectionTwoRef = useRef(null);
  const wordRevealRef = useRef(null);
  const wordRevealRefTwo = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const [sticky, setIsSticky] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionTwoRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // console.log("Section 2 scroll:", progress);

    let idx = 0;
    let idxTwo = 0;
    const totalWords = revealWords.length + revealWordsTwo.length;

    // Reveal words between 0.15 and 0.45 progress (now normalized to 0-1)
    if (progress >= 0.15 && progress <= 0.45) {
      const revealProgress = (progress - 0.15) / 0.7; // Normalize 0.15-0.85 to 0-1
      const totalReveal = Math.floor(revealProgress * totalWords);

      if (totalReveal <= revealWords.length) {
        idx = totalReveal;
        idxTwo = 0;
      } else {
        idx = revealWords.length;
        idxTwo = totalReveal - revealWords.length;
        if (idxTwo > revealWordsTwo.length) idxTwo = revealWordsTwo.length;
      }
    } else if (progress > 0.45) {
      // Fully reveal all words after 0.85
      idx = revealWords.length;
      idxTwo = revealWordsTwo.length;
    } else {
      // Hide all words before 0.15
      idx = 0;
      idxTwo = 0;
    }

    // Highlight when progress > 0.55
    if (progress > 0.5) {
      if (!highlight) setHighlight(true);
    } else {
      if (highlight) setHighlight(false);
    }

    setRevealIndex(idx);
    setRevealIndexTwo(idxTwo);
  });

  return (
    <section
      className={`min-h-screen flex items-center justify-center p-8 ${
        sticky ? "sticky" : ""
      } top-0 bg-black`}
      ref={sectionTwoRef}
    >
      <div className="text-center max-w-4xl">
        <h2 className="text-5xl font-proxima-regular leading-tight text-white">
          <span>If you’ve just sold a business,</span>
          <span
            ref={wordRevealRef}
            style={{ display: "inline-block", minWidth: "1px" }}
          >
            {revealWords.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: i < revealIndex ? 1 : 0,
                  transition: "opacity 0.3s",
                  marginRight: "0.25em",
                  minWidth: "1ch", // ensures each word reserves space
                }}
              >
                {word}
              </span>
            ))}
          </span>{" "}
          <span
            ref={wordRevealRefTwo}
            style={{ display: "inline-block ", minWidth: "1px" }}
            className="!font-proxima-extrabold !font-extrabold"
          >
            {revealWordsTwo.map((word, i) => (
              <span
                key={i}
                className={highlight ? "text-green " : undefined}
                style={{
                  display: "inline-block",
                  opacity: i < revealIndexTwo ? 1 : 0,
                  transition: "opacity 0.3s",
                  marginRight: "0.25em",
                  minWidth: "1ch",
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h2>
      </div>
    </section>
  );
}
