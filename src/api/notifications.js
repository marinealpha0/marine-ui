import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get notifications
export const getNotifications = async ({ page = 1, limit = 10 }) => {
    const queryParams = new URLSearchParams({
        page,
        limit,
        action: "all",
    }).toString();
    return fetchApi(ENDPOINTS.notifications.query(queryParams), "POST");
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
    const queryParams = new URLSearchParams({
        action: "mark_all_as_read",
    }).toString();
    return fetchApi(ENDPOINTS.notifications.query(queryParams), "POST");
};

// Mark notification as read by ID
export const markNotificationAsRead = async (notificationId) => {
    const queryParams = new URLSearchParams({
        action: "by_id",
        notificationId,
    }).toString();
    return fetchApi(ENDPOINTS.notifications.query(queryParams), "POST");
};

// Save selected notification modules and submodules
export const saveNotificationModules = async (payload) => {
    return fetchApi("/notifications/config/global-enable", "POST", payload);
};

// Save role notification configuration mapping
export const saveRoleNotificationPermissions = async (payload) => {
    return fetchApi("/notifications/config/save", "POST", payload);
};

// Get selected global notification modules and submodules
export const getSelectedNotificationModules = async () => {
    return fetchApi("/notifications/config/selected-modules", "GET");
};

// Get role configurations map
export const getRoleNotificationConfigurations = async () => {
    return fetchApi("/notifications/config/role-configurations", "GET");
};
