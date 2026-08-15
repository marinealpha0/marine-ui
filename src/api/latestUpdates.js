import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

/**
 * Get all latest updates with pagination
 */
export const getAllLatestUpdates = async (filters) => {
    const {
        page = 1,
        limit = 10,
    } = filters || {};

    const queryParams = new URLSearchParams({
        page,
        limit,
    }).toString();

    return fetchApi(
        ENDPOINTS.latestUpdates.query(queryParams),
        "GET",
    );
};

/**
 * Get single latest update by ID
 */
export const getLatestUpdateById = async (id) => {
    return fetchApi(ENDPOINTS.latestUpdates.byId(id), "GET");
};

/**
 * Create a new latest update
 */
export const createLatestUpdate = async (data) => {
    return fetchApi(ENDPOINTS.latestUpdates.base, "POST", data);
};

/**
 * Update latest update
 */
export const updateLatestUpdate = async ({ id, data }) => {
    return fetchApi(ENDPOINTS.latestUpdates.byId(id), "PUT", data);
};


