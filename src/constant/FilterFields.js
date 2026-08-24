// Common Vessel Options
const vesselOptions = [
  { value: "all", label: "All Vessels" },
  { value: "MT Ocean Star", label: "MT Ocean Star" },
  { value: "MV Atlantic Pioneer", label: "MV Atlantic Pioneer" },
  { value: "MV Nordic Dawn", label: "MV Nordic Dawn" },
  { value: "MT Pacific Endeavour", label: "MT Pacific Endeavour" },
  { value: "MV Baltic Trader", label: "MV Baltic Trader" },
  { value: "MV Coral Horizon", label: "MV Coral Horizon" },
];

// Work Orders Filter Fields
export const workOrderFilterFields = [
  { name: "searchVal", label: "Search WOs", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { value: "all", label: "All Priorities" },
      { value: "Critical", label: "Critical" },
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Overdue", label: "Overdue" },
      { value: "In Progress", label: "In Progress" },
      { value: "Awaiting Approval", label: "Awaiting Approval" },
      { value: "Planned", label: "Planned" },
      { value: "Completed", label: "Completed" },
    ],
  },
  {
    name: "type",
    label: "Job Type",
    type: "select",
    options: [
      { value: "all", label: "All Types" },
      { value: "Planned", label: "Planned" },
      { value: "Corrective", label: "Corrective" },
      { value: "Statutory", label: "Statutory" },
    ],
  },
];

// Inventory Filter Fields
export const inventoryFilterFields = [
  { name: "searchVal", label: "Search Spares", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "all", label: "All Categories" },
      { value: "Main Engine", label: "Main Engine" },
      { value: "Aux Engine", label: "Aux Engine" },
      { value: "Pumps", label: "Pumps" },
      { value: "Environmental", label: "Environmental" },
      { value: "Electrical", label: "Electrical" },
    ],
  },
  { name: "supplier", label: "Supplier", type: "text" },
];

// Receipts & Returns Filter Fields
export const receiptFilterFields = [
  { name: "searchVal", label: "Search GRN/PO", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "state",
    label: "Receipt State",
    type: "select",
    options: [
      { value: "all", label: "All States" },
      { value: "Partially Received", label: "Partially Received" },
      { value: "Goods Received", label: "Goods Received" },
      { value: "Pending Inspection", label: "Pending Inspection" },
      { value: "Damaged", label: "Damaged" },
      { value: "Returned", label: "Returned" },
    ],
  },
  { name: "port", label: "Port", type: "text" },
];

// Purchase Orders Filter Fields
export const purchaseOrderFilterFields = [
  { name: "searchVal", label: "Search PO / Supplier", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "PO Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Ordered", label: "Ordered" },
      { value: "Partially Received", label: "Partially Received" },
      { value: "Overdue", label: "Overdue" },
      { value: "Approved", label: "Approved" },
      { value: "Received", label: "Received" },
      { value: "Pending", label: "Pending" },
    ],
  },
  { name: "supplier", label: "Supplier", type: "text" },
];

// Requisitions Filter Fields
export const requisitionFilterFields = [
  { name: "searchVal", label: "Search Requisitions", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Under Review", label: "Under Review" },
      { value: "Approved", label: "Approved" },
      { value: "Draft", label: "Draft" },
      { value: "Ordered", label: "Ordered" },
      { value: "Partially Received", label: "Partially Received" },
    ],
  },
  { name: "raisedBy", label: "Raised By", type: "text" },
];

