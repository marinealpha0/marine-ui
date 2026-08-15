import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// GET app settings by type (e.g. referral_settings, admin-activity)
// Endpoint: GET /app-settings?type={type}
export const getAppSettings = async (type) => {
  return fetchApi(ENDPOINTS.appSettings.get(type), "GET");
};

// Update app settings (referrals, etc.)
export const updateAppSettings = async (data) => {
  return fetchApi(ENDPOINTS.appSettings.update, "PUT", data);
};

// Update the current admin's password
// Endpoint: PUT /update-password
export const updatePassword = async ({ currentPassword, newPassword }) => {
  return fetchApi(ENDPOINTS.auth.updatePassword, "PUT", {
    currentPassword,
    newPassword,
  });
};
