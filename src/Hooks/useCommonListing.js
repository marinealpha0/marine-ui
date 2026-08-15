import { useQuery } from "@tanstack/react-query";
import {
  getAdminsByRole,
  roleApi,
  getCategoriesDropdown,
  getMinimalCourses,
} from "@/api";
import { CACHE_TIMES } from "@/constant";

/**
 * Hook to fetch admins/users by role dynamically for dropdown options
 */
export const useAdminsByRoleOptions = (roleName, enabled = false) => {
  return useQuery({
    queryKey: ["adminsByRoleOptions", roleName],
    queryFn: async () => {
      if (!roleName) return [];
      const response = await getAdminsByRole(roleName);
      if (!response.status) {
        throw new Error(response.errorMsg || `Failed to fetch users for role ${roleName}`);
      }
      return response.data?.data?.results || response.data?.data || response.data?.results || response.data || [];
    },
    enabled: enabled && !!roleName,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: CACHE_TIMES.DYNAMIC_OPTIONS,
  });
};

/**
 * Hook to fetch role names for dropdown
 */
export const useRoleNames = (options = {}) => {
  return useQuery({
    queryKey: ["roleNames"],
    queryFn: async () => {
      const res = await roleApi.getAllRoles({ action: "names", limit: 100 });
      if (res.data?.data?.results) return res.data.data.results;
      if (Array.isArray(res.data?.data)) return res.data.data;
      if (Array.isArray(res.data)) return res.data;
      return [];
    },
    enabled: false,
    retry: 0,
    staleTime: CACHE_TIMES.DYNAMIC_OPTIONS,
    ...options,
  });
};

/**
 * Hook to fetch categories for dropdown
 */
export const useCategoriesDropdown = (options = {}) => {
  return useQuery({
    queryKey: ["categoriesDropdown"],
    queryFn: async () => {
      const response = await getCategoriesDropdown();
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to fetch categories");
      }
      return response.data.data || [];
    },
    staleTime: CACHE_TIMES.DYNAMIC_OPTIONS,
    enabled: false,
    retry: 0,
    ...options,
  });
};

/**
 * Hook to fetch courses for dropdown
 */
export const useCoursesDropdown = (options = {}) => {
  return useQuery({
    queryKey: ["coursesDropdown"],
    queryFn: async () => {
      const response = await getMinimalCourses();
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to fetch courses");
      }
      return response.data.data || [];
    },
    staleTime: CACHE_TIMES.DYNAMIC_OPTIONS,
    enabled: false,
    retry: 0,
    ...options,
  });
};
