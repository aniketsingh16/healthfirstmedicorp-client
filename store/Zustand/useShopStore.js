import { create } from 'zustand';

export const useShopStore = create((set) => ({
    isGridView: true,
    isFilter: false,

    changeShopGridView: (payload) => set({ isGridView: payload }),
    toggleShopFilter: (payload) => set({ isFilter: payload }),
}));
