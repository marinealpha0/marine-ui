export const organizations = [
  { id: "oceanic", name: "Oceanic Marine Group", vessels: 24, plan: "Enterprise" },
  { id: "nordwind", name: "Nordwind Ship Management", vessels: 11, plan: "Fleet" },
  { id: "meridian", name: "Meridian Offshore", vessels: 6, plan: "Fleet" },
];

export const fleets = [
  { id: "all", name: "All Vessels", count: 24 },
  { id: "tanker", name: "Tanker Fleet", count: 9 },
  { id: "bulk", name: "Bulk Carrier Fleet", count: 8 },
  { id: "container", name: "Container Fleet", count: 5 },
  { id: "offshore", name: "Offshore Support", count: 2 },
];

export const vessels = [
  {
    id: "ocean-star", name: "MT Ocean Star", imo: "9421356", flag: "Marshall Islands",
    type: "Crude Oil Tanker", built: 2014, dwt: 115000, status: "At Sea", health: "warning",
    location: "Gulf of Aden", nextPort: "Fujairah", eta: "2026-08-14 06:00", voyage: "VOY-2026-118",
    maintenance: 82, certificates: 91, crew: 24, rob: { fuel: 72, lube: 58, water: 81 },
    openWO: 46, overdueWO: 12,
  },
  {
    id: "nordic-dawn", name: "MV Nordic Dawn", imo: "9563102", flag: "Singapore",
    type: "Bulk Carrier", built: 2018, dwt: 82000, status: "In Port", health: "healthy",
    location: "Port of Singapore", nextPort: "Qingdao", eta: "2026-08-19 14:30", voyage: "VOY-2026-092",
    maintenance: 96, certificates: 100, crew: 21, rob: { fuel: 88, lube: 74, water: 92 },
    openWO: 18, overdueWO: 0,
  },
  {
    id: "atlantic-pioneer", name: "MV Atlantic Pioneer", imo: "9388741", flag: "Liberia",
    type: "Container 4,250 TEU", built: 2011, dwt: 52000, status: "At Sea", health: "critical",
    location: "North Atlantic", nextPort: "Rotterdam", eta: "2026-08-12 22:15", voyage: "VOY-2026-141",
    maintenance: 61, certificates: 78, crew: 23, rob: { fuel: 41, lube: 33, water: 62 },
    openWO: 63, overdueWO: 27,
  },
  {
    id: "pacific-endeavour", name: "MT Pacific Endeavour", imo: "9714520", flag: "Panama",
    type: "Product Tanker", built: 2016, dwt: 74000, status: "Anchorage", health: "healthy",
    location: "Off Jebel Ali", nextPort: "Jebel Ali", eta: "2026-08-11 08:00", voyage: "VOY-2026-133",
    maintenance: 93, certificates: 97, crew: 22, rob: { fuel: 65, lube: 69, water: 77 },
    openWO: 22, overdueWO: 2,
  },
  {
    id: "baltic-trader", name: "MV Baltic Trader", imo: "9277431", flag: "Malta",
    type: "General Cargo", built: 2009, dwt: 28000, status: "Drydock", health: "warning",
    location: "Gdansk Shipyard", nextPort: "Gdansk", eta: "2026-08-28 09:00", voyage: "—",
    maintenance: 74, certificates: 85, crew: 14, rob: { fuel: 30, lube: 51, water: 55 },
    openWO: 88, overdueWO: 9,
  },
  {
    id: "coral-horizon", name: "MV Coral Horizon", imo: "9836112", flag: "Bahamas",
    type: "LPG Carrier", built: 2021, dwt: 38000, status: "At Sea", health: "healthy",
    location: "Strait of Malacca", nextPort: "Map Ta Phut", eta: "2026-08-13 17:45", voyage: "VOY-2026-104",
    maintenance: 98, certificates: 99, crew: 20, rob: { fuel: 79, lube: 82, water: 88 },
    openWO: 11, overdueWO: 0,
  },
];

export const fleetSummary = {
  vessels: 24,
  operational: 21,
  atRisk: 2,
  critical: 1,
  maintenanceHealth: 87,
  certificateHealth: 98,
  safetyHealth: 92,
  procurementHealth: 79,
};

