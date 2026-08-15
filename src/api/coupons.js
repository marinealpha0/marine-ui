// Coupons API calls
import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Create a new coupon
export const couponPost = async (data) => {
  return fetchApi(ENDPOINTS.coupons.base, "POST", data);
};

// Get all coupons with pagination and filtering
export const getCoupons = async (filters) => {
  const {
    searchVal = "",
    page = 1,
    limit = 5,
    status = "",
    validUntil = "",
  } = filters;
  const queryParams = new URLSearchParams({
    action: "all",
    searchVal,
    page,
    limit,
    status,
    validUntil,
  }).toString();
  return fetchApi(ENDPOINTS.coupons.query(queryParams), "GET");
};

// Update a coupon
export const couponUpdate = async (data) => {
  return fetchApi(ENDPOINTS.coupons.base, "POST", data);
};

// Get list of coupon ids for dropdown menu
export const getMinimalCoupons = async () => {
  const queryParams = new URLSearchParams({
    action: "minimal",
  }).toString();
  return fetchApi(ENDPOINTS.coupons.query(queryParams), "GET");
};
