// ─────────────────────────────────────────────────────────────
// Shared building blocks (not exported — internal use only)
// ─────────────────────────────────────────────────────────────
const COMMON_UI = {
  CONFIRM_DEACTIVATE_TITLE: "Confirm Deactivation",
  CONFIRM_ACTIVATE_TITLE: "Confirm Activation",
  BTN_DEACTIVATE: "Deactivate",
  BTN_ACTIVATE: "Activate",
  BTN_CANCEL: "Cancel",
};

/**
 * Spreads the four shared activate/deactivate confirm fields into any entity block.
 * Accepts additional overrides / entity-specific fields via `extras`.
 */
const withToggleConfirm = (extras = {}) => ({
  CONFIRM_DEACTIVATE_TITLE: COMMON_UI.CONFIRM_DEACTIVATE_TITLE,
  CONFIRM_ACTIVATE_TITLE: COMMON_UI.CONFIRM_ACTIVATE_TITLE,
  CONFIRM_DEACTIVATE_BTN: COMMON_UI.BTN_DEACTIVATE,
  CONFIRM_ACTIVATE_BTN: COMMON_UI.BTN_ACTIVATE,
  ...extras,
});

// ─────────────────────────────────────────────────────────────
// Main UI text constant — one entry per page / feature area
// ─────────────────────────────────────────────────────────────
export const UI_TEXT = {
  COMMON: {
    ...COMMON_UI,

    // Table strings
    TABLE: {
      ROWS_PER_PAGE: "Rows per page",
      NO_DATA_TITLE: "No data found",
      NO_DATA_SUBTITLE: "There are no records to display at the moment.",
      SHOWING: (from, to, count) => `Showing ${from}–${to} of ${count}`,
    },

    // Action-button dropdown labels
    TABLE_ACTIONS: {
      VIEW: "View Details",
      EDIT: "Edit",
      DELETE: "Delete",
      REPLY: "Reply",
      REVIEW: "Review",
      MARK_INACTIVE: "Mark as Inactive",
      MARK_ACTIVE: "Mark as Active",
    },

    // Generic form labels
    FORM: {
      SUBMITTING: "Saving...",
      CLOSE: "Close",
      CANCEL: "Cancel",
    },
  },

  DASHBOARD: {
    TITLE: "Dashboard",
    SUBTITLE: "Overview of your organization's performance metrics",
  },

  AUDIT_LOGS: {
    TITLE: "Audit Logs",
    SUBTITLE: "Track system activities, security events, and user actions.",
    BTN_EXPORT: "Export Excel",
    BTN_EXPORTING: "Exporting...",
    BTN_RESET: "Reset Logs",
    BTN_RESETTING: "Resetting...",
    CONFIRM_TITLE: "Clear All Audit Logs",
    CONFIRM_CONTENT:
      "Are you sure you want to clear all audit logs? This action is permanent and cannot be undone.",
    CONFIRM_YES: "Yes, Clear Logs",
    CONFIRM_NO: COMMON_UI.BTN_CANCEL,
  },

  MEMBERSHIPS: withToggleConfirm({
    TITLE: "Subscription Plans",
    SUBTITLE: "Manage your organization's subscription plans and pricing",
    BTN_ADD: "Add New Plan",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this subscription plan?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this subscription plan?",
  }),

  MCQS: withToggleConfirm({
    TITLE: "MCQs",
    SUBTITLE: "Manage multiple choice questions",
    BTN_ADD: "Add MCQ",
    BTN_ADD_BULK: "Add Bulk MCQ's",
    CONFIRM_DEACTIVATE_CONTENT: "Are you sure you want to deactivate this MCQ?",
    CONFIRM_ACTIVATE_CONTENT: "Are you sure you want to activate this MCQ?",
  }),

  CATEGORIES: withToggleConfirm({
    TITLE_CATEGORIES: "Categories",
    TITLE_COURSES: "Courses",
    SUBTITLE_CATEGORIES: "Manage categories",
    SUBTITLE_COURSES: "Manage courses",
    BTN_ADD: (entityName) => `Add ${entityName}`,
    CONFIRM_DEACTIVATE_CONTENT_CAT:
      "Are you sure you want to deactivate this category?",
    CONFIRM_DEACTIVATE_CONTENT_COURSE:
      "Are you sure you want to deactivate this course?",
    CONFIRM_ACTIVATE_CONTENT_CAT:
      "Are you sure you want to activate this category?",
    CONFIRM_ACTIVATE_CONTENT_COURSE:
      "Are you sure you want to activate this course?",
  }),

  ADMINS: withToggleConfirm({
    TITLE: "Admin Management",
    SUBTITLE:
      "Manage your organization's administrators and their permissions",
    BTN_ADD: "Add New Admin",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this admin?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this admin?",
  }),

  CHEATSHEETS: withToggleConfirm({
    TITLE: "Cheatsheets",
    SUBTITLE: "Manage coding cheatsheets and resources",
    BTN_ADD: "Add Cheatsheet",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this cheatsheet?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this cheatsheet?",
  }),

  COUPONS: withToggleConfirm({
    TITLE: "Coupon Management",
    SUBTITLE: "Manage your organization's coupons",
    BTN_ADD: "Add New Coupon",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this coupon?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this coupon?",
  }),

  COURSE_VIDEOS: withToggleConfirm({
    TITLE_TOPICS: "Topics",
    TITLE_VIDEOS: "Videos",
    SUBTITLE_TOPICS: "Manage topics",
    SUBTITLE_VIDEOS: "Manage videos",
    BTN_ADD: (entityName) => `Add ${entityName}`,
    CONFIRM_DEACTIVATE_CONTENT_TOPIC:
      "Are you sure you want to deactivate this topic?",
    CONFIRM_DEACTIVATE_CONTENT_VIDEO:
      "Are you sure you want to deactivate this video?",
    CONFIRM_ACTIVATE_CONTENT_TOPIC:
      "Are you sure you want to activate this topic?",
    CONFIRM_ACTIVATE_CONTENT_VIDEO:
      "Are you sure you want to activate this video?",
  }),

  EMPLOYEES: withToggleConfirm({
    TITLE: "Employee Referral Management",
    SUBTITLE:
      "Track employee referral performance, statuses, and generated income",
    CONFIRM_DEACTIVATE_CONTENT: (name) =>
      `Are you sure you want to deactivate ${name}'s referral access?`,
    CONFIRM_ACTIVATE_CONTENT: (name) =>
      `Are you sure you want to activate ${name}'s referral access?`,
  }),

  FAQS: withToggleConfirm({
    TITLE: "FAQs",
    SUBTITLE: "Manage Frequently Asked Questions",
    BTN_ADD: "Add FAQ",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this FAQ?",
    CONFIRM_ACTIVATE_CONTENT: "Are you sure you want to activate this FAQ?",
  }),

  LEADS: {
    TITLE: "Leads Management",
    SUBTITLE:
      "Track, qualify, and convert potential customers interested in business listings",
    BTN_ADD: "Add New Lead",
  },

  LEGAL_PAGES: withToggleConfirm({
    TITLE: "Legal Pages",
    SUBTITLE: "Manage terms and conditions, privacy policy, etc.",
    BTN_ADD: "Add Page",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this legal page?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this legal page?",
  }),

  MY_REFERRALS: {
    TITLE: "My Referrals",
    SUBTITLE:
      "Track your personal referral performance, statuses, and generated income.",
    BTN_ADD: "Onboard Student",
    MODAL_TITLE: "Invite a Student",
  },

  PROFILE: {
    TITLE: "Admin Profile",
    SUBTITLE:
      "Manage your profile settings and view your administrative details",
  },

  PROJECTS: withToggleConfirm({
    TITLE: "Projects",
    SUBTITLE: "Manage available projects",
    BTN_ADD: "Add Project",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this project?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this project?",
  }),

  COMPANIES: withToggleConfirm({
    TITLE: "Company Management",
    SUBTITLE: "Manage your organization's companies and their status",
    BTN_ADD: "Add New Company",
    DELETE_TITLE: "Delete Company",
    DELETE_CONTENT: (companyName) =>
      `Are you sure you want to delete ${
        companyName || "this company"
      }? This action cannot be undone.`,
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this company?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this company?",
  }),

  JOBS: withToggleConfirm({
    TITLE: "Job Post Management",
    SUBTITLE: "Manage your organization's job postings and their status",
    BTN_ADD: "Add New Job Post",
    DELETE_TITLE: "Delete Job Post",
    DELETE_CONTENT: (company) =>
      `Are you sure you want to delete the job post from ${company}?`,
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this job post?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this job post?",
  }),

  RESUME_BUILDER: withToggleConfirm({
    TITLE: "Resume Builder",
    SUBTITLE: "Manage resume templates",
    BTN_ADD: "Add Resume Template",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this resume template?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this resume template?",
  }),

  ROLES: withToggleConfirm({
    TITLE: "Roles & Permissions",
    SUBTITLE: "Manage access levels and permissions for administrators",
    BTN_ADD: "Create Custom Role",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this role?",
    CONFIRM_ACTIVATE_CONTENT: "Are you sure you want to activate this role?",
    CONFIRM_DELETE_TITLE: "Delete Role",
    CONFIRM_RESTORE_TITLE: "Restore Role",
    CONFIRM_DELETE_CONTENT:
      "Are you sure you want to delete this role? This action will deactivate the role.",
    CONFIRM_RESTORE_CONTENT:
      "Are you sure you want to restore this role? This action will reactivate the role.",
    CONFIRM_DELETE_BTN: "Delete",
    CONFIRM_RESTORE_BTN: "Restore",
  }),

  SETTINGS: {
    TITLE: "Admin Settings",
    SUBTITLE: "Manage your account preferences and system configuration",
  },

  TRANSACTIONS: {
    TITLE: "Transaction Management",
    SUBTITLE:
      "Manage your organization's transactions and payment history",
  },

  USERS: withToggleConfirm({
    TITLE: "User Management",
    SUBTITLE: "Manage your organization's users and their information",
    BTN_ADD: "Add User",
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this user?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this user?",
  }),

  REFERRALS: {
    TITLE: "Referral Management",
    SUBTITLE:
      "Manage your organization's referral program and track user performance",
  },

  STUDENT_SUBMISSIONS: {
    TITLE: "Student Submissions",
    SUBTITLE: "Review and grade student project submissions",
  },

  UPDATES: withToggleConfirm({
    TITLE: "Updates",
    SUBTITLE: "Manage latest updates and upcoming features",
    BTN_ADD: (entityName) => `Add ${entityName}`,
    CONFIRM_DEACTIVATE_CONTENT:
      "Are you sure you want to deactivate this update?",
    CONFIRM_ACTIVATE_CONTENT:
      "Are you sure you want to activate this update?",
  }),

  USER_QUERY: {
    TITLE: "User Query Center",
    SUBTITLE: "Manage user comments and inquiries",
  },

  SESSION: {
    TITLE: "Session Expiring!",
    CONTENT_PREFIX:
      "Your session has been inactive for a while. You will be automatically logged out in ",
    CONTENT_SUFFIX: " seconds.",
    BTN_LOGOUT: "Log Out",
    BTN_CONTINUE: "Continue Session",
  },

  AUTH: {
    LOGIN: {
      TITLE: "Admin Login",
      BTN_SUBMIT: "Sign In",
      SECURITY_FEATURES: "Security Features",
      LINK_FORGOT_PASSWORD: "Forgot Password?",
      LINK_CONTACT_ADMIN: "Contact UV Admin for help.",
    },
    FORGOT_PASSWORD: {
      TITLE: "Forgot Password",
      INSTRUCTION:
        "Please enter your registered email address to receive a password reset link.",
      BTN_SUBMIT: "Send Reset Link",
      LINK_BACK_TO_SIGN_IN: "Back to Sign In",
    },
    RESET_PASSWORD: {
      TITLE: "Reset Password",
      INSTRUCTION_GREETING: (name) =>
        `Hi ${name}, please enter your new password.`,
      INSTRUCTION_DEFAULT: "Please enter your new password.",
      BTN_SUBMIT: "Reset Password",
      SUCCESS_TITLE: "Password Reset Successfully!",
      SUCCESS_CONTENT: "You can now log in with your new password.",
      BTN_GO_TO_LOGIN: "Go to Login",
    },
    SET_PASSWORD: {
      TITLE: "Create New Password",
      INSTRUCTION: (name) => `Hi ${name}, please create your new password.`,
      BTN_SUBMIT: "Create Password",
      SUCCESS_TITLE: "Password Created Successfully!",
      SUCCESS_CONTENT: "You can now log in with your new password.",
    },
    CONTACT_ADMIN: {
      TITLE: "Support & Contact",
      INSTRUCTION:
        "Please contact the UV Admin to resolve access issues. Share your username and error details for assistance.",
      BTN_SEND_SUPPORT_EMAIL: "Send Support Email",
      LINK_BACK_TO_SIGN_IN: "Back to Sign In",
    },
  },

  DISCUSSIONS: {
    TITLE: "Discussions",
    SUBTITLE: "Here you can discuss with other students",
    SIDEBAR_TITLE: "Topics",
    LABEL_QUESTION: "Question",
    BTN_SHOW_LESS: "Show Less",
    BTN_READ_MORE: "Read More",
    MSG_CLOSED: (status) =>
      `This discussion is ${status}. You can no longer reply to this topic.`,
    MSG_NO_PERMISSION: "You do not have permission to send messages.",
    EMPTY_TITLE: "Select a discussion to view details",
    EMPTY_SUBTITLE: "Choose a topic from the list to join the conversation.",
  },

  WORKSHOPS: withToggleConfirm({
    TITLE_WORKSHOPS: "Workshops",
    TITLE_REGISTRATIONS: "Registered Students",
    SUBTITLE_WORKSHOPS: "Manage online workshops and schedules",
    SUBTITLE_REGISTRATIONS: "Manage student registrations and attendance",
    BTN_ADD: (entityName) => `Add ${entityName}`,
    CONFIRM_DEACTIVATE_CONTENT_WORKSHOP:
      "Are you sure you want to deactivate this workshop?",
    CONFIRM_ACTIVATE_CONTENT_WORKSHOP:
      "Are you sure you want to activate this workshop?",
    CONFIRM_DEACTIVATE_CONTENT_REGISTRATION:
      "Are you sure you want to cancel this registration?",
    CONFIRM_ACTIVATE_CONTENT_REGISTRATION:
      "Are you sure you want to restore this registration?",
  }),
};
