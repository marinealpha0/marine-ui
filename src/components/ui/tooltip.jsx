"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, children, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-sm text-primary-foreground shadow-md animate-in fade-in-50",
        className
      )}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  )
);
TooltipContent.displayName = "TooltipContent";

/**
 * CustomTooltip — Reusable tooltip wrapper.
 *
 * Props:
 *  - children      {node}    — The trigger element (must support ref forwarding, e.g. button, a, or div).
 *  - content       {node}    — The text or custom nodes to show inside the tooltip content box.
 *  - position      {string}  — Tooltip side: "top" | "bottom" | "left" | "right" (default: "top")
 *  - align         {string}  — Alignment: "start" | "center" | "end" (default: "center")
 *  - classes       {string}  — Additional CSS/Tailwind classes to apply to the tooltip content.
 *  - delayDuration {number}  — Hover delay in milliseconds (default: 200)
 *  - disabled      {boolean} — If true, the tooltip will not be shown and only children will render (default: false).
 */
export const CustomTooltip = ({
  children,
  content,
  position = "top",
  align = "center",
  classes,
  delayDuration = 200,
  disabled = false,
  ...props
}) => {
  // If disabled or there is no content to show, render children directly
  if (disabled || !content) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={position}
          align={align}
          className={cn(
            "bg-gray-900 text-white dark:bg-gray-800 dark:text-gray-100 border-none shadow-lg px-3 py-2 text-xs rounded-md max-w-[280px] break-words z-50",
            classes
          )}
          {...props}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

