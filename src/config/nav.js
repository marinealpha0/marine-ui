import {
  Anchor, Boxes, CalendarRange, ClipboardCheck, ClipboardList, FileText, Gauge,
  GitBranch, HardHat, LayoutDashboard, LifeBuoy, ListChecks, Package, PackageCheck,
  Route as RouteIcon, ScrollText, Settings, ShieldAlert, ShieldCheck, Ship,
  ShoppingCart, SlidersHorizontal, Truck, UserCheck, Users, Wrench, Bell, BarChart3,
} from "lucide-react";

export const navGroups = [
  {
    group: "Operations",
    items: [
      { label: "Command Center", to: "/", icon: LayoutDashboard },
      { label: "Voyages", to: "/app/voyages", icon: RouteIcon },
      { label: "Work Orders", to: "/app/work-orders", icon: Wrench, badge: 118 },
      { label: "Maintenance / PMS", to: "/app/maintenance", icon: Gauge },
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
      { label: "Requisitions", to: "/app/requisitions", icon: ClipboardList, badge: 5 },
      { label: "Purchase Orders", to: "/app/purchase-orders", icon: ShoppingCart },
      { label: "Receipts & Returns", to: "/app/receipts", icon: Truck },
    ],
  },
  {
    group: "Compliance & QHSE",
    items: [
      { label: "Certificates", to: "/app/certificates", icon: ShieldCheck, badge: 4 },
      { label: "Surveys & Services", to: "/app/surveys", icon: ClipboardCheck },
      { label: "Deviations", to: "/app/deviations", icon: GitBranch, badge: 3 },
      { label: "QMS", to: "/app/qms", icon: ScrollText },
      { label: "Corrective & Preventive", to: "/app/capa", icon: PackageCheck },
      { label: "Risk Management", to: "/app/risk", icon: ShieldAlert },
      { label: "Safety Meetings", to: "/app/safety-meetings", icon: LifeBuoy },
      { label: "Drills", to: "/app/drills", icon: Anchor },
      { label: "Permit to Work", to: "/app/permit-to-work", icon: HardHat, badge: 4 },
      { label: "Management of Change", to: "/app/moc", icon: SlidersHorizontal },
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
      { label: "Settings", to: "/settings", icon: Settings },
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
