import React from "react";

export default function SectionTen() {
  return (
    <section className="bg-white">
      <div className="text-center max-w-2xl">
        <div className="h-[200px] flex items-end">
          <p
            className="text-[40px] font-proxima-regular leading-tight text-black"
            id="yearTen"
          >
            <span className="font-proxima-bold text-green">Year Ten:</span> You
            receive your full $500,000 back, possibly more.
          </p>
          <p
            className="text-[40px] font-proxima-regular leading-tight text-black "
            id="origitalTax"
          >
            Your original tax bill?{" "}
            <span className="font-proxima-bold text-blue">Gone.</span> Fully
            eliminated through the growth and credits cultivated from your
            investment.
          </p>
        </div>

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

      <div className="text-center max-w-3xl relative z-30" id="letsGrow">
        <div className="h-[200px] flex flex-col items-center justify-center">
          <h2
            className="text-[80px] font-proxima-bold leading-tight font-black text-black hidden"
            id="letsgrowtitle"
          >
            Let's Grow
          </h2>
          <p
            className="text-[40px] font-proxima-regular leading-tight text-black hidden"
            id="letsgrosubtitle"
          >
            So, now what may have felt like being buried can actually become the
            beginning of something greater.
          </p>
        </div>

        <div className="flex justify-center pt-28">
          <svg
            id="Logo"
            className="logo-container"
            xmlns="http://www.w3.org/2000/svg"
            width="409.35"
            height="287.979"
            viewBox="0 0 409.35 287.979"
          >
            <path
              id="Path_1848"
              data-name="Path 1848"
              d="M142.335,170.273l51.781,58.295V287.98h25.093V229.789l51.781-58.3V136.969l-9.274,10.442L207.205,208.8l-64.87-73.029Z"
              fill="#3ba136"
            />
            <path
              id="Path_1849"
              data-name="Path 1849"
              d="M222.529,107.612l17.123-19.276,20.764-23.375L245.634,47.1,230.57,64.059,207.2,90.359,183.06,63.181,168.213,46.467,153.431,64.352,207.2,124.888Z"
              fill="#3ba136"
            />
            <path
              id="Path_1850"
              data-name="Path 1850"
              d="M206.664,0,180,32.291l26.668,32.288L233.33,32.291Z"
              fill="#3ba136"
            />
            <path
              id="Path_1851"
              data-name="Path 1851"
              d="M0,192.855l47.109,47.109v48.015H69.937V240.952l47.112-47.113v-27.9l-8.44,8.44L59.017,223.99,0,164.973Z"
              fill="#3ba136"
            />
            <path
              id="Path_1852"
              data-name="Path 1852"
              d="M72.958,142.217,88.536,126.64l18.89-18.89L93.976,93.315l-13.7,13.7L59.018,128.276,37.051,106.31,23.544,92.8,10.1,107.259l48.922,48.919Z"
              fill="#3ba136"
            />
            <path
              id="Path_1853"
              data-name="Path 1853"
              d="M58.525,55.251l-24.262,26.1L58.525,107.44,82.787,81.351Z"
              fill="#3ba136"
            />
            <path
              id="Path_1854"
              data-name="Path 1854"
              d="M292.3,118.082V145l59.017,59.02,13.946-13.941L395,160.321l14.354-14.335v-27.9L386.75,140.7l-35.432,35.431-58.546-58.545Z"
              fill="#3ba136"
            />
            <path
              id="Path_1855"
              data-name="Path 1855"
              d="M292.3,192.855l47.109,47.109v48.015h22.828V240.952l47.112-47.113v-27.9l-8.439,8.44L351.318,223.90,292.3,164.973Z"
              fill="#3ba136"
            />
            <path
              id="Path_1856"
              data-name="Path 1856"
              d="M350.824,55.251l-24.26,26.1,24.26,26.093,24.262-26.093Z"
              fill="#3ba136"
            />
            <path
              id="Path_1857"
              data-name="Path 1857"
              d="M207.206,149.581,149.615,85.795l-90.6,90.339L.473,117.589,0,145l59.017,59.02,88.169-87.5,60.02,67.568L288.2,94.147l63.122,62.035,48.411-48.432L386.278,93.315l-34.961,34.961L285.205,61.962Z"
              fill="#c0bfbf"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
