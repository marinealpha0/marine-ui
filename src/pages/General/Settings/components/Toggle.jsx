import React from "react";

const Toggle = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
    />
    <div
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  </label>
);

export default Toggle;
