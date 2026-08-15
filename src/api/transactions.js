import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get transactions
export const getTransactions = async (filters) => {
  const {
    searchVal = "",
    plan = "",
    transactionId = "",
    page = 1,
    limit = 5,
  } = filters;
  
  const queryParams = new URLSearchParams({
    searchVal,
    plan,
    transactionId,
    page,
    limit,
  }).toString();
  
  return fetchApi(
    ENDPOINTS.transactions.query(queryParams),
    "GET",
  );
};
