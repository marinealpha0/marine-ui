import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

export const moduleApi = {
    // Fetch full hierarchy
    getAllModules: async (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const endpoint = queryParams ? ENDPOINTS.modules.query(queryParams) : ENDPOINTS.modules.base;
        return await fetchApi(endpoint, "GET");
    },

    // Create new modules with submodules and actions
    createModules: async (modulesData) => {
        return await fetchApi(ENDPOINTS.modules.base, "POST", modulesData);
    },

    getModuleById: async (id) => {
        return await fetchApi(ENDPOINTS.modules.byId(id), "GET");
    },

    updateModule: async (id, data) => {
        return await fetchApi(ENDPOINTS.modules.query("action=update_module"), "PUT", { id, data });
    },

    updateSubModule: async (id, data) => {
        return await fetchApi(ENDPOINTS.modules.query("action=update_sub_module"), "PUT", { id, data });
    },

    updateAction: async (id, data) => {
        return await fetchApi(ENDPOINTS.modules.query("action=update_action"), "PUT", { id, data });
    },

    addSubModule: async (moduleId, data) => {
        return await fetchApi(ENDPOINTS.modules.query("action=add_sub_module"), "PUT", { id: moduleId, data });
    },

    addModuleAction: async (moduleId, data) => {
        return await fetchApi(ENDPOINTS.modules.query("action=add_module_action"), "PUT", { id: moduleId, data });
    },

    addSubModuleAction: async (subModuleId, data) => {
        return await fetchApi(ENDPOINTS.modules.query("action=add_sub_module_action"), "PUT", { id: subModuleId, data });
    },

    toggleStatus: async (type, id) => {
        return await fetchApi(ENDPOINTS.modules.query(`type=${type}&id=${id}`), "PATCH");
    },
};
