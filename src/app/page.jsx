"use client";

import React, { useRef, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

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
import SectionHarvest from "../components/SectionHarvest";

export default function Page() {
  const mainRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.09,
      // duration: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
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
        <SectionHarvest />
        {/* <SectionEight /> */}
        {/* <SectionNine /> */}
        {/* <SectionTen /> */}
        {/* <SectionEleven /> */}
        {/* <SectionLast /> */}
      </main>
    </>
  );
}
