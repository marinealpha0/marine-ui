import { create } from 'zustand';
import { clearAdminData } from "@/utils/authStorage";
import { usePermissionStore } from "./usePermissionStore";
import { useSidebarStore } from "./useSidebarStore";
import { useNotificationStore } from "./useNotificationStore";

const cleanUserData = (userData, currentToken) => {
  if (!userData) return null;
  const role = userData.adminRole || userData.role || "";
  return {
    adminId: userData.adminId || userData._id || userData.id || null,
    adminName: userData.adminName || userData.name || "",
    adminRole: role,
    jwtToken: userData.jwtToken || userData.token || currentToken || null,
    profileImg: userData.profileImg || null,
    sessionId: userData.sessionId || null,
    success: userData.success ?? true,
    isSystemUser: typeof role === 'string' && role.toLowerCase() === 'super admin',
  };
};

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  refreshToken: localStorage.getItem('refreshToken') || null,

  setUser: (user) => set((state) => ({ user: cleanUserData(user, state.token) })),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  login: (token, userData, refreshTokenParam = null) => {
    const formattedUser = cleanUserData(userData, token);
    const rToken = refreshTokenParam || userData?.refreshToken || userData?.refresh_token || null;
    if (rToken) {
      localStorage.setItem('refreshToken', rToken);
    }
    set({
      isAuthenticated: true,
      user: formattedUser,
      token,
      refreshToken: rToken || get().refreshToken,
    });

    if (userData?.actions) {
      usePermissionStore.getState().setPermissions(userData.actions);
    }
    if (userData?.sidebar) {
      useSidebarStore.getState().setSidebar(userData.sidebar);
    }
  },

  logout: async (localOnly = false) => {
    if (!localOnly) {
      try {
        const { logoutApi } = await import("@/api");
        await logoutApi();
      } catch (error) {
        console.error("Logout API failed", error);
      }
    }

    clearAdminData();
    localStorage.removeItem('uv_last_activity');
    localStorage.removeItem('refreshToken');

    set({ isAuthenticated: false, user: null, token: null, refreshToken: null });
    usePermissionStore.getState().clearPermissions();
    useSidebarStore.getState().clearSidebar();
    useNotificationStore.getState().clearNotifications();
  }
}));

// Export helper functions to query/mutate the Zustand token state outside React
export const getAccessToken = () => useAuthStore.getState().token;
export const setAccessToken = (token) => useAuthStore.setState({ token });
export const getRefreshToken = () => useAuthStore.getState().refreshToken || localStorage.getItem('refreshToken');
export const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    localStorage.removeItem('refreshToken');
  }
  useAuthStore.setState({ refreshToken });
};
export const clearAccessToken = () => useAuthStore.setState({ token: null });
