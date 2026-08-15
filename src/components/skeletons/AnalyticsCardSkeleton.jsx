import React from 'react';

const SingleAnalyticsCardSkeleton = ({ bg = "#EAECEF" }) => {
  return (
    <div
      className="flex flex-col justify-between p-3 sm:p-6 rounded-xl w-[46%] sm:w-[250px] min-h-[110px] sm:min-h-[140px] shadow-md border transition-all animate-pulse"
      style={{ backgroundColor: bg }}
    >
      {/* Left section */}
      <div>
        {/* Title skeleton */}
        <div className="bg-black/8 mb-2 h-4 w-20 sm:w-[120px] rounded-sm"></div>
        {/* Value skeleton */}
        <div className="bg-black/12 h-6 sm:h-8 w-16 sm:w-20 rounded-sm"></div>
      </div>

      {/* Right (trend) section */}
      <div className="flex items-center justify-end mt-auto">
        <div className="flex items-center gap-[2px]">
          {/* Arrow icon skeleton */}
          <div className="bg-black/12 rounded-full w-3 h-3 sm:w-4 sm:h-4"></div>
          {/* Percentage skeleton */}
          <div className="bg-black/12 h-4 sm:h-5 w-8 sm:w-10 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCardSkeleton = () => {
  // Exactly 4 skeleton cards
  const cardCount = 4;

  return (
    <div className="flex flex-wrap gap-5 justify-start">
      {Array.from({ length: cardCount }, (_, index) => (
        <SingleAnalyticsCardSkeleton key={index} bg="#EAECEF" />
      ))}
    </div>
  );
};

export default AnalyticsCardSkeleton;
