import React, { useEffect, useRef, useState } from "react";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  useTransform,
  useInView,
} from "framer-motion";
import GroundLine from "./groundLine";

export default function SectionSix() {
  if(typeof window === "undefined") return null;

  const rootContainerRef = useRef(null);
  const videoRef = useRef(null);
  const videoMobileRef = useRef(null);
  const [lastProgress, setLastProgress] = useState(0);
  const [mobileVideoFinished, setMobileVideoFinished] = useState(false);
  const rootTextRef = useRef(null);
  const rootTextMobileRef = useRef(null);
  const animationFrameRef = useRef(null);
  const targetVideoTimeRef = useRef(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const sectionFiveRef = useRef(null);
  const [showGround,  setShowGround] = useState(false);
  // Scroll progress for video: start when section enters viewport, end when it leaves
  const { scrollYProgress: videoScrollYProgress } = useScroll({
    target: rootContainerRef,
    offset: ["start center", "end center"],
  });

  // Scroll progress for x/y: start at center, end at center
  const { scrollYProgress: xyScrollYProgress } = useScroll({
    target: rootContainerRef,
    offset: ["start end", "end start"],
  });

  // Smooth horizontal/vertical scroll transforms
  const delayedProgress = useTransform(xyScrollYProgress, [0.4, 1], [0, 1]);

  const x = useTransform(delayedProgress, [0, isMobile ? 0.4 : 1], ["0%", isMobile ? '-155%' : "-145%"]);
  const y = useTransform(delayedProgress, [0, isMobile ? 0.4 : 1], ["0%",  "-55%"]);
  const yGround = useTransform(delayedProgress, [0, isMobile ? 0.4 : 1], ["0%", "-150%"]);

  const isRootTextInView = useInView(rootTextRef, { amount:  0.5, once: false });
  const isMobileVideoInView = useInView(videoMobileRef, { amount: 0.1, once: false });

  useMotionValueEvent(videoScrollYProgress, "change", (latest) => {
    const video = isMobile ? videoMobileRef.current : videoRef.current;
    const VIDEO_LENGTH = video?.duration || 5; // seconds

    // console.log("Video scroll progress:", latest, VIDEO_LENGTH, video?.currentTime);

         if (video && latest > 0) {
          
          const progress =isMobile ? latest :  Math.min(latest / 1.2, 1);
          const targetTime = progress * VIDEO_LENGTH;
          targetVideoTimeRef.current = targetTime;
    
          // Ensure video is paused (we're scrubbing, not playing)
          if (!video.paused) video.pause();


          if(isMobile) {
            /**
             * For mobile, we just jump to the target time directly for simplicity
             */
            video.currentTime = targetTime;

            console.log('Mobile video time set to:', progress, targetTime, VIDEO_LENGTH);

            if(targetTime >= (VIDEO_LENGTH - 0.15)) setMobileVideoFinished(true)
              else setMobileVideoFinished(false);


            return;
          }
            

    
          // Smoothly animate currentTime towards targetTime
          const animateVideo = () => {
            if (!video) return;
            const current = video.currentTime;
            const target = targetVideoTimeRef.current;
            const diff = target - current;

            // console.log('Animating video:', { current, target, diff });
            // If close enough, snap to target and stop animating
            if (Math.abs(diff) < 0.02 ) {
              video.currentTime = target;
              animationFrameRef.current = null;
              return;
            }
    
            // Move a fraction toward the target for smoother effect
            video.currentTime = current + diff * 0.5;
            animationFrameRef.current = requestAnimationFrame(animateVideo);
          };
    
          // Only start animation if not already running
          if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(animateVideo);
          }
    
          setLastProgress(latest);
        } else if (video && latest === 0) {
          // Cancel animation frame
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          video.currentTime = 0;
          if (!video.paused) video.pause();
          setLastProgress(0);
        }

  });

  useEffect(() => {
    const sectionFive = document.querySelector('.sectionFive');
    console.log(
      'Section Six mounted, sectionFive element:', sectionFive,
      rootContainerRef
    );
    sectionFiveRef.current = sectionFive
    setShowGround(true);
  }, [])

  // Simple play/pause for mobile video based on visibility
  React.useEffect(() => {
    if(!isMobile) return;
    const video = videoMobileRef.current;
    console.log('Mobile video effect triggered:', { video: !!video, isMobileVideoInView, videoSrc: video?.src });
    
    if (!video) {
      console.log('No mobile video element found');
      return;
    }

    // Add event listener for when video ends
    const handleVideoEnd = () => {
      console.log('Mobile video finished playing');
      setMobileVideoFinished(true);
    };


    video?.load();
    video.addEventListener('ended', handleVideoEnd);


    if (isMobile) {
      // console.log('Mobile video is in view, attempting to play');
      video.pause();

    } else {
      // console.log('Mobile video is out of view, pausing');
      video.pause();
      // Reset finished state when video goes out of view
      setMobileVideoFinished(false);
    }

    // Cleanup event listener
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [isMobile]);

  return (
    <section
      className="relative overflow-x-clip  bg-black md:pt-80  !z-40 w-screen"
      ref={rootContainerRef}
    >
      {showGround && (
        <motion.div
          className="relative -top-[10vh] md:-top-[50vh] w-full left-0 flex justify-center items-center z-10"
          style={{
              x: x,
              y: yGround,
              willChange: "transform",
            }}
          >
          <GroundLine 
            sectionRef={sectionFiveRef}
          />
        </motion.div>
      )}
      <div className="sticky top-0 flex md:items-center overflow-visible h-[50vh] md:h-[500px]">
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
                  className="w-20 md:w-52 h-auto relative z-10 js-fade-right"
                />
                <div className="relative">
                  <div
                    className=" h-[1000px] md:w-[1500px] md:h-[1000px] bg-black hidden md:block "
                    id="rootContainer"
                  >
                    <video

                      ref={videoRef}
                      width='100%' height='100%'
                      src="/images/roots.mp4"
                      muted
                      playsInline
                      webkit-playsinline="true"
                      preload="metadata"
                      type='video/mp4'
                      className="relative md:absolute top-0 ml-[100px] left-0 -translate-x-1/4 md:left-1/2 md:ml-[308px] md:-translate-x-1/2 w-[1000px] h-[600px] md:w-[2000px] md:h-[1200px] object-cover object-top z-0 "
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
                    className="absolute md:-right-[700px] -right-[300px] md:mt-auto -mt-20  transform -translate-y-1/2 max-w-3xl md:pr-20 md:w-full  hidden md:block"
                    style={{ top:  "380px", zIndex: 9999 }}
                  >
                    <div className="flex flex-col gap-4 px-28 md:pr-10 md:w-full w-96">
                      <p className="md:text-3xl text-base leading-snug md:text-[40px] font-proxima-regular md:leading-none text-white">
                        At Tax Orchard, we help you turn what you owe into
                        something that grows—using a strategy no one else
                        offers.
                        <span className="font-proxima-bold">
                          We turn your tax liability into an assets.
                        </span>
                      </p>
                    </div>
                  </motion.div>


                  <motion.div
                    ref={rootTextMobileRef}
                    initial={{ x: '200%', opacity: 0 }}
                    animate={mobileVideoFinished ? { x: '105%', opacity: 1 } : { x: '200%', opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute md:-right-[700px]  md:mt-auto -mt-20  transform   max-w-3xl md:pr-20 md:w-full  block md:hidden "
                    style={{ top:  "380px", zIndex: 9999 }}
                  >
                    <div className="flex flex-col gap-4 md:px-28 md:pr-10  w-screen px-8">
                      <p className="!text-3xl text-base leading-snug md:text-[40px] font-proxima-regular md:leading-none text-white">
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

                 <div className="block md:hidden relative w-[800px] h-[600px] left-2 z-1 mt-0 overflow-clip">
                     <video
                       ref={videoMobileRef}
                       muted
                       playsInline
                       webkit-playsinline="true"
                       preload="metadata"
                       className="  w-full object-cover object-top ml-[150px] -mt-4"
                     >
                       <source src="/images/roots.webm" type="video/webm" />
                       <source src="/images/roots.mp4" type="video/mp4" />
                     </video>
                   </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
