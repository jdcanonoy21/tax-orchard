"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const steps = [
  {
    label: "First Name",
    type: "text",
    id: "first_name",
    placeholder: "First Name",
  },
  {
    label: "Last Name",
    type: "text",
    id: "last_name",
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
    id: "phone_number",
    placeholder: "Phone Number",
  },
  {
    label: "Your Message",
    type: "textarea",
    id: "how_can_we_help",
    placeholder: "how can we help?",
  },
];

const totalSteps = steps.length;

// Phone number formatting function
const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/\D/g, '');
  
  // If empty, return empty string
  if (!phoneNumber) return '';
  
  // If it starts with 1, treat as full number
  if (phoneNumber.startsWith('1') && phoneNumber.length > 1) {
    const number = phoneNumber.slice(1); // Remove the leading 1
    
    if (number.length <= 3) {
      return `+1 ${number}`;
    } else if (number.length <= 6) {
      return `+1 ${number.slice(0, 3)}-${number.slice(3)}`;
    } else {
      return `+1 ${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
    }
  } else {
    // If doesn't start with 1, treat as area code + number
    if (phoneNumber.length <= 3) {
      return `+1 ${phoneNumber}`;
    } else if (phoneNumber.length <= 6) {
      return `+1 ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `+1 ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  }
};

export default function SectionContact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    how_can_we_help: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [validationError, setValidationError] = useState(false);
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
    const currentFieldId = steps[currentStep].id;
    const currentValue = formData[currentFieldId].trim();
    
    // Check if current field is empty
    if (!currentValue) {
      setValidationError(true);
      // Clear validation error after 3 seconds
      setTimeout(() => setValidationError(false), 3000);
      return; // Don't proceed if field is empty
    }
    
    setValidationError(false); // Clear any previous validation errors
    
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://taxorchard.riiqo.com/wp-json/taxorchard/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          how_can_we_help: "",
        });
        setCurrentStep(0);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Apply phone number formatting if it's the phone number field
    if (e.target.id === 'phone_number') {
      value = formatPhoneNumber(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(false);
    }
  };

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-[100px] font-proxima-bold leading-none font-black text-black">
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
                        className={`w-full text-3xl md:text-6xl font-medium bg-transparent overflow-hidden outline-none md:placeholder:text-6xl placeholder:text-4xl placeholder:font-proxima-regular placeholder:font-regular h-10 md:h-20 placeholder:text-center text-center resize-none focus:placeholder-transparent ${
                          validationError && idx === currentStep 
                            ? 'placeholder:text-red-500 text-red-500' 
                            : 'placeholder:text-blue text-blue'
                        }`}
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
                        className={`w-full text-3xl md:text-6xl font-medium bg-transparent outline-none placeholder:text-4xl md:placeholder:text-6xl placeholder:font-proxima-regular placeholder:font-regular h-20 placeholder:text-center text-center focus:placeholder-transparent ${
                          validationError && idx === currentStep 
                            ? 'placeholder:text-red-500 text-red-500' 
                            : 'placeholder:text-blue text-blue'
                        }`}
                        placeholder={step.placeholder}
                        value={formData[step.id]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="p-2 absolute right-0 disabled:opacity-50"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    aria-label={idx === totalSteps - 1 ? "Submit" : "Next"}
                    style={{ right: 0 }}
                  >
                    {isSubmitting && idx === totalSteps - 1 ? (
                      <div className="md:w-10 md:h-10 w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <img
                        src="/images/arrow-right.svg"
                        alt="arrow-right"
                        className="md:w-10 md:h-10 w-6 h-6 text-black"
                      />
                    )}
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

        {/* Success/Error Messages */}
        {submitStatus && (
          <div className="text-center mt-8 absolute -bottom-5 left-0 right-0">
            {submitStatus === 'success' && (
              <div className="text-green text-2xl font-proxima-regular">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-600 text-2xl font-proxima-regular">
                Sorry, there was an error submitting your message. Please try again.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
