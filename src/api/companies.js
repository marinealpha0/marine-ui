import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

export const getAdminCompanies = async () => {
  return fetchApi(ENDPOINTS.companies.query("action=minimal&"), "GET");
};

// Get company names list
export const getCompanyNames = async () => {
  return fetchApi(ENDPOINTS.companies.query("action=names"), "GET");
};

export const getSingleCompany = async (companyId) => {
  const queryParams = new URLSearchParams({
    action: "single",
    companyId,
  }).toString();
  return fetchApi(ENDPOINTS.companies.query(queryParams), "GET");
};

export const createCompany = async (companyData) => {
  return fetchApi(ENDPOINTS.companies.base, "POST", { ...companyData, action: "create" });
};

export const updateCompany = async (companyData) => {
  return fetchApi(ENDPOINTS.companies.base, "POST", { ...companyData, action: "update" });
};

export const deleteCompany = async (companyId) => {
  return fetchApi(ENDPOINTS.companies.base, "POST", { companyId, action: "delete" });
};
