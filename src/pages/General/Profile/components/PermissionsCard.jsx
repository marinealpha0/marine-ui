import React from "react";
import { Check, Lock } from "@/assets/icons";
import { PERMISSION_DESCRIPTIONS } from "@/auth/permissionDescriptions";

// Category color map
const categoryColors = {
  Finance: { bg: "bg-violet-50 border-violet-200", badge: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
  Content: { bg: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  Users:   { bg: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-800", dot: "bg-green-500" },
  Reports: { bg: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  System:  { bg: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-800", dot: "bg-red-500" },
  default: { bg: "bg-emerald-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
};

const getColors = (category) => categoryColors[category] || categoryColors.default;

const PermissionsCard = ({ userPermissions = [] }) => {
  const grantedPermissions = Object.entries(PERMISSION_DESCRIPTIONS).filter(
    ([key]) => Array.isArray(userPermissions) && userPermissions.includes(key)
  );

  return (
    <div className="w-full h-full bg-card border border-border rounded-2xl flex flex-col shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(207 82% 33%), hsl(201 84% 39%))" }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">System Permissions</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Active security privileges & access rights
              </p>
            </div>
          </div>

          {/* Count badge */}
          <div
            className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, hsl(207 82% 33%), hsl(34 77% 47%))" }}
          >
            {grantedPermissions.length}
          </div>
        </div>
      </div>

      {/* ── Permissions List ── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {grantedPermissions.length > 0 ? (
          grantedPermissions.map(([key, descObj]) => {
            const colors = getColors(descObj.category);
            return (
              <div
                key={key}
                className={`p-3 rounded-xl border ${colors.bg} hover:brightness-95 transition-all duration-200 flex items-start gap-3 group`}
              >
                {/* Check icon */}
                <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm border border-green-200 shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Check className="w-3 h-3 text-green-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <p className="text-sm font-semibold text-foreground">
                      {descObj.title}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${colors.badge} shrink-0`}
                    >
                      {descObj.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {descObj.sentence}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <p className="text-sm font-semibold text-foreground">No Permissions Granted</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] leading-snug">
              Your account currently has no active administrative privileges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionsCard;
