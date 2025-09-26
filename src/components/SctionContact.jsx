"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    placeholder: "Your Message",
  },
];

const totalSteps = steps.length;

export default function SectionContact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    phone: "",
    message: "",
  });
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(null);

  // Focus input on step change
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
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

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-[100px] font-proxima-bold leading-none font-black text-black">
          Buried or planted.
          <br /> You decide.
        </h2>
      </div>

      <div className="max-w-4xl w-full relative">
        <div className="flex items-center justify-between mt-8 pt-4 absolute -bottom-14 gap-5">
          <span className="text-midGrey text-3xl font-proxima-regular font-medium">
            Get in touch
          </span>
          <span className="text-midGrey text-2xl"> / </span>
          <span className="text-midGrey text-2xl" id="progress-indicator">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>

        <div className="space-y-8 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="form-step"
              data-step={currentStep + 1}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 flex flex-col items-center">
                  {steps[currentStep].type === "textarea" ? (
                    <textarea
                      id={steps[currentStep].id}
                      ref={inputRef}
                      className="w-full text-6xl font-medium bg-transparent overflow-hidden outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-regular h-14 text-blue placeholder:text-center text-center resize-none focus:placeholder-transparent"
                      placeholder={steps[currentStep].placeholder}
                      rows={3}
                      value={formData[steps[currentStep].id]}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <input
                      type={steps[currentStep].type}
                      id={steps[currentStep].id}
                      ref={inputRef}
                      className="w-full text-6xl font-medium bg-transparent outline-none placeholder:text-blue placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-regular h-14 text-blue placeholder:text-center text-center focus:placeholder-transparent"
                      placeholder={steps[currentStep].placeholder}
                      value={formData[steps[currentStep].id]}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                  onClick={handleNext}
                  aria-label={
                    currentStep === totalSteps - 1 ? "Submit" : "Next"
                  }
                >
                  <img
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    className="w-10 h-10 text-black"
                  />
                </button>
              </div>
              <div className="border-b border-[#707070] mt-10 w-full h-1"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
