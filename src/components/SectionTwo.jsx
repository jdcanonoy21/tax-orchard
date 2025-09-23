"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

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

  const { scrollYProgress } = useScroll({
    target: wordRevealRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Reveal first sentence up to its length
    let idx = 0;
    let idxTwo = 0;
    const totalWords = revealWords.length + revealWordsTwo.length;

    // Calculate total progress in words
    const totalReveal = Math.floor(latest * totalWords);

    if (totalReveal <= revealWords.length) {
      idx = totalReveal;
      idxTwo = 0;
    } else {
      idx = revealWords.length;
      idxTwo = totalReveal - revealWords.length;
      if (idxTwo > revealWordsTwo.length) idxTwo = revealWordsTwo.length;
    }

    // If scrolled past halfway, show all
    if (latest >= 0.5) {
      idx = revealWords.length;
      idxTwo = revealWordsTwo.length;
    }

    setRevealIndex(idx);
    setRevealIndexTwo(idxTwo);

    console.log("Section 2 scroll:", latest);
  });

  useEffect(() => {
    if (revealIndexTwo === revealWordsTwo.length) {
      const timeout = setTimeout(() => setHighlight(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setHighlight(false);
    }
  }, [revealIndexTwo, revealWordsTwo.length]);

  return (
    <section
      className="min-h-screen flex items-center justify-center p-8 "
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
            style={{ display: "inline-block", minWidth: "1px" }}
          >
            {revealWordsTwo.map((word, i) => (
              <span
                key={i}
                className={highlight ? "text-green font-bold" : undefined}
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
