"use client";

import {
  useRef,
  useState,
  useEffect,
  cloneElement,
  useLayoutEffect,
  useMemo,
} from "react";
import HTMLFlipBook from "react-pageflip";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
  useInView,
} from "motion/react";
import LineChart from "./lineChart";
import FlipBookMonths from "./flipBookMonths";

/**
 * SectionSeven Component - Interactive Page Flip Animation for Tax Orchard Journey
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.hideFinalpage - Callback function to hide the final page
 * 
 * @description
 * A complex scrollable page-flip component that visualizes the Tax Orchard investment journey
 * across multiple years. The component uses react-pageflip for book-like animations and
 * Framer Motion for scroll-based interactions.
 * 
 * Key Features:
 * - Scroll-triggered page flipping with 8 distinct groups representing different years
 * - Smooth transitions between "journey" intro page and interactive flipbook
 * - Responsive design with dynamic sizing based on viewport
 * - Animated SVG charts and tree growth visualizations
 * - Scroll momentum prevention during page flips
 * - 1-second delay after journey section before enabling flips
 * - Automatic scroll locking during animations
 * 
 * Page Groups Structure:
 * - Group 0 (Year 01): Pages 0-4 - Initial investment setup
 * - Group 1 (Year 02): Pages 5-9 - Tax loss generation
 * - Group 2 (Year 03): Pages 10-14 - Seed account growth
 * - Group 3 (Year 05): Pages 15-19 - Tax credits and deductions
 * - Group 4 (Year 07): Pages 20-24 - Active management
 * - Group 5 (Year 09): Pages 25-29 - Vetted strategies
 * - Group 6 (Year 10): Pages 30-31 - Audit protection and harvest
 * 
 * @requires react-pageflip - For the flipbook functionality
 * @requires framer-motion - For scroll animations and transitions
 * @requires useState - For managing flip state, page tracking, and UI states
 * @requires useEffect - For scroll event handling and cleanup
 * @requires useRef - For DOM element and state persistence across renders
 * @requires useLayoutEffect - For DOM measurements before paint
 * 
 * @example
 * ```jsx
 * <SectionSeven hideFinalpage={() => console.log('Hide final page')} />
 * ```
 * 
 * @returns {JSX.Element} The rendered section with journey intro and interactive flipbook
 */
