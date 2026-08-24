import {
  Activity, AlertTriangle, Anchor, BarChart3, Bell, Boxes, CalendarRange, ClipboardCheck, ClipboardList,
  FileText, Flame, Gauge, GitBranch, Handshake, HardHat, LayoutDashboard, LifeBuoy, ListChecks,
  Package, PackageCheck, Route as RouteIcon, ScrollText, Settings, ShieldAlert, ShieldCheck, Ship,
  ShoppingCart, SlidersHorizontal, Target, Truck, UserCheck, Users, Wrench,
} from "lucide-react";

export const navGroups = [
  {
    group: "Operations",
    items: [
      { label: "Overview", to: "/app", icon: LayoutDashboard },
      { label: "Voyages", to: "/app/voyages", icon: RouteIcon },
      { label: "Work Orders", to: "/app/work-orders", icon: Wrench, badge: 118 },
      { label: "Maintenance / PMS", to: "/app/maintenance", icon: Gauge },
      { label: "Work Planner", to: "/app/work-planner", icon: CalendarRange },
    ],
  },
  {
    group: "Assets",
    items: [
      { label: "Fleet", to: "/app/fleet", icon: Ship },
      { label: "Equipment", to: "/app/equipment", icon: Boxes },
      { label: "Inventory", to: "/app/inventory", icon: Package, badge: 146 },
    ],
  },
  {
    group: "Supply & Procurement",
    items: [
      { label: "Procurement", to: "/app/procurement", icon: ShoppingCart },
      { label: "Requisitions", to: "/app/requisitions", icon: ClipboardCheck },
      { label: "Purchase Orders", to: "/app/purchase-orders", icon: FileText, badge: 3 },
      { label: "Receipts & Returns", to: "/app/receipts", icon: Truck },
    ],
  },
  {
    group: "Compliance & QHSE",
    items: [
      { label: "Certificates", to: "/app/certificates", icon: FileText, badge: 4 },
      { label: "Surveys & Services", to: "/app/surveys", icon: ClipboardCheck },
      { label: "QHSE Command", to: "/app/qms", icon: ShieldCheck },
      { label: "Deviations", to: "/app/deviations", icon: AlertTriangle },
      { label: "Risk Management", to: "/app/risk", icon: ShieldAlert },
      { label: "Corrective Actions", to: "/app/capa", icon: Activity },
      { label: "Preventive Actions", to: "/app/preventive-actions", icon: Target },
      { label: "Safety Meetings", to: "/app/safety-meetings", icon: Users },
      { label: "Drills", to: "/app/drills", icon: Flame },
      { label: "Permit To Work", to: "/app/permit-to-work", icon: ScrollText },
      { label: "Management of Change", to: "/app/moc", icon: GitBranch },
      { label: "Person In Charge", to: "/app/pic", icon: UserCheck },
      { label: "Handover / Takeover", to: "/app/handover", icon: Handshake },
    ],
  },
  {
    group: "Planning",
    items: [
      { label: "Daily Work Planner", to: "/app/daily-planner", icon: ListChecks },
      { label: "Weekly Voyage Planner", to: "/app/weekly-planner", icon: CalendarRange },
      { label: "Person in Charge", to: "/app/pic", icon: UserCheck },
    ],
  },
  {
    group: "Insight",
    items: [
      { label: "Reports", to: "/app/reports", icon: FileText },
      { label: "Analytics", to: "/app/analytics", icon: BarChart3 },
      { label: "Documents", to: "/app/documents", icon: ScrollText },
      { label: "Notifications", to: "/app/notifications", icon: Bell, badge: 6 },
    ],
  },
  {
    group: "Administration",
    items: [
      { label: "Users & Roles", to: "/app/users", icon: Users },
      { label: "Audit Logs", to: "/app/audit", icon: ScrollText },
      { label: "Settings", to: "/app/settings", icon: Settings },
    ],
  },
];

export const searchIndex = [
  { group: "Vessels", items: ["MT Ocean Star", "MV Nordic Dawn", "MV Atlantic Pioneer", "MT Pacific Endeavour"], to: "/app/fleet" },
  { group: "Work Orders", items: ["WO-24118 Main Engine piston overhaul", "WO-24196 Turbocharger inspection", "WO-24261 BWTS UV lamp change"], to: "/app/work-orders" },
  { group: "Certificates", items: ["IOPP — MT Ocean Star", "Load Line — MV Atlantic Pioneer", "ISM SMC — MV Nordic Dawn"], to: "/app/certificates" },
  { group: "Procurement", items: ["REQ-8841 ME spares", "PO-2026-3391 MAN Energy Solutions", "GRN-7712 Rotterdam"], to: "/app/purchase-orders" },
  { group: "QHSE", items: ["DEV-1042 Bunkering port deviation", "RA-2231 Enclosed space entry", "PTW-4409 Enclosed space"], to: "/app/qms" },
  { group: "People", items: ["Alex Mercer — Fleet Manager", "Marit Haugen — Chief Engineer", "Keiko Tanaka — Procurement"], to: "/app/users" },
];
