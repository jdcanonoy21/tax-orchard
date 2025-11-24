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

// IndexedDB utility functions for video caching
const DB_NAME = "videoCache";
const DB_VERSION = 1;
const STORE_NAME = "videos";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

const getVideoFromCache = async (videoUrl) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(videoUrl);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn("Error reading from IndexedDB:", error);
    return null;
  }
};

const storeVideoInCache = async (videoUrl, blob) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, videoUrl);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn("Error storing in IndexedDB:", error);
  }
};

export default function Page() {
  const mainRef = useRef(null);
  const videoRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const hasPlayedPast127 = useRef(false);
  const blobUrlRef = useRef(null);
  const videoPrimedRef = useRef(false);
  const isScrubbingRef = useRef(false);
  const [hideFinalpage, setHideFinalpage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cachedVideoUrl, setCachedVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  // Load video from IndexedDB cache or fetch and store it
  useEffect(() => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      // Fallback to original URL if IndexedDB is not available
      setCachedVideoUrl("/images/bill-transformation_V12.mp4");
      return;
    }

    const videoUrl = "/images/bill-transformation_V12.mp4";

    const loadVideo = async () => {
      try {
        // First, try to get video from IndexedDB cache
        const cachedBlob = await getVideoFromCache(videoUrl);
        
        if (cachedBlob) {
          // Video found in cache, create blob URL
          const blobUrl = URL.createObjectURL(cachedBlob);
          blobUrlRef.current = blobUrl;
          setCachedVideoUrl(blobUrl);
          console.log("Video loaded from IndexedDB cache");
        } else {
          // Video not in cache, fetch it
          console.log("Video not in cache, fetching...");
          const response = await fetch(videoUrl);
          
          if (!response.ok) {
            throw new Error("Failed to fetch video");
          }
          
          const blob = await response.blob();
          
          // Store in IndexedDB for future use
          await storeVideoInCache(videoUrl, blob);
          console.log("Video stored in IndexedDB cache");
          
          // Create blob URL for immediate use
          const blobUrl = URL.createObjectURL(blob);
          blobUrlRef.current = blobUrl;
          setCachedVideoUrl(blobUrl);
        }
      } catch (error) {
        console.warn("Error loading/caching video:", error);
        // Fallback to original URL if caching fails
        setCachedVideoUrl(videoUrl);
      }
    };

    loadVideo();

    // Cleanup: revoke blob URL when component unmounts
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  // Track video readiness and control loading state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !cachedVideoUrl) return;

    let isReady = false;

    const checkVideoReady = () => {
      // Video is ready when it can play through without buffering
      if (video.readyState >= 4 || (video.readyState >= 3 && video.buffered.length > 0)) {
        if (!isReady) {
          isReady = true;
          setVideoReady(true);
          // Add a small delay to ensure everything is stable
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      }
    };

    const handleCanPlayThrough = () => {
      if (!isReady) {
        isReady = true;
        setVideoReady(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    const handleLoadedData = () => {
      checkVideoReady();
    };

    const handleProgress = () => {
      checkVideoReady();
    };

    // Check initial state
    checkVideoReady();

    // Listen for video ready events
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('progress', handleProgress);

    // Fallback: if video doesn't fire canplaythrough after a delay, check readyState
    const fallbackCheck = setTimeout(() => {
      if (!isReady && video.readyState >= 2) {
        checkVideoReady();
      }
    }, 2000);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('progress', handleProgress);
      clearTimeout(fallbackCheck);
    };
  }, [cachedVideoUrl]);

  // Disable scrolling when loading
  useEffect(() => {
    if (isLoading) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Stop Lenis if it exists
      if (window.lenis) {
        window.lenis.stop();
      }

      // Prevent scroll events
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('scroll', preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = '';
        
        if (window.lenis) {
          window.lenis.start();
        }

        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('scroll', preventScroll);
      };
    } else {
      // Re-enable scrolling when loaded
      document.body.style.overflow = '';
      
      if (window.lenis) {
        window.lenis.start();
      }
    }
  }, [isLoading]);
  
  const resetVideoToStart = React.useCallback(() => {
    // Don't reset if we're actively scrubbing
    if (isScrubbingRef.current) return;
    
    const v = videoRef.current;
    if (!v) return;
    try {
      // If metadata is ready, set immediately; otherwise wait for it
      if (v.readyState >= 1) {
        v.currentTime = 0;
      } else {
        const once = () => {
          if (!isScrubbingRef.current) {
            try { v.currentTime = 0; } catch (_) {}
          }
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
        videoInputRange: [0, 0.05, 0.08, 0.071, 0.072, 0.2],
        videoOutputRange: ["160vw", "140vw", "0vw", "0vw", "0vw", "0vw"],
        videoObjectInputRange: [0, 0.05, 0.08, 0.081, 0.28],
        videoObjectOutputRange: ["30% center", "center center","35% center","40% center","50% center"],
        overlayInputRange: [0, 0.12, 0.14],
        overlayOutputRange: ["0vw", "0vw", "-100vw"],
      };
    }



    return {
      videoInputRange: 
      [0, 0.07, 0.0832, 0.135, 0.15, 0.1745,0.189,0.194],
      videoOutputRange: ["200vw", "100vw", "20vw", "20vw", "-13vw", "35vw", "35vw", ".5vw"],
      videoObjectInputRange: [0, 1],
      videoObjectOutputRange: ["30% center", "30% center"],
      overlayInputRange: [0, 0.138, 0.141],
      overlayOutputRange: ["0vw", "-10vw", "-20vw"],
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

  const {
    sectionThreeInputRange,
    sectionThreeOutputRange,
  } = useMemo(() => {
    if (isMobile) {
      return {
        sectionThreeInputRange: [0, 0.181, 0.188],
        sectionThreeOutputRange: ["0vw", "0vw", "-100vw"],
      };
    }

    return {
      sectionThreeInputRange: [0, 0.181,0.189, 0.2],
      sectionThreeOutputRange: ["0vw", "0vw","0vw", "-100vw"],
    };
  }, [isMobile]);

  const sectionThreeX = useTransform(
    scrollYProgress,
    sectionThreeInputRange,
    sectionThreeOutputRange
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.144, 0.145],
    [1, 1, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // console.log('progress', progress);
    setShowVideo(true)

    // Hide video when progress >= threshold
    const hideVideoThreshold = isMobile ? 0.3 : 0.305;
    if (progress >= hideVideoThreshold) {
      setHideVideo(true);
    } else {
      setHideVideo(false);
    }

    const video = videoRef.current;
    if (!video) return;

    // Ensure video metadata is loaded and primed
    if (video.readyState >= 1 && video.duration && videoPrimedRef.current) {
      // Map progress value (0 to 1) to video duration
      // Adjust the progress range as needed for when video should start/end
      const startProgress = isMobile ? 0.12 : 0.14; // Video starts at 14% scroll
      const continueProgress = isMobile ? 0.181 : 0.189; // Resume scrubbing from 0.181 scroll
      const pauseProgressThreshold = isMobile ? 0.175 : 0.175; // Stop scrubbing at 2.5s when progress reaches 0.175
      const secondPauseProgress = isMobile ? 0.27 : 0.31; // Video reaches end at 30% scroll
      
      const pauseTime = 2.5; // Pause at 2.5 seconds of the video
      const resumeStartTime = 3.3; // Resume scrubbing from 3 seconds
      const slowDownTime = 1; // Slow down at 1 second of the video
      const endVideoTime = 6.3; // End time at 6 seconds
      
      if (progress < startProgress) {
        // Before video range - reset to start and pause
        isScrubbingRef.current = false;
        video.currentTime = 0;
        if (!video.paused) video.pause();
        video.playbackRate = 1.0; // Normal speed
      } else if (progress >= startProgress && progress < continueProgress) {
        isScrubbingRef.current = true;
        if (progress >= pauseProgressThreshold) {
          video.currentTime = pauseTime;
          video.playbackRate = 0.1;
          if (!video.paused) video.pause();
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
        
        if (!video.paused) video.pause(); // Keep paused during scrubbing for smoother control
      } else if (progress >= continueProgress && progress < secondPauseProgress) {
        // Continue scrubbing video from 3 seconds based on scroll
        isScrubbingRef.current = true;
        const normalizedProgress = (progress - continueProgress) / (secondPauseProgress - continueProgress);
        const videoTime = resumeStartTime + (normalizedProgress * (endVideoTime - resumeStartTime));
        
        video.currentTime = Math.min(videoTime, endVideoTime);
        video.playbackRate = 1.0; // Normal speed
        if (!video.paused) video.pause(); // Keep paused during scrubbing
        hasPlayedPast127.current = true;
      } else if (progress >= secondPauseProgress) {
        // Pause the video at the end
        isScrubbingRef.current = false;
        video.currentTime = endVideoTime;
        if (!video.paused) video.pause();
      }
    }
  });

  // Prime the video for Chrome - play once then pause to allow scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !cachedVideoUrl || videoPrimedRef.current) return;

    const primeVideo = async () => {
      if (videoPrimedRef.current) return;
      
      try {
        // Wait for video to be ready
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve) => {
            const onCanPlay = () => {
              video.removeEventListener('canplay', onCanPlay);
              resolve();
            };
            video.addEventListener('canplay', onCanPlay);
          });
        }

        // Prime the video by playing once then immediately pausing
        // This allows Chrome to scrub the video smoothly
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          await playPromise;
        }
        
        // Immediately pause and reset to start
        video.pause();
        video.currentTime = 0;
        videoPrimedRef.current = true;
      } catch (error) {
        console.warn('Video priming failed:', error);
        // Still mark as primed to avoid retry loops
        videoPrimedRef.current = true;
      }
    };

    primeVideo();
  }, [cachedVideoUrl]);

  // Ensure the background video always starts from the beginning (only when not scrubbing)
  useEffect(() => {
    const el = videoRef.current;
    if (!el || isScrubbingRef.current) return;

    const handleLoadedMetadata = () => {
      if (!isScrubbingRef.current) {
        try { el.currentTime = 0; } catch (_) {}
      }
    };
    el.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      el.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current && !isScrubbingRef.current) {
      try { videoRef.current.currentTime = 0; } catch (_) {}
    }
  }, [showVideo]);




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
    // Don't initialize Lenis until loading is complete
    if (isLoading) return;

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      duration: 1.2,
    });

    window.lenis = lenis; // Make Lenis globally accessible
    console.log('Lenis initialized:', lenis);

    function raf(time) {
      lenis.raf(time);
      // Log scrollY value
      console.log('Lenis scrollY:', lenis.scroll);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Also listen to scroll events
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      console.log('Lenis scroll event - scrollY:', scroll, 'progress:', progress);
    });

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
  }, [isLoading]);


  return (
    <div className="relative md:overflow-none overflow-x-clip bg-black"  ref={mainRef}>
      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
          style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg font-medium"
            >
              Loading...
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Video Background */}
      <div className="relative ">
        <motion.video
          ref={videoRef}
          className={`fixed top-0 left-0 md:left-0 md:w-full w-[screen] md:h-full h-screen flex object-cover md:object-cover z-0 ${hideVideo ? 'opacity-0' : showVideo ? 'opacity-80' : 'opacity-100'}`}
          style={{ x: videoX, objectPosition: videoObjectPosition, willChange: 'transform, object-position' }}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          src={cachedVideoUrl || "/images/bill-transformation_V12.mp4"}
          onLoadedMetadata={resetVideoToStart}
          onLoadedData={resetVideoToStart}
          onCanPlay={resetVideoToStart}
          onCanPlayThrough={() => {
            resetVideoToStart();
            if (!videoReady && videoRef.current && videoRef.current.readyState >= 4) {
              setVideoReady(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
            }
          }}
        >
          {cachedVideoUrl ? (
            <source src={cachedVideoUrl} type="video/mp4" />
          ) : (
            <source src="/images/bill-transformation_V12.mp4" type="video/mp4" />
          )}
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

      <div className="relative z-20 ">
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
