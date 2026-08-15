import React from "react";
import { Label } from "@/components/ui/label";
import { CustomTooltip } from "@/components/ui/tooltip";
import { HelpCircle } from "@/assets/icons";
import { cn } from "@/lib/utils";

export const FieldLabel = ({ field }) => {
    const labelContent = (
        <span
            className={cn(
                field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
        >
            {field.label}
        </span>
    );

    if (field.tooltip) {
        return (
            <div className="flex items-center gap-1">
                <Label htmlFor={field.name}>{labelContent}</Label>
                <CustomTooltip content={field.tooltip} position="top">
                    <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                </CustomTooltip>
            </div>
        );
    }

    return (
        <Label
            htmlFor={field.name}
            className={cn(
                field.required &&
                "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
        >
            {field.label}
        </Label>
    );
};

