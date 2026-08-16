import { create } from "zustand";
import { formatNotificationData } from "@/constant";

const INITIAL_DEMO_NOTIFICATIONS = [
    {
        _id: "notif-1",
        title: "Overdue Work Orders Alert",
        message: "8 work orders are overdue on MV Atlantic Pioneer (Oldest 42 days · Main Engine).",
        category: "admin",
        icon: "Bell",
        isRead: false,
        path: "/app/work-orders",
        createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    },
    {
        _id: "notif-2",
        title: "Critical Equipment Defect",
        message: "No.2 Aux Engine & Boiler feed pump reported critical failure on MV Atlantic Pioneer.",
        category: "admin",
        icon: "Shield",
        isRead: false,
        path: "/app/equipment",
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
        _id: "notif-3",
        title: "Statutory Certificate Expiring",
        message: "3 certificates (IOPP, Load Line, Safety Equipment) expiring within 30 days on MT Ocean Star.",
        category: "admin",
        icon: "Calendar",
        isRead: false,
        path: "/app/certificates",
        createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    },
    {
        _id: "notif-4",
        title: "Requisition Pending Approval",
        message: "PR-2026-3391 for Main Engine Spares submitted for shore manager approval.",
        category: "jobs",
        icon: "Briefcase",
        isRead: false,
        path: "/app/requisitions",
        createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
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
                // If it already exists, update with latest values from the server
                currentMap.set(newNote._id, { ...existing, ...newNote });
            } else {
                currentMap.set(newNote._id, newNote);
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
