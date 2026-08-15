import React from "react";
import { Input } from "@/components/ui/input";

const LabeledInput = ({
  label,
  type = "text",
  value,
  onChange,
  rightAdornment,
  leftAdornment,
  errorText = "",
  placeholder = "",
  min,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-medium text-slate-700">{label}</label>
    <div className="relative">
      {leftAdornment && (
        <div className="absolute inset-y-0 left-3 flex items-center text-slate-500 pointer-events-none">
          {leftAdornment}
        </div>
      )}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        onWheel={(e) => type === "number" && e.target.blur()}
        className={`${errorText ? "border-red-500" : ""} ${
          leftAdornment ? "pl-9" : ""
        } ${rightAdornment ? "pr-10" : ""}`}
      />
      {rightAdornment && (
        <div className="absolute inset-y-0 right-3 flex items-center text-slate-500">
          {rightAdornment}
        </div>
      )}
    </div>
    {!!errorText && <span className="text-xs text-red-600 font-medium">{errorText}</span>}
  </div>
);

export default LabeledInput;
