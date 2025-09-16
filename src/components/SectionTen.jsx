import React from "react";

export default function SectionTen() {
  return (
    <section
      className="bg-white min-h-screen flex items-center justify-center p-8 relative w-full"
      key="section-two"
    >
      <div
        className="text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
        exit={{ opacity: 1 }}
      >
        <div className="flex justify-center items-end relative" id="threeTrees">
          <img
            src="/images/year-ten-tree.svg"
            alt="Year 10"
            className="w-full  h-[370px]"
            id="tree1"
          />
          <img
            src="/images/year-ten-tree.svg"
            alt="Year 10"
            className="w-full h-[430px] relative !z-50"
            id="tree2"
          />
          <img
            src="/images/tree-behind.svg"
            alt="Year 10"
            className="w-full h-[430px] absolute top-[34px] z-10"
            id="tree2"
          />
          <img
            src="/images/year-ten-tree.svg"
            alt="Year 10"
            className="w-full  h-[370px]"
            id="tree3"
          />
        </div>
      </div>
    </section>
  );
}
