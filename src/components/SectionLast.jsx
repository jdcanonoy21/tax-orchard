"user client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function SectionLast() {
  const sectionRef = useRef(null);
  const treesRef = useRef(null);
  const tree1Ref = useRef(null);
  const tree2Ref = useRef(null);
  const tree3Ref = useRef(null);
  const treesTextOneRef = useRef(null);
  const treesTextTwoRef = useRef(null);

  const stickyThreshold = 1; // When scrollYProgress reaches 1, make sticky

  const [isSticky, setIsSticky] = useState(false);

  // Animate when section center hits viewport center
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["center center", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);
  const treesTextOpacity = useTransform(scrollYProgress, [0.97, 1], [0, 1]);

  const treesTextOneX = useTransform(
    scrollYProgress,
    [0.95, 1, 1.05],
    ["100vw", "0vw", "-100vw"]
  );
  const treesTextOneOpacity = useTransform(
    scrollYProgress,
    [0.97, 1, 1.05],
    [1, 1, 0]
  );

  // Animate treesTextTwoRef: slide in from right after treesTextOneRef exits
  const treesTextTwoX = useTransform(
    scrollYProgress,
    [1, 1.05],
    ["100vw", "0vw"]
  );
  const treesTextTwoOpacity = useTransform(scrollYProgress, [1, 1.05], [0, 1]);

  useEffect(() => {
    const treeRefs = [tree1Ref, tree2Ref, tree3Ref];
    treeRefs.forEach((imgRef) => {
      let svgDoc;
      fetch("/images/year-ten-tree.svg")
        .then((response) => response.text())
        .then((svgContent) => {
          const parser = new DOMParser();
          svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
          // Set initial opacity to 0.15 for all ellipses
          for (let i = 25; i <= 55; i++) {
            const ellipse = svgDoc.getElementById(`Ellipse_${i}-3`);
            if (ellipse) {
              ellipse.setAttribute("opacity", "0.15");
              ellipse.style.transition = "opacity 0.5s ease-in-out";
            }
          }
          const serializer = new XMLSerializer();
          const newSvgContent = serializer.serializeToString(svgDoc);
          if (imgRef.current) {
            imgRef.current.src =
              "data:image/svg+xml;base64," + btoa(newSvgContent);
          }
        });

      // Animate ellipses opacity on scroll
      const unsubscribe = treesTextOpacity.on("change", (latest) => {
        if (svgDoc) {
          const animatedOpacity = 0.15 + latest * (1 - 0.15);
          for (let i = 25; i <= 55; i++) {
            const ellipse = svgDoc.getElementById(`Ellipse_${i}-3`);
            if (ellipse) {
              ellipse.setAttribute("opacity", animatedOpacity);
            }
          }
          const serializer = new XMLSerializer();
          const newSvgContent = serializer.serializeToString(svgDoc);
          if (imgRef.current) {
            imgRef.current.src =
              "data:image/svg+xml;base64," + btoa(newSvgContent);
          }
        }
      });

      return () => unsubscribe();
    });
  }, [treesTextOpacity]);

  // useEffect(() => {
  //   const unsubscribe = scrollYProgress.on("change", (latest) => {
  //     setIsSticky(latest >= stickyThreshold);
  //   });
  //   return () => unsubscribe();
  // }, [scrollYProgress]);

  return (
    <>
      <motion.section className="relative bg-black min-h-screen overflow-x-clip">
        <div className="sticky top-0 w-full mix-blend-difference h-screen flex items-center justify-center isolate z-30">
          <motion.h2
            style={{ x }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mix-blend-difference text-white text-[183px] font-proxima-bold leading-none text-center"
          >
            The Harvest
          </motion.h2>
        </div>
        <motion.div
          ref={sectionRef}
          className="min-h-screen bg-white flex items-center justify-center p-80"
        ></motion.div>

        <motion.div
          ref={treesRef}
          className=" bg-white flex items-center justify-center p-8 w-full z-20 sticky top-0 h-screen"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={`text-center max-w-2xl `}>
            <div className="h-[200px] flex items-end w-full">
              <motion.div
                ref={treesTextOneRef}
                className="w-full text-[40px] font-proxima-regular leading-tight text-black"
                style={{
                  x: treesTextOneX,
                  opacity: treesTextOneOpacity,
                  position: "relative",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <span className="font-proxima-bold text-green">Year Ten:</span>{" "}
                You receive your full $500,000 back, possibly more.
              </motion.div>
              {/* <motion.p
                className="w-full text-[40px] font-proxima-regular leading-tight text-black"
                ref={treesTextTwoRef}
                style={{
                  x: treesTextTwoX,
                  opacity: treesTextTwoOpacity,
                  position: "relative",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                Your original tax bill?{" "}
                <span className="font-proxima-bold text-blue">Gone.</span> Fully
                eliminated through the growth and credits cultivated from your
                investment.
              </motion.p> */}
            </div>
            <div
              className="flex justify-center items-end relative"
              id="threeTrees"
            >
              <img
                ref={tree1Ref}
                alt="Year 10"
                className="w-full  h-[370px]"
                id="tree1"
              />
              <img
                ref={tree2Ref}
                alt="Year 10"
                className="w-full h-[430px] relative !z-50"
                id="tree2"
              />
              <img
                src="/images/tree-behind.svg"
                alt="Year 10"
                className="w-full h-[430px] absolute top-[34px] z-10"
                id="tree2a"
              />
              <img
                ref={tree3Ref}
                alt="Year 10"
                className="w-full  h-[370px]"
                id="tree3"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Move trees section OUTSIDE the moving parent */}

      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50">
        {" "}
        <div className="text-center max-w-3xl relative z-30" id="letsGrow">
          <div className="h-[200px] flex flex-col items-center justify-center">
            <h2
              className="text-[80px] font-proxima-bold leading-tight font-black text-black "
              id="letsgrowtitle"
            >
              Let's Grow
            </h2>
            <p
              className="text-[40px] font-proxima-regular leading-tight text-black "
              id="letsgrosubtitle"
            >
              So, now what may have felt like being buried can actually become
              the beginning of something greater.
            </p>
          </div>

          <div className="flex justify-center pt-28">
            <svg
              id="Logo"
              className="logo-container"
              xmlns="http://www.w3.org/2000/svg"
              width="409.35"
              height="287.979"
              viewBox="0 0 409.35 287.979"
            >
              <path
                id="Path_1848"
                d="M142.335,170.273l51.781,58.295V287.98h25.093V229.789l51.781-58.3V136.969l-9.274,10.442L207.205,208.8l-64.87-73.029Z"
                fill="#3ba136"
              />
              <path
                id="Path_1849"
                d="M222.529,107.612l17.123-19.276,20.764-23.375L245.634,47.1,230.57,64.059,207.2,90.359,183.06,63.181,168.213,46.467,153.431,64.352,207.2,124.888Z"
                fill="#3ba136"
              />
              <path
                id="Path_1850"
                d="M206.664,0,180,32.291l26.668,32.288L233.33,32.291Z"
                fill="#3ba136"
              />
              <path
                id="Path_1851"
                d="M0,192.855l47.109,47.109v48.015H69.937V240.952l47.112-47.113v-27.9l-8.44,8.44L59.017,223.99,0,164.973Z"
                fill="#3ba136"
              />
              <path
                id="Path_1852"
                d="M72.958,142.217,88.536,126.64l18.89-18.89L93.976,93.315l-13.7,13.7L59.018,128.276,37.051,106.31,23.544,92.8,10.1,107.259l48.922,48.919Z"
                fill="#3ba136"
              />
              <path
                id="Path_1853"
                d="M58.525,55.251l-24.262,26.1L58.525,107.44,82.787,81.351Z"
                fill="#3ba136"
              />
              <path
                id="Path_1854"
                d="M292.3,118.082V145l59.017,59.02,13.946-13.941L395,160.321l14.354-14.335v-27.9L386.75,140.7l-35.432,35.431-58.546-58.545Z"
                fill="#3ba136"
              />
              <path
                id="Path_1855"
                d="M292.3,192.855l47.109,47.109v48.015h22.828V240.952l47.112-47.113v-27.9l-8.439,8.44L351.318,223.90,292.3,164.973Z"
                fill="#3ba136"
              />
              <path
                id="Path_1856"
                d="M350.824,55.251l-24.26,26.1,24.26,26.093,24.262-26.093Z"
                fill="#3ba136"
              />
              <path
                id="Path_1857"
                d="M207.206,149.581,149.615,85.795l-90.6,90.339L.473,117.589,0,145l59.017,59.02,88.169-87.5,60.02,67.568L288.2,94.147l63.122,62.035,48.411-48.432L386.278,93.315l-34.961,34.961L285.205,61.962Z"
                fill="#c0bfbf"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50">
        <div
          id="contact"
          className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative  z-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-[100px] font-proxima-bold leading-none font-black text-black">
              Buried or planted.
              <br /> You decide.
            </h2>
          </div>

          <div className="max-w-4xl w-full relative">
            <div className="flex items-center justify-between mt-8 pt-4 absolute -bottom-14 gap-5">
              <span className="text-midGrey text-3xl font-proxima-regular font-medium">
                Get it touch{" "}
              </span>
              <span className="text-midGrey text-2xl"> / </span>
              <span className="text-midGrey text-2xl" id="progress-indicator">
                {" "}
                1 of 5
              </span>
            </div>

            <div className="space-y-8">
              <div className="form-step" data-step="1">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex flex-col items-center">
                    <input
                      type="text"
                      id="first-name"
                      className="w-full text-6xl font-medium bg-transparent  outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-medium h-14 text-blue placeholder:text-center text-center"
                      placeholder="First Name"
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                    // onclick="nextStep()"
                  >
                    <img
                      src="/images/arrow-right.svg"
                      alt="arrow-right"
                      className="w-10 h-10 text-black"
                    />
                  </button>
                </div>
                <div className="border-b border-[#707070] mt-10 w-full h-1"></div>
              </div>

              <div className="form-step hidden" data-step="2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <input
                      type="text"
                      id="last-name"
                      className="w-full text-6xl font-medium bg-transparent  outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-medium h-14 text-blue placeholder:text-center text-center"
                      placeholder="Last Name"
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                    // onclick="nextStep()"
                  >
                    <img
                      src="/images/arrow-right.svg"
                      alt="arrow-right"
                      className="w-10 h-10 text-black"
                    />
                  </button>
                </div>
                <div className="border-b border-[#707070] mt-10 w-full h-1"></div>
              </div>

              <div className="form-step hidden" data-step="3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <input
                      type="email"
                      id="email"
                      className="w-full text-6xl font-medium bg-transparent  outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-medium h-14 text-blue placeholder:text-center text-center"
                      placeholder="Email Address"
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                    // onclick="nextStep()"
                  >
                    <img
                      src="/images/arrow-right.svg"
                      alt="arrow-right"
                      className="w-10 h-10 text-black"
                    />
                  </button>
                </div>
                <div className="border-b border-[#707070] mt-10 w-full h-1"></div>
              </div>

              <div className="form-step hidden" data-step="4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <input
                      type="tel"
                      id="phone"
                      className="w-full text-6xl font-medium bg-transparent  outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-medium h-14 text-blue placeholder:text-center text-center"
                      placeholder="Phone Number"
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                    // onclick="nextStep()"
                  >
                    <img
                      src="/images/arrow-right.svg"
                      alt="arrow-right"
                      className="w-10 h-10 text-black"
                    />
                  </button>
                </div>
                <div className="border-b border-[#707070] mt-10 w-full h-1"></div>
              </div>

              <div className="form-step hidden" data-step="5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* <input
                      // id="message"
                      className="w-full text-6xl font-medium bg-transparent  outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-medium h-14 text-blue placeholder:text-center text-center"
                      placeholder="Your Message"
                      rows="3"
                    ></input> */}
                  </div>
                  <button
                    type="button"
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                    // onclick="nextStep()"
                  >
                    <img
                      src="/images/arrow-right.svg"
                      alt="arrow-right"
                      className="w-10 h-10 text-black"
                    />
                  </button>
                </div>
                <div className="border-b border-[#707070] mt-10 w-full h-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section>
      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section>
      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section>

      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section>
      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section>
      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section>
      <section className="min-h-screen bg-white flex items-center justify-center p-8 relative w-full -z-50"></section> */}
    </>
  );
}
