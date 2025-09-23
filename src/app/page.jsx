"use client";

import React, { useRef, useEffect, useState } from "react";
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
  const mainRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: mainRef.current,
      smooth: true,
    });

    // scroll.on("scroll", (obj) => {
    //   setScrollY(obj.scroll.y);
    //   console.log("Scroll Y:", obj.scroll.y);
    // });

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
