import React from "react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./FieldLabel";

export const CodeField = ({ field, value, onChange, error, viewMode }) => {
    return (
        <div className="space-y-2 col-span-full">
            <FieldLabel field={field} />
            <textarea
                id={field.name}
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder || "// Enter your code here..."}
                readOnly={viewMode}
                disabled={viewMode || field.disabled}
                className={cn(
                    "flex min-h-[200px] w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-sm text-slate-50 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono",
                    error && "border-red-500",
                    field.className
                )}
                spellCheck={false}
                {...field.props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            {field.helperText && !error && (
                <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
        </div>
    );
};
