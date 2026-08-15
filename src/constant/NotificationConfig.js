export const NOTIFICATION_CONFIG = {
    // Billing & Coupons
    COUPON_CREATE: (actor, target, actionId) => ({
        title: "Coupon Created",
        message: target ? `${actor} created coupon "${target}"` : `${actor} created a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_CREATED: (actor, target, actionId) => ({
        title: "Coupon Created",
        message: target ? `${actor} created coupon "${target}"` : `${actor} created a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_UPDATE: (actor, target, actionId) => ({
        title: "Coupon Updated",
        message: target ? `${actor} updated coupon "${target}"` : `${actor} updated a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_UPDATED: (actor, target, actionId) => ({
        title: "Coupon Updated",
        message: target ? `${actor} updated coupon "${target}"` : `${actor} updated a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_ACTIVE: (actor, target, actionId) => ({
        title: "Coupon Activated",
        message: target ? `${actor} activated coupon "${target}"` : `${actor} activated a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_ACTIVATED: (actor, target, actionId) => ({
        title: "Coupon Activated",
        message: target ? `${actor} activated coupon "${target}"` : `${actor} activated a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_INACTIVE: (actor, target, actionId) => ({
        title: "Coupon Deactivated",
        message: target ? `${actor} deactivated coupon "${target}"` : `${actor} deactivated a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),
    COUPON_DEACTIVATED: (actor, target, actionId) => ({
        title: "Coupon Deactivated",
        message: target ? `${actor} deactivated coupon "${target}"` : `${actor} deactivated a coupon`,
        path: actionId ? `/billing-subscriptions/coupons?id=${actionId}&mode=view` : "/billing-subscriptions/coupons",
        icon: "CreditCard",
    }),

    // Membership Plan
    MEMBERSHIP_PLAN_CREATE: (actor, target, actionId) => ({
        title: "Plan Created",
        message: target ? `${actor} created plan "${target}"` : `${actor} created a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_CREATED: (actor, target, actionId) => ({
        title: "Plan Created",
        message: target ? `${actor} created plan "${target}"` : `${actor} created a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_UPDATE: (actor, target, actionId) => ({
        title: "Plan Updated",
        message: target ? `${actor} updated plan "${target}"` : `${actor} updated a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_UPDATED: (actor, target, actionId) => ({
        title: "Plan Updated",
        message: target ? `${actor} updated plan "${target}"` : `${actor} updated a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_ACTIVE: (actor, target, actionId) => ({
        title: "Plan Activated",
        message: target ? `${actor} activated plan "${target}"` : `${actor} activated a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_ACTIVATED: (actor, target, actionId) => ({
        title: "Plan Activated",
        message: target ? `${actor} activated plan "${target}"` : `${actor} activated a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_INACTIVE: (actor, target, actionId) => ({
        title: "Plan Deactivated",
        message: target ? `${actor} deactivated plan "${target}"` : `${actor} deactivated a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),
    MEMBERSHIP_PLAN_DEACTIVATED: (actor, target, actionId) => ({
        title: "Plan Deactivated",
        message: target ? `${actor} deactivated plan "${target}"` : `${actor} deactivated a membership plan`,
        path: actionId ? `/billing-subscriptions/plans?id=${actionId}&mode=view` : "/billing-subscriptions/plans",
        icon: "CreditCard",
    }),

    // Recruitment & Jobs
    COMPANY_PROFILE_CREATE: (actor, target, actionId) => ({
        title: "Company Profile Created",
        message: target ? `${actor} created company profile "${target}"` : `${actor} created a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_CREATED: (actor, target, actionId) => ({
        title: "Company Profile Created",
        message: target ? `${actor} created company profile "${target}"` : `${actor} created a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_UPDATE: (actor, target, actionId) => ({
        title: "Company Profile Updated",
        message: target ? `${actor} updated company profile "${target}"` : `${actor} updated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_UPDATED: (actor, target, actionId) => ({
        title: "Company Profile Updated",
        message: target ? `${actor} updated company profile "${target}"` : `${actor} updated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMAPNY_PROFILE_ACTIVE: (actor, target, actionId) => ({
        title: "Company Profile Activated",
        message: target ? `${actor} activated company profile "${target}"` : `${actor} activated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_ACTIVE: (actor, target, actionId) => ({
        title: "Company Profile Activated",
        message: target ? `${actor} activated company profile "${target}"` : `${actor} activated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_ACTIVATED: (actor, target, actionId) => ({
        title: "Company Profile Activated",
        message: target ? `${actor} activated company profile "${target}"` : `${actor} activated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMAPNY_PROFILE_INACTIVE: (actor, target, actionId) => ({
        title: "Company Profile Deactivated",
        message: target ? `${actor} deactivated company profile "${target}"` : `${actor} deactivated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_INACTIVE: (actor, target, actionId) => ({
        title: "Company Profile Deactivated",
        message: target ? `${actor} deactivated company profile "${target}"` : `${actor} deactivated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    COMPANY_PROFILE_DEACTIVATED: (actor, target, actionId) => ({
        title: "Company Profile Deactivated",
        message: target ? `${actor} deactivated company profile "${target}"` : `${actor} deactivated a company profile`,
        path: actionId ? `/recruitment/companies?id=${actionId}&mode=view` : "/recruitment/companies",
        icon: "BusinessIcon",
    }),
    JOB_POST: (actor, target, actionId) => ({
        title: "Job Posted",
        message: target ? `${actor} posted job "${target}"` : `${actor} posted a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_POSTED: (actor, target, actionId) => ({
        title: "Job Posted",
        message: target ? `${actor} posted job "${target}"` : `${actor} posted a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_UPDATE: (actor, target, actionId) => ({
        title: "Job Updated",
        message: target ? `${actor} updated job "${target}"` : `${actor} updated a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_UPDATED: (actor, target, actionId) => ({
        title: "Job Updated",
        message: target ? `${actor} updated job "${target}"` : `${actor} updated a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_ACTIVE: (actor, target, actionId) => ({
        title: "Job Activated",
        message: target ? `${actor} activated job "${target}"` : `${actor} activated a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_ACTIVATED: (actor, target, actionId) => ({
        title: "Job Activated",
        message: target ? `${actor} activated job "${target}"` : `${actor} activated a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_INACTIVE: (actor, target, actionId) => ({
        title: "Job Deactivated",
        message: target ? `${actor} deactivated job "${target}"` : `${actor} deactivated a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),
    JOB_DEACTIVATED: (actor, target, actionId) => ({
        title: "Job Deactivated",
        message: target ? `${actor} deactivated job "${target}"` : `${actor} deactivated a job`,
        path: actionId ? `/recruitment/job-postings?id=${actionId}&mode=view` : "/recruitment/job-postings",
        icon: "Briefcase",
    }),

    // Workshops
    WORKSHOP_CREATED: (actor, target, actionId) => ({
        title: "Workshop Created",
        message: target ? `${actor} created workshop "${target}"` : `${actor} created a workshop`,
        path: actionId ? `/learning-management/workshops?id=${actionId}&mode=view` : "/learning-management/workshops",
        icon: "Calendar",
    }),
    WORKSHOP_UPDATED: (actor, target, actionId) => ({
        title: "Workshop Updated",
        message: target ? `${actor} updated workshop "${target}"` : `${actor} updated a workshop`,
        path: actionId ? `/learning-management/workshops?id=${actionId}&mode=view` : "/learning-management/workshops",
        icon: "Calendar",
    }),
    WORKSHOP_ACTIVE: (actor, target, actionId) => ({
        title: "Workshop Activated",
        message: target ? `${actor} activated workshop "${target}"` : `${actor} activated a workshop`,
        path: actionId ? `/learning-management/workshops?id=${actionId}&mode=view` : "/learning-management/workshops",
        icon: "Calendar",
    }),
    WORKSHOP_ACTIVATED: (actor, target, actionId) => ({
        title: "Workshop Activated",
        message: target ? `${actor} activated workshop "${target}"` : `${actor} activated a workshop`,
        path: actionId ? `/learning-management/workshops?id=${actionId}&mode=view` : "/learning-management/workshops",
        icon: "Calendar",
    }),
    WORKSHOP_INACTIVE: (actor, target, actionId) => ({
        title: "Workshop Deactivated",
        message: target ? `${actor} deactivated workshop "${target}"` : `${actor} deactivated a workshop`,
        path: actionId ? `/learning-management/workshops?id=${actionId}&mode=view` : "/learning-management/workshops",
        icon: "Calendar",
    }),
    WORKSHOP_DEACTIVATED: (actor, target, actionId) => ({
        title: "Workshop Deactivated",
        message: target ? `${actor} deactivated workshop "${target}"` : `${actor} deactivated a workshop`,
        path: actionId ? `/learning-management/workshops?id=${actionId}&mode=view` : "/learning-management/workshops",
        icon: "Calendar",
    }),

    // Leads
    LEAD_ASSIGNED: (actor, target, actionId) => ({
        title: "Lead Assigned",
        message: target ? `Lead "${target}" assigned to ${actor}` : `A lead has been assigned to ${actor}`,
        path: actionId ? `/leads-management/list?id=${actionId}&mode=view` : "/leads-management/list",
        icon: "Users",
    }),

    // Communication & Discussions
    DISCUSSION_CREATED: (actor, target, actionId) => ({
        title: "Discussion Created",
        message: target ? `${actor} started discussion "${target}"` : `${actor} started a discussion`,
        path: actionId ? `/communication-center/discussions?discussionId=${actionId}` : `/communication-center/discussions`,
        icon: "MessageSquare",
    }),
    USER_QUERY_CREATED: (actor, target, actionId) => ({
        title: "User Query Created",
        message: target ? `${actor} submitted query "${target}"` : `${actor} submitted a query`,
        path: actionId ? `/communication-center/comments?id=${actionId}` : "/communication-center/comments",
        icon: "CommentIcon",
    }),

    // User Management
    USER_PROFILE_UPDATED: (actor, target, actionId) => ({
        title: "User Profile Updated",
        message: target ? `${actor} updated profile of "${target}"` : `${actor} updated a user profile`,
        path: actionId ? `/user-management/profiles?id=${actionId}&mode=view` : "/user-management/profiles",
        icon: "User",
    }),
    USER_PROFILE_ACTIVE: (actor, target, actionId) => ({
        title: "User Profile Activated",
        message: target ? `${actor} activated user profile "${target}"` : `${actor} activated a user profile`,
        path: actionId ? `/user-management/profiles?id=${actionId}&mode=view` : "/user-management/profiles",
        icon: "User",
    }),
    USER_PROFILE_ACTIVATED: (actor, target, actionId) => ({
        title: "User Profile Activated",
        message: target ? `${actor} activated user profile "${target}"` : `${actor} activated a user profile`,
        path: actionId ? `/user-management/profiles?id=${actionId}&mode=view` : "/user-management/profiles",
        icon: "User",
    }),
    USER_PROFILE_INACTIVE: (actor, target, actionId) => ({
        title: "User Profile Deactivated",
        message: target ? `${actor} deactivated user profile "${target}"` : `${actor} deactivated a user profile`,
        path: actionId ? `/user-management/profiles?id=${actionId}&mode=view` : "/user-management/profiles",
        icon: "User",
    }),
    USER_PROFILE_DEACTIVATED: (actor, target, actionId) => ({
        title: "User Profile Deactivated",
        message: target ? `${actor} deactivated user profile "${target}"` : `${actor} deactivated a user profile`,
        path: actionId ? `/user-management/profiles?id=${actionId}&mode=view` : "/user-management/profiles",
        icon: "User",
    }),

    // Admins & Roles
    ADMIN_CREATE: (actor, target, actionId) => ({
        title: "Admin Created",
        message: target ? `${actor} created admin "${target}"` : `${actor} created an admin`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_CREATED: (actor, target, actionId) => ({
        title: "Admin Created",
        message: target ? `${actor} created admin "${target}"` : `${actor} created an admin`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_PROFILE_UPDATE: (actor, target, actionId) => ({
        title: "Admin Profile Updated",
        message: target ? `${actor} updated admin profile "${target}"` : `${actor} updated an admin profile`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_PROFILE_UPDATED: (actor, target, actionId) => ({
        title: "Admin Profile Updated",
        message: target ? `${actor} updated admin profile "${target}"` : `${actor} updated an admin profile`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_ACTIVE: (actor, target, actionId) => ({
        title: "Admin Activated",
        message: target ? `${actor} activated admin "${target}"` : `${actor} activated an admin`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_ACTIVATED: (actor, target, actionId) => ({
        title: "Admin Activated",
        message: target ? `${actor} activated admin "${target}"` : `${actor} activated an admin`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_INACTIVE: (actor, target, actionId) => ({
        title: "Admin Deactivated",
        message: target ? `${actor} deactivated admin "${target}"` : `${actor} deactivated an admin`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ADMIN_DEACTIVATED: (actor, target, actionId) => ({
        title: "Admin Deactivated",
        message: target ? `${actor} deactivated admin "${target}"` : `${actor} deactivated an admin`,
        path: actionId ? `/administration/admins?id=${actionId}&mode=view` : "/administration/admins",
        icon: "UserCog",
    }),
    ROLE_CREATE: (actor, target, actionId) => ({
        title: "Role Created",
        message: target ? `${actor} created role "${target}"` : `${actor} created a role`,
        path: actionId ? `/administration/view/${actionId}` : "/administration/roles",
        icon: "Shield",
    }),
    ROLE_UPDATE: (actor, target, actionId) => ({
        title: "Role Updated",
        message: target ? `${actor} updated role "${target}"` : `${actor} updated a role`,
        path: actionId ? `/administration/view/${actionId}` : "/administration/roles",
        icon: "Shield",
    }),
    ROLE_ACTIVE: (actor, target, actionId) => ({
        title: "Role Activated",
        message: target ? `${actor} activated role "${target}"` : `${actor} activated a role`,
        path: actionId ? `/administration/view/${actionId}` : "/administration/roles",
        icon: "Shield",
    }),
    ROLE_INACTIVE: (actor, target, actionId) => ({
        title: "Role Deactivated",
        message: target ? `${actor} deactivated role "${target}"` : `${actor} deactivated a role`,
        path: actionId ? `/administration/view/${actionId}` : "/administration/roles",
        icon: "Shield",
    }),
    ROLE_DEACTIVATED: (actor, target, actionId) => ({
        title: "Role Deactivated",
        message: target ? `${actor} deactivated role "${target}"` : `${actor} deactivated a role`,
        path: actionId ? `/administration/roles?id=${actionId}&mode=view` : "/administration/roles",
        icon: "Shield",
    }),
    NOTIFICATION_CONFIG_UPDATE: (actor, target, actionId) => ({
        title: "Notification Settings Updated",
        message: `${actor} has updated the notification settings`,
        path: "/settings?tab=notifications",
        icon: "Bell",
    }),
    REFERRAL_CONFIG_UPDATE: (actor, target, actionId) => ({
        title: "Referral Settings Updated",
        message: `${actor} has updated the referral settings`,
        path: "/settings?tab=referrals",
        icon: "Users",
    }),
    REFERRAL_SUBSCRIBED: (actor, target, actionId) => ({
        title: "Referral Program Subscription",
        message: target ? `${actor} subscribed to referral program "${target}"` : `${actor} subscribed to the referral program`,
        path: "/user-management/my-referrals",
        icon: "Users",
    })
};

export const formatNotificationData = (note) => {
    const action = note.action || "";
    const actor = note.actorName || "Someone";
    
    // Fallback if targetName is null, undefined, or string literal "null" / "undefined"
    const target = note.targetName && note.targetName !== "null" && note.targetName !== "undefined"
        ? note.targetName
        : "";

    const configFn = NOTIFICATION_CONFIG[action];
    let title = note.title || "Notification";
    let message = note.message || "";
    let path = note.path || "";
    let icon = note.icon || "Bell";
    if (configFn) {
        const actionId = note.actionId || (note.data && (note.data.actionId || note.data.discussionId)) || "";
        const result = configFn(actor, target, actionId);
        title = result.title;
        message = result.message;
        path = result.path || "";
        icon = result.icon || "Bell";
    } else if (!message && action) {
        message = `Action ${action} performed by ${actor}`;
    }

    return {
        ...note,
        _id: note._id || note.id || `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        message,
        path,
        icon,
        createdAt: note.createdAt || new Date().toISOString(),
        isRead: note.isRead ?? false,
    };
};