// Certificates Filter Fields
export const certificateFilterFields = [
  { name: "searchVal", label: "Search Certificates", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "type",
    label: "Certificate Type",
    type: "select",
    options: [
      { value: "all", label: "All Types" },
      { value: "Statutory", label: "Statutory" },
      { value: "ISM", label: "ISM" },
      { value: "ISPS", label: "ISPS" },
      { value: "Class", label: "Class" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Expiring", label: "Expiring" },
      { value: "Expired", label: "Expired" },
      { value: "Valid", label: "Valid" },
    ],
  },
  { name: "issuer", label: "Issuer", type: "text" },
];

// Surveys Filter Fields
export const surveyFilterFields = [
  { name: "searchVal", label: "Search Surveys", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Upcoming", label: "Upcoming" },
      { value: "Overdue", label: "Overdue" },
      { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" },
    ],
  },
  { name: "surveyor", label: "Surveyor", type: "text" },
];

// Management of Change (MOC) Filter Fields
export const mocFilterFields = [
  { name: "searchVal", label: "Search MOC", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "stage",
    label: "Stage",
    type: "select",
    options: [
      { value: "all", label: "All Stages" },
      { value: "Draft", label: "Draft" },
      { value: "Review", label: "Review" },
      { value: "Approval", label: "Approval" },
      { value: "Implementation", label: "Implementation" },
      { value: "Verification", label: "Verification" },
      { value: "Closed", label: "Closed" },
    ],
  },
  { name: "owner", label: "Owner", type: "text" },
];

// Permit to Work (PTW) Filter Fields
export const permitFilterFields = [
  { name: "searchVal", label: "Search Permits", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "type",
    label: "Permit Type",
    type: "select",
    options: [
      { value: "all", label: "All Types" },
      { value: "Hot Work", label: "Hot Work" },
      { value: "Enclosed Space Entry", label: "Enclosed Space Entry" },
      { value: "Aloft Work", label: "Aloft Work" },
      { value: "Electrical Isolation", label: "Electrical Isolation" },
      { value: "Overside Work", label: "Overside Work" },
    ],
  },
  {
    name: "risk",
    label: "Risk Level",
    type: "select",
    options: [
      { value: "all", label: "All Risk Levels" },
      { value: "Critical", label: "Critical" },
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Approved", label: "Approved" },
      { value: "Pending Closure", label: "Pending Closure" },
      { value: "To Approve", label: "To Approve" },
      { value: "Ready Ship Review", label: "Ready Ship Review" },
      { value: "Returned", label: "Returned" },
    ],
  },
];

// Deviations Filter Fields
export const deviationFilterFields = [
  { name: "searchVal", label: "Search Deviations", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "severity",
    label: "Severity",
    type: "select",
    options: [
      { value: "all", label: "All Severities" },
      { value: "Major", label: "Major" },
      { value: "Minor", label: "Minor" },
      { value: "Observation", label: "Observation" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Open", label: "Open" },
      { value: "Pending Approval", label: "Pending Approval" },
      { value: "Overdue", label: "Overdue" },
      { value: "Approved", label: "Approved" },
      { value: "Rejected", label: "Rejected" },
    ],
  },
];

// CAPA Filter Fields
export const capaFilterFields = [
  { name: "searchVal", label: "Search Actions", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "In Progress", label: "In Progress" },
      { value: "Overdue", label: "Overdue" },
      { value: "Open", label: "Open" },
      { value: "Extension", label: "Extension" },
      { value: "To Be Verified", label: "To Be Verified" },
    ],
  },
];

// Drills Filter Fields
export const drillFilterFields = [
  { name: "searchVal", label: "Search Drills", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "type",
    label: "Drill Type",
    type: "select",
    options: [
      { value: "all", label: "All Types" },
      { value: "Fire", label: "Fire" },
      { value: "Abandon Ship", label: "Abandon Ship" },
      { value: "Enclosed Space Rescue", label: "Enclosed Space Rescue" },
      { value: "Oil Pollution", label: "Oil Pollution" },
      { value: "Security (ISPS)", label: "Security (ISPS)" },
      { value: "Medical Emergency", label: "Medical Emergency" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Scheduled", label: "Scheduled" },
      { value: "Completed", label: "Completed" },
      { value: "Pending Review", label: "Pending Review" },
    ],
  },
];

// Safety Meetings Filter Fields
export const safetyMeetingFilterFields = [
  { name: "searchVal", label: "Search Meetings", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Ship Review", label: "Ship Review" },
      { value: "To Submit", label: "To Submit" },
      { value: "Action Items", label: "Action Items" },
      { value: "Completed", label: "Completed" },
    ],
  },
  { name: "chair", label: "Chairperson", type: "text" },
];

// Risk Register Filter Fields
export const riskFilterFields = [
  { name: "searchVal", label: "Search Risk Register", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "severity",
    label: "Severity",
    type: "select",
    options: [
      { value: "all", label: "All Severities" },
      { value: "5", label: "5 - Catastrophic" },
      { value: "4", label: "4 - Major" },
      { value: "3", label: "3 - Moderate" },
      { value: "2", label: "2 - Minor" },
    ],
  },
  {
    name: "mitigation",
    label: "Mitigation Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "In Progress", label: "In Progress" },
      { value: "Controls Applied", label: "Controls Applied" },
      { value: "Open", label: "Open" },
      { value: "Verified", label: "Verified" },
    ],
  },
];

// PIC Tasks Filter Fields
export const picFilterFields = [
  { name: "searchVal", label: "Search PIC Tasks", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Pending", label: "Pending" },
      { value: "Overdue", label: "Overdue" },
      { value: "Assigned", label: "Assigned" },
      { value: "Completed", label: "Completed" },
    ],
  },
  { name: "pic", label: "Person in Charge", type: "text" },
];

