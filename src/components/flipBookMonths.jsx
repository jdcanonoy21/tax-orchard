export default function FlipBookMonths({ windowSize, months = [], page }) {
  return (
    
    <div className="flex flex-1 min-w-0 h-16">
      {months.map((month, idx) => (
        <div
            style={{minWidth : month === page.highlightMonth && windowSize?.width > 640 ? '100px' : '60px'}}
          key={month}
          className={`flex-1 text-center flex items-end justify-center pb-4 border-r border-gray-300  relative overflow-hidden`}
        >
          {(page?.highlightIndex && idx === page.highlightIndex) || idx == 0 ? (
            <div
              className={`absolute top-0 left-0 !w-full h-2 bg-${page.highlightColor || 'blue'} z-20`}
            ></div>
          ) : null}
          <span
            className={`text-sm sm:text-[15px] text-[15px] font-baskervville-semibold ${
              (page?.highlightIndex && idx === page.highlightIndex) || idx == 0
                ? "font-extrabold text-blue"
                : "font-medium text-black"
            }`}
          >
            {month}
          </span>
        </div>
      ))}
    </div>
  );
}
