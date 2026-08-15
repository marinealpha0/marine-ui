import { useEffect } from 'react';
import { getAuthMe } from "@/api";
import { getAdminData } from "@/utils/authStorage";
import { 
  useAuthStore, 
  usePermissionStore, 
  useLoaderStore, 
  useSidebarStore, 
  setAccessToken 
} from "@/store";

export const useAuthInitialization = () => {
  const { setUser, setIsAuthenticated, logout } = useAuthStore();
  const { setPermissions } = usePermissionStore();
  const { setLoading } = useLoaderStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await getAuthMe();

        if (response.status && response.data) {
          const { user: apiUser, access_token, accessToken, jwtToken, ...rest } = response.data;
          const token = access_token || accessToken || jwtToken;

          if (token) {
            setAccessToken(token);
          }

          // Use returned user data, fallback to flat structure or local storage
          const userData = apiUser || (rest.adminId ? rest : getAdminData());

          if (userData && userData.actions) {
            setPermissions(userData.actions);
          } else if (rest.actions) {
            setPermissions(rest.actions);
          }

          if (userData && userData.sidebar) {
            useSidebarStore.getState().setSidebar(userData.sidebar);
          } else if (rest.sidebar) {
            useSidebarStore.getState().setSidebar(rest.sidebar);
          }

          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Init auth failed", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const handleLogoutEvent = () => {
      logout(true); // Perform local cleanup
    };
    window.addEventListener('auth:logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('auth:logout', handleLogoutEvent);
    };
  }, [logout, setUser, setIsAuthenticated, setLoading, setPermissions]);
};
