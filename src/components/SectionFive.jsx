"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SectionFive() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

  return (
    <section className="mb-32">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="track w-full">
          <div className="flex flex-col gap-32 items-center justify-center">
            <div className="text-center max-w-4xl">
              <h2 className="text-[90px] font-proxima-bold leading-none font-black text-white">
                You can be buried. Or you can be planted.
              </h2>
            </div>
            <div
              className="flex justify-center text-center max-w-4xl"
              ref={ref}
            >
              <svg
                className="w-[650px] h-auto mb-8 "
                id="ground"
                viewBox="0 0 800 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.line
                  x1="0"
                  y1="10"
                  initial={false}
                  animate={inView ? { x2: 800 } : { x2: 0 }}
                  y2="10"
                  stroke="white"
                  strokeWidth="10"
                  id="groundLine"
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
