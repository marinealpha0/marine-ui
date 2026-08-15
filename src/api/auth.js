import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Admin login API call
export const adminLogin = async (userDetails) => {
  return fetchApi(ENDPOINTS.auth.login, "POST", userDetails);
};

// Check persistent session (initialize auth)
let authMePromise = null;

export const getAuthMe = async () => {
  if (authMePromise) return authMePromise;

  authMePromise = fetchApi(ENDPOINTS.auth.me, "GET").finally(() => {
    authMePromise = null;
  });

  return authMePromise;
};

// Logout API call
export const logoutApi = async () => {
  return fetchApi(ENDPOINTS.auth.logout, "POST");
};

// Manual Refresh Token API call (usually handled automatically by apiClient interceptor)
export const refreshApi = async () => {
  return fetchApi(ENDPOINTS.auth.refresh, "POST");
};

// Request password reset link (Forgot Password)
export const requestPasswordReset = async (adminEmail) => {
  return fetchApi(ENDPOINTS.auth.resetPasswordReq, "POST", { adminEmail });
};

// Validate password reset token
export const validateResetToken = async (requestId) => {
  return fetchApi(ENDPOINTS.auth.validateToken(requestId), "GET");
};

// Reset forgotten password
export const resetForgottenPassword = async (requestId, adminPassword) => {
  return fetchApi(ENDPOINTS.auth.forgotPassword, "POST", { request_id: requestId, adminPassword });
};
