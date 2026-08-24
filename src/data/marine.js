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

export const deviations = [
  { id: "DEV-1042", title: "Deviation from planned bunkering port", vessel: "MT Ocean Star", severity: "Major", owner: "Capt. E. Duarte", age: 12, status: "Open" },
  { id: "DEV-1039", title: "PMS interval extension — No.3 Purifier", vessel: "MV Baltic Trader", severity: "Minor", owner: "C/E J. Fischer", age: 26, status: "Pending Approval" },
  { id: "DEV-1031", title: "Deferred survey — tailshaft", vessel: "MV Atlantic Pioneer", severity: "Major", owner: "TSI R. Bell", age: 41, status: "Overdue" },
  { id: "DEV-1028", title: "Alternative spare part specification", vessel: "MT Pacific Endeavour", severity: "Minor", owner: "1/E T. Nakamura", age: 8, status: "Approved" },
  { id: "DEV-1019", title: "Crew rest hours deviation", vessel: "MV Nordic Dawn", severity: "Observation", owner: "C/O A. Silva", age: 5, status: "Rejected" },
];

export const deviationTrend = [
  { month: "Feb", open: 6, closed: 4 },
  { month: "Mar", open: 8, closed: 6 },
  { month: "Apr", open: 5, closed: 9 },
  { month: "May", open: 9, closed: 7 },
  { month: "Jun", open: 7, closed: 10 },
  { month: "Jul", open: 4, closed: 8 },
];

export const qmsGroups = [
  {
    group: "Improvement to Vessel",
    items: [
      { label: "NC pending approval", value: 3 },
      { label: "Violation pending approval", value: 0 },
      { label: "Incident report approval", value: 2 },
      { label: "Near miss pending approval", value: 5 },
      { label: "Best practice approval", value: 1 },
      { label: "LARP report pending completion", value: 0 },
      { label: "Defect reports approval", value: 6 },
      { label: "Deviation report approval", value: 2 },
      { label: "Failure reports approval", value: 0 },
    ],
  },
  {
    group: "Corrective Actions",
    items: [
      { label: "Open", value: 5 },
      { label: "In progress", value: 3 },
      { label: "Reopened", value: 0 },
      { label: "Extension requested", value: 2 },
      { label: "Overdue corrective action", value: 1, tone: "critical" },
      { label: "Defect report plan", value: 8, tone: "critical" },
      { label: "Action plan — PIC", value: 0 },
    ],
  },
  {
    group: "Preventive Actions",
    items: [
      { label: "Open", value: 5 },
      { label: "In progress", value: 1 },
      { label: "To be verified", value: 0 },
      { label: "Reopened", value: 0 },
      { label: "Extension", value: 0 },
      { label: "Overdue preventive action", value: 1, tone: "critical" },
      { label: "Defect report PA", value: 6, tone: "critical" },
    ],
  },
  {
    group: "Update Findings",
    items: [
      { label: "Update best practice", value: 0 },
      { label: "Update SFI", value: 0 },
      { label: "Update NC", value: 2 },
      { label: "Update observation", value: 1 },
      { label: "Update defect", value: 0 },
      { label: "Update deviation", value: 0 },
      { label: "Update failure", value: 0 },
      { label: "Investigation pending", value: 3 },
    ],
  },
];

export const inventory = [
  { part: "SP-ME-1042", name: "Cylinder head assembly — ME", category: "Main Engine", vessel: "MT Ocean Star", location: "Store 2 / B4", qty: 1, min: 2, supplier: "MAN Energy Solutions", cost: 42500, lead: "45 d" },
  { part: "SP-AE-2231", name: "Turbocharger cartridge — AE", category: "Aux Engine", vessel: "MV Atlantic Pioneer", location: "Store 1 / A2", qty: 0, min: 1, supplier: "ABB Turbocharging", cost: 28900, lead: "60 d" },
  { part: "SP-PU-0918", name: "Mechanical seal — feed pump", category: "Pumps", vessel: "MV Atlantic Pioneer", location: "Store 3 / C1", qty: 2, min: 4, supplier: "Alfa Laval", cost: 1450, lead: "21 d" },
  { part: "SP-BW-3312", name: "UV lamp — BWTS", category: "Environmental", vessel: "MV Baltic Trader", location: "Store 1 / D3", qty: 3, min: 6, supplier: "Wärtsilä", cost: 980, lead: "30 d" },
  { part: "SP-EL-7741", name: "AVR module — emergency gen", category: "Electrical", vessel: "MV Coral Horizon", location: "ECR Locker", qty: 2, min: 1, supplier: "Kongsberg", cost: 3200, lead: "18 d" },
  { part: "SP-ME-1188", name: "Fuel injector — ME", category: "MT Pacific Endeavour", location: "Store 2 / B1", qty: 6, min: 4, supplier: "MAN Energy Solutions", cost: 5100, lead: "35 d" },
];

