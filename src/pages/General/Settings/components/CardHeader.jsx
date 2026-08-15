import React from "react";

const CardHeader = ({
  iconBgClass = "bg-primary",
  icon,
  title,
  subheader,
}) => (
  <div className="flex items-start gap-3 p-5">
    <div
      className={`p-2 rounded-md text-primary-foreground flex items-center justify-center ${iconBgClass}`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {typeof subheader === "string" ? (
        <p className="text-sm text-slate-500 mt-0.5">{subheader}</p>
      ) : (
        subheader
      )}
    </div>
  </div>
);

export default CardHeader;
