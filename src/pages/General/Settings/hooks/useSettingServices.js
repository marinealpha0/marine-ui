import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  updateAppSettings, 
  updatePassword, 
  getAppSettings, 
  saveNotificationModules, 
  saveRoleNotificationPermissions,
  getSelectedNotificationModules,
  getRoleNotificationConfigurations
} from "@/api";
import { CACHE_TIMES } from "@/constant";

/**
 * Hook to update app settings (referral configuration, etc.)
 * Endpoint: PUT /admin/app-settings
 */
export const useUpdateAppSettings = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await updateAppSettings(data);
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to update app settings");
      }
      return response.data;
    },
    onError: (error) => {
      console.error("Failed to update app settings:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    data: mutation.data,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
    status: mutation.status,
  };
};

/**
 * Hook to update the current admin's password.
 * Endpoint: PUT /update-password
 * Payload: { currentPassword, newPassword }
 */
export const useUpdatePassword = () => {
  const mutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const response = await updatePassword({ currentPassword, newPassword });
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to update password");
      }
      return response.data;
    },
    onError: (error) => {
      console.error("Failed to update password:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};

/**
 * Hook to get app settings by type.
 * Endpoint: GET /app-settings?type={type}
 * @param {"referral_settings" | "admin-activity"} type
 */
export const useGetAppSettings = (type) => {
  return useQuery({
    queryKey: ["app-settings", type],
    queryFn: async () => {
      const response = await getAppSettings(type);
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to fetch app settings");
      }
      return response.data?.data;
    },
    enabled: !!type,
    refetchOnWindowFocus: false,
    staleTime: CACHE_TIMES.TABLE_DATA,
  });
};

/**
 * Hook to save selected global notification modules
 * Endpoint: POST /notifications/config/global-enable
 */
export const useSaveNotificationModules = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const response = await saveNotificationModules(payload);
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to save selected modules");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selected-notification-modules"] });
    },
    onError: (error) => {
      console.error("Failed to save selected modules:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

/**
 * Hook to save role-based notification configurations map
 * Endpoint: POST /notifications/config/save
 */
export const useSaveRoleNotificationPermissions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const response = await saveRoleNotificationPermissions(payload);
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to save role configuration");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role-notification-configurations"] });
    },
    onError: (error) => {
      console.error("Failed to save role configuration:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

/**
 * Hook to retrieve active notification modules selections
 * Endpoint: GET /notifications/config/selected-modules
 */
export const useGetSelectedNotificationModules = () => {
  return useQuery({
    queryKey: ["selected-notification-modules"],
    queryFn: async () => {
      const response = await getSelectedNotificationModules();
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to fetch selected notification modules");
      }
      return response.data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: CACHE_TIMES.TABLE_DATA,
  });
};

/**
 * Hook to retrieve role configurations permission mappings map
 * Endpoint: GET /notifications/config/role-configurations
 */
export const useGetRoleNotificationConfigurations = () => {
  return useQuery({
    queryKey: ["role-notification-configurations"],
    queryFn: async () => {
      const response = await getRoleNotificationConfigurations();
      if (!response.status) {
        throw new Error(response.errorMsg || "Failed to fetch role configurations");
      }
      return response.data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: CACHE_TIMES.TABLE_DATA,
  });
};
