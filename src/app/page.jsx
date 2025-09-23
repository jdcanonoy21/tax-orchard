"use client";

import React, { useRef, useEffect } from "react";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
} from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";

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

  const { scrollYProgress } = useScroll({ target: mainRef });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: mainRef.current,
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

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
