'use client';

import React, { useEffect } from "react";
import { BackTop } from "antd";
import ModuleDrawerOverlay from "@/components/shared/drawers/modules/ModuleDrawerOverlay";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/Zustand/useAppStore";
import DrawerPrimary from "@/components/shared/drawers/DrawerPrimary";
import { useCookies } from "react-cookie";
import NavigationBottom from "@/components/shared/navigations/NavigationBottom";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";
import ModuleCustomHead from "@/components/layouts/modules/ModuleCustomHead";
import RequestCallback from "@/components/shared/modals/RequestCallback";
import ChatModal from "@/components/shared/chat/ChatModal";
import Link from "next/link";

const MasterLayout = ({ children }) => {
    const toggleDrawer = useAppStore((state) => state.toggleDrawer);
    const setCartItems = useEcommerceStore((state) => state.setCartItems);
    const setWishlistItems = useEcommerceStore((state) => state.setWishlistItems);
    const pathname = usePathname();
    const [cookies] = useCookies(["cart", "wishlist"]);

    function handleSetEcomercerParameters() {
        if (cookies) {
            if (cookies.cart) {
                setCartItems(cookies.cart);
            }
            if (cookies.wishlist) {
                setWishlistItems(cookies.wishlist);
            }
        }
    }

    // runs once on mount
    useEffect(() => {
        handleSetEcomercerParameters();

        setTimeout(function () {
            document.body.classList.add("loaded");
            document.body.classList.add("ps-loaded");
        }, 100);
    }, []);

    // replaces the old router.events "routeChangeStart" logic
    useEffect(() => {
        toggleDrawer(false);
    }, [pathname]);

    return (
        <>
            <ModuleCustomHead />
            <div className="ps-page">
                <div>
                    <Link
                        href="https://wa.me/7387086440?text=Hi"
                        className="whatsapp-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa fa-whatsapp"></i>
                        Order on WhatsApp
                    </Link>
                </div>
                {children}
                <NavigationBottom />
                <ModuleDrawerOverlay />
                <DrawerPrimary />
                <RequestCallback />
                <ChatModal />
                <div id="loader-wrapper">
                    <div className="loader-section section-left"></div>
                    <div className="loader-section section-right"></div>
                </div>
                <BackTop>
                    <button className="ps-btn--backtop">
                        <i className="icon-arrow-up"></i>
                    </button>
                </BackTop>
            </div>
        </>
    );
};

export default MasterLayout;