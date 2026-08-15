import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Upload files initialization
export const uploadFilesInit = async (data) => {
  return fetchApi(ENDPOINTS.upload.file, "POST", data);
};
