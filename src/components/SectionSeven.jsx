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

export default function SectionSeven({ hideFinalpage }) {
  const flipBook = useRef();
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [flipDirection, setFlipDirection] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 600, height: 600 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalActualPages, setTotalActualPages] = useState(0);

  const journeyRef = useRef(null);
  const pendingPageRef = useRef(null);

  const [flipEnabled, setFlipEnabled] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [canStartFlipping, setCanStartFlipping] = useState(false);
  const flipDelayTimer = useRef(null);
  const lastScrollPosition = useRef(0);

  const harvestRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // const { scrollYProgress: harvestScrollProgress } = useScroll({
  //   target: harvestRef,
  //   offset: ["start end", "end start"],
  //   layoutEffect: false,
  // });

  // const harvestBgY = useTransform(
  //   harvestScrollProgress,
  //   [0, 0.5, 1],
  //   ["-100%", "0%", "0%"]
  // );

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);


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

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const blankPagesOne = blankPagesOneData.map((page, pageIdx) => (
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
      
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="absolute -left-10 top-16 opacity-60">
              <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 !w-full items-center">
              <div className="w-full h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-1.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <div className="flex flex-1 min-w-0 h-16">
                {months.map((month, idx) => (
                  <div
                    key={month}
                    className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[${
                      month === page.highlightMonth ? "100px" : "60px"
                    }] relative overflow-hidden`}
                  >
                    {idx === page.highlightIndex ? (
                      <div
                        className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor} z-20`}
                      ></div>
                    ) : null}
                    <span
                      className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                        idx === page.highlightIndex
                          ? "font-extrabold text-blue"
                          : "font-medium text-black"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                ))}
              </div>
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
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="absolute -left-10 top-16 opacity-60">
              <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <div className="flex flex-1 min-w-0 h-16">
                {months.map((month, idx) => (
                  <div
                    key={month}
                    className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[${
                      month === page.highlightMonth ? "100px" : "60px"
                    }] relative overflow-hidden`}
                  >
                    {idx === page.highlightIndex ? (
                      <div
                        className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor} z-20`}
                      ></div>
                    ) : null}
                    <span
                      className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                        idx === page.highlightIndex
                          ? "font-extrabold text-blue"
                          : "font-medium text-black"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                ))}
              </div>
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
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 top-32 opacity-60">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-16 left-0 !w-full items-center">
              <div className="w-full h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_2.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <div className="flex flex-1 min-w-0 h-16">
                {months.map((month, idx) => (
                  <div
                    key={month}
                    className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[${
                      month === page.highlightMonth ? "100px" : "60px"
                    }] relative overflow-hidden`}
                  >
                    {idx === page.highlightIndex ? (
                      <div
                        className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor} z-20`}
                      ></div>
                    ) : null}
                    <span
                      className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                        idx === page.highlightIndex
                          ? "font-extrabold text-blue"
                          : "font-medium text-black"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                ))}
              </div>
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
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 top-32 opacity-60">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-28 left-0 !w-full items-center">
              <div className="w-full h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/TaxOrchard_Tree_3.svg"
                  alt="Tree 1"
                  className="opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <div className="flex flex-1 min-w-0 h-16">
                {months.map((month, idx) => (
                  <div
                    key={month}
                    className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[${
                      month === page.highlightMonth ? "100px" : "60px"
                    }] relative overflow-hidden`}
                  >
                    {idx === page.highlightIndex ? (
                      <div
                        className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor} z-20`}
                      ></div>
                    ) : null}
                    <span
                      className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                        idx === page.highlightIndex
                          ? "font-extrabold text-blue"
                          : "font-medium text-black"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                ))}
              </div>
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
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 top-32 opacity-60">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center  gap-4  absolute bottom-14 left-0 !w-full items-center">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <div className="flex flex-1 min-w-0 h-16">
                {months.map((month, idx) => (
                  <div
                    key={month}
                    className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[${
                      month === page.highlightMonth ? "100px" : "60px"
                    }] relative overflow-hidden`}
                  >
                    {idx === page.highlightIndex ? (
                      <div
                        className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor} z-20`}
                      ></div>
                    ) : null}
                    <span
                      className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                        idx === page.highlightIndex
                          ? "font-extrabold text-blue"
                          : "font-medium text-black"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                ))}
              </div>
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
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50 blankPage"
      key={pageIdx}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="absolute -left-24 top-32 opacity-60">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="flex justify-center gap-4 absolute bottom-36 left-0 !w-full items-center">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>
              <div className="flex flex-1 min-w-0 h-16">
                {months.map((month, idx) => (
                  <div
                    key={month}
                    className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[${
                      month === page.highlightMonth ? "100px" : "60px"
                    }] relative overflow-hidden`}
                  >
                    {idx === page.highlightIndex ? (
                      <div
                        className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor} z-20`}
                      ></div>
                    ) : null}
                    <span
                      className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                        idx === page.highlightIndex
                          ? "font-extrabold text-blue"
                          : "font-medium text-black"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                ))}
              </div>
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

    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-full md:w-3/4 justify-center items-center mb-8 sm:mb-12">
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
                  <p className="text-2xl md:text-3xl text-green font-bold">Tax Orchard</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-10 top-16 opacity-60 z-10">
              <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:justify-center  gap-4 sm:gap-6 md:gap-20 md:mb-8 sm:mb-12 md:mb-16 absolute bottom-0 md:bottom-6 left-0 !w-full items-center">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold text-blue">
                    JAN
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium  text-black ">
                    MAR
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    APR
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAY
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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
    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-full md:w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                That seed account{" "}
                <span className="text-blue font-proxima-extrabold font-extrabold">
                  immediately
                </span>{" "}
                generates a tax loss that offsets what you owe now and begins
                the process of eliminating it entirely.
              </p>
            </div>

            <div className="absolute -left-10 top-16 opacity-60 z-10">
              <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex justify-center  gap-4 sm:gap-6 md:gap-20 md:mb-8 sm:mb-12 md:mb-16 absolute bottom-0 md:bottom-6 left-0 !w-full items-center">
              <div className="w-full h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-1.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
              <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                <img
                  src="/images/calendar-tree-2.svg"
                  alt="Tree 1"
                  className="opacity-10"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>

                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold text-blue">
                    JAN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black ">
                    APR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAY
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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
    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative text-center w-full md:w-3/4 justify-center items-start mb-40">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Your seed account steadily
                <br /> grows in value.
              </p>
            </div>

            <div className="w-full flex justify-center items-center relative">
              <div className="w-full -bottom-28 absolute   h-64 flex flex-col items-center justify-center">
                <div className="w-full h-full  absolute top-0 left-0 z-10" ></div>
                  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 511 231" className="z-10">
                  <defs>
                    <style dangerouslySetInnerHTML={{__html: `
                      .st0 {
                        fill: #4c6fb6;
                        opacity: 0;
                      }

                      .st1 {
                        fill: #fff;
                      }

                      .st2 {
                        stroke: #4c6fb6;
                        stroke-width: 2px;
                      }

                      .st2, .st3 {
                        fill: none;
                      }

                      .st3 {
                        stroke: #707071;
                        stroke-dasharray: 3 3;
                        stroke-width: .5px;
                      }

                      .st4 {
                        fill: #2aaf4a;
                      }

                      @keyframes drawLine {
                        from {
                          stroke-dashoffset: 1000;
                        }
                        to {
                          stroke-dashoffset: 0;
                        }
                      }

                      @keyframes fadeIn {
                        from {
                          opacity: 0;
                        }
                        to {
                          opacity: 1;
                        }
                      }

                      .animated-line {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: drawLine 2s ease-in-out 0.2s forwards;
                      }

                      .animated-circle {
                        opacity: 0;
                        animation: fadeIn 0.3s ease-out forwards;
                      }

                      .animated-circle-1 { animation-delay: 0.1s; }
                      .animated-circle-2 { animation-delay: 0.2s; }
                      .animated-circle-3 { animation-delay: 0.5s; }
                      .animated-circle-4 { animation-delay: 0.7s; }
                      .animated-circle-5 { animation-delay: 0.9s; }
                      .animated-circle-6 { animation-delay: 1s; }
                      .animated-circle-7 { animation-delay: 1.1s; }
                      .animated-circle-8 { animation-delay: 1.2s; }
                    `}} />
                  </defs>
                  <g id="Group_361">
                    <rect id="Rectangle_219-2" className="st1" width="100%" height="100%" rx="14" ry="14" fill="#ffffff"/>
                    <g id="Group_360">
                      <g id="Group_359">
                        <g id="Group_355">
                          <path id="Path_1017" className="st3" d="M41,59.3v138.1"/>
                          <path id="Path_1018" className="st3" d="M102.7,59.3v138.1"/>
                        </g>
                        <g id="Group_358">
                          <path id="Path_1017-2" className="st3" d="M287.8,59.3v138.1"/>
                          <path id="Path_1018-2" className="st3" d="M349.5,59.3v138.1"/>
                        </g>
                        <g id="Group_356">
                          <path id="Path_1017-3" className="st3" d="M164.4,59.3v138.1"/>
                          <path id="Path_1018-3" className="st3" d="M226.1,59.3v138.1"/>
                        </g>
                        <g id="Group_357">
                          <path id="Path_1017-4" className="st3" d="M411.3,59.3v138.1"/>
                          <path id="Path_1018-4" className="st3" d="M473,59.3v138.1"/>
                        </g>
                        <rect id="Rectangle_218" className="st0" x="446.7" y="9.1" width="52.5" height="212.9" rx="10" ry="10"/>
                        <path 
                          className="animated-line"
                          d="M41,182.3l62.8-10.7,60.4-35.1,62.3-57,61,23.5,63-32.4,62.3,8.9,62.8-25.7"
                          stroke="#4c6fb6"
                          strokeWidth="2"
                          fill="none"
                        />

                      </g>
                      <g id="Group_365">
                        <circle id="Ellipse_17" className="st4 animated-circle animated-circle-1" cx="40.5" cy="182.5" r="4.5"/>
                        <circle id="Ellipse_18" className="st4 animated-circle animated-circle-2" cx="102.5" cy="171.5" r="4.5"/>
                        <ellipse id="Ellipse_19" className="st4 animated-circle animated-circle-3" cx="165" cy="136.5" rx="4" ry="4.5"/>
                        <circle id="Ellipse_20" className="st4 animated-circle animated-circle-4" cx="226.5" cy="80.5" r="4.5"/>
                        <circle id="Ellipse_21" className="st4 animated-circle animated-circle-5" cx="287.5" cy="102.5" r="4.5"/>
                         <circle id="Ellipse_22" className="st4 animated-circle animated-circle-6" cx="349.5" cy="71.5" r="4.5"/>
                        <ellipse id="Ellipse_23" className="st4 animated-circle animated-circle-7" cx="411" cy="80.5" rx="4" ry="4.5"/>
                        <circle id="Ellipse_24" className="st4 animated-circle animated-circle-8" cx="473.5" cy="54.5" r="4.5"/> 
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <div className="absolute -left-24 top-32 opacity-60 z-10">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex md:justify-center  gap-4 sm:gap-6 md:gap-20 md:mb-8 sm:mb-12 md:mb-16 absolute bottom-0 md:bottom-16 left-0 !w-full md:items-center">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold text-blue">
                    JAN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    APR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black ">
                    MAY
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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
    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-full md:w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                At the same time, it{" "}
                <span className="text-green font-extrabold font-proxima-extrabold">
                  generates tax credits and deductions
                </span>{" "}
                that further reduce what you owe.
              </p>
            </div>

            <div className="absolute -left-24 top-32 opacity-60 z-10">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Cultivate
              </p>
            </div>

            <div className="grid grid-cols-3  md:flex justify-center  gap-4 sm:gap-6 md:gap-20 md:mb-8 sm:mb-12 md:mb-16 absolute bottom-0 md:bottom-28 left-0 !w-full items-center">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
                    JAN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    APR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAY
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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
    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-full md:w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Tax Orchard actively manages this process, applying benefits at
                the most effective moments.
              </p>
            </div>

            <div className="absolute -left-24 top-32 opacity-60 z-10">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
                    JAN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    APR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAY
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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
    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-full md:w-3/4 justify-center items-center mb-8 sm:mb-12">
              <h3 className="text-3xl pb-8">Vetted Strategies</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.2] text-black ">
                Every Tax Orchard strategy is{" "}
                <span className="font-extrabold text-blue font-proxima-extrabold">
                  fully vetted and backed by legal opinions{" "}
                </span>
                from top tax attorneys to ensure compliance and confidence.
              </h2>
            </div>

            <div className="absolute -left-10 top-20 opacity-60 z-10">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                How?
              </p>
            </div>

            <div className="grid grid-cols-3 md:flex justify-center gap-4 absolute bottom-0 md:bottom-36 left-0 !w-full items-center">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
                    JAN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    APR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAY
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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
    <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50">
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="relative z-20 text-center w-full md:w-3/4 justify-center items-center mb-8 sm:mb-12">
              <h3 className="text-3xl pb-8">Audit Protection</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.2] text-black ">
                If your Tax Orchard investment is ever audited, our legal team
                provides full representation at no cost to you, supplying all
                required documentation and standing behind every aspect of the
                strategy.
              </h2>
            </div>

            <div className="absolute -left-10 top-20 opacity-60 z-10">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
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
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
                    JAN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    APR
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    MAY
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUN
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JUL
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    AUG
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    SEP
                  </span>
                </div>

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    OCT
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    NOV
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    DEC
                  </span>
                </div>
              </div>

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

    <div
      className={`min-h-200vh !w-full flex items-center justify-center relative z-50 transition-colors duration-700 bg-black`}
      ref={harvestRef}
    >
      <div
        className={` top-0 w-full h-screen absolute items-center justify-center transition-opacity duration-700 z-20`}
      >
        <h2 className={`text-6xl w-full h-screen flex items-center justify-center absolute top-0 z-20 md:text-[183px] font-proxima-bold  leading-none text-center mix-blend-difference text-white `}
        >
          The Harvest
        </h2>
           {isMounted && (
          <motion.div 
            className="bg-white absolute w-full h-screen z-10"
            style={{ bottom: harvestBgY }}
          />
        )}
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
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  const sectionRef = useRef(null);
  const x = useTransform(scrollYProgress, [0, 0.2], ["100vw", "0vw"]);
  const journeyX = useTransform(scrollYProgress, [0, 0.2], ["0vw", "-100vw"]);
  const isJourneyInView = useInView(journeyRef, { amount: 0.0001 });
  const isContainerRefInView = useInView(containerRef, { amount: 0.5 });
  const scrollLock = useRef(false);
  const currentProgress = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {


    if (!flipEnabled || !canStartFlipping || isFlipping) return;

    const totalGroups = 7;
    // Fix: Snap to last group if very close to end
    let targetGroup = Math.floor(progress * totalGroups);

    console.log('is forward?', progress, currentProgress.current, progress < currentProgress.current);

    if (progress < currentProgress.current) {
      targetGroup = targetGroup - 1;
    } 

    currentProgress.current = progress;

    if (targetGroup === currentPage) return;

    // // Block scroll updates while flipping
    // /**
    //  * Return early if currently flipping to lock scroll position
    //  */
    // if (isFlipping) {
    //   // Lock scroll position
    //   if (scrollContainerRef.current) {
    //     window.scrollTo({
    //       top: lastScrollPosition.current,
    //       behavior: "auto",
    //     });
    //   }
    //   return;
    // }

    console.log("Raw targetGroup:", targetGroup, "from progress:", progress);


    if (scrollLock.current) {
      pendingPageRef.current = targetGroup;
      return;
    }

    console.log("progress", progress, "→ targetGroup", targetGroup);

    // Small debounce to prevent rapid triggers
    setTimeout(() => {
      // Check again before flipping in case things changed
      if (!scrollLock.current && !isFlipping && canStartFlipping && targetGroup !== currentPage && targetGroup >= 0 ) {
        flipToGroup(targetGroup);
      }
    }, 100);
  });

  function flipToGroup(groupIndex) {
    if (!flipBook.current || !flipBook.current.pageFlip) return;
    // Store scroll position before flipping
    lastScrollPosition.current = window.scrollY;
    // Always clear pendingPageRef before starting a new flip
    pendingPageRef.current = null;
    scrollLock.current = true;
    setIsFlipping(true);

    const flipGroups = [
      [1, 2, 3, 4],
      [6, 7, 8, 9],
      [11, 12, 13, 14],
      [16, 17, 18, 19],
      [21, 22, 23, 24],
      [26, 27, 28, 29],
      [30, 31],
    ];

    const flips = flipGroups[groupIndex];
    const isForward = groupIndex > currentPage;
    const sequence = isForward ? flips : [...flips].reverse();

    console.log(
      `Flipping from group ${currentPage} to ${groupIndex} (${isForward ? "forward" : "backward"})`,
      "→ pages",
      sequence
    );
    if(!sequence) return; // prevent if no sequence found (out of bounds)
    sequence.forEach((pageIndex, i) => {
      setTimeout(() => {
        flipBook.current?.pageFlip().flip(pageIndex);
      }, 200 + i * 75);
    });

    const totalFlipTime = 300 + sequence?.length * 75 + 300;

    setTimeout(() => {
      setCurrentPage(groupIndex);

      /**
       * Delay unlocking scroll to ensure flip animation completes
       * before allowing further scroll interactions
       */
      setTimeout(() => {
        scrollLock.current = false;
        setIsFlipping(false);
  
        if (
          pendingPageRef.current !== null &&
          pendingPageRef.current !== groupIndex
        ) {
          const nextGroup = pendingPageRef.current;
          pendingPageRef.current = null;
          flipToGroup(nextGroup);
        }
      }, 1500);
    }, totalFlipTime);
  }

  // Only allow flipping when journeyRef is NOT in view
  // Add 1-second delay after journey leaves viewport before enabling flips
  useEffect(() => {
    if (isJourneyInView) {
      // Journey is in view - disable flipping and reset
      setFlipEnabled(false);
      setCanStartFlipping(false);
      if (flipDelayTimer.current) {
        clearTimeout(flipDelayTimer.current);
        flipDelayTimer.current = null;
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
      scrollContainerRef.current.style.height = `${8 * 100}vh`; // 7 scroll zones
    }
  }, []);


  // console.log("currentPage", currentPage);
  console.log("totalActualPages", totalActualPages);

  /**
   * Watch flipping and disable scroll interactions during the flip
   * to prevent user interference
   */
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (isFlipping) {
      // Prevent wheel/touch scrolling
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      
      // Prevent keyboard scrolling
      const preventKeys = (e) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.key)) {
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', preventKeys);
      
      return () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeys);
      };
    }
  }, [isFlipping]);


  /**
   * Set default scroll position on mount
   * to ensure consistent starting point
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // No animation on initial load
      });
    }
  }, []);


  const currentPageFromFlipBook = useMemo(() => {
    return flipBook.current?.pageFlip?.()?.getPage?.()
  }, [flipBook])

  return (
    <div className="overflow-x-clip" >
      <motion.div
        className="sticky top-0"
        ref={journeyRef}
        style={{ x: journeyX }}
      >
        <div className=" min-h-screen bg-black !w-full flex items-center justify-center relative z-50">
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
        className="min-h-screen relative w-full !z-40 bg-white"
        ref={containerRef}
        style={{ x }}
      >
        <div className="flipbook-container sticky top-0 !z-50 w-full min-h-screen overflow-hidden">
          <HTMLFlipBook
            onChangeState={flipping}
            onFlip={(e) => {
              setTotalActualPages(e.data);
            }}
            ref={flipBook}
            width={windowSize.width}
            height={windowSize.height}
            minWidth={315}
            maxWidth={1500}
            minHeight={420}
            maxHeight={windowSize.height}
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
            } min-h-screen w-full ${isFlipping ? 'pointer-events-none' : 'pointer-events-auto'}`}
          >
            {pageElements.map((el, idx) => cloneElement(el, { key: idx }))}
          </HTMLFlipBook>
        </div>

        <div ref={scrollContainerRef} />
      </motion.div>
   
    </div>
  );
}
