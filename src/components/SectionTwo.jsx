"use client";

import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function SectionTwo() {
  const [startTypingAnim, setStartTypingAnim] = useState(false);
  const [startWordAnim, setStartWordAnim] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const fullText =
    "landed a major contract or are a high wage earner, you could be facing a";
  const colorText = "tax bill that takes up to half of your earnings.";
  const colorWords = colorText.split(" ");
  const [forceComplete, setForceComplete] = useState(false);
  const [colorDone, setColorDone] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3 });

  // Create a ref for the section to use with framer-motion
  const sectionRef = useRef(null);

  // Use scrollYProgress from framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Use useMotionValueEvent to finish animation if scrollYProgress >= 0.6
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.2) {
      setStartTypingAnim(false);
      setStartWordAnim(false);
      setWordIndex(0);
      setForceComplete(false);
      setColorDone(false);
    } else if (v > 0.45 && !forceComplete) {
      setForceComplete(true);
      setStartTypingAnim(true);
      setStartWordAnim(true);
      setWordIndex(colorWords.length);
      setColorDone(true);
    } else if (v > 0.3 && !startTypingAnim) {
      setStartTypingAnim(true);
    }
    // console.log("Section 2 scroll:", v);
  });

  // Combine refs for both inView and framer-motion
  function setRefs(node) {
    inViewRef(node);
    sectionRef.current = node;
  }

  return (
    <section
      id="section-two"
      className="min-h-screen flex items-center justify-center p-8 "
      ref={setRefs}
    >
      <div className="text-center max-w-4xl">
        <h2 className="text-5xl font-proxima-regular leading-tight text-white">
          <span>If you’ve just sold a business,</span>
          {forceComplete ? (
            // Instantly show the full sentence if forceComplete is true
            <span>{fullText} </span>
          ) : (
            // Otherwise, animate the sentence
            startTypingAnim && (
              <TypeAnimation
                sequence={[
                  "landed a major contract or are a high wage earner, you could be facing a ",
                  () => setStartWordAnim(true),
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                repeat={0}
              />
            )
          )}
          <span
            id="colorChange"
            className={
              colorDone
                ? "text-green font-bold transition-all duration-500"
                : "transition-all duration-500"
            }
          >
            {startWordAnim ? colorWords.slice(0, wordIndex).join(" ") : ""}
          </span>
        </h2>
      </div>
    </section>
  );
}
