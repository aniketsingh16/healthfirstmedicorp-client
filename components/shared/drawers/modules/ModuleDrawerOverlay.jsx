import React from 'react';
import { useAppStore } from '@/store/Zustand/useAppStore';

const ModuleDrawerOverlay = () => {
    const isDrawerShow = useAppStore((state) => state.isDrawerShow);

    return (
        <div
            className={`ps-site-overlay ${isDrawerShow ? 'active' : ''}`}></div>
    );
};

export default ModuleDrawerOverlay;