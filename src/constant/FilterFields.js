// Transaction Filter Fields
export const transactionFilterFields = [
  { name: "searchVal", label: "Search", type: "text" },
  { name: "plan", label: "Plan", type: "text" },
  { name: "transactionId", label: "Transaction ID", type: "text" },
];

// Referral Filter Fields
export const referralFilterFields = [
  { name: "searchVal", label: "Search", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
];

// Course Filter Fields
export const courseFilterFields = [
  { name: "title", label: "Title", type: "text" },
  { name: "category", label: "Category", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
  { name: "duration", label: "Duration", type: "text" },
  { name: "created", label: "Created", type: "date" },
];

// Subscription Filter Fields
export const subscriptionFilterFields = [
  { name: "plan", label: "Plan", type: "text" },
  {
    name: "categoryId",
    label: "Category",
    type: "select",
    options: [],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
];

// Employee Referral Filter Fields
export const employeeReferralFilterFields = [
  { name: 'searchVal', label: 'Search', type: 'text' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'all', label: 'All' },
      { value: 'activeEmployee', label: 'Active' },
      { value: 'inactiveEmployee', label: 'Inactive' },
    ],
  },
];

