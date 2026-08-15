import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

export const discussionApi = {

    /**
     * Get all discussions (for the user/student view, or all generic topics)
     */
    getAll: async () => {
        return await fetchApi(ENDPOINTS.discussions.assigned, 'GET');
    },

    /**
     * Get messages for a discussion
     * @param {string} discussionId
     */
    getMessages: async (discussionId) => {
        return await fetchApi(ENDPOINTS.discussions.messages(discussionId), 'GET');
    },

    /**
     * Send a message
     * @param {string} discussionId
     * @param {object} payload - { content, type }
     */
    sendMessage: async (discussionId, payload) => {
        return await fetchApi(ENDPOINTS.discussions.message(discussionId), 'POST', payload);
    }
};
