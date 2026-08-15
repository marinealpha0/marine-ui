// Centralized API endpoints
const ENDPOINTS = {
  admins: {
    search: (qs) => `/search/admins?${qs}`,
    getDetails: (id) => `/getAdminDetails/${id}`,
    create: "/create",
    update: "/updateAdmin",
    setPassword: "/set-password",
    invite: "/inviteAdmin",
    validateInvite: (requestId) => `/invite/validate?request_id=${requestId}`,
    setupPassword: "/setupPassword",
    resendInvite: (adminId) => `/resend-invite/${adminId}`,
    clearSessions: (adminId) => `/clear-sessions/${adminId}`,
    byRole: (role) => `/by-role/${role}`,
  },
  analytics: {
    admin: "/adminAnalytics",
    user: "/userAnalytics",
    posts: "/postsAnalytics",
    memberships: "/membershipsAnalytics",
  },
  audit: {
    logs: (qs) => `/auditLogs?${qs}`,
    export: (qs) => `/auditLogs/export?${qs}`,
    clear: "/auditLogs/clear",
  },
  auth: {
    login: "/login",
    me: "/auth/me",
    logout: "/logout",
    refresh: "/refresh",
    resetPasswordReq: "/reset-password-req",
    validateToken: (requestId) => `/validate-token?request_id=${requestId}`,
    forgotPassword: "/forgot-password",
    updatePassword: "/update-password",
  },
  categories: {
    query: (qs) => `/category?${qs}`,
    base: "/category",
    delete: (id) => `/categories/${id}`,
  },
  cheatsheets: {
    query: (qs) => `/cheatSheet?${qs}`,
  },
  companies: {
    query: (qs) => `/companies?${qs}`,
    base: "/companies",
  },
  coupons: {
    base: "/coupon",
    query: (qs) => `/coupon?${qs}`,
  },
  courseVideos: {
    topicQuery: (qs) => `/courseTopic?${qs}`,
    topicBase: "/courseTopic",
    topicDelete: (id) => `/topics/${id}`,
    videoQuery: (qs) => `/courseTopic/video?${qs}`,
    videoBase: "/courseTopic/video",
    videoDelete: (id) => `/videos/${id}`,
  },
  courses: {
    query: (qs) => `/course?${qs}`,
    base: "/course",
  },
  dashboard: {
    get: (qs) => `/dashboard${qs ? '?' + qs : ''}`,
  },
  discussions: {
    assigned: "/assignedDiscussions",
    messages: (id) => `/discussionMessages?discussionId=${id}`,
    message: (id) => `/discussionMessage?discussionId=${id}`,
  },
  faqs: {
    query: (qs) => `/faqs?${qs}`,
    base: "/faqs",
  },
  jobs: {
    allPosts: (qs) => `/job/allPosts?action=minimal&${qs}`,
    get: (id) => `/job/${id}`,
    create: "/job",
    update: (id) => `/job/${id}`,
    delete: (id) => `/job/${id}`,
  },
  latestUpdates: {
    query: (qs) => `/latestUpdate?${qs}`,
    base: "/latestUpdate",
    byId: (id) => `/latestUpdate/${id}`,
  },
  legalPages: {
    query: (qs) => `/legalPage?${qs}`,
    byId: (id) => `/legalPage/${id}`,
    base: "/legalPage",
  },
  mcqs: {
    query: (qs) => `/mcq?${qs}`,
    create: "/mcq/create",
    update: (id) => `/mcq/update?mcqId=${id}`,
    delete: (id) => `/mcq?mcqId=${id}`,
    bulkUpload: "/mcq/bulkUpload",
    sampleDownload: "/mcq/sample-download",
  },
  membership: {
    base: "/membership",
    query: (qs) => `/membership?${qs}`,
  },
  modules: {
    query: (qs) => `/modules?${qs}`,
    base: "/modules",
    byId: (id) => `/modules/${id}`,
  },
  notifications: {
    query: (qs) => `/notifications?${qs}`,
  },
  projects: {
    query: (qs) => `/project?${qs}`,
    byId: (id) => `/project/${id}`,
    base: "/project",
    assignedQuery: (qs) => `/project/assigned?${qs}`,
    assignedById: (id) => `/project/assigned/${id}`,
  },
  referrals: {
    query: (qs) => `/userReferrals?${qs}`,
    stats: (adminId) => `/referrals/stats/${adminId}`,
  },
  allEmployeeReferrals: {
    query: (qs) => `/allEmployeeReferrals?${qs}`,
  },
  myReferrals: {
    stats: "/my-referrals/stats",
    query: (qs) => `/my-referrals?${qs}`,
    invite: "/onboardStudent",
  },
  resumeTemplates: {
    query: (qs) => `/resumeMaster?${qs}`,
    base: "/resumeMaster",
    delete: (id) => `/resume-templates/${id}`,
  },
  roles: {
    query: (qs) => `/role?${qs}`,
    byId: (id) => `/role/${id}`,
    base: "/role",
  },
  submissions: {
    query: (qs) => `/submission?${qs}`,
    base: "/submission",
    comment: (qs) => `/project/comment?${qs}`,
  },
  transactions: {
    query: (qs) => `/user-transactions?${qs}`,
  },
  upcomingFeatures: {
    query: (qs) => `/upcomingFeature?${qs}`,
    byId: (id) => `/upcomingFeature/${id}`,
    base: "/upcomingFeature",
  },
  entity: {
    toggleConfirm: "/entity/toggle-confirm",
  },
  upload: {
    file: "/uploadFile",
  },
  userQuery: {
    query: (qs) => `/searchUserQueries?${qs}`,
    emails: "/emails",
    sendEmail: "/sendUserEmail",
  },
  appSettings: {
    get: (type) => `/app-settings?type=${type}`,
    update: "/app-settings/referral",
  },
  profile: {
    get: "/profile",
  },
  users: {
    search: (qs) => `/search/users?${qs}`,
    updateStatus: "/updateUserStatus",
    getDetails: (id) => `/getUserDetails/${id}`,
  },
  leads: {
    query: (qs) => `/leads/all?${qs}`,
    create: "/leads/new",
    updateStatus: (id) => `/leads/status/${id}`,
    update: (id) => `/leads/${id}`,
    getDetails: (id) => `/leads/${id}`,
    addNote: (id) => `/leads/${id}/notes`,
    bulkUpload: "/leads/bulk-upload",
    export: (qs) => `/leads/export?${qs}`,
    sampleDownload: "/leads/sample-download",
  },
};

export default ENDPOINTS;