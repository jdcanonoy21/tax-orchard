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

  useEffect(() => {
    function handleScroll() {
      if (!sectionTwoRef.current) return;

      const rect = sectionTwoRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Calculate scroll progress: 0 when section bottom is at bottom of viewport,
      // 1 when section top is at top of viewport (fully scrolled through)
      let progress = 0;
      if (rect.height > 0) {
        const sectionStart = windowHeight - rect.top;
        progress = sectionStart / (windowHeight + rect.height);
        progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
      }

      // Log the normalized scroll progress value
      // console.log("SectionTwo normalized scroll progress:", progress);

      let idx = 0;
      let idxTwo = 0;
      const totalWords = revealWords.length + revealWordsTwo.length;

      // Start word reveal only if progress >= 0.2
      if (progress >= 0.15) {
        const revealProgress = (progress - 0.15) / 0.8; // Normalize from 0.2-1 to 0-1
        // Double the reveal speed: reveal 2 words per step
        const totalReveal = Math.floor(revealProgress * totalWords * 2);

        if (totalReveal <= revealWords.length) {
          idx = totalReveal;
          idxTwo = 0;
        } else {
          idx = revealWords.length;
          idxTwo = totalReveal - revealWords.length;
          if (idxTwo > revealWordsTwo.length) idxTwo = revealWordsTwo.length;
        }

        // If scrolled past halfway, show all
        if (progress >= 0.45) {
          idx = revealWords.length;
          idxTwo = revealWordsTwo.length;
        }
      } else {
        idx = 0;
        idxTwo = 0;
      }

      setRevealIndex(idx);
      setRevealIndexTwo(idxTwo);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealWords.length, revealWordsTwo.length]);

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