export const criticalAlerts = [
  { id: 1, severity: "critical", title: "8 overdue work orders", vessel: "MV Atlantic Pioneer", meta: "Oldest 42 days · Main Engine", to: "/app/work-orders" },
  { id: 2, severity: "critical", title: "2 critical equipment failures", vessel: "MV Atlantic Pioneer", meta: "No.2 Aux Engine · Boiler feed pump", to: "/app/equipment" },
  { id: 3, severity: "warning", title: "3 certificates expiring within 30 days", vessel: "MT Ocean Star", meta: "IOPP · Load Line · Safety Equipment", to: "/app/certificates" },
  { id: 4, severity: "warning", title: "6 pending defect reports", vessel: "Fleet-wide", meta: "Awaiting shore approval > 7 days", to: "/app/qms" },
  { id: 5, severity: "warning", title: "1 vessel below minimum spare level", vessel: "MV Baltic Trader", meta: "146 spares below minimum", to: "/app/inventory" },
  { id: 6, severity: "info", title: "4 PTW awaiting closure", vessel: "MT Pacific Endeavour", meta: "Hot work · Enclosed space", to: "/app/permit-to-work" },
];

export const maintenanceKpis = [
  { label: "Overdue Work Orders", value: 118, delta: "+12% vs last month", tone: "critical", to: "/app/work-orders" },
  { label: "Critical Work Orders", value: 14, delta: "Needs immediate attention", tone: "critical", to: "/app/work-orders" },
  { label: "WOs Awaiting Approval", value: 22, delta: "-4 since last week", tone: "warning", to: "/app/work-orders" },
  { label: "My Tasks", value: 96, delta: "18 due this week", tone: "info", to: "/app/work-orders" },
];

export const upcomingWork = [
  { label: "Due next 30 days", value: 666 },
  { label: "External work", value: 12 },
  { label: "Defects & O/T WOs", value: 37 },
  { label: "Approved jobs", value: 208 },
  { label: "Approvals pending within TSI", value: 14 },
  { label: "Counters not updated", value: 1 },
];

export const criticalItems = [
  { label: "Spares below minimum level", value: 146, tone: "critical" },
  { label: "Critical spares below minimum", value: 9, tone: "critical" },
  { label: "Other critical items below min.", value: 4, tone: "warning" },
];

export const maintenanceTrend = [
  { month: "Feb", completed: 412, overdue: 88, planned: 460 },
  { month: "Mar", completed: 438, overdue: 94, planned: 470 },
  { month: "Apr", completed: 466, overdue: 102, planned: 505 },
  { month: "May", completed: 489, overdue: 97, planned: 520 },
  { month: "Jun", completed: 501, overdue: 110, planned: 540 },
  { month: "Jul", completed: 528, overdue: 118, planned: 566 },
];

export const procurement = {
  requisitions: [
    { label: "PRs not processed > 100 days", value: 5, tone: "critical" },
    { label: "Item draft > 7 days", value: 21, tone: "warning" },
    { label: "Service draft > 7 days", value: 2, tone: "warning" },
  ],
  orders: [
    { label: "POs order placed > 90 days", value: 791, tone: "warning" },
    { label: "PO partially received", value: 34, tone: "info" },
  ],
  supply: [
    { label: "Current port — Fujairah", value: 18, tone: "info" },
    { label: "Next port — Rotterdam", value: 7, tone: "info" },
  ],
  spend: [
    { month: "Feb", spend: 412000, budget: 460000 },
    { month: "Mar", spend: 486000, budget: 470000 },
    { month: "Apr", spend: 431000, budget: 480000 },
    { month: "May", spend: 522000, budget: 500000 },
    { month: "Jun", spend: 468000, budget: 510000 },
    { month: "Jul", spend: 551000, budget: 540000 },
  ],
};

export const workOrders = [
  { id: "WO-24118", title: "Main Engine — Unit 4 piston overhaul", vessel: "MT Ocean Star", equipment: "Main Engine / Cylinder 4", priority: "Critical", status: "Overdue", assignee: "2/E R. Kowalski", due: "2026-07-28", type: "Planned", hours: 36 },
  { id: "WO-24196", title: "Aux Engine No.2 — turbocharger inspection", vessel: "MV Atlantic Pioneer", equipment: "Auxiliary Engine 2", priority: "Critical", status: "In Progress", assignee: "C/E M. Haugen", due: "2026-08-11", type: "Corrective", hours: 18 },
  { id: "WO-24204", title: "Boiler feed pump seal replacement", vessel: "MV Atlantic Pioneer", equipment: "Aux Boiler / Feed Pump", priority: "High", status: "Awaiting Approval", assignee: "3/E S. Rahman", due: "2026-08-15", type: "Corrective", hours: 8 },
  { id: "WO-24221", title: "Fresh water generator — plate cleaning", vessel: "MT Pacific Endeavour", equipment: "FW Generator", priority: "Medium", status: "Planned", assignee: "2/E L. Okafor", due: "2026-08-21", type: "Planned", hours: 12 },
  { id: "WO-24233", title: "Lifeboat davit brake test", vessel: "MV Nordic Dawn", equipment: "LSA / Lifeboat 1", priority: "High", status: "Planned", assignee: "C/O A. Silva", due: "2026-08-18", type: "Statutory", hours: 4 },
  { id: "WO-24240", title: "Cargo oil pump turbine bearing renewal", vessel: "MT Ocean Star", equipment: "Cargo Pump Turbine 2", priority: "High", status: "In Progress", assignee: "1/E T. Nakamura", due: "2026-08-16", type: "Corrective", hours: 26 },
  { id: "WO-24255", title: "Emergency generator load test", vessel: "MV Coral Horizon", equipment: "Emergency Generator", priority: "Medium", status: "Completed", assignee: "3/E P. Mendes", due: "2026-08-04", type: "Statutory", hours: 3 },
  { id: "WO-24261", title: "Ballast water treatment UV lamp change", vessel: "MV Baltic Trader", equipment: "BWTS", priority: "High", status: "Overdue", assignee: "C/E J. Fischer", due: "2026-07-30", type: "Planned", hours: 10 },
];

