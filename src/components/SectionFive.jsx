"use client";

import React, { useRef, useState, useEffect } from "react";

export default function SectionFive() {
  const sectionRef = useRef(null);
  const [pathLine, setPathLine] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Calculate progress: 0 when section bottom touches viewport bottom, 1 when section top touches viewport top
      const sectionHeight = rect.height;
      const scrollStart = windowHeight;
      const scrollEnd = 0;

      const progress = Math.min(
        Math.max((scrollStart - rect.top) / (scrollStart - scrollEnd), 0),
        1
      );

      // console.log("Section scroll progress:", progress);

      // Start animation only if progress >= 0.7
      setPathLine(progress >= 0.6 ? (progress - 0.7) / 0.3 : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="h-screen flex items-center overflow-hidden bg-black"
      ref={sectionRef}
    >
      <div className="w-full">
        <div className="flex flex-col gap-32 items-center justify-center">
          <div className="text-center max-w-4xl">
            <h2 className="px-5 md:px-0 text-5xl md:text-[90px] font-proxima-bold leading-none font-black text-white">
              You can be buried. Or you can be planted.
            </h2>
          </div>
          <div className="relative w-full h-8 mt-8 flex justify-center items-center">


            <svg xmlns="http://www.w3.org/2000/svg"  width="866" height="9.557" viewBox="0 0 866 9.557" className="w-[70%] h-auto rotate-[0.5deg]">
              <defs>
                <clipPath id="clip-path">
                  <rect id="Rectangle_874" data-name="Rectangle 874" width="866" height="9.557" fill="none"/>
                </clipPath>
                {/* Animated clip path that reveals the ground from left to right */}
                <clipPath id="animated-clip">
                  <rect 
                    x="0" 
                    y="0" 
                    width={866 * Math.max(0, Math.min(pathLine, 1))} 
                    height="9.557" 
                    fill="white"
                  />
                </clipPath>
              </defs>
              <g id="Ground" transform="translate(0 0)">
                <g id="Group_500" data-name="Group 500" transform="translate(0 0)" clipPath="url(#clip-path)">
                  <g clipPath="url(#animated-clip)">
                    <path id="Path_7531" data-name="Path 7531" d="M152.96,6.906l2.217,0a4.259,4.259,0,0,0-.514-.014l-1.7.012" transform="translate(-27.9 0)" fill="#fff"/>
                    <path id="Path_7532" data-name="Path 7532" d="M839.727.817l.526-.025c-.372.01-.491.018-.526.025" transform="translate(-153.165 0)" fill="#fff"/>
                    <path id="Path_7533" data-name="Path 7533" d="M258.273,7.157h-.118l-.575.018Z" transform="translate(-46.982 0)" fill="#fff"/>
                    <path id="Path_7534" data-name="Path 7534" d="M98.131,8.33c29.694-.336,37.573-.231,68.348-.649l44.694-.522c6.808-.242,18.842-.19,26.9-.415l3.125.068c2.777-.078,6.036-.145,8.828-.118l-.176.031c4.149-.118,8.828-.118,10.889-.178l-.172.032,5.04-.063-.866.052c7.234-.157,14.689-.238,21.259-.254l-.546-.127c14.049.021,19.184-.31,31.866-.245l-.173.036c16.023-.531,25.336.031,41.853-.471-2.06.065.883.071.716.11l10.734-.176a26.768,26.768,0,0,0,5.116-.328c5.545-.045,4.515.057,5.238.171a2.521,2.521,0,0,1,.8-.095l2.118-.079L389.915,5l-1.992.071,12.4-.155-2.437-.243c6.577.016,1.673.308,7.972.189l-.082-.222c9.1-.034,14.435.27,23.242.377,36.6-.156,75.926-1.064,109.985-.8l1.5.2c.657.3,9.392-.5,10.692-.229l3.96-.16c1.113.049,3.461.1,1.488.174,3.663,0,3.752-.054,6.39-.159l3.932.173c14.454.089,26.739-.344,41.946-.339,18.271.314,52.656-.14,72.468-.458,27.847-.675,60.242.8,88.755.121.464.027,1.3.009,2.01-.022l.922-.051a1.624,1.624,0,0,0,.379-.046l26.1.047s31.632.068,51.248-.322c19.617-.37,27.219-1.307-20.849-2.932l.645-.091c-14.283-.183-23.276-.2-33.124.267C795.909-.147,785.732.355,782.389.2l.316-.045C773.991.6,764.758-.092,756.36.307A9.677,9.677,0,0,1,758.8.1c-6.12.095-14.488.248-14.944-.047-14.615.155-35.015.105-44.379.63L700.115.6c-5.336.338-6.907.089-12.873.279a6.322,6.322,0,0,1-.68-.066c-5.813.331-16.966.15-21.666.3l-.3-.179-11.576.114,4.327.011c-1.5.5-8.757-.253-17.151.115-7.857-.012-15.932,1.092-24.093.914-3.89.245,3.425-.38-2.39-.171-.191-.243,2.715-.173,1.217-.357-5.712.157-9.368-.177-16.413.039l-.288-.184c-9.188.407-17.34-.107-23.457.258-9.475.219-6.357-.482-16.224-.055l-3.838-.208c-4.223,0-3.023.319-7.705.247.284-.152-5.918-.062-3.176-.229-10.6-.123-21.512.526-35.471.284-3.031.3-10.057.207-12.318.431-.375-.114-14.08.114-6.192-.213a12.128,12.128,0,0,1,1.794.011l.944-.168c-7.962-.219-14.463.305-22.341.347,2.335.025,5.442-.022,3.366.107l-7.318.058,1.522-.146-10.9.046,1.5.141c-5.337-.024-7.214-.266-13.229.021-2.723.151,5.054.153-.578.262-7.132-.03-17.818-.068-26.923-.01.853.157-1.6.177-4.118.238l-.292-.14c-9.662.3-3.544-.273-13.132,0l.845-.109-2.53.324c-8.651.378-4.668-.229-14.279.259,3.8-.069,1.793.281-2.887.275l1.185-.145c-2.589.058-3.454.122-5.178.115,1.542-.088.814-.2-2.992-.131l2.55-.193-7.2.324c-5.558-.07-14.364.2-16.646.055,0,0-11.949.059-14.689.283,2.4-.148-4.188-.106-2.313-.266-3.094.173-12.238.4-15.9.309l.693-.024c-13.541.046-23.153.49-35.3.489.555.125-5.863.137-4.276.283-12.569.321-22.921-.01-27.457.538-5.718.1-6.778-.022-9.734-.006l1.363-.043-21.783.329c-3.971.1-4.595.313-11.713.363,2.3-.114-.607-.058-3.27-.02,1.7-.036,2.227-.074-1.268-.078l-1.965.081c-.029-.006-.169-.009-.1-.018-4.444.091-3.671.105-1.607.087-.1.013.07.026.709.04-4.613-.038-12.858.187-13.418.062l-34.034.7c-1.251-.044,1.348-.137,4.576-.21l-7.89.14a4.222,4.222,0,0,1,.775-.057l1.82-.043,4.367-.074c-9.4,0-19.365.433-30.38.47l-2.284.1h-.657a2.312,2.312,0,0,1-.392.033l-1.018.043-2.66.076a34.912,34.912,0,0,0-5.345-.078c-4.312,0-12.252.228-17.9.35,3.044-.036,2.062.016.752.059-2.727.044-4.3,0-6.4.064l-.263-.082c1.074.065-7.121.2-8.129.248-1.553-.038,4.23-.119,4.911-.178l-16.4.272c-5.834.155,1.06.059-1.729.175-5.149.1-10.174.229-16.086.276L58.49,8.2c-9.676.2-15.465.28-21.984.324C.468,9.351-3.328,9.546,1.887,9.557l19.438-.139C49.7,9.18,64.352,8.815,98.131,8.33" transform="translate(0 0)" fill="#fff"/>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
