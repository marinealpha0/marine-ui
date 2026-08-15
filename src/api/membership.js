// Contact API calls
import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all contact submissions (admin only)
export const postPlan = async (data) => {
  return fetchApi(
    ENDPOINTS.membership.base,
    "POST",
    { ...data, action: "create" }
  );
};

// Get plans
export const getPlans = async (filters) => {
  const {
    plan = "",
    price = "",
    duration = "",
    status = "",
    categoryId = "",
    page = 1,
    limit = 5,
  } = filters;
  const queryParams = new URLSearchParams({
    action: "all",
    plan,
    price,
    duration,
    status,
    categoryId,
    page,
    limit,
  }).toString();
  return fetchApi(ENDPOINTS.membership.query(queryParams), "GET");
};

// Update plan
export const updatePlan = async (id, body) => {
  return fetchApi(
    ENDPOINTS.membership.base,
    "POST",
    { ...body, action: "update" }
  );
};

// Delete plan
export const deletePlan = async (id) => {
  const queryParams = new URLSearchParams({
    action: "single",
    membershipId: id,
  }).toString();
  return fetchApi(
    ENDPOINTS.membership.query(queryParams),
    "DELETE",
  );
};
