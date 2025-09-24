"use client";

import React, { useRef, useState, useEffect } from "react";

export default function SectionFive() {
  const sectionRef = useRef(null);
  const [pathLine, setPathLine] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Calculate progress: 0 when section bottom touches viewport bottom, 1 when section top touches viewport top
      const sectionHeight = rect.height;
      const scrollStart = windowHeight;
      const scrollEnd = 0;

      const progress = Math.min(
        Math.max((scrollStart - rect.top) / (scrollStart - scrollEnd), 0),
        1
      );

      // console.log("Section scroll progress:", progress);

      // Start animation only if progress >= 0.7
      setPathLine(progress >= 0.7 ? (progress - 0.7) / 0.3 : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="h-screen flex items-center overflow-hidden bg-black"
      ref={sectionRef}
    >
      <div className="w-full">
        <div className="flex flex-col gap-32 items-center justify-center">
          <div className="text-center max-w-4xl">
            <h2 className="text-[90px] font-proxima-bold leading-none font-black text-white">
              You can be buried. Or you can be planted.
            </h2>
          </div>
          <div className="relative w-full h-8 mt-8">
            <svg
              width="100%"
              height="8"
              viewBox="0 0 1000 8"
              className="absolute left-0 top-0"
            >
              <line
                x1="0"
                y1="4"
                x2={1000 * Math.max(0, Math.min(pathLine, 1))}
                y2="4"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
