import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Download, Filter, Plus, Upload, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const toneText = {
  healthy: "text-success",
  warning: "text-warning",
  critical: "text-critical",
  info: "text-info",
  neutral: "text-foreground",
};

const toneChip = {
  healthy: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning border-warning/30",
  critical: "bg-critical-soft text-critical border-critical/25",
  info: "bg-info-soft text-info border-info/20",
  neutral: "bg-secondary text-muted-foreground border-border",
};

const toneGlow = {
  healthy: "before:bg-success",
  warning: "before:bg-warning",
  critical: "before:bg-critical",
  info: "before:bg-ocean",
  neutral: "before:bg-muted-foreground/30",
};

const toneIconBg = {
  healthy: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning border-warning/30",
  critical: "bg-critical-soft text-critical border-critical/25",
  info: "bg-info-soft text-info border-info/20",
  neutral: "bg-secondary text-muted-foreground border-border",
};

const tonePulse = {
  healthy: "bg-success",
  warning: "bg-warning",
  critical: "bg-critical",
  info: "bg-ocean",
  neutral: "bg-muted-foreground",
};

export function toneForStatus(status) {
  if (!status) return "info";
  const s = String(status).toLowerCase();
  if (/(overdue|expired|critical|rejected|damaged|violation|failure)/.test(s)) return "critical";
  if (/(pending|awaiting|expiring|review|draft|warning|at risk|extension|returned|partially|unplanned|reopen)/.test(s)) return "warning";
  if (/(completed|approved|valid|received|active|healthy|operational|closed|verified|done)/.test(s)) return "healthy";
  return "info";
}

export function StatusChip({ status, tone }) {
  const t = tone ?? toneForStatus(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneChip[t] || toneChip.neutral
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {status}
    </span>
  );
}

export function ActionButton({
  variant = "secondary",
  icon,
  children,
  className,
  ...props
}) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    secondary: "border border-border bg-surface shadow-card hover:bg-secondary text-foreground",
    navy: "bg-navy text-navy-foreground hover:bg-navy/90",
    primary: "bg-navy text-navy-foreground hover:bg-navy/90",
    outline: "border border-border bg-transparent hover:bg-secondary text-foreground",
  };

  return (
    <button className={cn(base, variants[variant] || variants.secondary, className)} {...props}>
      {icon ? <span className="shrink-0 size-4">{icon}</span> : null}
      {children}
    </button>
  );
}

export function FilterButton({ label = "Filters", icon = <Filter className="size-4" />, ...props }) {
  return (
    <ActionButton variant="secondary" icon={icon} {...props}>
      {label}
    </ActionButton>
  );
}

export function ExportButton({ label = "Export", icon = <Download className="size-4" />, ...props }) {
  return (
    <ActionButton variant="navy" icon={icon} {...props}>
      {label}
    </ActionButton>
  );
}

export function ImportButton({ label = "Import", icon = <Upload className="size-4" />, ...props }) {
  return (
    <ActionButton variant="secondary" icon={icon} {...props}>
      {label}
    </ActionButton>
  );
}

export function AddButton({ label = "Add", icon = <Plus className="size-4" />, ...props }) {
  return (
    <ActionButton variant="navy" icon={icon} {...props}>
      {label}
    </ActionButton>
  );
}

