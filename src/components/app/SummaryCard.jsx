import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable SummaryCard Component for KPI / Metric cards across all pages.
 * 
 * @param {Object} props
 * @param {string} props.label - Card title/label (e.g. "Overdue")
 * @param {string|number} props.value - Metric value (e.g. "118" or "1.42M")
 * @param {string|React.ReactNode} [props.subtext] - Optional subtext or trend (e.g. "↗ +12% vs last month")
 * @param {'critical'|'warning'|'info'|'healthy'|'dark'|'neutral'|'red'|'amber'|'blue'|'green'} [props.tone='neutral'] - Color theme
 * @param {boolean|'critical'|'warning'|'info'|'healthy'|'red'|'amber'|'blue'|'green'} [props.borderLeft] - Show accent left border
 * @param {string} [props.className] - Extra Tailwind classes
 * @param {Function} [props.onClick] - Optional click handler
 */
export function SummaryCard({
  label,
  value,
  subtext,
  tone = "neutral",
  borderLeft,
  className,
  onClick,
  children,
}) {
  // Normalize tone key
  const normalizedTone = (() => {
    if (tone === "red" || tone === "critical") return "critical";
    if (tone === "amber" || tone === "warning") return "warning";
    if (tone === "blue" || tone === "info" || tone === "navy") return "info";
    if (tone === "green" || tone === "healthy" || tone === "success") return "healthy";
    if (tone === "dark") return "dark";
    return "neutral";
  })();

  const textColors = {
    critical: "text-[#dc2626]",
    warning: "text-[#d97706]",
    info: "text-[#0052cc]",
    healthy: "text-[#059669]",
    dark: "text-gray-900",
    neutral: "text-gray-900",
  };

  const leftBorderColors = {
    critical: "border-l-[4px] border-l-[#ef4444]",
    warning: "border-l-[4px] border-l-[#f59e0b]",
    info: "border-l-[4px] border-l-[#0052cc]",
    healthy: "border-l-[4px] border-l-[#059669]",
  };

  let borderClass = "";
  if (borderLeft) {
    if (typeof borderLeft === "string") {
      const bTone =
        borderLeft === "red"
          ? "critical"
          : borderLeft === "amber"
          ? "warning"
          : borderLeft === "blue"
          ? "info"
          : borderLeft === "green"
          ? "healthy"
          : borderLeft;
      borderClass = leftBorderColors[bTone] || "";
    } else {
      borderClass = leftBorderColors[normalizedTone] || "";
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm flex flex-col justify-between select-none",
        onClick && "cursor-pointer",
        borderClass,
        className
      )}
    >
      <div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
        <div
          className={cn(
            "mt-3 text-3xl font-bold tabular-nums tracking-tight",
            textColors[normalizedTone] || textColors.neutral
          )}
        >
          {value}
        </div>
      </div>
      {subtext && (
        <div
          className={cn(
            "mt-1 text-xs font-medium",
            typeof subtext === "string" && subtext.includes("↗") ? "text-[#059669]" : "text-gray-500"
          )}
        >
          {subtext}
        </div>
      )}
      {children}
    </div>
  );
}
