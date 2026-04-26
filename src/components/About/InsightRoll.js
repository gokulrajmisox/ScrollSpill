import React from "react";

const InsightRoll = ({ insights }) => {
  return (
    <div className="w-full bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] text-white whitespace-nowrap overflow-hidden shadow-lg border-y border-white/10">
      <div className="animate-roll w-full py-3 flex items-center justify-center capitalize font-bold tracking-widest text-sm sm:text-base">
        {insights.map((text, index) => (
          <div key={index} className="flex items-center">
            {text} <span className="px-6 text-2xl opacity-50">•</span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightRoll;
