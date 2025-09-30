import React, { useRef, useEffect } from "react";
import { useScroll, motion, useSpring } from "framer-motion";

// Add animation CSS globally once
if (typeof window !== "undefined" && !window.__sectionSixAnimCSS) {
  const style = document.createElement("style");
  style.textContent = `
    .animate-fade-in-right {
      animation: fadeInRight 0.8s ease-out forwards;
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(50px);}
      to { opacity: 1; transform: translateX(0);}
    }
  `;
  document.head.appendChild(style);
  window.__sectionSixAnimCSS = true;
}

export default function SectionSix() {
  const rootContainerRef = useRef(null);
  const videoRef = useRef(null);
  const trackRef = useRef(null);

  // Framer Motion scroll progress for video
  const { scrollYProgress } = useScroll({
    target: rootContainerRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 100,
  });

  // Video scroll sync
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const unsubscribe = smoothProgress.on("change", (progress) => {
      const clamped = Math.max(0, Math.min(0.9, progress));
      const normalized = clamped / 0.9;
      if (video.duration) video.currentTime = normalized * video.duration;
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Fade-in animation for .js-fade-right, trigger if progress > 0.5, reset if <= 0.5
  useEffect(() => {
    const elements =
      rootContainerRef.current?.querySelectorAll(".js-fade-right") || [];
    if (!elements.length) return;

    // Helper to reset animation
    function resetAnimation() {
      elements.forEach((el) => {
        el.classList.remove("animate-fade-in-right");
        el.classList.add("opacity-0");
      });
    }

    // Helper to trigger animation
    function triggerAnimation() {
      elements.forEach((el, idx) => {
        if (!el.classList.contains("animate-fade-in-right")) {
          el.style.willChange = "transform, opacity";
          el.classList.add("animate-fade-in-right");
          el.classList.remove("opacity-0");
          el.addEventListener(
            "animationend",
            () => {
              el.style.willChange = "";
            },
            { once: true }
          );
        }
      });
    }

    // Listen to scroll progress to trigger/reset animation
    let cleanup = null;
    if (typeof window !== "undefined") {
      const handle = smoothProgress.on("change", (progress) => {
        if (progress > 0.4) {
          triggerAnimation();
        }

        if (progress <= 0.3) {
          resetAnimation();
        }
      });
      cleanup = () => handle();
    }

    // Initial state
    resetAnimation();

    return () => {
      if (cleanup) cleanup();
    };
  }, [smoothProgress, rootContainerRef]);

  // Horizontal/vertical smooth scroll for .track
  useEffect(() => {
    const section = rootContainerRef.current;
    const track = trackRef.current;
    const sticky = section?.querySelector(".sticky");
    if (!section || !track) return;

    let sectionTop = 0,
      sectionHeight = 0;
    function recalc() {
      const rect = section.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
      sectionHeight =
        section.offsetHeight -
        (sticky ? sticky.offsetHeight : window.innerHeight);
    }
    function clamp(v, min, max) {
      return Math.min(Math.max(v, min), max);
    }
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    let rafId = null,
      currentX = 0,
      targetX = 0,
      currentY = 0,
      targetY = 0;
    track.style.willChange = "transform";
    track.style.transform = "translate3d(0%,0%,0)";

    function animate(progress) {
      rafId = requestAnimationFrame(() => {
        // Smoothing increases with progress (faster as you scroll further)
        // You can tweak the formula for your desired feel
        const minSmoothing = 0.07;
        const maxSmoothing = 0.25;
        const smoothing =
          minSmoothing + (maxSmoothing - minSmoothing) * progress;

        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;
        if (
          Math.abs(targetX - currentX) < 0.5 &&
          Math.abs(targetY - currentY) < 0.5
        ) {
          currentX = targetX;
          currentY = targetY;
        }
        track.style.transform = `translate3d(${currentX}%,${currentY}%,0)`;
        if (currentX !== targetX || currentY !== targetY) animate(progress);
        else rafId = null;
      });
    }

    function onScroll() {
      const scrollY = window.scrollY;
      const progress =
        sectionHeight > 0
          ? clamp((scrollY - sectionTop) / sectionHeight, 0, 1)
          : 0;
      const startX = 0,
        endX = -65,
        startY = 0,
        endY = -15;
      targetX = lerp(startX, endX, progress);
      targetY = lerp(startY, endY, progress);
      if (progress <= 0 || progress >= 1) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        currentX = targetX;
        currentY = targetY;
        track.style.transform = `translate3d(${currentX}%,${currentY}%,0)`;
        return;
      }
      if (!rafId) animate(progress);
    }
    recalc();
    window.addEventListener("resize", recalc, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen pb-28 overflow-x-clip bg-black -mt-20"
      ref={rootContainerRef}
      id="section-4"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-visible">
        <div className="track w-full" ref={trackRef}>
          <div className="w-full relative ">
            <div className="relative flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img
                  src="/images/seed.png"
                  alt="Seed"
                  className="w-52 h-auto relative z-10"
                />
                <div className="relative w-[1500px] h-[900px]">
                  <div
                    className="w-[1500] h-[900px] ml-[305px]"
                    id="rootContainer"
                  >
                    <motion.video
                      ref={videoRef}
                      src="/images/roots.mp4"
                      muted
                      className="absolute top-0 w-full h-full object-cover object-top z-0 -mt-10"
                    />
                  </div>
                  <div
                    id="section-4-text"
                    className="absolute -right-[700px] top-[340px] transform -translate-y-1/2 max-w-3xl pr-20 js-fade-right opacity-0"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
