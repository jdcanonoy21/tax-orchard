import React from "react";
import HTMLFlipBook from "react-pageflip";

export default function SectionSix() {
  return (
    <section id="section-4" className="relative h-[300vh] bg-black pb-28">
      <div className="sticky top-0 flex h-screen items-center overflow-visible">
        <div className="track w-full">
          <div className="w-full relative pt-32">
            <div className="relative flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img
                  src="/images/seed.png"
                  alt="Seed"
                  className="w-52 h-auto relative z-10"
                />
                <div className="relative w-[1500px]">
                  <div
                    className="w-full h-auto ml-[305px] mt-[-20px]"
                    id="rootContainer"
                  ></div>

                  <div
                    id="section-4-text"
                    className="absolute -right-[700px] top-[340px] transform -translate-y-1/2 max-w-3xl pr-20 js-fade-right opacity-0"
                  >
                    <div className="flex flex-col gap-4 pr-10">
                      <p className="text-[40px] font-proxima-regular leading-none text-white">
                        At Tax Orchard, we help you turn what you owe into
                        something that grows—using a strategy no one else
                        offers.
                        <span className="font-proxima-bold">
                          We turn your tax liability into an assets.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
