import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get Admin Analytics
export const getAdminAnalytics = async () => {
  return fetchApi(ENDPOINTS.analytics.admin, "GET");
};

// Get User Analytics
export const getUserAnalytics = async () => {
  return fetchApi(ENDPOINTS.analytics.user, "GET");
};

// Get Posts Analytics
export const getPostsAnalytics = async () => {
  return fetchApi(ENDPOINTS.analytics.posts, "GET");
};

// Get Memberships Analytics
export const getMembershipsAnalytics = async () => {
  return fetchApi(ENDPOINTS.analytics.memberships, "GET");
};
