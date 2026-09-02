import { create } from 'zustand';

export const useAppStore = create((set) => ({
    isSearchBoxShow: false,
    isDrawerShow: false,

    toggleSearchBox: (payload) => set({ isSearchBoxShow: payload }),
    toggleDrawer: (payload) => set({ isDrawerShow: payload }),
}));
