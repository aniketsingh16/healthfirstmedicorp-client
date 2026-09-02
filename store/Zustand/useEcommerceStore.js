import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useEcommerceStore = create(
    persist(
        (set) => ({
            wishlistItems: [],
            cartItems: [],
            compareItems: [],

            setWishlistItems: (payload) => set({ wishlistItems: payload }),
            setCartItems: (payload) => set({ cartItems: payload }),
            setCompareItems: (payload) => set({ compareItems: payload }),
        }),
        {
            name: 'ecommerce-storage',
            storage: createJSONStorage(() => localStorage),
            // compareItems intentionally excluded — only cart + wishlist persist
            partialize: (state) => ({
                cartItems: state.cartItems,
                wishlistItems: state.wishlistItems,
            }),
            skipHydration: true,
            // Entries saved before the catalogue moved from `id` to `productID`
            // (and any written by the old detail-page handler) have no
            // resolvable key, so nothing can ever look them up — they only
            // inflated the header badge. Drop them on rehydrate.
            merge: (persisted, current) => {
                const keyed = (list) =>
                    Array.isArray(list) ? list.filter((item) => item?.productID) : [];
                return {
                    ...current,
                    ...persisted,
                    cartItems: keyed(persisted?.cartItems),
                    wishlistItems: keyed(persisted?.wishlistItems),
                };
            },
        }
    )
);
