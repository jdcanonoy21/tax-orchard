"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function SectionTwo() {
  const [startTypingAnim, setStartTypingAnim] = useState(false);
  const [startWordAnim, setStartWordAnim] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const colorText = "tax bill that takes up to half of your earnings.";
  const colorWords = colorText.split(" ");
  const [colorDone, setColorDone] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView && !startTypingAnim) {
      setStartTypingAnim(true);
    }
    if (!inView) {
      setStartTypingAnim(false);
      setStartWordAnim(false);
      setWordIndex(0);
      setColorDone(false);
    }
    // Always reset second animation if first is not done
    if (!startTypingAnim) {
      setStartWordAnim(false);
      setWordIndex(0);
      setColorDone(false);
    }
  }, [inView, startTypingAnim]);

  useEffect(() => {
    if (!startWordAnim) return;
    if (wordIndex >= colorWords.length) {
      setTimeout(() => setColorDone(true), 300);
      return;
    }
    const timer = setTimeout(() => {
      setWordIndex((i) => i + 1);
    }, 180);
    return () => clearTimeout(timer);
  }, [startWordAnim, wordIndex, colorWords.length]);

  return (
    <section
      id="section-two"
      className="min-h-screen flex items-center justify-center p-8 "
      ref={ref}
    >
      <div className="text-center max-w-4xl">
        <h2 className="text-5xl font-proxima-regular leading-tight text-white">
          <span>If you’ve just sold a business,</span>
          {startTypingAnim && (
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
