import React from "react";
import { ArrowUpwardIcon, ArrowDownwardIcon } from "@/assets/icons";

const AnalyticsCard = ({ title, value, percentage, isPositive, bg }) => {
  return (
    <div
      className="relative flex flex-col justify-between p-3 sm:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out
                 bg-white dark:bg-gray-800 w-[46%] sm:w-[250px] min-h-[110px] sm:min-h-[140px] overflow-hidden"
    >
      {/* Optional subtle gradient background element for visual interest */}
      <div
        className="absolute inset-0 opacity-20 "
        style={{
          backgroundImage: "linear-gradient(135deg, #808080 0%, #f5f5f5 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)", // A more interesting shape
        }}
      ></div>

      <div className="relative z-10 flex flex-col ">
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 leading-tight">
          {title}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white m-0 leading-tight">
          {value}
        </h2>
      </div>

      <div
        className={`relative z-10 flex items-center justify-end text-xs sm:text-sm font-semibold mt-auto
                    ${isPositive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
          }`}
      >
        {isPositive ? (
          <ArrowUpwardIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        ) : (
          <ArrowDownwardIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        )}
        <span>{percentage}</span>
        <span className="ml-1 text-[10px] sm:text-xs font-normal text-gray-400 dark:text-gray-500">
          {" "}
          last month
        </span>
      </div>
    </div>
  );
};

export default AnalyticsCard;
