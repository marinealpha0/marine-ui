import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all submissions
export const getAllSubmissions = async (filters) => {
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
    }).toString();
    return fetchApi(ENDPOINTS.submissions.query(queryParams), "GET");
};

// Get single submission by ID
export const getSubmissionById = (submissionId) => {
    const queryParams = new URLSearchParams({
        action: "single",
        submissionId,
    }).toString();
    return fetchApi(
        ENDPOINTS.submissions.query(queryParams),
        "POST",
    );
};

// Update submission status and feedback
export const updateSubmission = (submissionData) => {
    const data = { ...submissionData, action: "update" };
    return fetchApi(ENDPOINTS.submissions.base, "POST", data);
};

// Get comments for a submission
export const getSubmissionComments = (submissionId) => {
    const queryParams = new URLSearchParams({
        action: "all",
        submissionId,
    }).toString();
    return fetchApi(
        ENDPOINTS.submissions.comment(queryParams),
        "POST",
        {}
    );
};

// Post a comment to a submission
export const postSubmissionComment = (data) => {
    const { submissionId, ...body } = data;
    const queryParams = new URLSearchParams({
        action: "create",
        submissionId,
    }).toString();
    return fetchApi(
        ENDPOINTS.submissions.comment(queryParams),
        "POST",
        body
    );
};
