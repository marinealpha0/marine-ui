// src/auth/permissionDescriptions.js

export const PERMISSION_DESCRIPTIONS = {
  // Dashboard
  UV_DASHBOARD: {
    title: "Access Dashboard",
    sentence: "Access the main administration dashboard and view system stats.",
    category: "Dashboard"
  },
  VIEW_DASHBOARD: {
    title: "View Dashboard Stats",
    sentence: "View standard metrics, charts, and summary statistics.",
    category: "Dashboard"
  },
  UV_DASHBOARD_USERS: {
    title: "View Dashboard Users Widget",
    sentence: "View student registration metrics and demographics on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_LEADS: {
    title: "View Dashboard Leads Widget",
    sentence: "View leads pipeline and leads conversion funnel statistics on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_FINANCE: {
    title: "View Dashboard Finance Widget",
    sentence: "View monthly revenue and recent financial transactions on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_JOB_POSTINGS: {
    title: "View Dashboard Job Postings Widget",
    sentence: "View active job postings and recruiter activity stats on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_QUERY: {
    title: "View Dashboard Query Widget",
    sentence: "View support tickets and pending user queries on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_AUDIT: {
    title: "View Dashboard Audit Logs Widget",
    sentence: "View recent system activity and audit log feeds on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_SUBMISSIONS: {
    title: "View Dashboard Submissions Widget",
    sentence: "View student project submission overviews on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_DISCUSSIONS: {
    title: "View Dashboard Discussions Widget",
    sentence: "View recent community discussions and forum posts on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_EMPLOYEE_REFERRALS: {
    title: "View Dashboard Top Referrals Widget",
    sentence: "View overall top employee referral listings on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_MY_REFERRALS: {
    title: "View Dashboard My Referrals Widget",
    sentence: "View personal referral program indicators on the dashboard.",
    category: "Dashboard"
  },
  UV_DASHBOARD_WEB_TRAFFIC: {
    title: "Access Dashboard Web Traffic",
    sentence: "Access traffic diagnostics, analytics widgets, Google Cloud error reporting, and visitor technology logs.",
    category: "Dashboard"
  },

  // User Management
  UV_USER_MANAGEMENT: {
    title: "Access User Management",
    sentence: "Access modules under the User Management workspace.",
    category: "User Management"
  },
  UV_USERS_LIST: {
    title: "View Users List",
    sentence: "Browse, filter, and view the list of registered platform users.",
    category: "User Management"
  },
  VIEW_USER_DETAILS: {
    title: "View User Details",
    sentence: "View detailed profiles, contact info, and actions of specific users.",
    category: "User Management"
  },
  EDIT_USER_DETAILS: {
    title: "Edit User Details",
    sentence: "Update profile data, restrict accounts, or modify details of users.",
    category: "User Management"
  },
  UV_REFERRALS_LIST: {
    title: "View Referrals List",
    sentence: "Browse referral program logs and user-to-user referral registrations.",
    category: "User Management"
  },
  VIEW_REFERRAL_DETAILS: {
    title: "View Referral Details",
    sentence: "View specific details, paths, and amounts for referrals.",
    category: "User Management"
  },
  ONBOARD_STUDENT: {
    title: "Onboard Student",
    sentence: "Invite or onboard new students through referral codes.",
    category: "User Management"
  },
  UV_MY_REFERRALS: {
    title: "My Referrals Page",
    sentence: "Access personal referral program, metrics, and generated income.",
    category: "User Management"
  },
  UV_MEMBERSHIP_USERS: {
    title: "Membership Users list",
    sentence: "Access and manage lists of premium subscribed membership users.",
    category: "User Management"
  },
  UV_EMPLOYEE_REFERRALS: {
    title: "Employee Referrals workspace",
    sentence: "Oversight and manage referral accounts of employee program logs.",
    category: "User Management"
  },
  VIEW_EMPLOYEE_REFERRAL_DETAILS: {
    title: "View Employee Referral Details",
    sentence: "Inspect detailed logs of specific employee referral earnings and claims.",
    category: "User Management"
  },
  EDIT_EMPLOYEE_REFERRAL_DETAILS: {
    title: "Edit Employee Referral Details",
    sentence: "Modify referral statuses, update rewards, or edit employee claims.",
    category: "User Management"
  },

  // Admin Management
  UV_SYSTEM_ADMINISTRATION: {
    title: "System Administration workspace",
    sentence: "Access root-level configurations and system administration tools.",
    category: "Admin Management"
  },
  UV_ADMINS_LIST: {
    title: "View Admins List",
    sentence: "Browse the list of all registered administrators and their roles.",
    category: "Admin Management"
  },
  CREATE_ADMIN: {
    title: "Create Admin",
    sentence: "Register new admin accounts, defining their details and profiles.",
    category: "Admin Management"
  },
  RESEND_ADMIN_INVITE: {
    title: "Resend Admin Invite",
    sentence: "Resend the invitation link to platform admins who have not completed setup.",
    category: "Admin Management"
  },
  RESET_ADMIN_SESSION: {
    title: "Reset Admin Session",
    sentence: "Clear active login sessions for platform admins.",
    category: "Admin Management"
  },
  VIEW_ADMIN_DETAILS: {
    title: "View Admin Details",
    sentence: "Access personal metadata and status information of platform admins.",
    category: "Admin Management"
  },
  EDIT_ADMIN_DETAILS: {
    title: "Edit Admin Details",
    sentence: "Update contact details, departments, or statuses of admins.",
    category: "Admin Management"
  },
  DELETE_ADMIN_DETAILS: {
    title: "Delete Admin Details",
    sentence: "Deactivate or delete admin accounts from the active system.",
    category: "Admin Management"
  },
  RESTORE_ADMIN_DETAILS: {
    title: "Restore Admin Details",
    sentence: "Restore or reactivate deleted or suspended admin accounts.",
    category: "Admin Management"
  },
  UV_ROLES_AND_PERMISSIONS: {
    title: "Roles & Permissions workspace",
    sentence: "Access role definitions and security control maps.",
    category: "Admin Management"
  },
  CREATE_ROLE: {
    title: "Create Role",
    sentence: "Define new custom administrative roles on the system.",
    category: "Admin Management"
  },
  VIEW_ROLES: {
    title: "View Roles",
    sentence: "Inspect existing roles and check what permissions they have.",
    category: "Admin Management"
  },
  EDIT_ROLES_AND_PERMISSIONS: {
    title: "Edit Roles & Permissions",
    sentence: "Modify existing roles or change their permission mapping.",
    category: "Admin Management"
  },
  DELETE_ROLES_AND_PERMISSIONS: {
    title: "Delete Roles & Permissions",
    sentence: "Delete defined roles and security rules from the workspace.",
    category: "Admin Management"
  },

  // Audit Logs
  UV_AUDIT_LOGS: {
    title: "Access Audit Logs",
    sentence: "Access the system audit trails and action histories.",
    category: "Audit Logs"
  },
  VIEW_AUDIT_LOGS: {
    title: "View Audit Logs",
    sentence: "Review detailed action records, timestamps, and who performed changes.",
    category: "Audit Logs"
  },
  RESET_AUDIT_LOGS: {
    title: "Reset Audit Logs",
    sentence: "Clear and reset the system audit log database history.",
    category: "Audit Logs"
  },
  EXPORT_AUDIT_LOGS: {
    title: "Export Audit Logs",
    sentence: "Export and download the system audit logs as an spreadsheet/file.",
    category: "Audit Logs"
  },

  // Recruitment
  UV_RECRUITMENT_MANAGEMENT: {
    title: "Access Recruitment Management",
    sentence: "Access the recruitment portal settings and tracking indicators.",
    category: "Recruitment"
  },
  UV_RECRUITMENT_COMPANIES: {
    title: "Company Management workspace",
    sentence: "Access registry profiles and jobs associated with hiring companies.",
    category: "Recruitment"
  },
  CREATE_COMPANY: {
    title: "Create Company Profile",
    sentence: "Register new hiring companies with descriptions and contact links.",
    category: "Recruitment"
  },
  VIEW_COMPANY_DETAILS: {
    title: "View Company Details",
    sentence: "Inspect comprehensive profiles, location, contact, and active jobs for a company.",
    category: "Recruitment"
  },
  EDIT_COMPANY_DETAILS: {
    title: "Edit Company Details",
    sentence: "Modify company info, logos, tags, or recruiter associations.",
    category: "Recruitment"
  },
  DELETE_COMPANY_DETAILS: {
    title: "Delete Company Profile",
    sentence: "Deactivate or remove company accounts from active listings.",
    category: "Recruitment"
  },
  RESTORE_COMPANY_DETAILS: {
    title: "Restore Company Profile",
    sentence: "Restore previously deactivated company profiles.",
    category: "Recruitment"
  },
  UV_RECRUITMENT_JOB_POSTINGS: {
    title: "Job Postings workspace",
    sentence: "Access active, draft, or expired job postings.",
    category: "Recruitment"
  },
  CREATE_JOB_POSTING: {
    title: "Create Job Posting",
    sentence: "Publish new job opportunities, specifying requirements, salaries, and details.",
    category: "Recruitment"
  },
  VIEW_JOB_DETAILS: {
    title: "View Job Details",
    sentence: "Inspect applicant metrics and specific job requirements.",
    category: "Recruitment"
  },
  EDIT_JOB_DETAILS: {
    title: "Edit Job Details",
    sentence: "Modify requirements, tags, locations, descriptions, or status of job posts.",
    category: "Recruitment"
  },
  DELETE_JOB_DETAILS: {
    title: "Delete Job Postings",
    sentence: "Archive or delete job advertisements from the public lists.",
    category: "Recruitment"
  },
  RESTORE_JOB_DETAILS: {
    title: "Restore Job Postings",
    sentence: "Re-publish archived or deleted job advertisements.",
    category: "Recruitment"
  },
  UV_RECRUITMENT_CANDIDATES: {
    title: "Candidates List workspace",
    sentence: "Access candidate directories, job applications, and student profiles.",
    category: "Recruitment"
  },
  VIEW_CANDIDATES: {
    title: "View Candidate Profile",
    sentence: "Inspect candidate resumes, cover letters, and application steps.",
    category: "Recruitment"
  },
  UV_RECRUITMENT_RECRUITERS: {
    title: "Recruiters List workspace",
    sentence: "Access profiles of active recruiters and agency admins.",
    category: "Recruitment"
  },
  VIEW_RECRUITER: {
    title: "View Recruiter Details",
    sentence: "Inspect active recruiters, associated agencies, and contact details.",
    category: "Recruitment"
  },

  // Communication Center
  UV_COMMUNICATION_CENTER: {
    title: "Access Communication Center",
    sentence: "Access message boards, feedback forms, and customer support desks.",
    category: "Communication Center"
  },
  UV_QUERY_CENTER: {
    title: "Query Center workspace",
    sentence: "Access pending user queries, support requests, and comment trails.",
    category: "Communication Center"
  },
  VIEW_QUERY_CENTER: {
    title: "View Query Center",
    sentence: "Read support tickets, bug reports, or customer questions.",
    category: "Communication Center"
  },
  REPLY_QUERY: {
    title: "Reply to Queries",
    sentence: "Respond to customer support tickets and user inquiries directly.",
    category: "Communication Center"
  },
  UV_FEEDBACK: {
    title: "Feedback workspace",
    sentence: "Oversight and collect feedback from students, courses, or events.",
    category: "Communication Center"
  },
  UV_DISCUSSIONS: {
    title: "Discussions workspace",
    sentence: "Access chat rooms, class forums, and private discussions.",
    category: "Communication Center"
  },
  VIEW_DISCUSSIONS: {
    title: "View Discussions",
    sentence: "Monitor active public posts, chats, and comments.",
    category: "Communication Center"
  },
  SEND_MESSAGE: {
    title: "Send Discussion Messages",
    sentence: "Send general messages, warnings, or responses in discussions.",
    category: "Communication Center"
  },
  UV_FAQS: {
    title: "FAQs workspace",
    sentence: "Access support help documentation and articles.",
    category: "Communication Center"
  },
  CREATE_FAQ: {
    title: "Create FAQ",
    sentence: "Write and publish new questions and answers in the Help Center.",
    category: "Communication Center"
  },
  VIEW_FAQ_DETAILS: {
    title: "View FAQ Details",
    sentence: "Preview published and draft FAQ articles.",
    category: "Communication Center"
  },
  EDIT_FAQ_DETAILS: {
    title: "Edit FAQ Details",
    sentence: "Modify question titles, formatting, tags, or content of FAQ articles.",
    category: "Communication Center"
  },
  DELETE_FAQ_DETAILS: {
    title: "Delete FAQ Details",
    sentence: "Remove FAQ articles from public view.",
    category: "Communication Center"
  },
  RESTORE_FAQ_DETAILS: {
    title: "Restore FAQ Details",
    sentence: "Restore previously archived or deleted FAQ articles.",
    category: "Communication Center"
  },
  UV_OUTREACH: {
    title: "Outreach workspace",
    sentence: "Access student outreach programs and ambassador modules.",
    category: "Communication Center"
  },
  UV_STUDENT_SUBMISSIONS: {
    title: "Student Submissions workspace",
    sentence: "Access submitted assignments and projects from students.",
    category: "Communication Center"
  },
  VIEW_SUBMISSION_DETAILS: {
    title: "View Student Submissions",
    sentence: "Inspect uploaded assets, links, and text of student submissions.",
    category: "Communication Center"
  },
  REVIEW_SUBMISSION: {
    title: "Review Student Submissions",
    sentence: "Approve, reject, grade, or add review comments to student submissions.",
    category: "Communication Center"
  },
  UV_LATEST_UPDATES_AND_UPCOMING_FEATURES: {
    title: "Latest Updates workspace",
    sentence: "Access what's new panels, roadmaps, and announcement features.",
    category: "Communication Center"
  },
  VIEW_LATEST_UPDATES_AND_UPCOMING_FEATURES: {
    title: "View Latest Updates",
    sentence: "Browse upcoming features lists and published system updates.",
    category: "Communication Center"
  },
  CREATE_LATEST_UPDATES_AND_UPCOMING_FEATURES: {
    title: "Create System Announcement",
    sentence: "Draft and publish new system feature announcements.",
    category: "Communication Center"
  },
  EDIT_LATEST_UPDATES_AND_UPCOMING_FEATURES: {
    title: "Edit System Announcement",
    sentence: "Modify graphics, roadmap targets, or text of announcements.",
    category: "Communication Center"
  },
  DELETE_LATEST_UPDATES_AND_UPCOMING_FEATURES: {
    title: "Delete System Announcement",
    sentence: "Deactivate or delete feature announcements from public view.",
    category: "Communication Center"
  },
  RESTORE_LATEST_UPDATES_AND_UPCOMING_FEATURES: {
    title: "Restore System Announcement",
    sentence: "Restore deleted roadmap schedules or announcements.",
    category: "Communication Center"
  },

  // Learning Management
  UV_LEARNING_MANAGEMENT: {
    title: "Access Learning Management",
    sentence: "Access modules under the Learning Management suite.",
    category: "Learning Management"
  },
  UV_MCQ_MANAGEMENT: {
    title: "MCQ Management workspace",
    sentence: "Access test question banks and multiple choice quiz files.",
    category: "Learning Management"
  },
  CREATE_MCQ: {
    title: "Create MCQ Questions",
    sentence: "Add new test questions with answer keys and explanations.",
    category: "Learning Management"
  },
  VIEW_MCQ_DETAILS: {
    title: "View MCQ Details",
    sentence: "Inspect correct selections, metrics, and tags for quiz questions.",
    category: "Learning Management"
  },
  EDIT_MCQ_DETAILS: {
    title: "Edit MCQ Questions",
    sentence: "Update questions, options, difficulty tags, or explanations.",
    category: "Learning Management"
  },
  DELETE_MCQ_DETAILS: {
    title: "Delete MCQ Questions",
    sentence: "Remove test questions from active practice files.",
    category: "Learning Management"
  },
  RESTORE_MCQ_DETAILS: {
    title: "Restore MCQ Questions",
    sentence: "Restore questions that were deleted from practice files.",
    category: "Learning Management"
  },
  UV_CHEATSHEET_LIBRARY: {
    title: "Cheat Sheet workspace",
    sentence: "Access guides, code snippets, and cheat sheets database.",
    category: "Learning Management"
  },
  CREATE_CHEATSHEET: {
    title: "Create Cheat Sheet",
    sentence: "Upload or code new quick reference guides for students.",
    category: "Learning Management"
  },
  VIEW_CHEATSHEET_DETAILS: {
    title: "View Cheat Sheet Details",
    sentence: "Inspect guides, markdown layouts, or PDF documents of cheat sheets.",
    category: "Learning Management"
  },
  EDIT_CHEATSHEET_DETAILS: {
    title: "Edit Cheat Sheet Details",
    sentence: "Modify layout formats, titles, description, or code contents of cheat sheets.",
    category: "Learning Management"
  },
  DELETE_CHEATSHEET_DETAILS: {
    title: "Delete Cheat Sheet Details",
    sentence: "Remove cheat sheets from the student portal database.",
    category: "Learning Management"
  },
  RESTORE_CHEATSHEET_DETAILS: {
    title: "Restore Cheat Sheet Details",
    sentence: "Re-enable deleted cheat sheets back into the library.",
    category: "Learning Management"
  },
  UV_COURSE_CATEGORIES: {
    title: "Course Categories workspace",
    sentence: "Access classifications and catalog fields for courses.",
    category: "Learning Management"
  },
  CREATE_COURSE_CATEGORY: {
    title: "Create Course Category",
    sentence: "Add new subject groups or tags to structure courses.",
    category: "Learning Management"
  },
  VIEW_COURSE_CATEGORY_DETAILS: {
    title: "View Course Category Details",
    sentence: "Inspect parameters, descriptions, and linked course metrics.",
    category: "Learning Management"
  },
  EDIT_COURSE_CATEGORY_DETAILS: {
    title: "Edit Course Category",
    sentence: "Rename categories, edit parent groupings, or change descriptions.",
    category: "Learning Management"
  },
  DELETE_COURSE_CATEGORY_DETAILS: {
    title: "Delete Course Category",
    sentence: "Delete categorization labels from the course builder.",
    category: "Learning Management"
  },
  RESTORE_COURSE_CATEGORY_DETAILS: {
    title: "Restore Course Category",
    sentence: "Re-enable deleted subject groupings.",
    category: "Learning Management"
  },
  UV_COURSE_LIBRARY: {
    title: "Course Library workspace",
    sentence: "Access core courses database, chapters, and curriculum files.",
    category: "Learning Management"
  },
  CREATE_COURSE: {
    title: "Create Course",
    sentence: "Publish new courses, draft modules, or set course requirements.",
    category: "Learning Management"
  },
  VIEW_COURSE_DETAILS: {
    title: "View Course Details",
    sentence: "Inspect lesson files, instructor profiles, and enrollment metrics.",
    category: "Learning Management"
  },
  EDIT_COURSE_DETAILS: {
    title: "Edit Course Details",
    sentence: "Modify syllabus contents, video descriptions, or course settings.",
    category: "Learning Management"
  },
  DELETE_COURSE_DETAILS: {
    title: "Delete Course Details",
    sentence: "Remove courses from active enrollment libraries.",
    category: "Learning Management"
  },
  RESTORE_COURSE_DETAILS: {
    title: "Restore Course Details",
    sentence: "Restore archived or deleted course modules.",
    category: "Learning Management"
  },
  UV_RESUME_BUILDER: {
    title: "Resume Builder workspace",
    sentence: "Access resume template databases and styling tools.",
    category: "Learning Management"
  },
  CREATE_RESUME_BUILDER: {
    title: "Create Resume Template",
    sentence: "Design and code new interactive resume builder templates.",
    category: "Learning Management"
  },
  VIEW_RESUME_BUILDER: {
    title: "View Resume Settings",
    sentence: "Browse student usage data and preview resume builder forms.",
    category: "Learning Management"
  },
  EDIT_RESUME_BUILDER: {
    title: "Edit Resume Template",
    sentence: "Modify input templates, formats, or structure rules.",
    category: "Learning Management"
  },
  DELETE_RESUME_BUILDER: {
    title: "Delete Resume Settings",
    sentence: "Archive specific resume builder forms or tools.",
    category: "Learning Management"
  },
  RESTORE_RESUME_BUILDER: {
    title: "Restore Resume Settings",
    sentence: "Re-enable disabled resume templates.",
    category: "Learning Management"
  },
  UV_PROJECT_DETAILS: {
    title: "Project Library workspace",
    sentence: "Access student coding projects, assignments, and test files.",
    category: "Learning Management"
  },
  CREATE_PROJECT: {
    title: "Create Student Project",
    sentence: "Publish new guides, starter code repositories, and requirements for projects.",
    category: "Learning Management"
  },
  VIEW_PROJECT_DETAILS: {
    title: "View Project Details",
    sentence: "Inspect step-by-step instructions, hints, and setup guides.",
    category: "Learning Management"
  },
  EDIT_PROJECT_DETAILS: {
    title: "Edit Project Details",
    sentence: "Update guides, repository URLs, tests, or project specs.",
    category: "Learning Management"
  },
  DELETE_PROJECT_DETAILS: {
    title: "Delete Project Details",
    sentence: "Remove student projects from the course dashboard.",
    category: "Learning Management"
  },
  RESTORE_PROJECT_DETAILS: {
    title: "Restore Project Details",
    sentence: "Restore deleted project guides.",
    category: "Learning Management"
  },
  UV_WORKSHOPS: {
    title: "Access Workshops Workspace",
    sentence: "Access the online workshops scheduling and registrations manager.",
    category: "Learning Management"
  },
  CREATE_WORKSHOP: {
    title: "Create Workshop",
    sentence: "Schedule a new online workshop and configure details, platform info, and pricing.",
    category: "Learning Management"
  },
  VIEW_WORKSHOP_DETAILS: {
    title: "View Workshop Details",
    sentence: "View detailed workshop content, joining links, instructor profiles, and schedules.",
    category: "Learning Management"
  },
  EDIT_WORKSHOP_DETAILS: {
    title: "Edit Workshop Details",
    sentence: "Modify online workshop details, update platform links, or edit schedules.",
    category: "Learning Management"
  },
  DELETE_WORKSHOP: {
    title: "Delete Workshop",
    sentence: "Deactivate or remove scheduled online workshops.",
    category: "Learning Management"
  },

  // Billing & Subscriptions
  UV_BILLING_SUBSCRIPTIONS: {
    title: "Access Billing & Subscriptions",
    sentence: "Access settings under the Billing, Subscriptions, and Checkout workspace.",
    category: "Billing & Subscriptions"
  },
  UV_DISCOUNT_COUPONS: {
    title: "Discount Coupons workspace",
    sentence: "Access and view the discount codes repository.",
    category: "Billing & Subscriptions"
  },
  CREATE_COUPON: {
    title: "Create Coupon",
    sentence: "Generate new discount codes, setting limits and value rates.",
    category: "Billing & Subscriptions"
  },
  VIEW_COUPONS: {
    title: "View Coupons",
    sentence: "Check coupons list, usage totals, and expiration guidelines.",
    category: "Billing & Subscriptions"
  },
  EDIT_COUPONS: {
    title: "Edit Coupon",
    sentence: "Modify coupon values, expiration dates, or applicability rules.",
    category: "Billing & Subscriptions"
  },
  DELETE_COUPONS: {
    title: "Delete Coupon",
    sentence: "Suspend active discount codes or deactivate promo codes.",
    category: "Billing & Subscriptions"
  },
  RESTORE_COUPONS: {
    title: "Restore Coupon",
    sentence: "Restore deleted or expired promotional codes.",
    category: "Billing & Subscriptions"
  },
  UV_PAYMENT_TRANSACTIONS: {
    title: "Access Transactions History",
    sentence: "View payment history, course checkouts, and refund statuses.",
    category: "Billing & Subscriptions"
  },
  UV_MEMBERSHIP_PLANS: {
    title: "Membership Plans workspace",
    sentence: "Access course membership plans database.",
    category: "Billing & Subscriptions"
  },
  CREATE_MEMBERSHIP_PLAN: {
    title: "Create Membership Plan",
    sentence: "Design new membership subscription tiers and prices.",
    category: "Billing & Subscriptions"
  },
  VIEW_MEMBERSHIP_DETAILS: {
    title: "View Membership Details",
    sentence: "Inspect features, prices, and entitlements of specific plans.",
    category: "Billing & Subscriptions"
  },
  EDIT_MEMBERSHIP_DETAILS: {
    title: "Edit Membership Plan",
    sentence: "Modify pricing tiers, access terms, or title texts.",
    category: "Billing & Subscriptions"
  },
  DELETE_MEMBERSHIP_DETAILS: {
    title: "Delete Membership Plan",
    sentence: "Suspend active subscription models.",
    category: "Billing & Subscriptions"
  },
  RESTORE_MEMBERSHIP_DETAILS: {
    title: "Restore Membership Plan",
    sentence: "Restore deactivated subscription model templates.",
    category: "Billing & Subscriptions"
  },

  // Legal & Compliance
  UV_LEGAL_COMPLIANCE: {
    title: "Access Legal & Compliance",
    sentence: "Access the policy agreement documents and settings.",
    category: "Legal & Compliance"
  },
  CREATE_LEGAL: {
    title: "Create Legal Policy",
    sentence: "Publish new Terms of Use or Privacy agreements.",
    category: "Legal & Compliance"
  },
  VIEW_LEGAL: {
    title: "View Legal Policies",
    sentence: "Browse agreement guidelines and policy revisions.",
    category: "Legal & Compliance"
  },
  EDIT_LEGAL: {
    title: "Edit Legal Policy",
    sentence: "Modify agreements, terms of service, or privacy statements.",
    category: "Legal & Compliance"
  },
  DELETE_LEGAL: {
    title: "Delete Legal Policies",
    sentence: "Remove policy items or agreement logs.",
    category: "Legal & Compliance"
  },
  RESTORE_LEGAL: {
    title: "Restore Legal Policies",
    sentence: "Restore archived policy texts.",
    category: "Legal & Compliance"
  },

  // Leads Management
  UV_LEADS_MANAGEMENT: {
    title: "Access Leads Management",
    sentence: "Access modules under the Leads Management workspace.",
    category: "Leads Management"
  },
  UV_LEADS_LIST: {
    title: "View Leads List Module",
    sentence: "Browse, filter, and view the list of marketplace and directory listing leads.",
    category: "Leads Management"
  },
  VIEW_LEAD: {
    title: "View Lead",
    sentence: "Browse, filter, and view the list of leads.",
    category: "Leads Management"
  },
  CREATE_LEAD: {
    title: "Create Lead",
    sentence: "Manually add new leads with requirements and details.",
    category: "Leads Management"
  },
  EDIT_LEAD: {
    title: "Edit Lead",
    sentence: "Modify lead contact info, requirements, and details.",
    category: "Leads Management"
  },
  NOTES_LEAD: {
    title: "Add Notes to Lead",
    sentence: "Add new updates, messages, or notes to a lead's record.",
    category: "Leads Management"
  },
  EXPORT_LEAD: {
    title: "Export Leads",
    sentence: "Export leads data as a downloadable spreadsheet.",
    category: "Leads Management"
  },
  IMPORT_LEAD: {
    title: "Bulk Import Leads",
    sentence: "Upload and bulk import leads via spreadsheet files.",
    category: "Leads Management"
  }
};