export const purchaseOrders = [
  { po: "PO-2026-3391", supplier: "MAN Energy Solutions", vessel: "MT Ocean Star", amount: 128400, currency: "USD", delivery: "2026-08-24", status: "Ordered" },
  { po: "PO-2026-3384", supplier: "Alfa Laval Marine", vessel: "MV Atlantic Pioneer", amount: 18250, currency: "EUR", delivery: "2026-08-12", status: "Partially Received" },
  { po: "PO-2026-3376", supplier: "Wilhelmsen Ships Service", vessel: "MV Nordic Dawn", amount: 9640, currency: "USD", delivery: "2026-08-09", status: "Overdue" },
  { po: "PO-2026-3362", supplier: "ABB Turbocharging", vessel: "MV Atlantic Pioneer", amount: 31900, currency: "USD", delivery: "2026-09-02", status: "Approved" },
  { po: "PO-2026-3350", supplier: "Kongsberg Maritime", vessel: "MV Coral Horizon", amount: 7420, currency: "NOK", delivery: "2026-08-06", status: "Received" },
  { po: "PO-2026-3341", supplier: "Drew Marine", vessel: "MV Baltic Trader", amount: 4180, currency: "USD", delivery: "2026-08-27", status: "Pending" },
];

export const requisitions = [
  { id: "REQ-8841", title: "ME spares — quarterly replenishment", vessel: "MT Ocean Star", raisedBy: "C/E M. Haugen", value: 46200, status: "Under Review", date: "2026-08-02" },
  { id: "REQ-8836", title: "Deck stores & mooring ropes", vessel: "MV Nordic Dawn", raisedBy: "C/O A. Silva", value: 12800, status: "Approved", date: "2026-07-29" },
  { id: "REQ-8829", title: "BWTS consumables", vessel: "MV Baltic Trader", raisedBy: "2/E R. Kowalski", value: 6400, status: "Draft", date: "2026-08-05" },
  { id: "REQ-8817", title: "Provisions & bonded stores", vessel: "MT Pacific Endeavour", raisedBy: "Capt. E. Duarte", value: 9100, status: "Ordered", date: "2026-07-21" },
  { id: "REQ-8802", title: "Electrical spares — switchboard", vessel: "MV Atlantic Pioneer", raisedBy: "ETO K. Varga", value: 15400, status: "Partially Received", date: "2026-07-14" },
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

export const voyages = [
  { id: "VOY-2026-118", vessel: "MT Ocean Star", from: "Ras Tanura", to: "Rotterdam", departed: "2026-07-28", eta: "2026-08-14", cargo: "Crude oil 98,400 mt", status: "In Transit", progress: 62 },
  { id: "VOY-2026-141", vessel: "MV Atlantic Pioneer", from: "New York", to: "Rotterdam", departed: "2026-08-03", eta: "2026-08-12", cargo: "3,180 TEU", status: "In Transit", progress: 78 },
  { id: "VOY-2026-092", vessel: "MV Nordic Dawn", from: "Singapore", to: "Qingdao", departed: "2026-08-09", eta: "2026-08-19", cargo: "Iron ore 78,200 mt", status: "Loading", progress: 12 },
  { id: "VOY-2026-104", vessel: "MV Coral Horizon", from: "Ras Laffan", to: "Map Ta Phut", departed: "2026-07-31", eta: "2026-08-13", cargo: "LPG 32,000 m³", status: "In Transit", progress: 84 },
];

export const riskRegister = [
  { id: "RA-2231", title: "Enclosed space entry — cargo tank inspection", vessel: "MT Ocean Star", likelihood: 3, severity: 5, owner: "C/O D. Perez", mitigation: "In Progress", due: "2026-08-20" },
  { id: "RA-2224", title: "Hot work adjacent to fuel tank", vessel: "MV Baltic Trader", likelihood: 2, severity: 5, owner: "C/E J. Fischer", mitigation: "Controls Applied", due: "2026-08-15" },
  { id: "RA-2218", title: "Mooring operation in heavy swell", vessel: "MV Atlantic Pioneer", likelihood: 4, severity: 3, owner: "Capt. L. Moreau", mitigation: "Open", due: "2026-08-18" },
  { id: "RA-2209", title: "High voltage switchboard maintenance", vessel: "MV Coral Horizon", likelihood: 2, severity: 4, owner: "ETO K. Varga", mitigation: "Verified", due: "2026-08-25" },
  { id: "RA-2201", title: "Crane wire failure during provision lift", vessel: "MV Nordic Dawn", likelihood: 3, severity: 3, owner: "C/O A. Silva", mitigation: "In Progress", due: "2026-09-01" },
];

export const permits = [
  { id: "PTW-4412", type: "Hot Work", vessel: "MT Ocean Star", location: "Engine room — 3rd deck", risk: "High", requester: "2/E R. Kowalski", approver: "C/E M. Haugen", expiry: "2026-08-11 18:00", status: "Approved" },
  { id: "PTW-4409", type: "Enclosed Space Entry", vessel: "MV Atlantic Pioneer", location: "COT 4 Port", risk: "Critical", requester: "C/O D. Perez", approver: "Capt. L. Moreau", expiry: "2026-08-10 20:00", status: "Pending Closure" },
  { id: "PTW-4405", type: "Aloft Work", vessel: "MV Nordic Dawn", location: "Forward mast", risk: "Medium", requester: "Bosun T. Iyer", approver: "C/O A. Silva", expiry: "2026-08-12 12:00", status: "To Approve" },
  { id: "PTW-4398", type: "Electrical Isolation", vessel: "MV Coral Horizon", location: "Main switchboard", risk: "High", requester: "ETO K. Varga", approver: "C/E P. Mendes", expiry: "2026-08-13 09:00", status: "Ready Ship Review" },
  { id: "PTW-4391", type: "Overside Work", vessel: "MV Baltic Trader", location: "Stbd hull plating", risk: "Medium", requester: "Bosun R. Adeyemi", approver: "C/O S. Novak", expiry: "2026-08-09 16:00", status: "Returned" },
];

export const mocItems = [
  { id: "MOC-318", title: "Replace ME lube oil filter with alternative maker", vessel: "MT Ocean Star", stage: "Approval", owner: "TSI R. Bell", raised: "2026-07-18" },
  { id: "MOC-312", title: "Modify BWTS piping arrangement", vessel: "MV Baltic Trader", stage: "Implementation", owner: "C/E J. Fischer", raised: "2026-06-30" },
  { id: "MOC-307", title: "Change of PMS interval — purifiers", vessel: "MV Nordic Dawn", stage: "Review", owner: "C/E H. Lindqvist", raised: "2026-07-25" },
  { id: "MOC-299", title: "Software upgrade — engine control system", vessel: "MV Coral Horizon", stage: "Verification", owner: "ETO K. Varga", raised: "2026-06-12" },
];

export const mocStages = ["Draft", "Review", "Approval", "Implementation", "Verification", "Closed"];

export const drills = [
  { id: "DR-2291", type: "Fire", vessel: "MT Ocean Star", scheduled: "2026-08-12", status: "Scheduled", participants: 24 },
  { id: "DR-2288", type: "Abandon Ship", vessel: "MV Nordic Dawn", scheduled: "2026-08-05", status: "Completed", participants: 21 },
  { id: "DR-2284", type: "Enclosed Space Rescue", vessel: "MV Atlantic Pioneer", scheduled: "2026-08-02", status: "Pending Review", participants: 23 },
  { id: "DR-2279", type: "Oil Pollution", vessel: "MT Pacific Endeavour", scheduled: "2026-08-16", status: "Scheduled", participants: 22 },
  { id: "DR-2271", type: "Security (ISPS)", vessel: "MV Coral Horizon", scheduled: "2026-07-30", status: "Completed", participants: 20 },
  { id: "DR-2265", type: "Medical Emergency", vessel: "MV Baltic Trader", scheduled: "2026-07-26", status: "Completed", participants: 14 },
];

export const safetyMeetings = [
  { id: "SM-881", vessel: "MT Ocean Star", date: "2026-08-08", status: "Ship Review", actions: 3, chair: "Capt. E. Duarte" },
  { id: "SM-878", vessel: "MV Nordic Dawn", date: "2026-08-06", status: "To Submit", actions: 0, chair: "Capt. B. Ferreira" },
  { id: "SM-873", vessel: "MV Atlantic Pioneer", date: "2026-07-31", status: "Action Items", actions: 5, chair: "Capt. L. Moreau" },
  { id: "SM-869", vessel: "MV Coral Horizon", date: "2026-07-28", status: "Completed", actions: 0, chair: "Capt. N. Aziz" },
];

export const dailyPlan = [
  { status: "Draft Work Plan", tasks: [
    { id: "T-9021", title: "Purifier No.2 overhaul preparation", vessel: "MT Ocean Star", assignee: "3/E S. Rahman", hours: 6, priority: "Medium" },
    { id: "T-9024", title: "Deck crane wire inspection", vessel: "MV Nordic Dawn", assignee: "Bosun T. Iyer", hours: 3, priority: "Low" },
  ]},
  { status: "Pending Approval", tasks: [
    { id: "T-9014", title: "ME unit 4 piston pull", vessel: "MT Ocean Star", assignee: "2/E R. Kowalski", hours: 12, priority: "Critical" },
  ]},
  { status: "Active", tasks: [
    { id: "T-9008", title: "Boiler feed pump seal renewal", vessel: "MV Atlantic Pioneer", assignee: "3/E S. Rahman", hours: 8, priority: "High" },
    { id: "T-9011", title: "FW generator plate cleaning", vessel: "MT Pacific Endeavour", assignee: "2/E L. Okafor", hours: 5, priority: "Medium" },
  ]},
  { status: "Unplanned", tasks: [
    { id: "T-9030", title: "Steering gear alarm investigation", vessel: "MV Baltic Trader", assignee: "C/E J. Fischer", hours: 4, priority: "High" },
  ]},
];

export const weeklyPlan = [
  { vessel: "MT Ocean Star", plan: "Draft Weekly Plan", week: "W33", items: 18, status: "Draft" },
  { vessel: "MV Nordic Dawn", plan: "Weekly Planner", week: "W33", items: 14, status: "Pending Approval" },
  { vessel: "MV Atlantic Pioneer", plan: "Weekly Planner", week: "W33", items: 22, status: "Approved" },
  { vessel: "MV Coral Horizon", plan: "Weekly Planner", week: "W33", items: 11, status: "Approved" },
];

export const notifications = [
  { id: 1, category: "Critical", title: "Load Line Certificate expired", vessel: "MV Atlantic Pioneer", time: "12 minutes ago", action: "View certificate", to: "/app/certificates" },
  { id: 2, category: "Approval", title: "Requisition REQ-8841 awaiting your approval", vessel: "MT Ocean Star", time: "2 hours ago", action: "Review requisition", to: "/app/requisitions" },
  { id: 3, category: "Assignment", title: "WO-24196 assigned to you", vessel: "MV Atlantic Pioneer", time: "4 hours ago", action: "Open work order", to: "/app/work-orders" },
  { id: 4, category: "Reminder", title: "Fire drill scheduled in 2 days", vessel: "MT Ocean Star", time: "Yesterday", action: "View drill", to: "/app/drills" },
  { id: 5, category: "System", title: "Monthly PMS report generated", vessel: "Fleet-wide", time: "Yesterday", action: "Open report", to: "/app/reports" },
  { id: 6, category: "Critical", title: "Aux Engine No.2 exhaust temp deviation", vessel: "MV Atlantic Pioneer", time: "2 days ago", action: "View equipment", to: "/app/equipment" },
];

export const activityFeed = [
  { who: "C/E M. Haugen", what: "completed WO-24255 Emergency generator load test", vessel: "MV Coral Horizon", when: "18 min ago" },
  { who: "TSI R. Bell", what: "approved deviation DEV-1028", vessel: "MT Pacific Endeavour", when: "1 h ago" },
  { who: "Procurement", what: "issued PO-2026-3391 to MAN Energy Solutions", vessel: "MT Ocean Star", when: "3 h ago" },
  { who: "Capt. L. Moreau", what: "raised near miss report NM-4471", vessel: "MV Atlantic Pioneer", when: "5 h ago" },
  { who: "QHSE", what: "closed corrective action CA-771", vessel: "MV Nordic Dawn", when: "Yesterday" },
];

export const equipmentTree = [
  {
    name: "Main Engine — MAN B&W 6S60ME-C",
    health: 74,
    children: [
      { name: "Cylinder Unit 1", health: 92 },
      { name: "Cylinder Unit 2", health: 88 },
      { name: "Cylinder Unit 3", health: 81 },
      { name: "Cylinder Unit 4", health: 46 },
      { name: "Fuel Injection System", health: 79 },
      { name: "Cooling Water System", health: 90 },
      { name: "Turbocharger TCA66", health: 71 },
    ],
  },
  {
    name: "Auxiliary Engines",
    health: 68,
    children: [
      { name: "Aux Engine No.1", health: 89 },
      { name: "Aux Engine No.2", health: 42 },
      { name: "Aux Engine No.3", health: 84 },
    ],
  },
  { name: "Auxiliary Boiler — Aalborg OL", health: 77, children: [ { name: "Feed Water Pump", health: 55 }, { name: "Burner Unit", health: 86 } ] },
  { name: "Emergency Generator", health: 96, children: [] },
  { name: "Pumps & Purifiers", health: 83, children: [ { name: "Ballast Pump 1", health: 91 }, { name: "Ballast Pump 2", health: 78 }, { name: "LO Purifier No.2", health: 69 } ] },
  { name: "Navigation & Automation", health: 94, children: [ { name: "ECDIS", health: 98 }, { name: "Radar S-Band", health: 92 }, { name: "Engine Control System", health: 93 } ] },
  { name: "Environmental Systems", health: 72, children: [ { name: "Ballast Water Treatment", health: 64 }, { name: "Oily Water Separator", health: 81 } ] },
];

export const users = [
  { name: "Alex Mercer", role: "Fleet Manager", email: "alex.mercer@oceanicmarine.com", dept: "Technical", vessels: "All vessels", status: "Active" },
  { name: "Marit Haugen", role: "Chief Engineer", email: "m.haugen@oceanicmarine.com", dept: "Engine", vessels: "MV Atlantic Pioneer", status: "Active" },
  { name: "Ravi Bell", role: "Technical Superintendent", email: "r.bell@oceanicmarine.com", dept: "Technical", vessels: "Tanker Fleet", status: "Active" },
  { name: "Sofia Novak", role: "QHSE Manager", email: "s.novak@oceanicmarine.com", dept: "QHSE", vessels: "All vessels", status: "Active" },
  { name: "Daniel Perez", role: "Chief Officer", email: "d.perez@oceanicmarine.com", dept: "Deck", vessels: "MT Ocean Star", status: "On Leave" },
  { name: "Keiko Tanaka", role: "Procurement Manager", email: "k.tanaka@oceanicmarine.com", dept: "Supply Chain", vessels: "All vessels", status: "Active" },
];

export const roles = [
  { role: "Super Admin", users: 2, scope: "Organization", permissions: "Full access incl. tenant settings & audit" },
  { role: "Fleet Manager", users: 5, scope: "Fleet", permissions: "Read all · approve WO, REQ, deviations" },
  { role: "Technical Superintendent", users: 9, scope: "Assigned vessels", permissions: "Maintenance, equipment, deviations, MOC" },
  { role: "Chief Engineer", users: 24, scope: "Vessel", permissions: "WO, PMS, inventory, PTW approval" },
  { role: "Procurement Manager", users: 4, scope: "Organization", permissions: "Requisitions, POs, suppliers, receipts" },
  { role: "QHSE Manager", users: 3, scope: "Organization", permissions: "QMS, risk, incidents, CAPA, audits" },
  { role: "Crew Member", users: 312, scope: "Vessel", permissions: "Tasks, reports, drills, checklists" },
];

export const auditLogs = [
  { time: "2026-08-10 15:42", user: "Keiko Tanaka", action: "Approved PO-2026-3391", entity: "Purchase Order", ip: "10.42.8.11" },
  { time: "2026-08-10 14:18", user: "Ravi Bell", action: "Extended PMS interval on LO Purifier No.2", entity: "Deviation", ip: "10.42.3.90" },
  { time: "2026-08-10 11:03", user: "Sofia Novak", action: "Closed corrective action CA-771", entity: "QMS", ip: "10.42.1.24" },
  { time: "2026-08-09 19:55", user: "Alex Mercer", action: "Added user ETO K. Varga to Engine department", entity: "User Management", ip: "10.42.0.7" },
  { time: "2026-08-09 08:30", user: "System", action: "Nightly certificate expiry scan completed", entity: "System", ip: "—" },
];

export const documents = [
  { name: "SMS Manual Rev. 12", type: "Manual", vessel: "Fleet-wide", owner: "QHSE", updated: "2026-07-14", size: "8.4 MB" },
  { name: "ME Maintenance Manual — 6S60ME-C", type: "Technical", vessel: "MT Ocean Star", owner: "Technical", updated: "2026-05-02", size: "22.1 MB" },
  { name: "Class Survey Status Report", type: "Report", vessel: "MV Atlantic Pioneer", owner: "Technical", updated: "2026-08-01", size: "1.2 MB" },
  { name: "Ballast Water Management Plan", type: "Plan", vessel: "MV Baltic Trader", owner: "QHSE", updated: "2026-03-18", size: "3.6 MB" },
  { name: "Supplier Framework Agreement — Alfa Laval", type: "Contract", vessel: "Fleet-wide", owner: "Procurement", updated: "2026-06-09", size: "740 KB" },
];

export const reportsCatalog = [
  { name: "Fleet Maintenance Performance", category: "Maintenance", cadence: "Monthly", owner: "Technical" },
  { name: "Overdue Work Order Analysis", category: "Maintenance", cadence: "Weekly", owner: "Technical" },
  { name: "Procurement Spend by Vessel", category: "Procurement", cadence: "Monthly", owner: "Supply Chain" },
  { name: "Inventory Below Minimum", category: "Inventory", cadence: "Weekly", owner: "Supply Chain" },
  { name: "Certificate & Survey Status", category: "Compliance", cadence: "Monthly", owner: "QHSE" },
  { name: "Voyage Performance & Consumption", category: "Voyage", cadence: "Per voyage", owner: "Operations" },
  { name: "Incident & Near Miss Trend", category: "Safety", cadence: "Quarterly", owner: "QHSE" },
  { name: "Risk Register Summary", category: "Risk", cadence: "Quarterly", owner: "QHSE" },
];

export const overdueReview = [
  { label: "Incident reports", value: 4, tone: "critical" },
  { label: "Inspection reports", value: 2, tone: "critical" },
  { label: "Safety meetings", value: 1, tone: "warning" },
  { label: "Shipboard management review", value: 0, tone: "healthy" },
];

export const returnedReports = [
  { label: "Incident reports", value: 0 },
  { label: "Near miss reports", value: 1 },
  { label: "Inspection reports", value: 0 },
  { label: "Safety meeting reports", value: 2 },
  { label: "Shipboard mgmt. reports", value: 0 },
  { label: "RA returned reports", value: 0 },
  { label: "Defect returned reports", value: 1 },
  { label: "Deviation returned reports", value: 0 },
  { label: "Deficiency returned reports", value: 0 },
  { label: "NC returned reports", value: 0 },
];

export const handover = [
  { label: "Ready for ship review", value: 2 },
  { label: "PIC pending tasks", value: 6 },
  { label: "PIC overdue", value: 1 },
];

export const picTasks = [
  { id: "PIC-551", title: "Verify lifeboat release gear servicing record", vessel: "MT Ocean Star", pic: "C/O D. Perez", due: "2026-08-13", status: "Pending" },
  { id: "PIC-548", title: "Complete ME performance data submission", vessel: "MV Nordic Dawn", pic: "C/E H. Lindqvist", due: "2026-08-09", status: "Overdue" },
  { id: "PIC-544", title: "Handover checklist — 2/E relief", vessel: "MV Atlantic Pioneer", pic: "2/E R. Kowalski", due: "2026-08-18", status: "Assigned" },
  { id: "PIC-539", title: "Update garbage record book", vessel: "MV Coral Horizon", pic: "3/E P. Mendes", due: "2026-08-07", status: "Completed" },
];

export const receipts = [
  { id: "GRN-7712", po: "PO-2026-3384", vessel: "MV Atlantic Pioneer", port: "Rotterdam", date: "2026-08-08", state: "Partially Received", lines: "12 / 18" },
  { id: "GRN-7708", po: "PO-2026-3350", vessel: "MV Coral Horizon", port: "Singapore", date: "2026-08-05", state: "Goods Received", lines: "9 / 9" },
  { id: "GRN-7701", po: "PO-2026-3341", vessel: "MV Baltic Trader", port: "Gdansk", date: "2026-08-03", state: "Pending Inspection", lines: "6 / 6" },
  { id: "GRN-7694", po: "PO-2026-3376", vessel: "MV Nordic Dawn", port: "Singapore", date: "2026-07-30", state: "Damaged", lines: "2 / 14" },
  { id: "GRN-7688", po: "PO-2026-3362", vessel: "MV Atlantic Pioneer", port: "New York", date: "2026-07-24", state: "Returned", lines: "1 / 4" },
];

export const surveys = [
  { name: "Intermediate Class Survey", vessel: "MT Ocean Star", surveyor: "DNV", window: "2026-09-01 → 2026-12-01", status: "Upcoming" },
  { name: "Tailshaft Survey", vessel: "MV Atlantic Pioneer", surveyor: "ABS", window: "2026-06-01 → 2026-08-01", status: "Overdue" },
  { name: "Annual Safety Equipment Survey", vessel: "MV Nordic Dawn", surveyor: "DNV", window: "2026-10-02 → 2026-12-02", status: "Upcoming" },
  { name: "Docking Survey", vessel: "MV Baltic Trader", surveyor: "RINA", window: "2026-08-05 → 2026-08-28", status: "In Progress" },
  { name: "Boiler Survey", vessel: "MT Pacific Endeavour", surveyor: "ClassNK", window: "2026-04-10 → 2026-05-10", status: "Completed" },
];

export const capa = {
  corrective: [
    { id: "CA-786", title: "Repeated ME exhaust temperature deviation", vessel: "MV Atlantic Pioneer", owner: "C/E M. Haugen", due: "2026-08-16", status: "In Progress" },
    { id: "CA-781", title: "Missing PPE in engine room store", vessel: "MT Ocean Star", owner: "2/E R. Kowalski", due: "2026-08-09", status: "Overdue" },
    { id: "CA-777", title: "Inadequate toolbox talk records", vessel: "MV Baltic Trader", owner: "C/O S. Novak", due: "2026-08-22", status: "Open" },
    { id: "CA-770", title: "Delayed defect reporting to shore", vessel: "MV Nordic Dawn", owner: "Capt. B. Ferreira", due: "2026-08-30", status: "Extension" },
  ],
  preventive: [
    { id: "PA-412", title: "Introduce vibration monitoring on aux engines", vessel: "Fleet-wide", owner: "TSI R. Bell", due: "2026-09-15", status: "In Progress" },
    { id: "PA-408", title: "Revise enclosed space entry checklist", vessel: "Fleet-wide", owner: "QHSE S. Novak", due: "2026-08-27", status: "To Be Verified" },
    { id: "PA-401", title: "Quarterly spare part criticality review", vessel: "Tanker Fleet", owner: "K. Tanaka", due: "2026-08-08", status: "Overdue" },
    { id: "PA-396", title: "Crew familiarisation on new BWTS", vessel: "MV Baltic Trader", owner: "C/E J. Fischer", due: "2026-09-05", status: "Open" },
  ],
};

export const currentUser = { name: "Alex Mercer", initials: "AM", role: "Fleet Manager", org: "Oceanic Marine Group" };
