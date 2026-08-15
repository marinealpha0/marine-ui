import { create } from 'zustand';

export const usePermissionStore = create((set) => ({
  permissions: [],
  setPermissions: (permissions) => set({ permissions: permissions || [] }),
  clearPermissions: () => set({ permissions: [] }),
}));
