"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

import Hero from "../components/Hero";
import SectionTwo from "../components/SectionTwo";
import SectionThree from "../components/SectionThree";
import SectionFour from "../components/SectionFour";
import SectionFive from "../components/SectionFive";
import SectionSix from "../components/SectionSix";
import SectionSeven from "../components/SectionSeven";
import SectionHarvest from "../components/SectionHarvest";
import SectionTwelve from "../components/SectionTwelve";

export default function Page() {
  const mainRef = useRef(null);
  const videoRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const hasPlayedPast127 = useRef(false);
  const [hideFinalpage, setHideFinalpage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);
  
  const resetVideoToStart = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      // If metadata is ready, set immediately; otherwise wait for it
      if (v.readyState >= 1) {
        v.currentTime = 0;
      } else {
        const once = () => {
          try { v.currentTime = 0; } catch (_) {}
          v.removeEventListener('loadedmetadata', once);
        };
        v.addEventListener('loadedmetadata', once);
      }
    } catch (_) {}
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start end", "end start"],
  });

  // Slide the video in from right (-100%) to center as the user scrolls
  // Stop at 0.105 (20vw), then move to 0vw at 0.108
  const {
    videoInputRange,
    videoOutputRange,
    videoObjectInputRange,
    videoObjectOutputRange,
    overlayInputRange,
    overlayOutputRange,
  } = useMemo(() => {
    if (isMobile) {
      return {
        videoInputRange: [0, 0.05, 0.09, 0.13, 0.17, 0.2],
        videoOutputRange: ["160vw", "90vw", "0vw", "0vw", "0vw", "-20vw"],
        videoObjectInputRange: [0, 0.2],
        videoObjectOutputRange: ["30% center", "75% center"],
        overlayInputRange: [0, 0.12, 0.16],
        overlayOutputRange: ["0vw", "0vw", "-12vw"],
      };
    }



    return {
      videoInputRange: 
      [0, 0.073, 0.08, 0.135, 0.15, 0.172,0.185,0.194],
      videoOutputRange: ["200vw", "100vw", "20vw", "20vw", "-13vw", "35vw", "35vw", ".5vw"],
      videoObjectInputRange: [0, 1],
      videoObjectOutputRange: ["50% center", "50% center"],
      overlayInputRange: [0, 0.138, 0.141],
      overlayOutputRange: ["0vw", "0vw", "-20vw"],
    };
  }, [isMobile]);

  const videoX = useTransform(scrollYProgress, videoInputRange, videoOutputRange);
  const videoObjectPosition = useTransform(
    scrollYProgress,
    videoObjectInputRange,
    videoObjectOutputRange
  );
  const overlayX = useTransform(scrollYProgress, overlayInputRange, overlayOutputRange);

  const sectionTwoX = useTransform(
    scrollYProgress,
    [0, 0.135, 0.16],
    ["0vw", "0vw", "100vw"]
  );

  const sectionThreeX = useTransform(
    scrollYProgress,
    [0, 0.181, 0.2, ],
    ["0vw", "0vw", "-100vw"]
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.144, 0.145],
    [1, 1, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    console.log('progress', progress);
    setShowVideo(true)

    // Hide video when progress >= 0.32
    if (progress >= 0.309) {
      setHideVideo(true);
    } else {
      setHideVideo(false);
    }

    const video = videoRef.current;
    if (!video) return;

    // Ensure video metadata is loaded
    if (video.readyState >= 1 && video.duration) {
      // Map progress value (0 to 1) to video duration
      // Adjust the progress range as needed for when video should start/end
      const startProgress = 0.14; // Video starts at 14% scroll
      const continueProgress = 0.181; // Resume scrubbing from 0.181 scroll
      const pauseProgressThreshold = 0.175; // Stop scrubbing at 2.5s when progress reaches 0.175
      const secondPauseProgress = 0.31; // Video reaches end at 30% scroll
      
      const pauseTime = 2.5; // Pause at 2.5 seconds of the video
      const resumeStartTime = 3.3; // Resume scrubbing from 3 seconds
      const slowDownTime = 1; // Slow down at 1 second of the video
      const endVideoTime = 6.3; // End time at 6 seconds
      
      if (progress < startProgress) {
        // Before video range - reset to start and pause
        video.currentTime = 0;
        video.pause();
        video.playbackRate = 1.0; // Normal speed
      } else if (progress >= startProgress && progress < continueProgress) {
        if (progress >= pauseProgressThreshold) {
          video.currentTime = pauseTime;
          video.playbackRate = 0.1;
          video.pause();
          return;
        }
        // Scrub video from startProgress to continueProgress, mapping to 0-2.5 seconds
        let normalizedProgress = (progress - startProgress) / (continueProgress - startProgress);
        
        // Slow down when video reaches 1 second - divide progress by 3
        if (normalizedProgress * pauseTime >= slowDownTime) {
          // Calculate how much progress we've made past 1 second
          const progressAtOneSecond = slowDownTime / pauseTime;
          const progressAfterOneSecond = normalizedProgress - progressAtOneSecond;
          // Divide the progress after 1 second by 3 to slow it down
          normalizedProgress = progressAtOneSecond + (progressAfterOneSecond / 1);
        }
        
        video.currentTime = normalizedProgress * pauseTime;
        video.playbackRate = 0.1; // Slower playback rate
        
        video.pause(); // Keep paused during scrubbing for smoother control
      } else if (progress >= continueProgress && progress < secondPauseProgress) {
        // Continue scrubbing video from 3 seconds based on scroll
        const normalizedProgress = (progress - continueProgress) / (secondPauseProgress - continueProgress);
        const videoTime = resumeStartTime + (normalizedProgress * (endVideoTime - resumeStartTime));
        
        video.currentTime = Math.min(videoTime, endVideoTime);
        video.playbackRate = 1.0; // Normal speed
        video.pause(); // Keep paused during scrubbing
        hasPlayedPast127.current = true;
      } else if (progress >= secondPauseProgress) {
        // Pause the video at the end
        video.currentTime = endVideoTime;
        video.pause();
      }
    }
  });

  // Ensure the background video always starts from the beginning
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleLoadedMetadata = () => {
      try { el.currentTime = 0; } catch (_) {}
    };
    el.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      el.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      try { videoRef.current.currentTime = 0; } catch (_) {}
    }
  }, [showVideo]);

  // Pause the video even though autoplay is enabled
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const pauseVideo = () => {
      try {
        video.pause();
      } catch (_) {}
    };

    // Pause on load
    if (video.readyState >= 2) {
      pauseVideo();
    } else {
      video.addEventListener('canplay', pauseVideo, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', pauseVideo);
    };
  }, []);

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
    <div className="relative" ref={mainRef}>
      {/* Video Background */}
      <div className="relative ">
        <motion.video
          ref={videoRef}
          className={`fixed top-0 left-0 md:left-0 md:w-full w-[screen] md:h-full h-screen flex object-cover md:object-cover z-0 ${hideVideo ? 'opacity-0' : showVideo ? 'opacity-80' : 'opacity-100'}`}
          style={{ x: videoX, objectPosition: videoObjectPosition, willChange: 'transform, object-position' }}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          onLoadedMetadata={resetVideoToStart}
          onLoadedData={resetVideoToStart}
          onCanPlay={resetVideoToStart}
          onPlay={() => { if (videoRef.current && videoRef.current.currentTime > 0.1 && !hasPlayedPast127.current) { try { videoRef.current.currentTime = 0; } catch(_) {} } }}
        >
          <source src="/images/bill-transformation_V12.mp4" type="video/mp4" />
        </motion.video> 

        {/* 70% white cover on the left */}

        <motion.div
          className="fixed top-0 left-0 h-full w-[51%] bg-black z-10 pointer-events-none"
          style={{ x: overlayX, opacity: overlayOpacity, willChange: "transform, opacity" }}
        />
        {/* Right-edge fade from white to transparent */}
        <motion.div
          className="fixed top-0 left-[50%] h-full w-[45%] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
          style={{ x: overlayX, opacity: overlayOpacity, willChange: "transform, opacity" }}
        />
      </div>

      <div className="relative z-20">
        <Hero />
        <div className=" sticky top-0">
          <motion.div 
            ref={sectionTwoRef} 
            style={{ 
              x: sectionTwoX, 
              y: 0,
              willChange: 'transform' 
            }}
          >
            <SectionTwo externalScrollYProgress={scrollYProgress} />
          </motion.div>


        </div>

        <div className="relative">
          <div className="h-[100vh]"></div>
          <div className="h-[200px]"></div>
          <div className="sticky top-0 z-50 w-full">
            <motion.div
              style={{
                x: sectionThreeX,
                willChange: 'transform'
              }}
              className="w-full"
            >
              <SectionThree />
            </motion.div>
          </div>
          {/* Add spacer to allow sticky to work properly */}
          <div className="h-[50vh]"></div>
        </div>


        <SectionFour />

        
        <SectionFive />
        <SectionSix externalScrollYProgress={scrollYProgress}/>
        <SectionSeven />
        {/* <SectionTwelve  /> */}
        <SectionHarvest setHideFinalpage={setHideFinalpage} />
      </div>
    </div>
  );
}
