import React from "react";
import {
  SchoolIcon,
  GroupIcon,
  AssignmentIcon,
  BarChartIcon,
  NotificationsIcon,
} from "@/assets/icons";

const ResponsibilityItem = ({ icon, label, value, color }) => (
  <div className="flex items-center justify-between py-3 border-b border-border/60 last:border-0 group">
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ background: color + "1a", color }}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
    <span
      className="text-sm font-bold px-2.5 py-0.5 rounded-full"
      style={{ background: color + "1a", color }}
    >
      {value}
    </span>
  </div>
);

const AdminResponsibilitiesCard = () => (
  <div className="w-full h-full bg-card border border-border rounded-2xl p-6 flex flex-col shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5">
    {/* Header */}
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: "linear-gradient(135deg, hsl(207 82% 33%), hsl(201 84% 39%))" }}
      >
        <AssignmentIcon size={20} className="text-white" />
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground">My Responsibilities</h3>
        <p className="text-xs text-muted-foreground">Current administrative duties & oversight</p>
      </div>
    </div>

    {/* Responsibilities list */}
    <div className="flex-1 flex flex-col">
      <ResponsibilityItem
        icon={<SchoolIcon size={16} />}
        label="Course Oversight"
        value="42 active"
        color="hsl(207,82%,38%)"
      />
      <ResponsibilityItem
        icon={<GroupIcon size={16} />}
        label="Faculty Management"
        value="156 instructors"
        color="#16a34a"
      />
      <ResponsibilityItem
        icon={<AssignmentIcon size={16} />}
        label="Student Affairs"
        value="2,847 students"
        color="#d97706"
      />
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
      <div className="flex items-center gap-1.5">
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200"
          title="View Reports"
        >
          <BarChartIcon size={16} />
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/8 transition-all duration-200"
          title="Notifications"
        >
          <NotificationsIcon size={16} />
        </button>
      </div>
      <span className="text-xs font-semibold text-muted-foreground px-2.5 py-1 rounded-full bg-muted">
        3 departments
      </span>
    </div>
  </div>
);

export default AdminResponsibilitiesCard;
