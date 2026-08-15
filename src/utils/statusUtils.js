const statusLabelMap = {
    Active: "Active",
    active: "Active",

    Open: "Open",
    open: "Open",

    Inactive: "Inactive",
    inactive: "Inactive",

    Draft: "Draft",
    draft: "Draft",

    Invited: "Invited",
    invited: "Invited",

    Expired: "Expired",
    expired: "Expired",

    Completed: "Completed",
    completed: "Completed",

    Pending: "Pending",
    pending: "Pending",

    Cancelled: "Cancelled",
    cancelled: "Cancelled",

    Declined: "Declined",
    declined: "Declined",

    Processing: "Processing",
    processing: "Processing",

    "On Hold": "On Hold",
    onhold: "On Hold",

    Refunded: "Refunded",
    refunded: "Refunded",

    Failed: "Failed",
    failed: "Failed",

    Paid: "Paid",
    paid: "Paid",

    Fulfilled: "Fulfilled",
    fulfilled: "Fulfilled",

    Delivered: "Package Delivered",
    delivered: "Package Delivered",

    Returned: "Returned",
    returned: "Returned",

    New: "New",
    new: "New",

    Created: "Created",
    created: "Created",

    Suspended: "Suspended",
    suspended: "Suspended",

    Blocked: "Blocked",
    blocked: "Blocked",

    Closed: "Closed",
    closed: "Closed",

    Success: "Success",
    success: "Success",

    Resolved: "Resolved",
    resolved: "Resolved",
};

export const getStatusLabel = (status) => {
    if (typeof status === "boolean") {
        return status ? "Active" : "Inactive";
    }
    return statusLabelMap[status] || status;
};

export const getSafeStatus = (status) => {
    if (typeof status === "boolean") {
        return status ? "active" : "inactive";
    }
    if (typeof status === "string") {
        return status.toLowerCase();
    }
    return "inactive";
};
