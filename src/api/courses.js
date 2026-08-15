import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all courses with pagination and filters
export const getAllCourses = async (filters) => {
  const {
    searchVal = "",
    page = 1,
    limit = 10,
    status = "",
  } = filters || {};

  const queryParams = new URLSearchParams({
    action: "all",
    searchVal,
    page,
    limit,
    status,
  }).toString();
  return fetchApi(ENDPOINTS.courses.query(queryParams), "GET");
};

// Get minimal course data for dropdown
export const getMinimalCourses = async (categoryId) => {
  const params = { action: "minimal" };
  if (categoryId) {
    params.categoryId = categoryId;
  }
  const queryParams = new URLSearchParams(params).toString();
  return fetchApi(ENDPOINTS.courses.query(queryParams), "GET");
};

// Get single course by ID
export const getCourseById = (courseId) => {
  const queryParams = new URLSearchParams({
    action: "single",
    courseId,
  }).toString();
  return fetchApi(ENDPOINTS.courses.query(queryParams), "GET");
};

// Create a new course
export const createCourse = (courseData) => {
  const data = { ...courseData, action: "create" };
  return fetchApi(ENDPOINTS.courses.base, "POST", data);
};

// Update an existing course
export const updateCourse = (courseData) => {
  const data = { ...courseData, action: "update" };
  return fetchApi(ENDPOINTS.courses.base, "POST", data);
};

// Delete course (Best guess implementation based on pattern)
export const deleteCourse = (courseId) => {
  const queryParams = new URLSearchParams({
    courseId,
  }).toString();
  return fetchApi(ENDPOINTS.courses.query(queryParams), "DELETE");
};
