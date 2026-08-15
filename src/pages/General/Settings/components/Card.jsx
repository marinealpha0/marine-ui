import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all ${className}`}
  >
    {children}
  </div>
);

export default Card;
