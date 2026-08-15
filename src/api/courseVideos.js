import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// --- Topics API ---

// Get all topics
export const getAllTopics = async (filters) => {
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

    return fetchApi(ENDPOINTS.courseVideos.topicQuery(queryParams), "GET");
};

// Get single topic by ID
export const getTopicById = async (id) => {
    const queryParams = new URLSearchParams({
        action: "single",
        topicId: id,
    }).toString();
    return fetchApi(ENDPOINTS.courseVideos.topicQuery(queryParams), "GET");
};

// Create a topic
export const createTopic = async (data) => {
    return fetchApi(ENDPOINTS.courseVideos.topicBase, "POST", { ...data, action: "create" });
};

// Update a topic
export const updateTopic = async (data) => {
    return fetchApi(ENDPOINTS.courseVideos.topicBase, "POST", { ...data, action: "update", });
};

// Delete a topic
export const deleteTopic = async (id) => {
    return fetchApi(ENDPOINTS.courseVideos.topicDelete(id), "DELETE");
};

// API for dropdown
export const getTopicsByCourseId = async (courseId) => {
    const queryParams = new URLSearchParams({
        action: "all_topic_title",
        courseId,
    }).toString();
    return fetchApi(ENDPOINTS.courseVideos.topicQuery(queryParams), "GET");
};


// --- Videos API ---

// Get all videos
export const getAllVideos = async (filters) => {
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

    return fetchApi(ENDPOINTS.courseVideos.videoQuery(queryParams), "GET");
};

// Get single video by ID
export const getVideoById = async (params) => {
    const queryParams = new URLSearchParams({
        action: "single",
        ...params,
    }).toString();
    return fetchApi(ENDPOINTS.courseVideos.videoQuery(queryParams), "GET");
};

// Create video
export const createVideo = async (data) => {
    return fetchApi(ENDPOINTS.courseVideos.videoBase, "POST", { ...data, action: "add_in_children" });
};

// Update video
export const updateVideo = async (data) => {
    return fetchApi(ENDPOINTS.courseVideos.videoBase, "POST", { ...data, action: "update" });
};

// Delete video
export const deleteVideo = async (id) => {
    return fetchApi(ENDPOINTS.courseVideos.videoDelete(id), "DELETE");
};
