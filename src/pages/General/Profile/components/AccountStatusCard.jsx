import React from "react";
import { formatDisplayDate, formatDisplayDateTime } from "@/utils/dateUtils";

const StatusDot = ({ active }) => (
  <span
    className={`inline-block w-2 h-2 rounded-full mr-1.5 ${active ? "bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.4)]" : "bg-gray-400"}`}
  />
);

const StatusRow = ({ icon, label, value, highlight, pulse }) => (
  <div className="flex items-center justify-between py-3 border-b border-border/60 last:border-0 group">
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/8 group-hover:text-primary transition-colors duration-200 shrink-0">
        {icon}
      </div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
    <div className="flex items-center">
      {pulse !== undefined && <StatusDot active={pulse} />}
      <span className={`text-sm font-semibold ${highlight || "text-foreground"}`}>
        {value || "—"}
      </span>
    </div>
  </div>
);

const AccountStatusCard = ({ profile }) => {
  const isActive = profile?.adminStatus === "active" || profile?.isActive;
  const isOnline = profile?.isOnline;

  const rows = [
    {
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Account Status",
      value: isActive ? "Active" : "Inactive",
      highlight: isActive ? "text-green-600" : "text-red-500",
      pulse: isActive,
    },
    {
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      label: "Online Presence",
      value: isOnline ? "Online" : "Offline",
      highlight: isOnline ? "text-green-600" : "text-muted-foreground",
      pulse: isOnline,
    },
    {
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "Date of joined",
      value: formatDisplayDate(profile?.joinedDate),
    },
    {
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Last Login",
      value: formatDisplayDateTime(profile?.lastLogin),
    },
  ];

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-5 flex flex-col shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(207 82% 33%), hsl(201 84% 39%))" }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">Account Status</h2>
          <p className="text-xs text-muted-foreground">Security & session info</p>
        </div>
      </div>

      {/* Status rows */}
      <div className="flex flex-col">
        {rows.map(({ icon, label, value, highlight, pulse }) => (
          <StatusRow
            key={label}
            icon={icon}
            label={label}
            value={value}
            highlight={highlight}
            pulse={pulse}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountStatusCard;
