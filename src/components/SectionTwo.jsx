import React from "react";

export default function SectionTwo() {
  return (
    <section
      id="section-two"
      className="min-h-screen flex items-center justify-center p-8 "
    >
      <div className="text-center max-w-4xl">
        <h2 className="text-5xl font-proxima-regular leading-tight text-white">
          <span>If you’ve just sold a business,</span>{" "}
          <span id="typing">
            landed a major contract or are a high wage earner, you could be
            facing a
          </span>{" "}
          <span id="colorChange">
            tax bill that takes up to half of your earnings.
          </span>
        </h2>
      </div>
    </section>
  );
}
