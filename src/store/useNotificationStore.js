import { create } from "zustand";
import { formatNotificationData } from "@/constant";

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    totalRecords: 0,

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
