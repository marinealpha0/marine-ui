import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Global error for queries
      const meta = query.meta ?? {};
      if (meta.skipGlobalError) return;

      // Use the error message from the API if available (error.message),
      // otherwise fallback to 'Something went wrong'.
      // The fetcher function must throw an Error with the API message for this to work.
      const errorMessage = meta.errorMessage || error.message || 'Something went wrong';
      
      toast.error(errorMessage);
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (_data, _vars, _ctx, mutation) => {
      const meta = mutation.meta ?? {};
      // Only show a global success toast when explicitly opted-in via meta.successMessage.
      // Components that call toast.success() themselves should NOT set meta.successMessage.
      // This prevents double-toasts across all pages.
      if (!meta.successMessage) return;

      toast.success(meta.successMessage);
    },
    onError: (error, _vars, _ctx, mutation) => {
      const meta = mutation.meta ?? {};
      // Only show a global error toast when explicitly opted-in via meta.errorMessage.
      // Mutations with their own onError handlers should NOT set meta.errorMessage.
      if (!meta.errorMessage) return;

      const errorMessage = meta.errorMessage || error.message || 'Request failed';
      toast.error(errorMessage);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