export const certificates = [
  { name: "International Oil Pollution Prevention", type: "Statutory", vessel: "MT Ocean Star", issuer: "DNV", issued: "2022-09-12", expiry: "2026-09-11", status: "Expiring" },
  { name: "Safety Equipment Certificate", type: "Statutory", vessel: "MT Ocean Star", issuer: "Lloyd's Register", issued: "2023-02-04", expiry: "2026-08-30", status: "Expiring" },
  { name: "Load Line Certificate", type: "Statutory", vessel: "MV Atlantic Pioneer", issuer: "ABS", issued: "2021-06-18", expiry: "2026-06-17", status: "Expired" },
  { name: "ISM Safety Management Certificate", type: "ISM", vessel: "MV Nordic Dawn", issuer: "DNV", issued: "2023-11-02", expiry: "2028-11-01", status: "Valid" },
  { name: "ISPS Ship Security Certificate", type: "ISPS", vessel: "MV Coral Horizon", issuer: "BV", issued: "2024-01-22", expiry: "2029-01-21", status: "Valid" },
  { name: "Class Certificate — Hull", type: "Class", vessel: "MV Baltic Trader", issuer: "RINA", issued: "2021-04-09", expiry: "2026-04-08", status: "Expired" },
  { name: "MLC Maritime Labour Certificate", type: "Statutory", vessel: "MT Pacific Endeavour", issuer: "ClassNK", issued: "2023-05-30", expiry: "2028-05-29", status: "Valid" },
  { name: "IAPP Certificate", type: "Statutory", vessel: "MV Nordic Dawn", issuer: "DNV", issued: "2022-10-15", expiry: "2026-10-14", status: "Expiring" },
];

export const certificateStats = [
  { label: "Expiring certificates", value: 4, tone: "warning" },
  { label: "Expired certificates", value: 10, tone: "critical" },
  { label: "In-window surveys", value: 2, tone: "info" },
  { label: "Overdue surveys", value: 0, tone: "healthy" },
  { label: "Pending approval — certificates", value: 0, tone: "info" },
  { label: "Pending approval — surveys", value: 0, tone: "info" },
  { label: "Approved certificates", value: 131, tone: "healthy" },
  { label: "Rejected certificates", value: 0, tone: "info" },
  { label: "Certificates to update", value: 29, tone: "warning" },
];

export const voyageActivities = [
  {
    group: "Booking Reports",
    items: [
      { label: "To be sent", value: 3 },
      { label: "To be approved", value: 1 },
      { label: "Last position generated", value: 24 },
    ],
  },
  {
    group: "Voyage Journals",
    items: [
      { label: "To be sent", value: 2 },
      { label: "To be approved", value: 4 },
    ],
  },
  {
    group: "Requests for Correction",
    items: [
      { label: "Pending corrections", value: 1 },
      { label: "Pending voyage corrections", value: 0 },
    ],
  },
];

export const activityFeed = [
  { who: "C/E M. Haugen", what: "completed WO-24255 Emergency generator load test", vessel: "MV Coral Horizon", when: "18 min ago" },
  { who: "TSI R. Bell", what: "approved deviation DEV-1028", vessel: "MT Pacific Endeavour", when: "1 h ago" },
  { who: "Procurement", what: "issued PO-2026-3391 to MAN Energy Solutions", vessel: "MT Ocean Star", when: "3 h ago" },
  { who: "Capt. L. Moreau", what: "raised near miss report NM-4471", vessel: "MV Atlantic Pioneer", when: "5 h ago" },
  { who: "QHSE", what: "closed corrective action CA-771", vessel: "MV Nordic Dawn", when: "Yesterday" },
];

export const currentUser = { name: "Alex Mercer", initials: "AM", role: "Fleet Manager", org: "Oceanic Marine Group" };
