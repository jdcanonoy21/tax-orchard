"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const { scrollYProgress } = useScroll();

  // Move logoX from 0 to -250px as soon as scrollYProgress > 0 (very fast, within first 2% of scroll)
  const logoX = useTransform(scrollYProgress, [0, 0.01], [0, -250]);

  // Animate heading Y position: from 0 to -280px as scroll progresses from 0 to 0.01
  const headingY = useTransform(scrollYProgress, [0, 0.01], [0, -280]);

  // Animate paragraph scale: from 1 to 1.15 as scroll progresses from 0 to 0.2
  const paragraphScale = useTransform(scrollYProgress, [0, 0.01], [1, 1.15]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-8 bg-black">
      <motion.div
        initial={{ opacity: 1, x: 0, y: 0 }}
        style={{ position: "fixed", x: logoX }}
        transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
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
          style={{ y: headingY }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          TAX ORCHARD
        </motion.h2>
        <motion.p
          className="text-xl md:text-[40px] font-proxima-regular font-semibold text-white"
          initial={{ scale: 1, opacity: 1 }}
          style={{ scale: paragraphScale }}
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
