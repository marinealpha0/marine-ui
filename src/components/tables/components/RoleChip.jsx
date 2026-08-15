import React from "react";
import {
  HelpCircle,
  Shield,
  UserCog,
  ShieldHalf,
  User,
  Edit,
  FileText,
  GitPullRequest,
  Eye,
  LogIn,
  Code,
  BarChart,
  Settings,
  Users,
  LifeBuoy
} from "@/assets/icons";

const ROLE_CONFIG = {
  superadmin: { label: "Super Admin", classes: "bg-violet-50 text-violet-700 border-violet-200", icon: Shield },
  admin: { label: "Administrator", classes: "bg-rose-50 text-rose-700 border-rose-200", icon: UserCog },
  moderator: { label: "Moderator", classes: "bg-amber-50 text-amber-700 border-amber-200", icon: ShieldHalf },
  staff: { label: "Staff", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: User },
  editor: { label: "Editor", classes: "bg-teal-50 text-teal-700 border-teal-200", icon: Edit },
  author: { label: "Author", classes: "bg-cyan-50 text-cyan-700 border-cyan-200", icon: FileText },
  contributor: { label: "Contributor", classes: "bg-blue-50 text-blue-700 border-blue-200", icon: GitPullRequest },
  viewer: { label: "Viewer", classes: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: Eye },
  guest: { label: "Guest", classes: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", icon: LogIn },
  developer: { label: "Developer", classes: "bg-pink-50 text-pink-700 border-pink-200", icon: Code },
  analyst: { label: "Analyst", classes: "bg-slate-50 text-slate-700 border-slate-200", icon: BarChart },
  operator: { label: "Operator", classes: "bg-sky-50 text-sky-700 border-sky-200", icon: Settings },
  manager: { label: "Manager", classes: "bg-green-50 text-green-700 border-green-200", icon: Users },
  support: { label: "Support Agent", classes: "bg-orange-50 text-orange-700 border-orange-200", icon: LifeBuoy },
};

const RoleChip = ({ role = "", label: labelOverride }) => {
  const normalizedRole = role?.toLowerCase().replace(/\s+/g, "");

  const { label: defaultLabel, classes, icon: Icon } =
    ROLE_CONFIG[normalizedRole] || {
      label: "Unknown Role",
      classes: "bg-gray-50 text-gray-500 border-gray-200",
      icon: HelpCircle,
    };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-medium text-xs tracking-wide shadow-sm ${classes}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span className="truncate">{defaultLabel}</span>
    </div>
  );
};

export default RoleChip;