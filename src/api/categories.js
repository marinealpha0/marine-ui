import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all categories
export const getAllCategories = async (filters) => {
  const {
    searchVal = "",
    page = 1,
    limit = 10,
  } = filters || {};

  const queryParams = new URLSearchParams({
    action: "all",
    searchVal,
    page,
    limit,
  }).toString();

  return fetchApi(
    ENDPOINTS.categories.query(queryParams),
    "GET",
  );
};

// Get single category by ID
export const getCategoryById = async (id) => {
  const queryParams = new URLSearchParams({
    action: "single",
    categoryId: id,
  }).toString();
  return fetchApi(ENDPOINTS.categories.query(queryParams), "GET");
};

// Create a new category
export const createCategory = async (data) => {
  const payload = {
    ...data,
    action: "create",
  };
  return fetchApi(ENDPOINTS.categories.base, "POST", payload);
};

// Update category
export const updateCategory = async (data) => {
  const payload = {
    ...data,
    action: "update",
  };
  return fetchApi(ENDPOINTS.categories.base, "POST", payload);
};

// Delete category
export const deleteCategory = async (id) => {
  return fetchApi(ENDPOINTS.categories.delete(id), "DELETE");
};

// Get all categories for dropdown (no pagination)
export const getCategoriesDropdown = async () => {
  const queryParams = new URLSearchParams({
    action: "minimal",
  }).toString();
  return fetchApi(ENDPOINTS.categories.query(queryParams), "GET");
};
