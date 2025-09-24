"use client";

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useScroll, useMotionValueEvent, useInView } from "motion/react";

export default function SectionEight({
  setFlippedJourney = () => {},
  setFlippedCalendar = () => {},
  setIsSticky = () => {},
  setFlipToBlankPage = () => {},
  setFlipFirst = () => {},
  setRemoveSticky = () => {},
  currentPage,
}) {
  const sectionCalendarRef = useRef(null);
  const isInView = useInView(sectionCalendarRef, { amount: 0.2 });
  const [journeyTriggered, setJourneyTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !journeyTriggered) {
      setFlippedJourney(true);
      setJourneyTriggered(true);
    }
    if (!isInView && journeyTriggered) {
      setJourneyTriggered(false); // Reset when out of view
    }
  }, [isInView, journeyTriggered, setFlippedJourney]);

  useEffect(() => {
    if (journeyTriggered) {
      const handleScroll = () => {
        if (sectionCalendarRef.current) {
          const rect = sectionCalendarRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.2) {
            setFlipFirst(true);
            window.removeEventListener("scroll", handleScroll);
          }

          if (rect.bottom < 0) {
            setRemoveSticky(true);
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [journeyTriggered, setFlipFirst, setRemoveSticky]);

  return (
    <>
      <div
        className={`overflow-hidden min-h-screen bg-black`}
        ref={sectionCalendarRef}
      >
        <div className="  w-screen flex justify-center items-center relative"></div>
      </div>
      <div className={`overflow-hidden min-h-screen bg-black`}>
        <div className="  w-screen flex justify-center items-center relative"></div>
      </div>
    </>
  );
}
