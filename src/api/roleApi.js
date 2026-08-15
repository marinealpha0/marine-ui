import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

export const roleApi = {
    // Fetch all roles with pagination
    getAllRoles: async (params = {}) => {
        const { searchVal = "", page = 1, limit = 10, action = "all" } = params;
        const queryParams = new URLSearchParams({
            searchVal,
            page,
            limit,
            action
        }).toString();
        return await fetchApi(ENDPOINTS.roles.query(queryParams), "GET");
    },

    // Get single role by ID
    getRoleById: async (id) => {
        return await fetchApi(ENDPOINTS.roles.byId(id), "GET");
    },

    // Create a new role
    createRole: async (roleData) => {
        return await fetchApi(ENDPOINTS.roles.base, "POST", roleData);
    },

    // Update existing role
    updateRole: async (id, roleData) => {
        return await fetchApi(ENDPOINTS.roles.byId(id), "PUT", roleData);
    },

    // Delete a role
    deleteRole: async (id) => {
        return await fetchApi(ENDPOINTS.roles.byId(id), "DELETE");
    },

    // Toggle Role Status (Delete/Restore)
    toggleRoleStatus: async (id) => {
        return await fetchApi(ENDPOINTS.roles.byId(id), "PATCH");
    }
};
