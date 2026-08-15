import { create } from 'zustand';

export const useSidebarStore = create((set) => {
  const getInitialCollapse = () => {
    try {
      const saved = localStorage.getItem("uv_sidebar_collapsed");
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.innerWidth < 768;
    } catch {
      return false;
    }
  };

  return {
    isCollapsed: getInitialCollapse(),
    sidebar: [],
    toggleCollapse: () => set((state) => {
      const next = !state.isCollapsed;
      try {
        localStorage.setItem("uv_sidebar_collapsed", JSON.stringify(next));
      } catch {}
      return { isCollapsed: next };
    }),
    setCollapsed: (collapsed) => set(() => {
      try {
        localStorage.setItem("uv_sidebar_collapsed", JSON.stringify(collapsed));
      } catch {}
      return { isCollapsed: collapsed };
    }),
    setSidebar: (sidebar) => set({ sidebar: sidebar || [] }),
    clearSidebar: () => set({ sidebar: [] })
  };
});
