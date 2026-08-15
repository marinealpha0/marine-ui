import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all projects with pagination and filters
export const getAllProjects = async (filters) => {
    const {
        searchVal = "",
        page = 1,
        limit = 10,
        difficulty = "",
        isActive = "",
    } = filters || {};

    const queryParams = new URLSearchParams({
        searchVal,
        page,
        limit,
        level: difficulty, // Map difficulty to level
        isActive: isActive === "all" ? "" : isActive,
    }).toString();
    return fetchApi(ENDPOINTS.projects.query(queryParams), "GET");
};

// Get single project by ID
export const getProjectById = (projectId) => {
    return fetchApi(
        ENDPOINTS.projects.byId(projectId),
        "GET",
    );
};

// Create a new project
export const createProject = (projectData) => {
    const data = { ...projectData, action: "create" };
    return fetchApi(ENDPOINTS.projects.base, "POST", data);
};

// Update an existing project
export const updateProject = (projectData) => {
    const { projectId, ...data } = projectData;
    return fetchApi(ENDPOINTS.projects.byId(projectId), "PUT", data);
};



// Get all assigned projects (submissions)
export const getAssignedProjects = async (filters) => {
    const {
        searchVal = "",
        page = 1,
        limit = 10,
        status = "",
    } = filters || {};

    const queryParams = new URLSearchParams({
        searchVal,
        page,
        limit,
        status,
    }).toString();

    return fetchApi(ENDPOINTS.projects.assignedQuery(queryParams), "GET");
};

// Get single assigned project (submission) by ID
export const getAssignedProjectById = (submissionId) => {
    return fetchApi(
        ENDPOINTS.projects.assignedById(submissionId),
        "GET",
    );
};
