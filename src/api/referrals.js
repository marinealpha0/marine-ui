import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get referrals (admin view)
export const getReferrals = async (filters) => {
  const {
    searchVal = "",
    status = "all",
    page = 1,
    limit = 10,
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal,
    status: status || "all",
    page,
    limit,
  }).toString();
  return fetchApi(ENDPOINTS.referrals.query(queryParams), "GET");
};

// Get all employee referrals (admin view — /allEmployeeReferrals)
export const getAllEmployeeReferrals = async (filters) => {
  const {
    searchVal = "",
    status = "all",
    page = 1,
    limit = 10,
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal,
    status: status || "all",
    page,
    limit,
  }).toString();
  return fetchApi(ENDPOINTS.allEmployeeReferrals.query(queryParams), "GET");
};

// Get employee referral stats by adminId (admin view)
export const getEmployeeReferralStats = async (adminId) => {
  return fetchApi(ENDPOINTS.referrals.stats(adminId), "GET");
};

// Get my referral stats (profile card + lifetime stats)
export const getMyReferralStats = async () => {
  return fetchApi(ENDPOINTS.myReferrals.stats, "GET");
};

// Get my referred users list (paginated, filtered)
export const getMyReferrals = async (filters) => {
  const {
    searchVal = "",
    status = "all",
    page = 1,
    limit = 10,
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal,
    status: status || "all",
    page,
    limit,
  }).toString();
  return fetchApi(ENDPOINTS.myReferrals.query(queryParams), "GET");
};

// Invite a student via referral
export const inviteStudent = async (data) => {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    userEmail: data.email,
    dob: data.dateOfBirth,
    mobileNumber: data.mobileNumber,
    gender: data.gender,
    userType: data.userType,
  };
  return fetchApi(ENDPOINTS.myReferrals.invite, "POST", payload);
};

