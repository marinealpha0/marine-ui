import React, { useRef, useState, useEffect } from "react";
import { formatDisplayDate } from "@/utils/dateUtils";

const InfoRow = ({ icon, label, value, tooltip }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [value]);

  const shouldShowTooltip = tooltip && isTruncated;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/60 last:border-0 group">
      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <div className="relative">
          <p
            ref={textRef}
            className="text-sm font-medium text-foreground truncate"
            onMouseEnter={() => shouldShowTooltip && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ cursor: shouldShowTooltip ? "default" : "inherit" }}
          >
            {value || "—"}
          </p>
          {showTooltip && (
            <div
              className="absolute left-0 bottom-full mb-2 z-50 px-3 py-2 rounded-lg shadow-lg text-xs font-medium text-white pointer-events-none"
              style={{
                background: "hsl(222 47% 11%)",
                border: "1px solid hsl(222 47% 20%)",
                maxWidth: "260px",
                whiteSpace: "normal",
                lineHeight: "1.5",
              }}
            >
              {tooltip}
              {/* Arrow */}
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "16px",
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid hsl(222 47% 11%)",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminProfileCard = ({ user }) => {
  const fullName = user
    ? (user.adminName || user.name || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim())
    : "";

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const gender = user?.gender
    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
    : "—";

  const address =
    user?.address && user?.pincode
      ? `${user.address}, ${user.pincode}`
      : user?.address || "—";

  return (
    <div className="w-full h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group">

      {/* ── Hero Banner ── */}
      <div
        className="relative h-28 flex-shrink-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(207 82% 33%) 0%, hsl(201 84% 39%) 50%, hsl(34 77% 47%) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/8" />
        <div className="absolute top-3 right-14 w-8 h-8 rounded-full bg-white/15" />

        {/* Role badge top-right */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm border border-white/25">
          {typeof user?.role === 'string' ? user.role : (user?.role?.roleName || user?.adminRole || "Admin")}
        </span>
      </div>

      {/* ── Avatar ── */}
      <div className="relative -mt-12 flex flex-col items-center px-6 pb-4">
        <div className="relative mb-3">
          <div
            className="w-24 h-24 rounded-full p-[3px] shadow-strong"
            style={{
              background: "linear-gradient(135deg, hsl(207 82% 33%), hsl(34 77% 47%))",
            }}
          >
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt={fullName || "Admin"}
                className="w-full h-full rounded-full object-cover object-top bg-card"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-primary text-2xl font-bold">
                {initials}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground tracking-tight text-center">
          {fullName || "—"}
        </h2>
        <p className="text-xs text-muted-foreground mt-1 font-medium flex items-center justify-center gap-1.5">
          <span>{user?.department || "Administration"}</span>
          {user?.employeeCode && (
            <>
              <span className="text-muted-foreground/40">•</span>
              <span className="bg-primary/8 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">
                {user.employeeCode}
              </span>
            </>
          )}
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="mx-6 h-px bg-border" />

      {/* ── Info rows ── */}
      <div className="flex-1 px-6 py-2 overflow-y-auto">
        <InfoRow
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          label="Email"
          value={user?.adminEmail || user?.email}
        />
        <InfoRow
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
          label="Phone"
          value={user?.mobileNumber}
        />
        <InfoRow
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          label="Department"
          value={user?.department}
        />
        <InfoRow
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          label="Gender"
          value={gender}
        />
        <InfoRow
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          label="Address"
          value={address}
          tooltip={address !== "—" ? address : undefined}
        />
        <InfoRow
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          label="Date of Birth"
          value={formatDisplayDate(user?.dob)}
        />
      </div>
    </div>
  );
};

export default AdminProfileCard;
