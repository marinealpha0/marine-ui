import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// ===== ADMIN USER MANAGEMENT FUNCTIONS =====

// Get all users (admin only)
export const getAllAdmins = async (filters) => {
  const {
    searchVal = "",
    role = "",
    gender = "",
    status = "",
    page = 1,
    limit = 5,
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal: searchVal.toLowerCase(),
    role: role || "all",
    gender: gender || "all",
    adminStatus: status || "all",
    page,
    limit,
  }).toString();
  return fetchApi(
    ENDPOINTS.admins.search(queryParams),
    "GET",
  );
};

// Get single admin by ID
export const getAdminById = async (adminId) => {
  return fetchApi(ENDPOINTS.admins.getDetails(adminId), "GET");
};

// Create a new admin account (admin only)
export const createAdmin = async (adminData) => {
  return fetchApi(ENDPOINTS.admins.create, "POST", adminData);
};

// Update user status (admin only)
export const updateAdmin = async (adminData) => {
  return fetchApi(ENDPOINTS.admins.update, "PUT", adminData);
};

// Set password using email and token (public)
export const setPasswordApi = async ({ email, token, password }) => {
  return fetchApi(ENDPOINTS.admins.setPassword, "POST", { email, token, password });
};

// Admin invite API call
export const adminInvite = async (userDetails) => {
  return fetchApi(ENDPOINTS.admins.invite, "POST", userDetails);
};

// Resend admin invite (admin only)
export const resendInviteAdmin = async (adminId) => {
  return fetchApi(ENDPOINTS.admins.resendInvite(adminId), "POST");
};

// Clear/Reset admin sessions (admin only)
export const clearAdminSessions = async (adminId) => {
  return fetchApi(ENDPOINTS.admins.clearSessions(adminId), "POST");
};

// Setup page get admin details API call
export const setupGetUserDetails = async (requestToken) => {
  return fetchApi(ENDPOINTS.admins.validateInvite(requestToken), "POST");
};

// Setup page create password API call
export const setupCreatePassword = async (body) => {
  return fetchApi(ENDPOINTS.admins.setupPassword, "POST", body);
};

// Get admins/users by role name
export const getAdminsByRole = async (roleName) => {
  return fetchApi(ENDPOINTS.admins.byRole(roleName), "GET");
};

