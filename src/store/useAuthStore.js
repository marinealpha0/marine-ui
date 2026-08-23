import { create } from 'zustand';
import { clearAdminData } from "@/utils/authStorage";
import { usePermissionStore } from "./usePermissionStore";
import { useSidebarStore } from "./useSidebarStore";
import { useNotificationStore } from "./useNotificationStore";

const cleanUserData = (userData, currentToken) => {
  if (!userData) return null;
  const target = userData?.user || userData?.data?.user || userData;
  const role = (typeof target.role === 'string' ? target.role : target.role?.roleName) || target.adminRole || target.roleName || "";
  const firstName = target.firstName || "";
  const lastName = target.lastName || "";
  let name = target.adminName || target.name || "";
  if (!name && (firstName || lastName)) {
    name = `${firstName} ${lastName}`.trim();
  }

  return {
    ...target,
    id: target.id || target._id || target.adminId || null,
    adminId: target.adminId || target._id || target.id || null,
    adminName: name,
    name: name,
    firstName: firstName,
    lastName: lastName,
    email: target.email || target.adminEmail || "",
    adminEmail: target.adminEmail || target.email || "",
    role: target.role || role,
    adminRole: role,
    roleName: role,
    organisation: target.organisation || null,
    fleet: target.fleet || null,
    jwtToken: target.jwtToken || target.token || currentToken || null,
    profileImg: target.profileImg || null,
    sessionId: target.sessionId || null,
    success: target.success ?? true,
    isSystemUser: typeof role === 'string' && (
      role.toLowerCase().includes('super admin') ||
      role.toLowerCase().includes('organisation_admin') ||
      role.toLowerCase().includes('organization_admin')
    ),
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
    const actualToken = typeof token === 'string' ? token : (token?.accessToken || token?.jwtToken || token?.access_token || token?.data?.accessToken);
    const formattedUser = cleanUserData(userData, actualToken);
    const rToken = refreshTokenParam || userData?.refreshToken || userData?.refresh_token || userData?.data?.refreshToken || userData?.data?.refresh_token || null;
    if (rToken) {
      localStorage.setItem('refreshToken', rToken);
    }
    set({
      isAuthenticated: true,
      user: formattedUser,
      token: actualToken,
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
