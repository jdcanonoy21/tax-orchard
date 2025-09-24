"use client";

import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import SectionEight from "./SectionEight";

export default function SectionSeven() {
  const sectionJourneyRef = useRef(null);
  const flipBookRef = useRef(null);
  const [flippedJourney, setFlippedJourney] = useState(false);
  const [flipFirst, setFlipFirst] = useState(false);

  const [flippedCalendar, setFlippedCalendar] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [removeSticky, setRemoveSticky] = useState(true);
  const [scrolly, setScrolly] = useState(0);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const blankPageRef = useRef(null);
  const [flipToBlankPage, setFlipToBlankPage] = useState(false);

  const blankPageRefs = useRef([]);
  const blankPageCount = 8; // Number of blank pages

  const [currentPage, setCurrentPage] = useState(0);

  // Handle page update on flip
  const handleFlip = () => {
    if (flipBookRef.current) {
      const pageIndex = flipBookRef.current.pageFlip().getCurrentPageIndex();
      setCurrentPage(pageIndex);
    }
  };

  // Flip to a specific page
  const goToPage = (pageIndex) => {
    const flipInstance = flipBookRef.current?.pageFlip?.();
    if (flipInstance) {
      flipInstance.flip(pageIndex);
    } else {
      console.warn("Flipbook not ready yet");
    }
  };

  // Flip through pages 5, 7, 9, 11 (indexes)
  const handleMultiPageFlip = async () => {
    const pageIndexes = [2, 4, 6, 8, 10]; // 0-based indexing

    for (let i = 0; i < pageIndexes.length; i++) {
      const page = pageIndexes[i];
      goToPage(page);
      // Wait for flip animation to complete (~800ms default)
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  };

  useEffect(() => {
    if (flippedJourney) {
      goToPage(3);
    }
  }, [flippedJourney]);

  useEffect(() => {
    if (flipFirst) {
      handleMultiPageFlip();
    }
  }, [flipFirst]);

  useEffect(() => {
    setRemoveSticky(currentPage === 13);
  }, [currentPage]);

  return (
    <>
      {/* <div className="p-4 bg-white fixed top-0 left-0 z-50">
        <p>Active Page: {currentPage}</p>
      </div> */}
      <section className={`overflow-hidden ${removeSticky ? "" : ""}  top-0 `}>
        <div
          className="min-h-screen bg-black w-screen  relative"
          ref={sectionJourneyRef}
        >
          <HTMLFlipBook
            ref={flipBookRef}
            width={570}
            height={620}
            size="stretch"
            minWidth={720}
            maxWidth={840}
            minHeight={520}
            maxHeight={520}
            maxShadowOpacity={0.1}
            showCover={false}
            mobileScrollSupport={true}
            usePortrait={true}
            startPage={0}
            animationDuration={300}
            className="shadow-lg !min-h-screen"
            onFlip={handleFlip}
          >
            <div className="min-h-screen bg-black !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 1 */}
            <div className="calendar-section min-h-screen bg-black !w-full flex items-center justify-center relative z-50">
              <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full overflow-hidden -ml-[45%]">
                <h2 className="text-[120px] font-proxima-bold leading-none font-black text-white text-center">
                  The Journey
                </h2>
                <p className="text-lightgrey text-[32px] font-proxima-regular leading-[34px] text-center">
                  In this scenario, let’s say you just made <br />
                  $2 million and the IRS wants half.
                </p>
              </div>
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 2 */}
            <div
              className="calendar-section min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
              ref={page2Ref}
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden -ml-[45%]">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Instead of paying $1 million to the IRS, you invest
                        $500,000 with your financial advisor and $500,000 into
                        your Tax Orchard seed account.
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
                          <p className="text-3xl text-green font-bold">
                            Tax Orchard
                          </p>
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
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue ">
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
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 2 */}
            <div
              className="calendar-section min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
              ref={page2Ref}
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden -ml-[45%]">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Instead of paying $1 million to the IRS, you invest
                        $500,000 with your financial advisor and $500,000 into
                        your Tax Orchard seed account.
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
                          <p className="text-3xl text-green font-bold">
                            Tax Orchard
                          </p>
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
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue ">
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
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 2 */}
            <div
              className="calendar-section min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
              ref={page2Ref}
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden -ml-[45%]">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Instead of paying $1 million to the IRS, you invest
                        $500,000 with your financial advisor and $500,000 into
                        your Tax Orchard seed account.
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
                          <p className="text-3xl text-green font-bold">
                            Tax Orchard
                          </p>
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
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue ">
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
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 2 */}
            <div
              className="calendar-section min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
              ref={page2Ref}
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden -ml-[45%]">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Instead of paying $1 million to the IRS, you invest
                        $500,000 with your financial advisor and $500,000 into
                        your Tax Orchard seed account.
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
                          <p className="text-3xl text-green font-bold">
                            Tax Orchard
                          </p>
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
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue ">
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
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 2 */}
            <div
              className="calendar-section min-h-screen bg-white !w-full flex items-center justify-center relative z-50"
              ref={page2Ref}
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden -ml-[45%]">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Instead of paying $1 million to the IRS, you invest
                        $500,000 with your financial advisor and $500,000 into
                        your Tax Orchard seed account.
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
                          <p className="text-3xl text-green font-bold">
                            Tax Orchard
                          </p>
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
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue ">
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
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>

            {/* Page 3 */}

            <div
              ref={page3Ref}
              className="calendar-section min-h-screen bg-white !w-full  flex items-center justify-center relative z-50 "
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden -ml-[45%]">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Your seed account steadily grows in value.
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
            </div>

            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>
            <div className="min-h-screen bg-white !w-full flex items-center justify-center relative z-50"></div>
          </HTMLFlipBook>
        </div>
      </section>
      <SectionEight
        setFlippedJourney={setFlippedJourney}
        setFlippedCalendar={setFlippedCalendar}
        setIsSticky={setIsSticky}
        setFlipToBlankPage={setFlipToBlankPage}
        setFlipFirst={setFlipFirst}
        setRemoveSticky={setRemoveSticky}
        currentPage={currentPage}
      />
    </>
  );
}
