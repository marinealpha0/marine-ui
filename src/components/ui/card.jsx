import React from "react";

// Card container
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

// Card Header
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`px-4 pt-4 ${className}`}>
      {children}
    </div>
  );
};

// Card Title
export const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-bold text-gray-800 dark:text-white ${className}`}>
      {children}
    </h3>
  );
};

// Card Description (optional)
export const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
};

// Card Content
export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`px-4 py-4 ${className}`}>
      {children}
    </div>
  );
};

// Card Footer (optional)
export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};
