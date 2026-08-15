import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// ===== LEADS MANAGEMENT FUNCTIONS =====

// Get all leads with filters and pagination
export const getAllLeads = async (filters) => {
  const {
    searchVal = "",
    status = "all",
    priorityStatus = "all",
    source = "all",
    page = 1,
    limit = 5,
  } = filters;
  
  const queryParams = new URLSearchParams({
    searchVal: searchVal.toLowerCase(),
    status: status || "all",
    priorityStatus: priorityStatus || "all",
    leadSource: source || "all",
    page,
    limit,
  }).toString();

  return fetchApi(ENDPOINTS.leads.query(queryParams), "GET");
};

// Get single lead details by ID
export const getLeadById = async (leadId) => {
  return fetchApi(ENDPOINTS.leads.getDetails(leadId), "GET");
};

// Create a new lead
export const createLead = async (leadData) => {
  return fetchApi(ENDPOINTS.leads.create, "POST", leadData);
};

// Update lead status (admin/executive only)
export const updateLeadStatus = async (leadId, status, notes = "") => {
  return fetchApi(ENDPOINTS.leads.updateStatus(leadId), "PUT", { status, notes });
};

// Update lead general details
export const updateLead = async (leadId, leadData) => {
  return fetchApi(ENDPOINTS.leads.update(leadId), "PATCH", leadData);
};

// Add note for lead
export const addLeadNote = async (leadId, text) => {
  return fetchApi(ENDPOINTS.leads.addNote(leadId), "POST", { text });
};

// Bulk upload leads
export const bulkUploadLeads = async (formData) => {
  return fetchApi(ENDPOINTS.leads.bulkUpload, "POST", formData);
};
