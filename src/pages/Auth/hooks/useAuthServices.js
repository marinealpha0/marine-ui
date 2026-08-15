import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "@/api";

/**
 * Hook to handle admin login
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await adminLogin(credentials);
      if (!response.status) {
        const error = new Error(response.errorMsg || "Login failed. Check your credentials.");
        error.statusCode = response.statusCode;
        throw error;
      }
      return response.data;
    },
    meta: {
      skipToast: true,
    },
  });
};
