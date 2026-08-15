import React from "react";
import { cn } from "@/lib/utils";

export const ToggleField = ({ field, value, onChange, error, viewMode }) => {
    const checked = !!value;

    return (
        <div className={cn("flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/20 col-span-1", field.fullWidth && "col-span-full")}>
            <div className="space-y-0.5 pr-4">
                <span className="text-sm font-semibold text-slate-800">{field.label}</span>
                {field.helperText && <p className="text-xs text-muted-foreground">{field.helperText}</p>}
            </div>
            <div className="flex items-center shrink-0">
                {viewMode ? (
                    <span className={cn(
                        "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset",
                        checked
                            ? "bg-green-50 text-green-700 ring-green-600/20"
                            : "bg-gray-50 text-gray-600 ring-gray-500/10"
                    )}>
                        {checked ? "Yes" : "No"}
                    </span>
                ) : (
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => onChange(field.name, e.target.checked)}
                            disabled={field.disabled}
                            className="sr-only"
                        />
                        <div
                            className={cn(
                                "relative h-6 w-11 rounded-full transition-colors duration-200",
                                checked ? "bg-primary" : "bg-slate-300",
                                field.disabled && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <span
                                className={cn(
                                    "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200",
                                    checked ? "translate-x-6" : "translate-x-1"
                                )}
                            />
                        </div>
                    </label>
                )}
            </div>
            {error && <p className="text-sm text-red-500 col-span-full mt-1">{error}</p>}
        </div>
    );
};
