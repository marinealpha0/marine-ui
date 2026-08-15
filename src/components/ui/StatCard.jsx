import React from "react";

const variantStyles = {
  blue: {
    iconBg: "bg-blue-50 group-hover:bg-blue-100/80",
    iconColor: "text-blue-600",
    valueColor: "text-slate-900",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    progressBar: "bg-blue-500",
    progressTrack: "bg-blue-100",
  },
  emerald: {
    iconBg: "bg-emerald-50 group-hover:bg-emerald-100/80",
    iconColor: "text-emerald-600",
    valueColor: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    progressBar: "bg-emerald-500",
    progressTrack: "bg-emerald-100",
  },
  rose: {
    iconBg: "bg-rose-50 group-hover:bg-rose-100/80",
    iconColor: "text-rose-600",
    valueColor: "text-rose-600",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    progressBar: "bg-rose-500",
    progressTrack: "bg-rose-100",
  },
  amber: {
    iconBg: "bg-amber-50 group-hover:bg-amber-100/80",
    iconColor: "text-amber-600",
    valueColor: "text-slate-900",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    progressBar: "bg-amber-500",
    progressTrack: "bg-amber-100",
  },
  purple: {
    iconBg: "bg-purple-50 group-hover:bg-purple-100/80",
    iconColor: "text-purple-600",
    valueColor: "text-slate-900",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    progressBar: "bg-purple-500",
    progressTrack: "bg-purple-100",
  },
  default: {
    iconBg: "bg-slate-50 group-hover:bg-slate-100/80",
    iconColor: "text-slate-600",
    valueColor: "text-slate-900",
    badgeBg: "bg-slate-50",
    badgeText: "text-slate-700",
    progressBar: "bg-slate-400",
    progressTrack: "bg-slate-100",
  },
};

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
  className = "",
  badge = null,
  progress = null,
}) => {
  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden ${className}`}>
      <div className="p-5 flex items-start justify-between">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {title}
          </span>
          <div className="flex items-end gap-3">
            <span className={`text-3xl font-black tracking-tight ${styles.valueColor}`}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {badge !== null && (
              <span className={`mb-1 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
                {badge}
              </span>
            )}
          </div>
          {description && (
            <span className="text-xs text-slate-400 mt-1">
              {description}
            </span>
          )}
        </div>
        {Icon && (
          <div className={`h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${styles.iconBg} ${styles.iconColor}`}>
            <Icon className="h-5.5 w-5.5" />
          </div>
        )}
      </div>

      {/* Progress bar */}
      {progress !== null && (
        <div className={`mx-5 mb-4 h-1.5 rounded-full overflow-hidden ${styles.progressTrack}`}>
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${styles.progressBar}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default StatCard;