export default function SectionSeven({ hideFinalpage }) {

  if(typeof window === "undefined") return null;

  const flipBook = useRef();
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [flipDirection, setFlipDirection] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window?.innerWidth || 1200, height: window?.innerHeight || 1200 });
  const [currentPage, setCurrentPage] = useState(null);
  const [totalActualPages, setTotalActualPages] = useState(0);

  const journeyRef = useRef(null);
  const pendingPageRef = useRef(null);
  const sectionContainerRef = useRef(null);

  const [flipEnabled, setFlipEnabled] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [canStartFlipping, setCanStartFlipping] = useState(false);
  const flipDelayTimer = useRef(null);
  const lastScrollPosition = useRef(0);
  const totalGroups = 8; // 8 groups + 1 journey page
  const harvestRef = useRef(null);

  const isMobile = useMemo(() => windowSize.width < 768, [windowSize?.width]);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, isMobile ? [0, 0.1, 0.85, 0.88] : [0, 0.1, 0.85, 0.9], ["100vw", "0vw", "0vw", "-100vw"]);
  const journeyX = useTransform(scrollYProgress, [0, 0.1], ["0vw", "-100vw"]);
  const harvestBgY = useTransform(scrollYProgress, isMobile ? [0.8, 0.84] : [0.78, 0.83], ["-100%", "0%"]);
  const harvestX = useTransform(scrollYProgress, isMobile ? [0.88, 0.95] : [0.9, 0.97], ["100vw", "0vw"]);
  const isJourneyInView = useInView(journeyRef, { amount: 0.0001 });
  const isContainerRefInView = useInView(containerRef, { amount: 0.5 });
  const scrollLock = useRef(false);
  const currentProgress = useRef(0);
  const hasChartAnimated = useRef(false);
  const [shouldAnimate, showAnimateChart] = useState(false);
  const svgLineChart = useRef(null);
  const isScrolling = useRef(false);
  const svgAnimationKey = useRef(Math.random());

  const blankPagesOneData = [
    {
      highlightMonth: "APR",
      highlightIndex: 3,
      highlightColor: "blue",
    },
    {
      highlightMonth: "JUN",
      highlightIndex: 5,
      highlightColor: "blue",
    },

    {
      highlightMonth: "OCT",
      highlightIndex: 9,
      highlightColor: "blue",
    },

    {
      highlightMonth: "DEC",
      highlightIndex: 11,
      highlightColor: "blue",
    },
  ];

  const months = useMemo(() => {
    if(windowSize.width < 640) return  ['JAN', 'MAR', 'JUN', 'SEP', 'DEC']
    else return  ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  }, [windowSize?.width]) 


  const blankPagesOne = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
      
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="absolute -left-10 top-16 md:top-24 opacity-60">
              <p className="text-6xl md:text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-20 mb-18 sm:mb-12 md:mb-20 absolute bottom-6 left-0 !w-full items-center">
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center  mx-auto ">
                <img
                  src="/images/calendar-tree-1.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center  mx-auto ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <FlipBookMonths windowSize={windowSize} months={months} page={page} />
              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const blankPagesTwo = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="absolute -left-10 top-16 md:top-24 opacity-60">
              <p className="text-6xl md:text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>
            <div className="flex justify-center  gap-36 absolute bottom-20  left-0 !w-full items-center">
              <div className="w-[8rem] h-[8rem] flex flex-col items-center">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10 w-[1000px] h-[1600px] object-contain "
                />
              </div>

              <div className="w-[8rem] h-[8rem] flex flex-col items-center">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10 w-[1000px] h-[1600px] object-contain "
                />
              </div>

              <div className="w-[8rem] h-[8rem] flex flex-col items-center">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10 w-[1000px] h-[1600px] object-contain "
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <FlipBookMonths windowSize={windowSize} months={months} page={page} />
              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 02
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const blankPagesThree = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:justify-center  gap-4 sm:gap-6 md:gap-20  sm:mb-12 md:mb-16 absolute bottom-0 md:bottom-16 left-0 !w-full md:items-center">
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <FlipBookMonths windowSize={windowSize} months={months} page={page} />
              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 03
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const blankPagesFour = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12  absolute bottom-0 md:bottom-32 left-0 !w-full items-center">
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center mx-auto">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center  mx-auto ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center  mx-auto ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <FlipBookMonths windowSize={windowSize} months={months} page={page} />
              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 05
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const blankPagesFive = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center  gap-4  absolute bottom-0 md:bottom-14 left-0 !w-full items-center">
              <div className="w-72 h-56 flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_4.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[600px] h-[600px] object-contain"
                />
              </div>
              <div className="w-72 h-56 flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_4.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[300px] h-[300px] object-contain"
                />
              </div>
              <div className="w-72 h-56 flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_4.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[300px] h-[300px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <FlipBookMonths windowSize={windowSize} months={months} page={page} />
              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 07
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const blankPagesSix = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center gap-4 absolute bottom-0 md:bottom-36 left-0 !w-full items-center">
              <div className="w-[22rem] h-[12rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[1200px] h-[1600px] object-contain"
                />
              </div>
              <div className="w-[22rem] h-[12rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[1200px] h-[1600px] object-contain"
                />
              </div>
              <div className="w-[22rem] h-[12rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[1200px] h-[1600px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <FlipBookMonths windowSize={windowSize} months={months} page={page} />
              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 09
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  


  const pageElements = [
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Instead of paying $1 million to the IRS, you invest $500,000
                with your financial advisor and $500,000 into your Tax Orchard
                seed account.
              </p>
            </div>

            <div className="w-full flex justify-center items-center ">
              <div className="w-full md:w-1/2 absolute bottom-28  h-20 flex flex-col items-center justify-center ">
                <img
                  src="/images/financial-advisor.png"
                  alt="financial advisor"
                  className="w-full"
                />
                <div className="flex items-center text-black justify-evenly !w-full -mt-6">
                  <p className="text-midGrey text-lg md:text-[28px] font-medium">
                    Financial Advisor
                  </p>
                  <p className="text-2xl md:text-3xl text-green font-bold">
                    Tax Orchard
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-10 top-16 md:top-24 opacity-60 z-10">
              <p className="text-6xl md:text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:justify-center  gap-4 sm:gap-6 md:gap-20 md:mb-16 sm:mb-12 absolute bottom-0 md:bottom-6 left-0 !w-full items-center">
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-full  h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-1.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-full  h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    ...blankPagesOne,
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                That seed account{" "}
                <span className="text-blue font-proxima-extrabold font-extrabold">
                  immediately
                </span>{" "}
                generates a tax loss that offsets what you owe now and begins
                the process of eliminating it entirely.
              </p>
            </div>

            <div className="absolute -left-10 top-16 md:top-24 opacity-60 z-10">
              <p className="text-6xl md:text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:justify-center  gap-4 sm:gap-6 md:gap-20 md:mb-16 sm:mb-12 absolute bottom-0 md:bottom-6 left-0 !w-full items-center">
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-full  h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-1.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-full  h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 02
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    ...blankPagesTwo,
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative text-center w-full md:w-3/4 justify-center items-start mb-40">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Your seed account steadily
                <br /> grows in value.
              </p>
            </div>

            <div className="w-full flex justify-center items-center relative">
              <div className="w-full -bottom-28 absolute   h-64 flex flex-col items-center justify-center">
                <div className="w-full h-full  absolute top-0 left-0 z-10"></div>
                <LineChart shouldAnimate={shouldAnimate} />
              </div>
            </div>

            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60 z-10">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:justify-center  gap-4 sm:gap-6 md:gap-20  sm:mb-12 md:mb-16 absolute bottom-0 md:bottom-16 left-0 !w-full md:items-center">
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 03
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    ...blankPagesThree,
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                At the same time, it{" "}
                <span className="text-green font-extrabold font-proxima-extrabold">
                  generates tax credits and deductions
                </span>{" "}
                that further reduce what you owe.
              </p>
            </div>

            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60 z-10">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="grid grid-cols-3  md:flex justify-center  gap-4 sm:gap-6 md:gap-20  sm:mb-12 md:mb-44 absolute bottom-0  left-0 !w-full items-center">
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-full h-full sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 05
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    ...blankPagesFour,
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Tax Orchard actively manages this process, applying benefits at
                the most effective moments.
              </p>
            </div>

            <div className="absolute -left-24 md:-left-24 top-32 md:top-40 opacity-60 z-10">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex justify-center  gap-4  absolute bottom-0 md:bottom-14 left-0 !w-full items-center">
              <div className="w-full h-full md:w-72 md:h-56 flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_4.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[600px] md:h-[600px] object-contain"
                />
              </div>
              <div className="w-full h-full md:w-72 md:h-56 flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_4.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[300px] md:h-[300px] object-contain"
                />
              </div>
              <div className="w-full h-full md:w-72 md:h-56 flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_4.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[300px] md:h-[300px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 07
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    ...blankPagesFive,
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <h3 className="text-xl text-lightgrey md:text-3xl pb-8">Vetted Strategies</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.2] text-black ">
                Every Tax Orchard strategy is{" "}
                <span className="font-extrabold text-blue font-proxima-extrabold">
                  fully vetted and backed by legal opinions{" "}
                </span>
                from top tax attorneys to ensure compliance and confidence.
              </h2>
            </div>

            <div className="absolute -left-12 md:-left-10 top-20 md:top-28 opacity-60 z-10">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                How?
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex justify-center gap-4 absolute bottom-10 md:bottom-36 left-0 !w-full items-center">
              <div className="w-full h-full md:w-[22rem] md:h-[12rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[1200px] md:h-[1600px] object-contain"
                />
              </div>
              <div className="w-full h-full md:w-[22rem] md:h-[12rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[1200px] md:h-[1600px] object-contain"
                />
              </div>
              <div className="w-full h-full md:w-[22rem] md:h-[12rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[1200px] md:h-[1600px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 09
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    ...blankPagesSix,
    <div className="min-h-[100dvh] bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden md:mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <h3 className="text-xl text-lightgrey md:text-3xl pb-8">Audit Protection</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.2] text-black ">
                If your Tax Orchard investment is ever audited, our legal team
                provides full representation at no cost to you, supplying all
                required documentation and standing behind every aspect of the
                strategy.
              </h2>
            </div>

            <div className="absolute -left-12 md:-left-10 top-20 md:top-28 opacity-60 z-10">
              <p className="text-6xl md:text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                How?
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex justify-center gap-4 absolute bottom-0 md:bottom-36 left-0 !w-full items-center">
              <div className="md:w-[25rem] md:h-[15rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[1000px] md:h-[1600px] object-contain"
                />
              </div>
              <div className="md:w-[25rem] md:h-[15rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[1000px] md:h-[1600px] object-contain"
                />
              </div>
              <div className="md:w-[25rem] md:h-[15rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 md:w-[1000px] md:h-[1600px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-clip relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <FlipBookMonths windowSize={windowSize} months={months} page={{}} />

              <div className="bg-black text-white px-3 sm:px-4 md:px-6 flex justify-center items-center flex-shrink-0 h-14 z-10 mt-auto">
                <span className="text-xs sm:text-[20px] text-[20px] font-proxima-regular">
                  YEAR 10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  const nonBlankPagesCount = pageElements.filter(
    (el) => !el.props?.className?.includes("blankPage")
  ).length;

  /**
   * Handles the page flipping state change event
   * @param {Object} e - The event object from react-pageflip
   * @param {Object} e.data - The event data indicating the current state ('flipping' or 'read')
   * @param {Object} e.object - The flipbook object
   * @param {Object} e.object.mousePosition - Mouse position object
   * @param {number} e.object.mousePosition.x - X coordinate of mouse position
   */

  const flipping = (e) => {
    if (typeof window === "undefined") return;
    // Existing logic
    if (e?.data == "read") {
      setFlipDirection(null);
    } else {
      setFlipDirection(
        e?.object?.mousePosition?.x < window.innerWidth / 2 ? 1 : 0
      );
    }
    // Overlay the overflow style on every flip event
    setTimeout(() => {
      const block = document.querySelector(".flipbook > div > .stf__block");
      if (block) {
        block.style.overflow = "hidden";
        block.style.width = "101%";
      }
    }, 0);
  };

  useEffect(() => {
    function handleResize() {
      console.log("Window resized", window.innerWidth, window.innerHeight);

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  /**
   * Handles scroll progress changes to trigger page flips.
   * 
   * This effect listens to changes in the scrollYProgress motion value and determines
   * if a page flip should be initiated based on the current scroll position, flip state,
   * and whether flipping is enabled. It calculates the target group of pages to flip to
   * and calls the flipToGroup function if conditions are met.  
   * @requires scrollYProgress - A framer-motion motion value representing vertical scroll progress (0 to 1)
   * @requires flipEnabled - Boolean state indicating if flipping is currently enabled
   * @requires canStartFlipping - Boolean state indicating if flipping can start (e.g., after initial load)
   * @requires isFlipping - Boolean state indicating if a flip animation is currently in progress
   * @requires currentPage - Current page/group index state
   * @requires totalGroups - Total number of page groups available for flipping
   * @requires flipToGroup - Function to initiate the flip animation to a specific group
   * 
   * The effect includes debouncing logic to prevent rapid successive flips and ensures
   * that scrolling is locked during flip animations to avoid conflicts.
   * 
   * @returns {void}
   */
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    
    console.log('scrollYProgress changed:', progress, flipEnabled, canStartFlipping, isFlipping);
    isScrolling.current = true;

    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);

    if(isFlipping) {
      /**
       * Force to last scroll position after flip completes
       * This prevents scroll jumping due to content height changes
       */
      if(lastScrollPosition.current !== null) {
        window.scrollTo(0, lastScrollPosition.current);
      }
    }


    if (!flipEnabled || !canStartFlipping || isFlipping) return;


    // Fix: Snap to last group if very close to end

    let rawTarget = Math.min(
      totalGroups - 2,
      Math.max(0, Math.floor(progress * 10))
    );
    
    let targetGroup = rawTarget > 0 ? rawTarget - 1 : rawTarget;

    if(progress >= 0.65 )  targetGroup = totalGroups - 2; // prevent going out of bounds

    
    console.log('is forward?', progress, currentProgress.current, progress < currentProgress.current);

    currentProgress.current = progress;

    // if (targetGroup === currentPage) return;
    console.log("Raw targetGroup:", targetGroup, "from progress:", progress);

    if (scrollLock.current) {
      pendingPageRef.current = targetGroup;
      
      return;
    }

    console.log(progress >= 0.6, "progress", progress, "→ targetGroup", targetGroup);

    // Small debounce to prevent rapid triggers
    setTimeout(() => {
      // Check again before flipping in case things changed
      console.log('Debounce check - scrollLock:', scrollLock.current, 'isFlipping:', isFlipping, 'canStartFlipping:', canStartFlipping, 'targetGroup:', targetGroup, 'currentPage:', currentPage);

      if (!scrollLock.current && !isFlipping && canStartFlipping && targetGroup !== currentPage && targetGroup >= 0 ) {
        flipToGroup(targetGroup);
      } 
    }, 100);
  });

  /**
   * Stops all scroll momentum and movement on the page.
   * 
   * This function halts both Lenis smooth scrolling (if available) and native browser
   * scroll momentum by immediately setting the scroll position to its current value.
   * 
   * @function stopScrollMomentum
   * @returns {void}
   */
  const stopScrollMomentum = () => {
  // Stop Lenis if available
  if (window.lenis) {
    window.lenis.stop();
  }
  
  // Kill native scroll momentum
  const currentScroll = window.scrollY;
  window.scrollTo({
    top: currentScroll,
    left: 0,
    behavior: 'instant'
  });
};

  /**
   * Flips the book to a specific group of pages with animation.
   * 
   * @param {number} groupIndex - The index of the group to flip to (0-6, where each group represents a section of pages)
   * @param {boolean} [resetToCover=false] - Whether to reset to the cover page (currently unused)
   * 
   * @description
   * This function handles the animated page flipping to a specific group. It:
   * - Stops any ongoing scroll momentum
   * - Locks scrolling during the flip animation
   * - Animates multiple page flips in sequence (either forward or backward)
   * - Releases the scroll lock after the animation and pause complete
   * 
   * The function maps group indices to actual page numbers:
   * - Group 0: pages 0-4
   * - Group 1: pages 5-9
   * - Group 2: pages 10-14
   * - Group 3: pages 15-19
   * - Group 4: pages 20-24
   * - Group 5: pages 25-29
   * - Group 6: pages 30-31
   * 
   * @requires flipBook.current.pageFlip - The page flip library instance
   * @requires currentPage - Current page/group index state
   * 
   * @returns {void}
   */
  function flipToGroup(groupIndex, resetToCover = false) {
    if (!flipBook.current || !flipBook.current.pageFlip) return;

    // Stop all scrolling immediately
    stopScrollMomentum();

    // Store scroll position before flipping
    lastScrollPosition.current = window.scrollY;
    // Always clear pendingPageRef before starting a new flip
    const pausedScrollTime = groupIndex > 6 ? 2000 :  500; // 0.5 second
    const totalFlipTime = 200 + 5 * 75 + 300;
    pendingPageRef.current = null;
    scrollLock.current = true;
    setIsFlipping(true);


    const actualPages = [ 4, 9, 14, 19, 24, 29]; // last page of each group

    const pageFlips = actualPages[groupIndex];

      console.log('flipToGroup called with groupIndex:', groupIndex, 'currentPage:', currentPage, 'pageFlips:', pageFlips);


    if(!pageFlips) {
      setTimeout(() => {
            setIsFlipping(false);
            scrollLock.current = false;
      }, pausedScrollTime);
      return; // prevent if no sequence found (out of bounds)
    }

    const isForward = currentPage == null ? true :  groupIndex > currentPage;
    if(isForward) {
      const startPage = Math.max(0, pageFlips - 4);

        for (let i = startPage; i <= pageFlips; i++) {
          setTimeout(() => {
            console.log('Flipping to page:', i);
            flipBook.current?.pageFlip().flip(i);
          }, 200 + i * 75);
        }
    } else {
        const backActualPage =  (pageFlips + 1)
        const startPage = Math.min(31, Math.max(0, backActualPage + 4));

        console.log('flipping back', startPage)

        for (let i = startPage; i > backActualPage; i--) {
          setTimeout(() => {
            console.log('Flipping to page back:', i);
            flipBook.current?.pageFlip().flip(i);
          }, 200 + (startPage - i) * 75);
        }
    }
    
    

    // After flip sequence and pause, release scroll lock
    setTimeout(() => {
      console.log('Flip animation complete, releasing scroll lock', groupIndex, currentPage);
     
      scrollLock.current = false;
      setIsFlipping(false);
      setCurrentPage(groupIndex);

    }, (totalFlipTime + pausedScrollTime));
  }

  // Only allow flipping when journeyRef is NOT in view
  // Add 1-second delay after journey leaves viewport before enabling flips
  useEffect(() => {
    console.log("isJourneyInView changed:", isJourneyInView);

    if (isJourneyInView) {

      // Journey is in view - disable flipping and reset
      setFlipEnabled(false);
      setCanStartFlipping(false);
      if (flipDelayTimer.current) {
        clearTimeout(flipDelayTimer.current);
        flipDelayTimer.current = null;
        setCurrentPage(null);
      }

       /**
       * IF Journey is in view:
       * - Turn page to first page if not already there
       * - Disable flipping immediately
       * - Clear any pending flip delays
       * Reset currentPage to null
       */
      if (flipBook.current) {
        for (let i = 5; i >= 0; i--) {
          setTimeout(() => {
            flipBook?.current?.pageFlip?.().flipPrev?.();
          }, 100 + (5 - i) * 75);
        }
      }
      console.log("Journey in view - flipping disabled");
    } else {
      // Journey just left view - start 1-second delay
      console.log("Journey out of view - starting 1s delay before enabling flips");
      
      if (flipDelayTimer.current) {
        clearTimeout(flipDelayTimer.current);
      }
      
      flipDelayTimer.current = setTimeout(() => {
        console.log("1-second delay complete - flipping now enabled");
        setCanStartFlipping(true);
        setFlipEnabled(true);
      }, 1000);
    }

    return () => {
      if (flipDelayTimer.current) {
        clearTimeout(flipDelayTimer.current);
      }
    };
  }, [isJourneyInView]);

  useEffect(() => {
    console.log("isContainerRefInView", isContainerRefInView);
  }, [isContainerRefInView]); 


  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.height = `${totalGroups * 100}vh`; // 7 scroll zones
    }
  }, []);


  // console.log("currentPage", currentPage);
  console.log("totalActualPages", totalActualPages);

  /**
   * Watch flipping and disable scroll interactions during the flip
   * to prevent user interference
   * Also pauses Lenis smooth scrolling if in use
   * 
   */

  useEffect(() => {
    if (!isFlipping) {
      // Re-enable Lenis when not flipping
      if (window.lenis) {
        window.lenis.start();
      }
      return;
    }

    // Stop Lenis during flip
    if (window.lenis) {
      window.lenis.stop();
    }

    const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const preventKeys = (e) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Prevent wheel/touch scrolling
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
  window.addEventListener('keydown', preventKeys);
  
  return () => {
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('keydown', preventKeys);
  };
  }, [isFlipping]);


  /**
   * Set default scroll position on mount
   * to ensure consistent starting point
   */
  useEffect(() => {
    lastScrollPosition.current = 0;
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // No animation on initial load
      });
    }
  }, []);

  /**
   * Watch currentPage changes to trigger chart animation
   * only the first time the user leaves the first page
   * 
   */
  useEffect(() => {
  console.log("currentPage changed:", totalActualPages);

  if(totalActualPages !== 10) {
    showAnimateChart(false);
    hasChartAnimated.current = false;
  } else if(totalActualPages === 10 && !hasChartAnimated.current) {
    showAnimateChart(true);
    
    setTimeout(() => {
      hasChartAnimated.current = true;
      // Generate new key only on first animation
    }, 500);
  
  }
}, [totalActualPages]);

  return (
    <>
      <div className="overflow-x-clip ">
      <motion.div
        className="sticky top-0 snap-start snap-always  h-screen"
        ref={journeyRef}
        style={{ x: journeyX }}
      >
        <div className=" min-h-[100dvh] bg-black !w-full flex items-center justify-center relative z-50">
          <div className="w-full mx-auto flex flex-col items-center justify-center h-full overflow-hidden ">
            <h2 className="text-5xl md:text-9xl font-proxima-bold leading-none font-black text-white text-center">
              The Journey
            </h2>
            <p className="text-lightgrey text-lg leading-snug md:text-[32px] font-proxima-regular md:leading-[34px] text-center">
              In this scenario, let’s say you just made <br />
              $2 million and the IRS wants half.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="min-h-screen w-full sticky top-0 !z-40 "
        ref={containerRef}
        style={{ 
          x, 
        }}
      >
        <div className="flipbook-container  sticky left-0 top-0 !z-50 w-full min-h-screen overflow-hidden ">
          <HTMLFlipBook
            onChangeState={flipping}
            onFlip={(e) => {
              setTotalActualPages(e.data);
            }}
            ref={flipBook}
            width={windowSize.width}
            height={windowSize.height + (isMobile ? 100 : 0)}
            minWidth={315}
            maxWidth={1500}
            minHeight={420}
            showCover={false}
            flippingTime={500}
            usePortrait={true}
            startZIndex={0}
            startPage={currentPage}
            autoSize={true}
            maxShadowOpacity={0.1}
            disableFlipByClick={false}
            useMouseEvents={false}
            useKeyboard={false}
            useTouch={false}
            className={`flipbook ${
              flipDirection === 0
                ? "flipping-next"
                : flipDirection === 1
                ? "flipping-prev"
                : ""
            } min-h-screen w-full  ${isFlipping ? 'pointer-events-none' : 'pointer-events-auto'}`}
          >
            {pageElements.map((el, idx) => cloneElement(el, { key: idx }))}
          </HTMLFlipBook>
        </div>

        <div ref={scrollContainerRef}  >
         
        </div>
      </motion.div>

      
      <motion.div
      className={`sticky min-h-100vh !w-full !top-0 flex items-center justify-center  z-50 transition-colors duration-700 bg-black`}
      style={{ x: harvestX }}
    >
      <div
        className={` top-0 w-full h-screen absolute items-center justify-center transition-opacity duration-700 z-20 bg-black`}
      >
        <h2
          className={`text-6xl w-full h-screen flex items-center justify-center absolute top-0 z-20 md:text-[183px] font-proxima-bold  leading-none text-center mix-blend-difference text-white `}
        >
          The Harvest
        </h2>
        <motion.div
          ref={harvestRef}
          className="bg-white absolute w-full h-screen z-10 h-100vh"
          style={{ bottom: harvestBgY }}
        />
      </div>
    </motion.div>
    

    </div>

    </>
  );
}
