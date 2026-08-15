import React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { FieldLabel } from "./FieldLabel";

export const DateField = ({ field, value, onChange, error, viewMode }) => {
    // Build the calendarDisabled function — passed directly to react-day-picker's `disabled` prop
    const calendarDisabled = (date) => {
        if (field.disabled) return true;
        if (field.disablePast && dayjs(date).isBefore(dayjs(), "day")) return true;
        if (field.disableFuture && dayjs(date).isAfter(dayjs(), "day")) return true;
        if (field.minAge) {
            // Any date more recent than (today − minAge years) is disabled
            const cutoff = dayjs().subtract(field.minAge, "year");
            if (dayjs(date).isAfter(cutoff, "day")) return true;
        }
        return false;
    };

    // Cap toYear so the dropdown doesn't offer future years for fields with disableFuture/minAge
    const toYear = (field.disableFuture || field.minAge)
        ? new Date().getFullYear()
        : undefined; // let DatePicker use its default

    return (
        <div className="space-y-2">
            <FieldLabel field={field} />
            <DatePicker
                value={value ? new Date(value) : undefined}
                onChange={(date) => {
                    if (date) {
                        onChange(field.name, dayjs(date).format("YYYY-MM-DD"));
                    } else {
                        onChange(field.name, null);
                    }
                }}
                disabled={viewMode || field.disabled}
                calendarDisabled={calendarDisabled}
                toYear={toYear}
                variant="outline"
                className={cn(error && "border-red-500")}
                placeholder="Pick a date"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            {field.helperText && !error && (
                <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
        </div>
    );
};
