import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";  // Add this import
import { cn } from "@/lib/utils";
import { FieldLabel } from "./FieldLabel";

export const TextField = ({ field, value, onChange, error, viewMode }) => {
    return (
        <div className={cn("space-y-2", field.fullWidth && "col-span-full")}>
            <FieldLabel field={field} />
            {field.multiline ? (
                <Textarea
                    id={field.name}
                    value={value}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    readOnly={viewMode}
                    disabled={viewMode || field.disabled}
                    className={cn(error && "border-red-500", "min-h-[100px]")}
                    rows={field.rows}
                    {...field.props}
                />
            ) : (
                <Input
                    id={field.name}
                    type={field.type}
                    value={value}
                    onChange={(e) => {
                        let val = e.target.value;
                        if (field.onlyDigits) {
                            val = val.replace(/\D/g, "");
                        }
                        onChange(field.name, val);
                    }}
                    onKeyDown={(e) => {
                        if (field.onlyDigits) {
                            // Allow navigation & edit keys: Backspace, Delete, Tab, Escape, Enter, Left/Right arrows, Home/End
                            if (
                                [46, 8, 9, 27, 13].includes(e.keyCode) ||
                                (e.keyCode >= 35 && e.keyCode <= 40) ||
                                (e.ctrlKey === true || e.metaKey === true)
                            ) {
                                return;
                            }
                            // Prevent shift key options (like symbols) and non-numeric keys
                            if (
                                e.shiftKey ||
                                ((e.keyCode < 48 || e.keyCode > 57) &&
                                    (e.keyCode < 96 || e.keyCode > 105))
                            ) {
                                e.preventDefault();
                            }
                        }
                    }}
                    placeholder={field.placeholder}
                    readOnly={viewMode}
                    disabled={viewMode || field.disabled}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className={cn(error && "border-red-500")}
                    {...field.props}
                />
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {field.helperText && !error && (
                <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
        </div>
    );
};
