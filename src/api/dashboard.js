// Dashboard API calls
import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

export const getDashboardData = async (startDate, endDate, show) => {
  // Build query parameters
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);
  if (show) queryParams.append("show", show);

  const qs = queryParams.toString();
  const endpoint = ENDPOINTS.dashboard.get(qs);

  console.log("Dashboard API call:", {
    endpoint,
    startDate,
    endDate,
    show,
    startDateFormatted: new Date(startDate * 1000).toISOString(),
    endDateFormatted: new Date(endDate * 1000).toISOString(),
  });

  return fetchApi(endpoint, "GET");
};
