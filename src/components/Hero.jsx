import React from "react";

export default function Hero() {
  return (
    <section>
      <div className="relative min-h-screen flex flex-col justify-between p-8">
        <header className="relative z-20 pt-4" id="logo">
          <div className="flex items-center gap-4">
            <img
              src="/images/tax-orchard-logo.svg"
              alt="Tax Orchard Logo"
              className="h-10"
            />
          </div>
        </header>

        <main className="relative z-20 text-center flex-grow flex flex-col justify-center items-center py-8">
          <h2
            id="main-title"
            className="text-6xl md:text-[218px] font-black tracking-normal leading-none font-schabo mb-6 text-white "
          >
            TAX ORCHARD
          </h2>
          <p
            className="text-xl md:text-[40px] font-proxima-regular font-semibold text-white"
            id="section1-subtitle"
          >
            Your success shouldn’t be buried by taxes.
          </p>
        </main>

        <div className="relative z-20 flex justify-center pb-8 animate-fade-in-up">
          <div className=" w-14 h-14  rounded-full flex items-center justify-center ">
            <img
              src="/images/down-arrow.svg"
              alt="Scroll down"
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
