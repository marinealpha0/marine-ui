import React from "react";
import HeaderSection from "@/layouts/HeaderSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <HeaderSection
        title="Marine-UI Dashboard"
        subtitle="Welcome to your Marine-UI Application"
        showTimeRangeDropdown={false}
      />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your application workspace is clean and ready for new feature development.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

