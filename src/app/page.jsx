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
  const [hideFinalpage, setHideFinalpage] = useState(false);

  useEffect(() => {
    const isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isChrome) {
      const lenis = new Lenis({
        smooth: true,
        lerp: 1,
        duration: 0,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }

    if (isSafari) {
      const lenis = new Lenis({
        smooth: true,
        lerp: 0.09,
        duration: 1.2,
      });

      window.lenis = lenis; // Make Lenis globally accessible

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Observe body overflow changes
      const observer = new MutationObserver(() => {
        if (document.body.style.overflow === "hidden") {
          lenis.stop();
        } else {
          lenis.start();
        }
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
      });

      return () => {
        lenis.destroy();
        observer.disconnect();
        window.lenis = undefined;
      };
    }
  }, []);

  return (
    <>
      <main ref={mainRef}>
        <Hero />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        <SectionSeven />
        <SectionHarvest setHideFinalpage={setHideFinalpage} />
        {/* <SectionEight /> */}
        {/* <SectionNine /> */}
        {/* <SectionTen /> */}
        {/* <SectionEleven /> */}
        {/* <SectionLast /> */}
      </main>
    </>
  );
}
