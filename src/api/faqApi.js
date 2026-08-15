import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all FAQs
export const getAllFaqs = async (filters) => {
    const {
        searchVal = "",
        page = 1,
        limit = 10,
        category,
        status,
    } = filters || {};

    const queryParams = new URLSearchParams({
        page,
        limit,
        ...(searchVal && { searchVal }),
        ...(category && category !== "All" && category !== "all" && { category }),
        ...(status && status !== "All" && status !== "all" && { status }),
    }).toString();

    return fetchApi(
        ENDPOINTS.faqs.query(queryParams),
        "GET",
    );
};

// Get single FAQ by ID
export const getFaqById = async (id) => {
    const queryParams = new URLSearchParams({
        action: "single",
        faqId: id,
    }).toString();
    return fetchApi(ENDPOINTS.faqs.query(queryParams), "GET");
};

// Create a new FAQ
export const createFaq = async (data) => {
    const payload = {
        ...data,
        action: "create",
    };
    return fetchApi(ENDPOINTS.faqs.base, "POST", payload);
};

// Update FAQ
export const updateFaq = async (data) => {
    const payload = {
        ...data,
        action: "update",
    };
    return fetchApi(ENDPOINTS.faqs.base, "POST", payload);
};


