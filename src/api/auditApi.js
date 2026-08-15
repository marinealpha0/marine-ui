import { fetchApi, API_BASE_URL } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";
import { getAccessToken } from "@/store/useAuthStore";
import axios from "axios";

export const auditApi = {
    getAllLogs: async (params = {}) => {
        const {
            page = 1,
            limit = 10,
            searchVal = "",
            status = "all",
            method = "all",
            startDate = "",
            endDate = ""
        } = params;

        const queryParams = new URLSearchParams({
            page,
            limit,
            searchVal,
            status,
            method,
            startDate,
            endDate
        }).toString();

        return await fetchApi(ENDPOINTS.audit.logs(queryParams), "GET");
    },

    exportLogs: async (params = {}) => {
        const {
            searchVal = "",
            status = "all",
            method = "all",
            startDate = "",
            endDate = ""
        } = params;

        const queryParams = new URLSearchParams({
            searchVal,
            status,
            method,
            startDate,
            endDate
        }).toString();

        const token = getAccessToken();
        const response = await axios.get(
            `${API_BASE_URL}${ENDPOINTS.audit.export(queryParams)}`,
            {
                responseType: "blob",
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
        );

        return response; // raw axios response with .data as Blob
    },

    clearLogs: async () => {
        return await fetchApi(ENDPOINTS.audit.clear, "DELETE");
    }
};
