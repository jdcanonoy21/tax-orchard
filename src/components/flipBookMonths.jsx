export default function FlipBookMonths({
  windowSize,
  months = [],
  page = {},
  isScrolling = false,
}) {
  return (
    <div className="flex flex-1 min-w-0 h-16">
      {months.map((month, idx) => {
        const hasHighlightIndex = typeof page?.highlightIndex === "number";
        const isHighlightIndex = hasHighlightIndex && idx === page.highlightIndex;
        const shouldHighlightDefault = !hasHighlightIndex && idx === 0 && !isScrolling;
        const shouldHighlight = isHighlightIndex || shouldHighlightDefault;

        return (
          <div
            style={{
              minWidth:
                month === page.highlightMonth && windowSize?.width > 640
                  ? "100px"
                  : "60px",
            }}
            key={month}
            className="flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300 relative overflow-hidden"
          >
            {shouldHighlight ? (
              <div
                className="absolute top-0 left-0 !w-full h-2 z-20"
                style={{ backgroundColor: page?.highlightColor || "#3974F6" }}
              ></div>
            ) : null}
            <span
              className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
                shouldHighlight ? "font-extrabold text-blue" : "font-medium text-black"
              }`}
            >
              {month}
            </span>
          </div>
        );
      })}
    </div>
  );
}