// Voyages & Handover Filter Fields
export const voyageFilterFields = [
  { name: "searchVal", label: "Search Ref / Vessel / Name", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Ready For Ship Review", label: "Ready For Ship Review" },
      { value: "PIC Pending Tasks", label: "PIC Pending Tasks" },
      { value: "PIC Overdue", label: "PIC Overdue" },
      { value: "Completed", label: "Completed" },
    ],
  },
  { name: "rank", label: "Rank", type: "text" },
];

// Weekly Planner Filter Fields
export const weeklyPlannerFilterFields = [
  { name: "searchVal", label: "Search Weekly Plan", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Draft", label: "Draft" },
      { value: "Pending Approval", label: "Pending Approval" },
      { value: "Approved", label: "Approved" },
    ],
  },
];

// Documents Filter Fields
export const documentFilterFields = [
  { name: "searchVal", label: "Search Documents", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "type",
    label: "Document Type",
    type: "select",
    options: [
      { value: "all", label: "All Types" },
      { value: "Manual", label: "Manual" },
      { value: "Technical", label: "Technical" },
      { value: "Report", label: "Report" },
      { value: "Plan", label: "Plan" },
      { value: "Contract", label: "Contract" },
    ],
  },
  { name: "owner", label: "Owner", type: "text" },
];

// Reports Catalog Filter Fields
export const reportFilterFields = [
  { name: "searchVal", label: "Search Reports", type: "text" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "all", label: "All Categories" },
      { value: "Maintenance", label: "Maintenance" },
      { value: "Procurement", label: "Procurement" },
      { value: "Inventory", label: "Inventory" },
      { value: "Compliance", label: "Compliance" },
      { value: "Voyage", label: "Voyage" },
      { value: "Safety", label: "Safety" },
      { value: "Risk", label: "Risk" },
    ],
  },
  {
    name: "cadence",
    label: "Cadence",
    type: "select",
    options: [
      { value: "all", label: "All Cadences" },
      { value: "Monthly", label: "Monthly" },
      { value: "Weekly", label: "Weekly" },
      { value: "Quarterly", label: "Quarterly" },
      { value: "Per voyage", label: "Per voyage" },
    ],
  },
  { name: "owner", label: "Owner", type: "text" },
];

// Users Filter Fields
export const userFilterFields = [
  { name: "searchVal", label: "Search Users", type: "text" },
  {
    name: "dept",
    label: "Department",
    type: "select",
    options: [
      { value: "all", label: "All Departments" },
      { value: "Technical", label: "Technical" },
      { value: "Engine", label: "Engine" },
      { value: "Deck", label: "Deck" },
      { value: "QHSE", label: "QHSE" },
      { value: "Supply Chain", label: "Supply Chain" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "On Leave", label: "On Leave" },
      { value: "Inactive", label: "Inactive" },
    ],
  },
  { name: "role", label: "Role", type: "text" },
];

// Fleet Filter Fields
export const fleetFilterFields = [
  { name: "searchVal", label: "Search Fleet / Vessel", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "At Sea", label: "At Sea" },
      { value: "In Port", label: "In Port" },
      { value: "Anchorage", label: "Anchorage" },
      { value: "Drydock", label: "Drydock" },
    ],
  },
  {
    name: "health",
    label: "Health Status",
    type: "select",
    options: [
      { value: "all", label: "All Health" },
      { value: "healthy", label: "Healthy" },
      { value: "warning", label: "Warning" },
      { value: "critical", label: "Critical" },
    ],
  },
];

// Audit Filter Fields
export const auditFilterFields = [
  { name: "searchVal", label: "Search Action / User", type: "text" },
  {
    name: "entity",
    label: "Entity",
    type: "select",
    options: [
      { value: "all", label: "All Entities" },
      { value: "Purchase Order", label: "Purchase Order" },
      { value: "Deviation", label: "Deviation" },
      { value: "QMS", label: "QMS" },
      { value: "User Management", label: "User Management" },
      { value: "System", label: "System" },
    ],
  },
];

// Work Planner Filter Fields
export const workPlannerFilterFields = [
  { name: "searchVal", label: "Search Ref / Survey / Vessel / Provider", type: "text" },
  { name: "vessel", label: "Vessel", type: "select", options: vesselOptions },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Scheduled", label: "Scheduled" },
      { value: "Open", label: "Open" },
      { value: "Overdue", label: "Overdue" },
      { value: "Pending Approval", label: "Pending Approval" },
      { value: "Completed", label: "Completed" },
    ],
  },
];



