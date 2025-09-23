"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function SectionEleven() {
  return (
    <section
      className="min-h-screen bg-white flex items-center justify-center p-8 z-50  w-full sticky top-0"
      id="yearTenTres"
    >
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
                  //   onClick="nextStep()"
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
            /
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
                  //   onClick="nextStep()"
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
            /
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
                  //   onClick="nextStep()"
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
            /
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
                  //   onClick="nextStep()"
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
                  <input
                    id="message"
                    className="w-full text-6xl font-medium bg-transparent  outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-medium h-14 text-blue placeholder:text-center text-center"
                    placeholder="Your Message"
                    rows="3"
                  ></input>
                </div>
                <button
                  type="button"
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                  //   onClick="nextStep()"
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
  );
}
