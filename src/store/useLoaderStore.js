import { create } from 'zustand';

export const useLoaderStore = create((set) => ({
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),
}));
