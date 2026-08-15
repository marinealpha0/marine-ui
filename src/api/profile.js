import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get the profile of the currently logged-in admin
export const getAdminProfile = async () => {
  return fetchApi(ENDPOINTS.profile.get, "GET");
};
