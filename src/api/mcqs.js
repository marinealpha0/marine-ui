import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all MCQs
export const getAllMcqs = async (filters) => {
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
        ENDPOINTS.mcqs.query(queryParams),
        "GET",
    );
};

// Get single MCQ by ID
export const getMcqById = async (id) => {
    const queryParams = new URLSearchParams({
        action: "single",
        courseMCQId: id,
    }).toString();
    return fetchApi(ENDPOINTS.mcqs.query(queryParams), "GET");
};

// Create a new MCQ
export const createMcq = async (data) => {
    return fetchApi(ENDPOINTS.mcqs.create, "POST", data);
};

// Update MCQ
export const updateMcq = async (id, data) => {
    return fetchApi(ENDPOINTS.mcqs.update(id), "PUT", data);
};

// Delete MCQ
export const deleteMcq = async (id) => {
    return fetchApi(ENDPOINTS.mcqs.delete(id), "DELETE");
};

// Bulk upload MCQs
export const bulkUploadMcq = async (formData) => {
    return fetchApi(ENDPOINTS.mcqs.bulkUpload, "POST", formData);
};
