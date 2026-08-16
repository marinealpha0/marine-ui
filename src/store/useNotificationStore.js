import { create } from "zustand";
import { formatNotificationData } from "@/constant";

const INITIAL_DEMO_NOTIFICATIONS = [
    {
        _id: "notif-1",
        title: "Work Order Approval Required",
        message: "C/E M. Haugen requested approval for WO-24196 Turbocharger Overhaul on MV Atlantic Pioneer.",
        category: "admin",
        icon: "Wrench",
        isRead: false,
        requiresAction: true,
        actionStatus: "pending",
        actionType: "Work Order",
        priority: "critical",
        vessel: "MV Atlantic Pioneer",
        path: "/app/work-orders",
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
        _id: "notif-2",
        title: "Purchase Requisition Approval",
        message: "PR-2026-3391 for Main Engine Cylinder Liner & Spares ($18,450) awaits TSI sign-off.",
        category: "jobs",
        icon: "ShoppingCart",
        isRead: false,
        requiresAction: true,
        actionStatus: "pending",
        actionType: "Procurement",
        priority: "high",
        vessel: "MT Ocean Star",
        path: "/app/requisitions",
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
        _id: "notif-3",
        title: "Bunkering Deviation Request",
        message: "Capt. L. Moreau submitted DEV-1042 requesting emergency bunkering stop at Fujairah Anchorage.",
        category: "admin",
        icon: "Shield",
        isRead: false,
        requiresAction: true,
        actionStatus: "pending",
        actionType: "Vessel Deviation",
        priority: "high",
        vessel: "MT Pacific Endeavour",
        path: "/app/deviations",
        createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    },
    {
        _id: "notif-4",
        title: "Enclosed Space Permit Request",
        message: "PTW-4409 Enclosed Space & Hot Work Entry permit submitted for C/O A. Silva on MV Nordic Dawn.",
        category: "events",
        icon: "Shield",
        isRead: false,
        requiresAction: true,
        actionStatus: "pending",
        actionType: "Permit To Work",
        priority: "high",
        vessel: "MV Nordic Dawn",
        path: "/app/permit-to-work",
        createdAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
    },
    {
        _id: "notif-5",
        title: "Statutory Certificate Expiring",
        message: "IOPP Certificate for MT Ocean Star expires within 26 days. Class survey scheduling recommended.",
        category: "admin",
        icon: "Calendar",
        isRead: false,
        requiresAction: false,
        actionStatus: null,
        actionType: "Compliance",
        priority: "medium",
        vessel: "MT Ocean Star",
        path: "/app/certificates",
        createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    },
    {
        _id: "notif-6",
        title: "Defect Report Summary",
        message: "6 pending defect reports received from shore technical inspection team across fleet.",
        category: "discussions",
        icon: "Bell",
        isRead: true,
        requiresAction: false,
        actionStatus: null,
        actionType: "Maintenance",
        priority: "low",
        vessel: "Fleet-wide",
        path: "/app/qms",
        createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    },
].map(formatNotificationData);

