"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SectionThree() {
  const [scale, setScale] = useState(1);
  const { ref, inView, entry } = useInView({ threshold: [0, 0.5, 1] });

  useEffect(() => {
    if (!entry || !inView) {
      setScale(0.8);
      return;
    }
    let lastScrollY = window.scrollY;
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScale((prev) => Math.min(prev + 0.02, 1.25));
      } else if (currentScrollY < lastScrollY) {
        setScale((prev) => Math.max(prev - 0.02, 0.8));
      }
      lastScrollY = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView, entry]);

  return (
    <section
      id="section-three"
      className="min-h-screen flex items-center justify-center px-8 py-4 scroll-smooth"
    >
      <div className="text-center max-w-4xl text-white" ref={ref}>
        <motion.h3
          className="text-[45px] font-proxima-regular font-semibold"
          initial={{ y: 0 }}
          animate={{ y: -80 * (scale - 0.8) }}
          transition={{ type: "spring", stiffness: 80, damping: 30 }}
        >
          That’s not a reward.
        </motion.h3>
        <motion.h2
          className="text-[90px] font-proxima-bold leading-none font-bold "
          style={{ scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          It’s a penalty for doing everything right.
        </motion.h2>
      </div>
    </section>
  );
}
