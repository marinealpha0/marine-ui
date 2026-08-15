import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all cheatsheets
export const getAllCheatsheets = async (filters) => {
  const {
    searchVal = "",
    courseId = "",
    page = 1,
    limit = 10,
  } = filters;

  const queryParams = new URLSearchParams({
    action: "all",
    searchVal,
    courseId: courseId === "all" ? "" : courseId,
    page,
    limit,
  }).toString();

  return fetchApi(
    ENDPOINTS.cheatsheets.query(queryParams),
    "GET",
  );
};

// Get single cheatsheet by ID
export const getCheatsheetById = async (id) => {
  const queryParams = new URLSearchParams({
    action: "single",
    cheatsheetId: id,
  }).toString();
  return fetchApi(ENDPOINTS.cheatsheets.query(queryParams), "GET");
};

// Create a new cheatsheet
export const createCheatsheet = async (data) => {
  const queryParams = new URLSearchParams({
    action: "create",
  }).toString();
  return fetchApi(ENDPOINTS.cheatsheets.query(queryParams), "POST", data);
};

// Update cheatsheet (Update specific section)
export const updateCheatsheet = async (id, data) => {
  const queryParams = new URLSearchParams({
    cheatsheetId: id,
  }).toString();
  return fetchApi(ENDPOINTS.cheatsheets.query(queryParams), "PUT", data);
};

// Delete cheatsheet
export const deleteCheatsheet = async (id) => {
  const queryParams = new URLSearchParams({
    cheatsheetId: id,
  }).toString();
  return fetchApi(ENDPOINTS.cheatsheets.query(queryParams), "DELETE");
};
