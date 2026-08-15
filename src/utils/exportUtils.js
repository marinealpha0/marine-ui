import axios from "axios";
import { API_BASE_URL } from "@/config/apiClient";
import { getAccessToken } from "@/store/useAuthStore";
import { toast } from "sonner";
import { format } from "date-fns";

/**
 * Reusable utility to export/download files from the backend API.
 * Triggers a browser download of the response blob.
 * 
 * @param {Object} options Configuration options
 * @param {string} options.endpoint The API endpoint (e.g. /leads/export)
 * @param {string} options.filenamePrefix Prefix for fallback filename
 * @param {Object} [options.filters={}] Query filters to convert to query string
 * @returns {Promise<{status: boolean, fileName?: string, error?: any}>} Export result
 */
export const exportFile = async ({ endpoint, filenamePrefix = "export", filters = {} }) => {
  const toastId = toast.loading("Preparing download, please wait...");
  try {
    const token = getAccessToken();
    
    // Construct clean query string
    const cleanFilters = {};
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        // Convert dates if needed, or send raw
        cleanFilters[key] = val;
      }
    });
    
    const queryParams = new URLSearchParams(cleanFilters).toString();
    const separator = endpoint.includes("?") ? "&" : "?";
    const fullUrl = `${API_BASE_URL}${endpoint}${queryParams ? separator + queryParams : ""}`;

    const response = await axios.get(fullUrl, {
      responseType: "blob",
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // Attempt to extract filename from Content-Disposition header
    const disposition = response.headers?.["content-disposition"] || "";
    // Match both filename="abc.xlsx" and filename=abc.xlsx
    const fileNameMatch = disposition.match(/filename="?([^";\n]+)"?/);
    const fileName = fileNameMatch
      ? fileNameMatch[1]
      : `${filenamePrefix}-${format(new Date(), "yyyy-MM-dd-HH-mm-ss")}.xlsx`;

    // Create object URL and download file
    const url = window.URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers["content-type"] || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success(`${fileName} downloaded successfully!`, { id: toastId });
    return { status: true, fileName };
  } catch (error) {
    console.error("Export failed:", error);
    let errorMessage = "Failed to export data. Please try again.";
    
    // Check if error response is a blob containing JSON error
    if (error.response?.data instanceof Blob && error.response.data.type === "application/json") {
      try {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        errorMessage = json.message || json.errorMsg || json.error || errorMessage;
      } catch (e) {
        // Fall back to default error message
      }
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, { id: toastId });
    return { status: false, error };
  }
};

/**
 * Reusable utility to download simple sample template files.
 * 
 * @param {string} endpoint The API endpoint (e.g. /leads/sample-download)
 * @param {string} defaultFilename The fallback filename (e.g. leads-sample.xlsx)
 * @returns {Promise<boolean>} Success status
 */
export const downloadSampleFile = async (endpoint, defaultFilename) => {
  const toastId = toast.loading("Downloading template...");
  try {
    const token = getAccessToken();
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await axios.get(url, {
      responseType: "blob",
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const disposition = response.headers?.["content-disposition"] || "";
    const fileNameMatch = disposition.match(/filename="?([^";\n]+)"?/);
    const fileName = fileNameMatch ? fileNameMatch[1] : defaultFilename;

    const blobUrl = window.URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers["content-type"] || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);

    toast.success("Template downloaded successfully!", { id: toastId });
    return true;
  } catch (error) {
    console.error("Sample download failed:", error);
    toast.error("Failed to download template. Please try again.", { id: toastId });
    return false;
  }
};