export const useNotificationStore = create((set, get) => ({
    notifications: INITIAL_DEMO_NOTIFICATIONS,
    unreadCount: INITIAL_DEMO_NOTIFICATIONS.filter((n) => !n.isRead).length,
    totalRecords: INITIAL_DEMO_NOTIFICATIONS.length,

    // Set/initialize all notifications (e.g. from API)
    setNotifications: (notifications, unreadCount, totalRecords) => {
        const formatted = notifications.map(formatNotificationData);
        set({
            notifications: formatted,
            unreadCount: unreadCount !== undefined ? unreadCount : formatted.filter((n) => !n.isRead).length,
            totalRecords: totalRecords !== undefined ? totalRecords : formatted.length,
        });
    },

    // Approve a notification request
    approveNotification: (notificationId) => {
        const current = get().notifications;
        const nowIso = new Date().toISOString();
        let wasUnread = false;

        const updated = current.map((n) => {
            if (n._id === notificationId) {
                if (!n.isRead) wasUnread = true;
                return {
                    ...n,
                    requiresAction: true,
                    actionStatus: "approved",
                    approvedAt: nowIso,
                    isRead: true,
                };
            }
            return n;
        });

        const newUnreadCount = wasUnread ? Math.max(0, get().unreadCount - 1) : get().unreadCount;

        set({
            notifications: updated,
            unreadCount: newUnreadCount,
        });
    },

    // Decline a notification request
    declineNotification: (notificationId) => {
        const current = get().notifications;
        const nowIso = new Date().toISOString();
        let wasUnread = false;

        const updated = current.map((n) => {
            if (n._id === notificationId) {
                if (!n.isRead) wasUnread = true;
                return {
                    ...n,
                    requiresAction: true,
                    actionStatus: "declined",
                    declinedAt: nowIso,
                    isRead: true,
                };
            }
            return n;
        });

        const newUnreadCount = wasUnread ? Math.max(0, get().unreadCount - 1) : get().unreadCount;

        set({
            notifications: updated,
            unreadCount: newUnreadCount,
        });
    },

    // Approve all pending actionable notifications at once
    approveAllPending: () => {
        const current = get().notifications;
        const nowIso = new Date().toISOString();
        let unreadReduced = 0;

        const updated = current.map((n) => {
            if (n.requiresAction && n.actionStatus === "pending") {
                if (!n.isRead) unreadReduced++;
                return {
                    ...n,
                    actionStatus: "approved",
                    approvedAt: nowIso,
                    isRead: true,
                };
            }
            return n;
        });

        set({
            notifications: updated,
            unreadCount: Math.max(0, get().unreadCount - unreadReduced),
        });
    },

    // Push a new notification (e.g. from FCM)
    addNotification: (notification) => {
        const formatted = formatNotificationData(notification);
        const currentNotifications = get().notifications;

        // Check for duplicates by _id, or by same title + message within a tiny time window
        const exists = currentNotifications.some(
            (n) => n._id === formatted._id ||
                   (n.title === formatted.title &&
                    n.message === formatted.message &&
                    Math.abs(new Date(n.createdAt) - new Date(formatted.createdAt)) < 2000)
        );
        if (exists) return;

        // Prepend so new notifications are at the top
        const updatedNotifications = [formatted, ...currentNotifications];
        set({
            notifications: updatedNotifications,
            unreadCount: get().unreadCount + (formatted.isRead ? 0 : 1),
            totalRecords: get().totalRecords + 1,
        });
    },

    // Merge a batch of notifications (e.g. when loading paginated pages)
    mergeNotifications: (newNotifications, unreadCount, totalRecords) => {
        const formattedNew = newNotifications.map(formatNotificationData);
        const current = get().notifications;
        const currentMap = new Map(current.map((n) => [n._id, n]));

        formattedNew.forEach((newNote) => {
            const existing = currentMap.get(newNote._id);
            if (existing) {
                // Keep local actionStatus if present, otherwise merge server updates
                currentMap.set(newNote._id, {
                    ...existing,
                    ...newNote,
                    actionStatus: existing.actionStatus || newNote.actionStatus || (newNote.requiresAction ? "pending" : null),
                });
            } else {
                currentMap.set(newNote._id, {
                    ...newNote,
                    actionStatus: newNote.actionStatus || (newNote.requiresAction ? "pending" : null),
                });
            }
        });

        const combined = Array.from(currentMap.values()).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const finalUnreadCount = unreadCount !== undefined 
            ? unreadCount 
            : combined.filter((n) => !n.isRead).length;

        const finalTotalRecords = totalRecords !== undefined
            ? totalRecords
            : Math.max(combined.length, get().totalRecords);

        set({ 
            notifications: combined, 
            unreadCount: finalUnreadCount,
            totalRecords: finalTotalRecords,
        });
    },

    // Mark a notification as read
    markAsRead: (notificationId) => {
        const current = get().notifications;
        const target = current.find((n) => n._id === notificationId);
        const wasUnread = target && !target.isRead;

        const updatedNotifications = current.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
        );
        
        set({ 
            notifications: updatedNotifications, 
            unreadCount: wasUnread ? Math.max(0, get().unreadCount - 1) : get().unreadCount 
        });
    },

    // Mark all notifications as read
    markAllAsRead: () => {
        const updatedNotifications = get().notifications.map((n) => ({
            ...n,
            isRead: true,
        }));
        set({ notifications: updatedNotifications, unreadCount: 0 });
    },

    // Clear all notifications (e.g. on logout)
    clearNotifications: () => {
        set({ notifications: [], unreadCount: 0, totalRecords: 0 });
    },

    // Delete a notification
    deleteNotification: (notificationId) => {
        const current = get().notifications;
        const target = current.find((n) => n._id === notificationId);
        const wasUnread = target && !target.isRead;

        const updatedNotifications = current.filter((n) => n._id !== notificationId);
        
        set({ 
            notifications: updatedNotifications, 
            unreadCount: wasUnread ? Math.max(0, get().unreadCount - 1) : get().unreadCount,
            totalRecords: Math.max(0, get().totalRecords - 1),
        });
    },
}));

