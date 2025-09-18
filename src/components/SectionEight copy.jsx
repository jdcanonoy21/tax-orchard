"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "motion/react";

export default function SectionEight() {
  return (
    <section>
      <div>
        <ul>
          <li>
            <div
              id="calendar-section-1"
              className="calendar-section min-h-screen bg-white w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center justify-center relative z-50"
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden">
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
                        <div className="flex text-black justify-evenly w-full -mt-6">
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

                    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 w-full items-center">
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
                      <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 w-full"></div>

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
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue z-20 "></div>
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
          </li>
          <li>
            <div
              id="calendar-section-1"
              className="calendar-section min-h-screen bg-white w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center justify-center relative z-50"
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center w-3/4 justify-center items-center mb-8 sm:mb-12">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        That seed account{" "}
                        <span className="text-blue  font-proxima-bold">
                          immediately
                        </span>{" "}
                        generates a tax loss that offsets what you owe now and
                        begins the process of eliminating it entirely.
                      </p>
                    </div>

                    <div className="absolute -left-10 top-16 opacity-60">
                      <p className="text-[100px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                        Plant
                      </p>
                    </div>

                    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 w-full items-center">
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
                      <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 w-full"></div>

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
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue z-20 "></div>
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
          </li>
          <li>
            <div
              id="calendar-section-3"
              className="calendar-section min-h-screen bg-white w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center justify-center relative z-50 "
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center justify-center items-center mb-8 sm:mb-12 w-3/4">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Your seed account steadily <br /> grows in value.
                      </p>
                    </div>

                    <div className="absolute -left-24 top-32 opacity-60">
                      <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                        Cultivate
                      </p>
                    </div>

                    <div className="w-full flex justify-center items-center z-10">
                      <div className="w-[40%] absolute bottom-28  h-20 flex flex-col items-center justify-center">
                        <img
                          src="/images/graph.png"
                          alt="financial advisor"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 w-full items-center">
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
                      <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 w-full"></div>

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
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue z-20 "></div>
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue">
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
          </li>
          <li>
            <div
              id="calendar-section-4"
              className="calendar-section min-h-screen bg-white w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center justify-center relative z-50 "
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center justify-center items-center mb-8 sm:mb-12 w-3/4">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        At the same time, it{" "}
                        <span className="text-green font-proxima-bold">
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

                    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-[120px] left-0 w-full items-center">
                      <div className="w-full h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                        <img
                          src="/images/generate-tax-tree.svg"
                          alt="Tree 1"
                          className="opacity-100"
                        />
                      </div>
                      <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                        <img
                          src="/images/generate-tax-tree.svg"
                          alt="Tree 1"
                          className="opacity-100"
                        />
                      </div>
                      <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                        <img
                          src="/images/generate-tax-tree.svg"
                          alt="Tree 1"
                          className="opacity-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative">
                    <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
                      <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 w-full"></div>

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
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue z-20 "></div>
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold  text-blue">
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
          </li>
          <li>
            <div
              id="calendar-section-5"
              className="calendar-section min-h-screen bg-white w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center justify-center relative z-50 "
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center justify-center items-center mb-8 sm:mb-12 w-3/4">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Tax Orchard actively manages this process, applying
                        benefits at the most effective moments.
                      </p>
                    </div>

                    <div className="absolute -left-24 top-32 opacity-60">
                      <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                        Cultivate
                      </p>
                    </div>

                    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-14 left-0 w-full items-center">
                      <div className="w-full h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                        <img
                          src="/images/active-tax-tree.svg"
                          alt="Tree 1"
                          className="opacity-100"
                        />
                      </div>
                      <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                        <img
                          src="/images/active-tax-tree.svg"
                          alt="Tree 1"
                          className="opacity-100"
                        />
                      </div>
                      <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-56 md:h-24 flex flex-col items-center ">
                        <img
                          src="/images/active-tax-tree.svg"
                          alt="Tree 1"
                          className="opacity-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative">
                    <div className="flex items-center border-t border-gray-500 bg-white overflow-x-auto relative">
                      <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 w-full"></div>

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
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue z-20 "></div>
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold text-blue">
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
          </li>
          <li>
            <div
              id="calendar-section-6"
              className="calendar-section min-h-screen bg-white w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 md:py-16 flex items-center justify-center relative z-50 "
            >
              <div className="w-full max-w-7xl mx-auto relative border border-gray-500  overflow-hidden">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-16 relative">
                    <div className="text-center justify-center items-center mb-8 sm:mb-12 w-3/4">
                      <h3 className="text-2xl font-proxima-regular text-black pb-4">
                        Vetted Strategies
                      </h3>
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-proxima-regular !leading-[1.3] text-black ">
                        Every Tax Orchard strategy is{" "}
                        <span className="text-blue font-proxima-bold">
                          fully vetted and backed by legal opinions
                        </span>{" "}
                        from top tax attorneys to ensure compliance and
                        confidence.
                      </p>
                    </div>

                    <div className="absolute left-0 top-16 opacity-60">
                      <p className="text-[80px] font-proxima-regular text-[#EFEBE1] font-bold transform -rotate-90">
                        How?
                      </p>
                    </div>

                    <div className="flex justify-center  gap-4 sm:gap-6 md:gap-20 mb-8 sm:mb-12 md:mb-16 absolute bottom-6 left-0 w-full items-center">
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
                      <div className="flex justify-center h-2 border-t border-gray-500 absolute top-2 w-full"></div>

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
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue z-20 "></div>
                          <span className="text-sm sm:text-[15px] text-[15px] font-baskervville-semibold font-medium text-blue">
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
          </li>
        </ul>
      </div>
    </section>
  );
}
