import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all legal pages
export const getAllLegalPages = async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return fetchApi(ENDPOINTS.legalPages.query(queryParams), "GET");
};

// Get single legal page by ID
export const getLegalPageById = async (id) => {
    return fetchApi(ENDPOINTS.legalPages.byId(id), "GET");
};

// Create a legal page
export const createLegalPage = async (data) => {
    return fetchApi(ENDPOINTS.legalPages.base, "POST", data);
};

// Update a legal page
export const updateLegalPage = async ({ id, ...data }) => {
    return fetchApi(ENDPOINTS.legalPages.byId(id), "PUT", data);
};

// Delete a legal page
export const deleteLegalPage = async (id) => {
    return fetchApi(ENDPOINTS.legalPages.byId(id), "DELETE");
};
