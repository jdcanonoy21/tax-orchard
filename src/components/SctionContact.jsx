"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const steps = [
  {
    label: "First Name",
    type: "text",
    id: "first-name",
    placeholder: "First Name",
  },
  {
    label: "Last Name",
    type: "text",
    id: "last-name",
    placeholder: "Last Name",
  },
  {
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "Email Address",
  },
  {
    label: "Phone Number",
    type: "tel",
    id: "phone",
    placeholder: "Phone Number",
  },
  {
    label: "Your Message",
    type: "textarea",
    id: "message",
    placeholder: "how can we help?",
  },
];

const totalSteps = steps.length;

export default function SectionContact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    phone: "",
    message: "",
  });
  const inputRef = useRef(null);
  const didMount = useRef(false);
  const swiperRef = useRef(null);

  // Focus input on step change, but not on initial load
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(currentStep);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
      if (swiperRef.current && swiperRef.current.slideTo) {
        swiperRef.current.slideTo(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && steps[currentStep].type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = () => {
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      "first-name": "",
      "last-name": "",
      email: "",
      phone: "",
      message: "",
    });
    setCurrentStep(0);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-[100px] font-proxima-bold leading-none font-black text-black">
          Buried or planted.
          <br /> You decide.
        </h2>
      </div>

      <div className=" w-full relative ">
        <div className="max-w-4xl mx-auto">
          <div
            className="flex items-center justify-between mt-8 pt-4 absolute -bottom-14 gap-5 w-full mx-auto"
            style={{ marginLeft: "20px" }}
          >
            <div className="w-4xl ">
              <span className="text-midGrey text-2xl md:text-3xl font-proxima-regular font-medium">
                Get in touch
              </span>
              <span className="text-midGrey text-xl md:text-2xl"> / </span>
              <span className="text-midGrey text-xl md:text-2xl" id="progress-indicator">
                {currentStep + 1} of {totalSteps}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8 min-h-[120px]">
          <Swiper
            allowTouchMove={false}
            speed={800}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            style={{ minHeight: "120px" }}
          >
            {steps.map((step, idx) => (
              <SwiperSlide key={step.id}>
                <div className="flex items-center justify-between relative  w-full  max-w-4xl mx-auto px-4">
                  {idx > 0 && (
                    <button
                      type="button"
                      className="p-2 absolute left-0"
                      onClick={handlePrev}
                      aria-label="Previous"
                    >
                      <img
                        src="/images/arrow-right.svg"
                        alt="arrow-left"
                        className="md:w-10 md:h-10 w-6 h-6 text-black"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    </button>
                  )}
                  <div className="flex-1 flex flex-col items-center">
                    {step.type === "textarea" ? (
                      <textarea
                        id={step.id}
                        ref={idx === currentStep ? inputRef : null}
                        className="w-full text-4xl md:text-6xl font-medium bg-transparent overflow-hidden outline-none placeholder:text-blue md:placeholder:text-6xl placeholder:text-4xl placeholder:font-proxima-regular placeholder:font-regular h-10 md:h-20 text-blue placeholder:text-center text-center resize-none focus:placeholder-transparent"
                        placeholder={step.placeholder}
                        rows={3}
                        value={formData[step.id]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      <input
                        type={step.type}
                        id={step.id}
                        ref={idx === currentStep ? inputRef : null}
                        className="w-full text-4xl md:text-6xl font-medium bg-transparent outline-none placeholder:text-blue placeholder:text-4xl md:placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-regular h-20 text-blue placeholder:text-center text-center focus:placeholder-transparent"
                        placeholder={step.placeholder}
                        value={formData[step.id]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="p-2 absolute right-0"
                    onClick={handleNext}
                    aria-label={idx === totalSteps - 1 ? "Submit" : "Next"}
                    style={{ right: 0 }}
                  >
                    <img
                      src="/images/arrow-right.svg"
                      alt="arrow-right"
                      className="md:w-10 md:h-10 w-6 h-6 text-black"
                    />
                  </button>
                  <div
                    className="absolute border-b border-[#707070] h-1"
                    style={{
                      top: "100px",
                      width: "95%",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
