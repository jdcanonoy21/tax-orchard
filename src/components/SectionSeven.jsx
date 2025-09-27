"use client";

import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { useScroll, useMotionValueEvent, motion } from "motion/react";
import SectionHarvest from "./SectionHarvest";

export default function SectionSeven() {
  const flipBook = useRef();
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [flipDirection, setFlipDirection] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 600, height: 600 });
  const [currentPage, setCurrentPage] = useState(0);
  const [hideContainer, setHideContainer] = useState(false);

  const pageElements = [
    <div key={1} className=" ">
      <div className=" min-h-screen bg-black !w-full flex items-center justify-center relative z-50">
        <div className="w-full mx-auto flex flex-col items-center justify-center h-full overflow-hidden ">
          <h2 className="text-9xl font-proxima-bold leading-none font-black text-white text-center">
            The Journey
          </h2>
          <p className="text-lightgrey text-[32px] font-proxima-regular leading-[34px] text-center">
            In this scenario, let’s say you just made <br />
            $2 million and the IRS wants half.
          </p>
        </div>
      </div>
    </div>,
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={2}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Instead of paying $1 million to the IRS, you invest $500,000
                with your financial advisor and $500,000 into your Tax Orchard
                seed account.
              </p>
            </div>

            <div className="w-full flex justify-center items-center ">
              <div className="w-1/2 absolute bottom-28  h-20 flex flex-col items-center justify-center ">
                <img
                  src="/images/financial-advisor.png"
                  alt="financial advisor"
                  className="w-full"
                />
                <div className="flex text-black justify-evenly !w-full -mt-6">
                  <p className="text-midGrey text-[28px] font-medium">
                    Financial Advisor
                  </p>
                  <p className="text-3xl text-green font-bold">Tax Orchard</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-10 top-16 opacity-60">
              <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>

            <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 !w-full items-center">
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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    JAN
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
                    FEB
                  </span>
                </div>
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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
                  YEAR 02
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={3}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                That seed account{" "}
                <span className="text-blue font-proxima-extrabold font-extrabold">
                  immediately
                </span>{" "}
                generates a tax loss that offsets what you owe now and begins
                the process of eliminating it entirely.
              </p>
            </div>

            <div className="absolute -left-10 top-16 opacity-60">
              <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                Plant
              </p>
            </div>

            <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 !w-full items-center">
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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={4}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Your seed account steadily
                <br /> grows in value.
              </p>
            </div>

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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
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

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={5}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                At the same time, it{" "}
                <span className="text-green font-extrabold font-proxima-extrabold">
                  generates tax credits and deductions
                </span>{" "}
                that further reduce what you owe.
              </p>
            </div>

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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
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

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={6}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                Tax Orchard actively manages this process, applying benefits at
                the most effective moments.
              </p>
            </div>

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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
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

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={7}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <h3 className="text-3xl pb-8">Vetted Strategies</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.2] text-black ">
                Every Tax Orchard strategy is{" "}
                <span className="font-extrabold text-blue font-proxima-extrabold">
                  fully vetted and backed by legal opinions{" "}
                </span>
                from top tax attorneys to ensure compliance and confidence.
              </h2>
            </div>

            <div className="absolute -left-10 top-20 opacity-60">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                How?
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
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
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

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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
    <div
      className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
      key={8}
    >
      <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden mt-10">
        <div className="relative">
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
            <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
              <h3 className="text-3xl pb-8">Audit Protection</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.2] text-black ">
                If your Tax Orchard investment is ever audited, our legal team
                provides full representation at no cost to you, supplying all
                required documentation and standing behind every aspect of the
                strategy.
              </h2>
            </div>

            <div className="absolute -left-10 top-20 opacity-60">
              <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                How?
              </p>
            </div>

            <div className="flex justify-center gap-4 absolute bottom-36 left-0 !w-full items-center">
              <div className="w-[25rem] h-[15rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[1000px] h-[1600px] object-contain"
                />
              </div>
              <div className="w-[25rem] h-[15rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[1000px] h-[1600px] object-contain"
                />
              </div>
              <div className="w-[25rem] h-[15rem] flex flex-col items-center">
                <img
                  src="/images/TaxOrchard_Tree_5.svg"
                  alt="Tree 1"
                  className="opacity-100 w-[1000px] h-[1600px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
              <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 !w-full"></div>

              <div className="flex flex-1 min-w-0 h-16">
                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[60px]">
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-black">
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

                <div className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 min-w-[100px] relative  overflow-hidden">
                  <div className="absolute top-0 left-0 !w-full h-2 bg-blue z-20 "></div>
                  <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-extrabold  text-blue ">
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

    <div
      className="min-h-screen bg-transparent !w-full flex items-center justify-center relative z-50"
      key={9}
    ></div>,
  ];
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

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const totalPages = pageElements.length;
    const page = Math.min(totalPages - 1, Math.floor(progress * totalPages));

    // Flip to next page at each breakpoint if not already there
    if (flipBook.current && flipBook.current.pageFlip) {
      if (page > currentPage) {
        flipBook?.current?.pageFlip()?.flipNext();
        setCurrentPage(page);
      } else if (page < currentPage) {
        flipBook?.current?.pageFlip().flipPrev();
        setCurrentPage(page);
      }
    }

    // Move containerRef to the left out of the screen if progress is between 0.88 and 0.9
    if (containerRef.current) {
      if (progress >= 0.88 && progress <= 0.1) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.transform = "translateX(-100vw)";
        // containerRef.current.style.transition =
        //   "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)";
      } else {
        containerRef.current.style.opacity = "";
        containerRef.current.style.transform = "";
        containerRef.current.style.transition = "";
      }
    }

    console.log(
      `Section Calendar scroll: progress=${progress}, page=${
        page + 1
      }/${totalPages}`
    );
  });

  // useEffect(() => {
  //   let timeout;
  //   if (currentPage === pageElements.length - 1) {
  //     timeout = setTimeout(() => setHideContainer(true), 600); // 600ms delay
  //   } else {
  //     setHideContainer(false);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [currentPage, pageElements.length]);

  return (
    <div
      className="relative w-full !z-50"
      ref={containerRef}
      style={{
        display: hideContainer ? "none" : undefined,
      }}
    >
      <div className="flipbook-container sticky top-0 !z-50 w-full h-screen overflow-hidden">
        <HTMLFlipBook
          onChangeState={flipping}
          ref={flipBook}
          width={windowSize.width}
          height={windowSize.height}
          minWidth={315}
          maxWidth={500}
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
          } min-h-screen w-full pointer-events-auto`}
        >
          {pageElements}
        </HTMLFlipBook>
      </div>

      <div
        style={{ height: `${pageElements.length * 100 + 100}vh` }}
        ref={scrollContainerRef}
      />
    </div>
  );
}
