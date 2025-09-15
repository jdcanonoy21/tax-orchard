import React from "react";

export default function SectionThree() {
  return (
    <section
      id="section-three"
      className="min-h-screen flex items-center justify-center px-8 py-4"
    >
      <div className="text-center max-w-4xl text-white">
        <h3
          className="text-[45px] font-proxima-regular font-semibold"
          id="notReward"
        >
          That’s not a reward.
        </h3>
        <h2
          className="text-[90px] font-proxima-bold leading-none font-bold "
          id="section2-header"
        >
          It’s a penalty for doing everything right.
        </h2>
      </div>
    </section>
  );
}
