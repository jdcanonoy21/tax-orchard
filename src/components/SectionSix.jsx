import React, { useRef, useState } from "react";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  useTransform,
  useInView,
} from "framer-motion";

export default function SectionSix() {
  const rootContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [lastProgress, setLastProgress] = useState(0);
  const scrollTimeout = useRef(null);
  const rootTextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const targetVideoTimeRef = useRef(0);

  // Scroll progress for video: start when section enters viewport, end when it leaves
  const { scrollYProgress: videoScrollYProgress } = useScroll({
    target: rootContainerRef,
    offset: ["start end", "end start"],
  });

  // Scroll progress for x/y: start at center, end at center
  const { scrollYProgress: xyScrollYProgress } = useScroll({
    target: rootContainerRef,
    offset: ["start end", "end start"],
  });

  // Smooth horizontal/vertical scroll transforms
  const delayedProgress = useTransform(xyScrollYProgress, [0.3, 1], [0, 1]);

  const x = useTransform(delayedProgress, [0, 1], ["0%", "-195%"]);
  const y = useTransform(delayedProgress, [0, 1], ["0%", "-55%"]);

  const isRootTextInView = useInView(rootTextRef, { amount: 0.5, once: false });

  useMotionValueEvent(videoScrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    const VIDEO_LENGTH = 4; // seconds

    if (video && latest > 0) {
      const progress = Math.min(latest / 0.5, 1);
      const targetTime = progress * VIDEO_LENGTH;
      targetVideoTimeRef.current = targetTime;

      // Smoothly animate currentTime towards targetTime
      const animateVideo = () => {
        if (!video) return;
        const current = video.currentTime;
        const target = targetVideoTimeRef.current;
        const diff = target - current;

        // If close enough, snap to target and stop animating
        if (Math.abs(diff) < 0.05) {
          video.currentTime = target;
          animationFrameRef.current = null;
          return;
        }

        // Move a smaller fraction toward the target for smoother effect
        video.currentTime = current + diff * 0.08;
        animationFrameRef.current = requestAnimationFrame(animateVideo);
      };

      // Only start animation if not already running
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateVideo);
      }

      // Play video while scrolling
      if (video.paused) video.play();
      video.playbackRate = 2;

      // Clear previous timeout and set a new one to pause after 200ms of no scroll
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (!video.paused) video.pause();
        // Cancel animation frame after pausing
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }, 200);

      setLastProgress(latest);
    } else if (video && latest === 0) {
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      video.currentTime = 0;
      video.pause();
      setLastProgress(0);
    }
  });

  return (
    <section
      className="relative overflow-x-clip pb-28 bg-black  !z-50 "
      ref={rootContainerRef}
    >
      <div className="sticky top-0 flex items-center overflow-visible w-[1500px] h-[1200px]">
        {/* Apply smooth scroll transforms to .track */}
        <motion.div
          className="track w-full"
          style={{
            x: x,
            y: y,
            willChange: "transform",
          }}
        >
          <div className="w-full relative ">
            <div className="relative flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img
                  src="/images/seed.png"
                  alt="Seed"
                  className="w-52 h-auto relative z-10 js-fade-right"
                />
                <div className="relative">
                  <div
                    className="w-[1500] h-[1200px] bg-black"
                    id="rootContainer"
                  >
                    <video
                      ref={videoRef}
                      src="/images/roots.mp4"
                      muted
                      className="absolute top-0 left-1/2 ml-[348px] -translate-x-1/2 w-[2000px] h-[1200px] object-cover object-top z-0 -mt-10"
                    />
                  </div>
                  {/* Fade-in-right animation for text */}
                  <motion.div
                    ref={rootTextRef}
                    initial={{ x: 100, opacity: 0 }}
                    animate={
                      isRootTextInView
                        ? { x: 0, opacity: 1 }
                        : { x: 100, opacity: 0 }
                    }
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -right-[700px] top-[410px] transform -translate-y-1/2 max-w-3xl pr-20"
                  >
                    <div className="flex flex-col gap-4 pr-10">
                      <p className="text-[40px] font-proxima-regular leading-none text-white">
                        At Tax Orchard, we help you turn what you owe into
                        something that grows—using a strategy no one else
                        offers.
                        <span className="font-proxima-bold">
                          We turn your tax liability into an assets.
                        </span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
