import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

export const toggleEntityStatus = async (entityId, entityType) => {
    return fetchApi(
        ENDPOINTS.entity.toggleConfirm,
        "PATCH",
        { entityId, entityType }
    );
};
