import React from "react";

// Animated circular progress ring
const CircularProgress = ({ value, size, thickness, gradient }) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const id = `grad-${gradient}`;

  const gradients = {
    green: ["#22c55e", "#16a34a"],
    amber: ["#f59e0b", "#d97706"],
    blue: ["hsl(207,82%,45%)", "hsl(207,82%,33%)"],
    purple: ["#a855f7", "#7c3aed"],
  };
  const [c1, c2] = gradients[gradient] || gradients.blue;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="hsl(var(--border))" strokeWidth={thickness}
      />
      {/* Progress */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={thickness}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
};

const statConfig = [
  {
    key: "totalCompletedTasks",
    label: "Tasks Completed",
    sub: "This month",
    gradient: "green",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    max: 300,
    color: "#22c55e",
  },
  {
    key: "reportsGenerated",
    label: "Reports Generated",
    sub: "Total created",
    gradient: "amber",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    max: 20,
    color: "#f59e0b",
  },
  {
    key: "facultyMembersManaged",
    label: "Faculty Managed",
    sub: "Active members",
    gradient: "blue",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    max: 50,
    color: "hsl(207,82%,45%)",
  },
  {
    key: "administrativeEfficiency",
    label: "Admin Efficiency",
    sub: "Effectiveness score",
    gradient: "purple",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    max: 100,
    color: "#a855f7",
    isPercent: true,
  },
];

const AdminActivityStats = ({ stats }) => {
  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
          style={{ background: "linear-gradient(135deg, hsl(207 82% 33%), hsl(34 77% 47%))" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">My Activity Statistics</h2>
          <p className="text-xs text-muted-foreground">Your performance overview at a glance</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statConfig.map((item) => {
          const rawValue = stats?.[item.key];
          const displayValue =
            rawValue != null
              ? item.isPercent
                ? `${rawValue}%`
                : rawValue.toLocaleString()
              : null;
          const progress =
            rawValue != null ? Math.min((rawValue / item.max) * 100, 100) : 0;

          return (
            <div
              key={item.key}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-3 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Circular ring + value */}
              <div className="relative flex items-center justify-center">
                <CircularProgress
                  value={progress}
                  size={90}
                  thickness={7}
                  gradient={item.gradient}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-foreground leading-none">
                    {displayValue ?? "—"}
                  </span>
                </div>
              </div>

              {/* Icon + label */}
              <div className="flex flex-col items-center text-center gap-1">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-1 transition-transform duration-200 group-hover:scale-110"
                  style={{
                    color: item.color,
                    background: item.color + "1a",
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-xs font-bold text-foreground leading-tight">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </div>

              {/* Mini linear bar */}
              <div className="w-full">
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      background: item.color,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>0</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminActivityStats;