export function PageHeader({ title, description, actions, className, bordered }) {
  return (
    <header
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between",
        bordered && "border-b border-border pb-5",
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Section({ title, description, actions, children, className }) {
  return (
    <section className={cn("space-y-4", className)}>
      {title ? (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {title}
            </h2>
            {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
          </div>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Panel({ title, action, children, className, padded = true }) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface shadow-card", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h3 className="truncate text-sm font-semibold">{title}</h3>
          {action}
        </div>
      ) : null}
      <div className={cn(padded && "p-4")}>{children}</div>
    </div>
  );
}

export function KpiSparkline({ data, tone = "neutral", height = 36, width = 96 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((val, idx) => ({
    x: (idx / (data.length - 1)) * width,
    y: height - ((val - min) / range) * (height - 8) - 4,
  }));

  // Build cubic Bezier curve path
  let pathD = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cp1x = (p0.x + (p1.x - p0.x) * 0.5).toFixed(1);
    const cp1y = p0.y.toFixed(1);
    const cp2x = (p0.x + (p1.x - p0.x) * 0.5).toFixed(1);
    const cp2y = p1.y.toFixed(1);
    pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
  }

  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;

  const toneColors = {
    healthy: "oklch(0.58 0.13 158)",
    warning: "oklch(0.72 0.15 76)",
    critical: "oklch(0.55 0.2 25)",
    info: "oklch(0.5 0.13 233)",
    neutral: "oklch(0.52 0.025 250)",
  };

  const strokeColor = toneColors[tone] || toneColors.neutral;
  const gradId = React.useId();

  return (
    <div className="w-[96px] overflow-hidden" style={{ height: `${height}px` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full block">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill={`url(#${gradId})`} />
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function KpiCard({
  label,
  value,
  delta,
  tone = "neutral",
  to,
  icon: Icon,
  trend,
  trendValue,
  sparklineData,
  progress,
  variant = "default",
  subtext,
  pulse = false,
  badge,
  className,
  onClick,
  children,
}) {
  const toneDot = {
    healthy: "bg-success",
    warning: "bg-warning",
    critical: "bg-critical",
    info: "bg-ocean",
    neutral: "bg-muted-foreground",
  };

  const toneIconBox = {
    healthy: "bg-success-soft text-success border-success/25",
    warning: "bg-warning-soft text-warning border-warning/30",
    critical: "bg-critical-soft text-critical border-critical/25",
    info: "bg-info-soft text-info border-info/20",
    neutral: "bg-secondary text-muted-foreground border-border",
  };

  const toneHoverBorder = {
    healthy: "hover:border-success/50 hover:shadow-[0_4px_20px_-4px_rgba(34,197,94,0.15)]",
    warning: "hover:border-warning/50 hover:shadow-[0_4px_20px_-4px_rgba(245,158,11,0.15)]",
    critical: "hover:border-critical/50 hover:shadow-[0_4px_20px_-4px_rgba(239,68,68,0.18)]",
    info: "hover:border-ocean/50 hover:shadow-[0_4px_20px_-4px_rgba(14,165,233,0.15)]",
    neutral: "hover:border-foreground/20 hover:shadow-raised",
  };

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : trend === "neutral" ? Minus : null;

  const trendStyles = {
    up: "bg-success-soft text-success border-success/20",
    down: "bg-critical-soft text-critical border-critical/20",
    neutral: "bg-secondary text-muted-foreground border-border",
  };

  const cardContent = (
    <div className="flex flex-col justify-between h-full min-h-[132px]">
      {/* Header Row: Icon / Pulse + Label + Trend/Arrow */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {Icon ? (
            <div className={cn("grid size-7 shrink-0 place-items-center rounded-lg border text-xs transition-colors", toneIconBox[tone] || toneIconBox.neutral)}>
              {React.isValidElement(Icon) ? Icon : <Icon className="size-3.5" />}
            </div>
          ) : pulse ? (
            <span className="relative flex size-2.5 shrink-0 my-1">
              <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", toneDot[tone])} />
              <span className={cn("relative inline-flex size-2.5 rounded-full", toneDot[tone])} />
            </span>
          ) : (
            <span className={cn("size-2 rounded-full shrink-0 my-1", toneDot[tone])} />
          )}

          <span className="text-xs font-semibold text-foreground/90 leading-snug tracking-tight line-clamp-2">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 pt-0.5">
          {trendValue || trend ? (
            <span className={cn("inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-medium tabular-nums leading-none", trendStyles[trend] || trendStyles.neutral)}>
              {TrendIcon ? <TrendIcon className="size-2.5" /> : null}
              {trendValue || trend}
            </span>
          ) : null}

          {badge ? (
            <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground leading-none">
              {badge}
            </span>
          ) : null}

          {to ? (
            <ArrowUpRight className="size-4 text-muted-foreground/50 transition-all duration-200 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          ) : null}
        </div>
      </div>

      {/* Main Metric Row: Value + Sparkline */}
      <div className="my-2.5 flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <div className="font-display text-3xl font-bold tracking-tight text-foreground tabular-nums leading-none sm:text-4xl">
            {value}
          </div>
          {subtext ? <p className="mt-1 text-[11px] text-muted-foreground font-medium">{subtext}</p> : null}
        </div>

        {sparklineData ? (
          <div className="shrink-0 self-end">
            <KpiSparkline data={sparklineData} tone={tone} height={32} width={80} />
          </div>
        ) : null}
      </div>

      {/* Footer Row: Progress or Delta Subtext */}
      {typeof progress === "number" ? (
        <div className="mt-auto space-y-1.5 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <span className="truncate">{delta || "Progress"}</span>
            <span className="tabular-nums font-semibold text-foreground">{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} tone={tone === "neutral" ? "info" : tone} />
        </div>
      ) : delta ? (
        <div className="mt-auto pt-2 border-t border-border/50">
          <p className="text-[11px] text-muted-foreground font-medium leading-tight line-clamp-2">{delta}</p>
        </div>
      ) : null}

      {children}
    </div>
  );

  const containerClasses = cn(
    "group relative block rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-sm p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden",
    toneHoverBorder[tone] || toneHoverBorder.neutral,
    className
  );

  if (to) {
    return (
      <Link to={to} className={containerClasses} onClick={onClick}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={containerClasses} onClick={onClick}>
      {cardContent}
    </div>
  );
}

export function MetricRow({ label, value, tone = "neutral", to }) {
  const inner = (
    <>
      <span className="min-w-0 truncate text-sm text-foreground/85">{label}</span>
      <span className={cn("shrink-0 text-sm font-semibold tabular-nums", toneText[tone] || toneText.neutral)}>
        {value}
      </span>
    </>
  );
  const cls =
    "flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors hover:bg-secondary";
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function ProgressBar({ value, tone = "info" }) {
  const bg = {
    healthy: "bg-success",
    warning: "bg-warning",
    critical: "bg-critical",
    info: "bg-ocean",
    neutral: "bg-muted-foreground",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", bg[tone] || bg.info)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function healthTone(value) {
  if (value >= 90) return "healthy";
  if (value >= 70) return "warning";
  return "critical";
}

export function EmptyState({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-sunken px-6 py-12 text-center">
      <div className="mb-3 grid size-10 place-items-center rounded-full bg-success-soft text-success">
        {icon ?? <CheckCircle2 className="size-5" />}
      </div>
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/70 last:border-0 hover:bg-secondary/60">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
