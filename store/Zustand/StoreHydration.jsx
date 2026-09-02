'use client';

import { useEffect } from 'react';
import { useEcommerceStore } from './useEcommerceStore';

// Mount this once near the top of your root layout (inside <body>).
// It replaces the old <StoreProvider> — no context wrapper needed for
// the rest of the tree, this just triggers rehydration of persisted state.
export default function StoreHydration() {
    useEffect(() => {
        useEcommerceStore.persist.rehydrate();
    }, []);

    return null;
}
