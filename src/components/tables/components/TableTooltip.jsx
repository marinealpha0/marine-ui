import React from "react";
import { CustomTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * TableTooltip — Reusable truncated cell tooltip for table columns.
 *
 * Props:
 *  - value        {string}  — The raw value to display and show in the tooltip body.
 *  - label        {string}  — Optional uppercase label shown above the value in the tooltip.
 *  - position     {string}  — Tooltip side: "top" | "bottom" | "left" | "right" (default: "top")
 *  - maxWidth     {string}  — Tailwind max-w class for the trigger text (default: "max-w-[130px]")
 *  - triggerClass {string}  — Extra classes for the trigger wrapper div.
 *  - children     {node}    — Optional custom trigger content (overrides default truncated text).
 */
const TableTooltip = ({
    value,
    label,
    position = "top",
    maxWidth = "max-w-[130px]",
    triggerClass,
    children,
}) => {
    if (!value) return <span className="text-gray-400">—</span>;

    const tooltipContent = (
        <>
            {label && (
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {label}
                </p>
            )}
            <p className="break-words text-xs font-medium leading-relaxed text-white">
                {value}
            </p>
        </>
    );

    return (
        <CustomTooltip
            content={tooltipContent}
            position={position}
            classes="z-50 max-w-[280px] rounded-lg border-none px-3 py-2 shadow-xl bg-gray-900 text-white"
            delayDuration={200}
        >
            {children ? (
                <div className={cn("cursor-pointer min-w-0", triggerClass)}>
                    {children}
                </div>
            ) : (
                <div
                    className={cn(
                        "truncate cursor-pointer text-sm",
                        maxWidth,
                        triggerClass
                    )}
                >
                    {value}
                </div>
            )}
        </CustomTooltip>
    );
};

export default TableTooltip;

