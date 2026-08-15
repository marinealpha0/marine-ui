import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

/**
 * Get all upcoming features with pagination
 */
export const getAllUpcomingFeatures = async (filters) => {
    const {
        page = 1,
        limit = 10,
    } = filters || {};

    const queryParams = new URLSearchParams({
        page,
        limit,
    }).toString();

    return fetchApi(
        ENDPOINTS.upcomingFeatures.query(queryParams),
        "GET",
    );
};

/**
 * Get single upcoming feature by ID
 */
export const getUpcomingFeatureById = async (id) => {
    return fetchApi(ENDPOINTS.upcomingFeatures.byId(id), "GET");
};

/**
 * Create a new upcoming feature
 */
export const createUpcomingFeature = async (data) => {
    return fetchApi(ENDPOINTS.upcomingFeatures.base, "POST", data);
};

/**
 * Update upcoming feature
 */
export const updateUpcomingFeature = async ({ id, data }) => {
    return fetchApi(ENDPOINTS.upcomingFeatures.byId(id), "PUT", data);
};


