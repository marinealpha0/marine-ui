import { useQuery } from "@tanstack/react-query";
import { getAdminProfile } from "@/api";
import { CACHE_TIMES } from "@/constant";

/**
 * Custom hook to fetch the logged-in admin's profile data
 * Endpoint: GET admin/profile
 */
export const useAdminProfile = () => {
  const query = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const response = await getAdminProfile();
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to fetch admin profile");
      }
      return response.data.data;
    },
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: CACHE_TIMES.AUTH,
    gcTime: CACHE_TIMES.AUTH,
  });

  return {
    profile: query.data || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
