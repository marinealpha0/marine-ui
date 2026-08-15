import React from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  AlertTriangle,
  Ban,
  RefreshCcw,
  CreditCard,
  Package,
  Truck,
  Undo2,
  FilePlus,
  FileCheck,
  HelpCircle,
  UserPlus,
} from "@/assets/icons";

// Unified config: status -> { classes, icon }
const STATUS_CONFIG = {
  active: { classes: "bg-green-50 text-green-700 border border-green-200", icon: CheckCircle },
  success: { classes: "bg-emerald-50 text-emerald-700 border border-emerald-200", icon: CheckCircle },
  open: { classes: "bg-green-50 text-green-700 border border-green-200", icon: CheckCircle },
  inactive: { classes: "bg-red-50 text-red-700 border border-red-200", icon: XCircle },
  draft: { classes: "bg-yellow-50 text-yellow-700 border border-yellow-200", icon: FilePlus },
  invited: { classes: "bg-blue-50 text-blue-700 border border-blue-200", icon: Mail },
  expired: { classes: "bg-purple-50 text-purple-700 border border-purple-200", icon: AlertTriangle },
  completed: { classes: "bg-teal-50 text-teal-700 border border-teal-200", icon: CheckCircle },
  pending: { classes: "bg-orange-50 text-orange-700 border border-orange-200", icon: Clock },
  cancelled: { classes: "bg-pink-50 text-pink-700 border border-pink-200", icon: Ban },
  declined: { classes: "bg-red-50 text-red-700 border border-red-200", icon: XCircle },
  processing: { classes: "bg-indigo-50 text-indigo-700 border border-indigo-200", icon: RefreshCcw },
  onhold: { classes: "bg-amber-50 text-amber-700 border border-amber-200", icon: Clock },
  refunded: { classes: "bg-purple-50 text-purple-700 border border-purple-200", icon: RefreshCcw },
  failed: { classes: "bg-red-50 text-red-700 border border-red-200", icon: XCircle },
  paid: { classes: "bg-emerald-50 text-emerald-700 border border-emerald-200", icon: CreditCard },
  fulfilled: { classes: "bg-cyan-50 text-cyan-700 border border-cyan-200", icon: Package },
  delivered: { classes: "bg-sky-50 text-sky-700 border border-sky-200", icon: Truck },
  returned: { classes: "bg-rose-50 text-rose-700 border border-rose-200", icon: Undo2 },
  new: { classes: "bg-indigo-50 text-indigo-700 border border-indigo-200", icon: FilePlus },
  created: { classes: "bg-blue-50 text-blue-700 border border-blue-200", icon: FileCheck },
  registered: { classes: "bg-amber-50 text-amber-700 border border-amber-200", icon: UserPlus },
  subscribed: { classes: "bg-emerald-50 text-emerald-700 border border-emerald-200", icon: CreditCard },
  contacted: { classes: "bg-blue-50 text-blue-700 border border-blue-200", icon: Mail },
  inprogress: { classes: "bg-orange-50 text-orange-700 border border-orange-200", icon: Clock },
  converted: { classes: "bg-green-50 text-green-700 border border-green-200", icon: CheckCircle },
  lost: { classes: "bg-red-50 text-red-700 border border-red-200", icon: XCircle },
  notresponding: { classes: "bg-purple-50 text-purple-700 border border-purple-200", icon: Clock },
  cold: { classes: "bg-sky-50 text-sky-700 border border-sky-200", icon: Clock },
  warm: { classes: "bg-amber-50 text-amber-700 border border-amber-200", icon: Clock },
  hot: { classes: "bg-rose-50 text-rose-700 border border-rose-200", icon: AlertTriangle },
  interested: { classes: "bg-emerald-50 text-emerald-700 border border-emerald-200", icon: CheckCircle },
  notinterested: { classes: "bg-slate-50 text-slate-700 border border-slate-200", icon: XCircle },
  followup: { classes: "bg-orange-50 text-orange-700 border border-orange-200", icon: Clock },
  "follow-up": { classes: "bg-orange-50 text-orange-700 border border-orange-200", icon: Clock },
};

const StatusChip = ({ status = "", label, icon }) => {
  // Normalize status string (lowercase, no spaces/hyphens)
  const normalizedStatus = String(status || "").toLowerCase().replace(/[\s-]+/g, "");

  // Get config for status, fallback if not found
  const { classes, icon: DefaultIcon } =
    STATUS_CONFIG[normalizedStatus] || {
      classes: "bg-gray-50 text-gray-700 border border-gray-200",
      icon: HelpCircle,
    };

  // Use custom icon if passed, else default
  const iconElement = icon
    ? React.cloneElement(icon, { className: "w-3.5 h-3.5" })
    : <DefaultIcon className="w-3.5 h-3.5" />;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium text-xs tracking-wide shadow-sm ${classes}`}
    >
      {iconElement}
      <span className="capitalize">{label || status}</span>
    </div>
  );
};

export default StatusChip;
