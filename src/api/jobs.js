// Jobs API calls
import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// ===== ADMIN JOB FUNCTIONS =====

// Get all jobs (admin)
export const getAdminJobs = async (filters) => {
  const {
    searchVal = "",
    location = "",
    status = "",
    publishedAt = "",
    page = 1,
    limit = 5,
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal,
    location,
    status,
    publishedAt,
    page,
    limit,
  }).toString();
  return fetchApi(ENDPOINTS.jobs.allPosts(queryParams), "GET");
};

// Get a single job
export const getSingleJob = async (jobId) => {
  return fetchApi(ENDPOINTS.jobs.get(jobId), "GET");
};

// Create a new job
export const createJob = async (jobData) => {
  return fetchApi(ENDPOINTS.jobs.create, "POST", jobData);
};

// Update a job
export const updateJob = async (jobId, jobData) => {
  return fetchApi(ENDPOINTS.jobs.update(jobId), "PUT", jobData);
};

// Delete a job
export const deleteJob = async (jobId) => {
  return fetchApi(ENDPOINTS.jobs.delete(jobId), "DELETE");
};
