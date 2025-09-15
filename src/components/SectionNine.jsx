import React from "react";

export default function SectionNine() {
  return (
    <section className="flex flex-col relative ">
      <div className="min-h-screen  flex items-center justify-center p-8 absolute w-full">
        <div className="text-center mx-auto w-full">
          <h2
            className="text-[183px] font-proxima-bold leading-none font-black  mx-auto w-full mix-blend-difference text-white"
            id="theHarvest"
          >
            The Harvest
          </h2>
        </div>
      </div>
      <div className="min-h-screen bg-black flex items-center justify-center p-8"></div>
      <div
        className="min-h-screen  bg-white flex items-center justify-center p-8"
        id="section-white"
      ></div>
    </section>
  );
}
