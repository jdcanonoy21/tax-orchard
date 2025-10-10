"use client";

import React, { useRef, useState, useEffect } from "react";

export default function SectionFour() {
  const sectionRef = useRef(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Calculate progress: 0 when section enters viewport, 1 when section is centered
      const sectionHeight = rect.height;
      const scrollStart = windowHeight;
      const scrollEnd = windowHeight / 2;

      const progress = Math.min(
        Math.max((scrollStart - rect.top) / (scrollStart - scrollEnd), 0),
        1
      );

      setLineProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
    <div className="absolute -top-32 left-0 bg-black flex justify-center items-center w-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="3" height="377" viewBox="0 0 3 377">
        <defs>
          <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#fff" stopOpacity="0"/>
            <stop offset="0.512" stopColor="#919191"/>
            <stop offset="1" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
          {/* Animated clip path that reveals the line from top to bottom */}
          <clipPath id="line-clip">
            <rect 
              x="0" 
              y="0" 
              width="3" 
              height={377 * Math.max(0, Math.min(lineProgress, 1))} 
            />
          </clipPath>
        </defs>
        <rect 
          id="Vertical_Line" 
          data-name="Vertical Line" 
          width="3" 
          height="377" 
          fill="url(#linear-gradient)" 
          clipPath="url(#line-clip)"
        />
      </svg>
    </div>
    <section
      id="section-four"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-8 bg-black"
    >
      <div className="text-center max-w-4xl">
        <h2 className="text-[45px] font-proxima-regular leading-snug text-white">
          But what if the weight of taxes <br /> could be turned into your{" "}
          <br /> foundation for{" "}
          <span className="text-blue font-proxima-regular font-extrabold">
            future growth?
          </span>
        </h2>
      </div>
    </section>
    
    </div>

  );
}
