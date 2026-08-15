import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all resume templates
export const getAllResumeTemplates = async (filters) => {
    const {
        searchVal = "",
        page = 1,
        limit = 10,
        status = "",
    } = filters || {};

    const queryParams = new URLSearchParams({
        action: "all",
        searchVal,
        page,
        limit,
        status,
    });

    return fetchApi(ENDPOINTS.resumeTemplates.query(queryParams.toString()), "GET");
};

// Get single resume template by ID
export const getResumeTemplateById = async (id) => {
    const queryParams = new URLSearchParams({
        action: "single",
        resumeMasterId: id,
    }).toString();
    return fetchApi(ENDPOINTS.resumeTemplates.query(queryParams), "GET");
};

// Create a new resume template
export const createResumeTemplate = async (data) => {
    return fetchApi(ENDPOINTS.resumeTemplates.base, "POST", { ...data, action: "create" });
};

// Update resume template
export const updateResumeTemplate = async (id, data) => {
    return fetchApi(ENDPOINTS.resumeTemplates.base, "POST", { ...data, action: "update", resumeMasterId: id });
};

// Delete resume template
export const deleteResumeTemplate = async (id) => {
    return fetchApi(ENDPOINTS.resumeTemplates.delete(id), "DELETE");
};
