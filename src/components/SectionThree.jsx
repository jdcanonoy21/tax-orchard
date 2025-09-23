"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SectionThree() {
  const [scale, setScale] = useState(0.5);
  const [opacity, setOpacity] = useState(0);
  const [y, setY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Start progress calculation as soon as section enters the viewport
      if (sectionRect.bottom <= 0 || sectionRect.top >= windowHeight) {
        setOpacity(0);
        return;
      }

      // Calculate how much of the section is visible from 0 (just entered) to 1 (just leaving)
      const visibleStart = Math.max(sectionRect.top, 0);
      const visibleEnd = Math.min(sectionRect.bottom, windowHeight);
      const visibleHeight = Math.max(visibleEnd - visibleStart, 0);

      // Progress: 0 when section just enters, 1 when about to leave
      const progress = Math.min(
        Math.max(
          (windowHeight - visibleStart) / (windowHeight + section.offsetHeight),
          0
        ),
        1
      );

      // If progress >= 4.5, stop updating scale (cap progress at 4.5 for scale calculation)
      const cappedProgress = Math.min(progress, 0.45);

      console.log("scrollY (normalized 0-1):", progress);

      setOpacity(progress > 0 && progress < 1 ? 1 : 0);

      const newScale = 0.5 + cappedProgress * (2.25 - 0.5);
      setScale(newScale);
      setY(-80 * (newScale - 0.5));
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="section-three"
      className="min-h-screen flex items-center justify-center px-8 py-4 scroll-smooth"
      ref={sectionRef}
    >
      <div className="text-center max-w-4xl text-white">
        <h3
          className="text-[45px] font-proxima-regular font-semibold"
          style={{
            // Move up more as h2 scales: use a larger multiplier and base offset
            transform: `translateY(${-40 * (scale - 0.5)}px)`,
            transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          That’s not a reward.
        </h3>
        <h2
          className="text-[90px] font-proxima-bold leading-none font-bold"
          style={{
            transform: `scale(${scale})`,
            opacity,
            transition:
              "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s",
          }}
        >
          It’s a penalty for doing everything right.
        </h2>
      </div>
    </section>
  );
}
