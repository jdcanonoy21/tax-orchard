"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import Hero from "../components/Hero";
import SectionTwo from "../components/SectionTwo";
import SectionThree from "../components/SectionThree";
import SectionFour from "../components/SectionFour";
import SectionFive from "../components/SectionFive";
import SectionSix from "../components/SectionSix";
import SectionSeven from "../components/SectionSeven";
import SectionEight from "../components/SectionEight";
import SectionNine from "../components/SectionNine";
import SectionTen from "../components/SectionTen";
import SectionEleven from "../components/SectionEleve";
import SectionLast from "../components/SectionLast";

export default function Page() {
  const videoRef = useRef(null);
  const mainRef = useRef(null);
  const scrollValueRef = useRef(0);

  // Use useScroll with target and offset
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start end", "end start"],
  });

  // Store the latest clamped scroll value in a ref
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clampedV = v <= 0.09 ? 0 : v;
    scrollValueRef.current = clampedV;

    const video = videoRef.current;
    if (video && video.readyState >= 2 && video.duration) {
      if (clampedV === 0) {
        video.pause();
        // Don't try to seek here, let useEffect handle it
      } else {
        const targetTime = Math.min(2.2 * v, 1) * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          const step = () => {
            if (!video) return;
            const diff = targetTime - video.currentTime;
            if (Math.abs(diff) < 0.05) {
              video.currentTime = targetTime;
              return;
            }
            video.currentTime += diff * 0.2;
            requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else {
          video.currentTime = targetTime;
        }
      }
    }
    // console.log("Scroll progress:", clampedV);
  });

  // useEffect to ensure video resets to 0 when scroll is at top
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handle = setInterval(() => {
      if (scrollValueRef.current === 0 && video.currentTime !== 0) {
        video.currentTime = 0;
      }
    }, 0);

    return () => clearInterval(handle);
  }, [scrollValueRef]);

  return (
    <main ref={mainRef}>
      {/* <div className="fixed w-full h-screen overflow-hidden -z-10 opacity-50">
        <video
          muted
          ref={videoRef}
          loop={false}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/images/vid_0.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <Hero />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
      {/* <SectionNine /> */}
      {/* <SectionTen /> */}
      <SectionEleven />
      {/* <SectionLast /> */}
    </main>
  );
}
