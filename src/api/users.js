import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all users
export const getAllUsers = async (filters) => {
  const {
    searchVal = "",
    page = 1,
    limit = 5,
    gender = "",
    status = "",
    resume = "",
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal: searchVal.toLowerCase(),
    page,
    limit,
    gender: gender || "all",
    userStatus: status || "all",
    resume: resume || "all",
  }).toString();
  return fetchApi(
    ENDPOINTS.users.search(queryParams),
    "GET",
  );
};

// Update user status
export const updateUserStatus = async (data) => {
  return fetchApi(ENDPOINTS.users.updateStatus, "PUT", data);
};

// Get single user by ID
export const getUserById = async (userId) => {
  return fetchApi(ENDPOINTS.users.getDetails(userId), "GET");
};
