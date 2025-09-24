"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [heroAnimation, setHeroAnimation] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 0) {
        setHeroAnimation(true);
      } else {
        setHeroAnimation(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-8 bg-black">
      <motion.div
        initial={{ opacity: 1, x: 0, y: 0 }}
        animate={{ opacity: 1, x: heroAnimation ? -250 : 0, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
        style={{ position: "fixed" }}
      >
        <img
          src="/images/tax-orchard-logo.svg"
          alt="Tax Orchard Logo"
          className="h-10"
        />
      </motion.div>

      <div className="relative z-20 text-center flex-grow flex flex-col justify-center items-center py-8">
        <motion.h2
          className="text-6xl md:text-[218px] font-black tracking-wide leading-none font-schabo mb-6 cursor-pointer hover:opacity-80 transition-opacity duration-300 text-white"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: heroAnimation ? -280 : 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          TAX ORCHARD
        </motion.h2>
        <motion.p
          className="text-xl md:text-[40px] font-proxima-regular font-semibold text-white"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: heroAnimation ? 1.15 : 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          Your success shouldn’t be buried by taxes.
        </motion.p>
      </div>

      <div className="relative z-20 flex justify-center pb-8">
        <div className="w-14 h-14 rounded-full flex items-center justify-center">
          <img
            src="/images/down-arrow.svg"
            alt="Scroll down"
            className="w-8 h-8"
          />
        </div>
      </div>
    </section>
  );
}
