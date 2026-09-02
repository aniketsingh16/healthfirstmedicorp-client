// import React, { useEffect, useState } from "react";
// import ActiveLink from "@/components/elements/basic/ActiveLink";
// import { Drawer } from "antd";
// import { useRouter } from "next/router";
// import MenuAccordion from "@/components/shared/menus/MenuAccordion";
// import menu from "@/data/menu";
// import { connect, useSelector } from "react-redux";
// import ModuleHeaderSwichers from "@/components/shared/headers/modules/ModuleHeaderSwitcher";
// // import ModuleHeaderContactNumber from "@/components/shared/headers/modules/ModuleHeaderContactNumber";
// import FormSearchHeader from "@/components/shared/forms/FormSearchHeader";
// import { usePathname } from "next/navigation";

// const NavigationBottom = ({ classes, isActive = true }) => {
//     const ecommerce = useSelector((state) => state.ecommerce);
//     const [isMenu, setIsMenu] = useState(false);
//     const pathname = usePathname();

//     function handleOpenMenu(e) {
//         e.preventDefault();
//         setIsMenu(true);
//     }

//     function handleCloseMenu(e) {
//         e.preventDefault();
//         setIsMenu(false);
//     }

//     useEffect(() => {
//         setIsMenu(false);
//     }, [pathname]);

//     return (
//         <>
//             <nav
//                 className={`navigation--bottom ${classes} ${
//                     isActive && "active"
//                 }`}>
//                 <div className="navigation__content">
//                     <a
//                         className="navigation__item"
//                         onClick={(e) => handleOpenMenu(e)}>
//                         <i className="icon-menu"></i>
//                     </a>
//                     <ActiveLink activeClassName="active" href="/">
//                         <a className="navigation__item">
//                             <i className="icon-home2"></i>
//                         </a>
//                     </ActiveLink>
//                     <ActiveLink activeClassName="active" href="/my-account">
//                         <a className="navigation__item">
//                             <i className="icon-user"></i>
//                         </a>
//                     </ActiveLink>
//                     <ActiveLink activeClassName="active" href="/shop/wishlist">
//                         <a className="navigation__item">
//                             <i className="icon-heart"></i>
//                         </a>
//                     </ActiveLink>
//                     <ActiveLink
//                         activeClassName="active"
//                         href="/shop/shopping-cart">
//                         <a className="navigation__item cart">
//                             <i className="icon-bag2"></i>
//                             <span>
//                                 {ecommerce.cartItems &&
//                                 ecommerce.cartItems.length > 0
//                                     ? ecommerce.cartItems.length
//                                     : "0"}
//                             </span>
//                         </a>
//                     </ActiveLink>
//                 </div>
//             </nav>
//             <Drawer
//                 className="ps-panel--mobile"
//                 placement="right"
//                 closable={false}
//                 // placement="left"
//                 width={400}
//                 onClose={(e) => handleCloseMenu(e)}
//                 visible={isMenu}>
//                 <div className="ps-drawer ps-drawer--with-menu">
//                     <div className="ps-drawer__header">
//                         <a
//                             href="#"
//                             className="ps-drawer__close"
//                             onClick={(e) => handleCloseMenu(e)}>
//                             <i className="icon-cross"></i>
//                         </a>
//                     </div>
//                     <div className="ps-drawer__wrapper">
//                         <div className="ps-drawer__menu">
//                             <MenuAccordion
//                                 data={menu.main_menu_mobile}
//                                 classes="menu--accordion"
//                             />
//                         </div>
//                         <div className="ps-drawer__footer">
//                             <figure>
//                                 <FormSearchHeader />
//                             </figure>
//                             <figure>
//                                 <ModuleHeaderSwichers />
//                             </figure>
//                             <figure>
//                                 {/* <ModuleHeaderContactNumber /> */}
//                             </figure>
//                         </div>
//                     </div>
//                 </div>
//             </Drawer>
//         </>
//     );
// };

// // export default connect((state) => state)(NavigationBottom);
// export default NavigationBottom;





"use client";
import React, { useEffect, useState } from "react";
import ActiveLink from "@/components/elements/basic/ActiveLink";
import { Drawer } from "antd";
import MenuAccordion from "@/components/shared/menus/MenuAccordion";
import menu from "@/data/menu";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";
import ModuleHeaderSwichers from "@/components/shared/headers/modules/ModuleHeaderSwitcher";
import FormSearchHeader from "@/components/shared/forms/FormSearchHeader";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import {
    caculateArrayQuantity,
    calculateCartQuantity,
} from "@/utilities/ecomerce-helpers";

const NavigationBottom = ({ classes, isActive = true }) => {
    const cartItems = useEcommerceStore((state) => state.cartItems);
    const wishlistItems = useEcommerceStore((state) => state.wishlistItems);
    const [isMenu, setIsMenu] = useState(false);
    const pathname = usePathname();

    const [cartTotal, setCartTotal] = useState(0);
    const [wishlistTotal, setWishlistTotal] = useState(0);

    function handleOpenMenu(e) {
        e.preventDefault();
        setIsMenu(true);
    }

    function handleCloseMenu(e) {
        e.preventDefault();
        setIsMenu(false);
    }

    useEffect(() => {
        setIsMenu(false);
    }, [pathname]);

    useEffect(() => {
        if (cartItems) {
            setCartTotal(calculateCartQuantity(cartItems));
        }
        if (wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(wishlistItems));
        }
    }, [cartItems, wishlistItems]);

    return (
        <>
            <nav
                className={`navigation--bottom ${classes} ${
                    isActive && "active"
                }`}>
                <div className="navigation__content">
                    <a
                        className="navigation__item"
                        onClick={(e) => handleOpenMenu(e)}>
                        <i className="icon-menu"></i>
                    </a>
                    <ActiveLink activeClassName="active" href="/">
                        <a className="navigation__item">
                            <i className="icon-home2"></i>
                        </a>
                    </ActiveLink>
                    {/* <ActiveLink activeClassName="active" href="/my-account">
                        <a className="navigation__item">
                            <i className="icon-user"></i>
                        </a>
                    </ActiveLink> */}
                    <Show when="signed-in">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "user-avatar-mobile",
                                },
                            }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="My Orders"
                                    labelIcon={<i className="icon-cart" />}
                                    href="/orders"
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </Show>

                    <Show when="signed-out">
                        <SignInButton
                            mode="modal"
                            appearance={{
                                variables: {
                                    fontSize: "16px",
                                    spacingUnit: "16px",
                                    borderRadius: "8px",
                                },
                                elements: {
                                    modalBackdrop: "clerk-modal-backdrop",
                                    modalContent: "clerk-modal-content",
                                    card: "clerk-card",
                                    rootBox: "clerk-root-box",
                                },
                            }}>
                            <a className="navigation__item" href="#">
                                <i className="icon-user"></i>
                            </a>
                        </SignInButton>
                    </Show>
                    <ActiveLink activeClassName="active" href="/shop/wishlist">
                        <a className="navigation__item wishlist">
                            <i className="icon-heart"></i>
                            <span>{wishlistTotal ? wishlistTotal : "0"}</span>
                        </a>
                    </ActiveLink>
                    <ActiveLink
                        activeClassName="active"
                        href="/shop/cart">
                        <a className="navigation__item cart">
                            <i className="icon-cart" />
                            <span>{cartTotal ? cartTotal : "0"}</span>
                        </a>
                    </ActiveLink>
                </div>
            </nav>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    size={400}
                    onClose={(e) => handleCloseMenu(e)}
                    open={isMenu}>
                <div className="ps-drawer ps-drawer--with-menu">
                    <div className="ps-drawer__header">
                        <a
                            href="#"
                            className="ps-drawer__close"
                            onClick={(e) => handleCloseMenu(e)}>
                            <i className="icon-cross"></i>
                        </a>
                    </div>
                    <div className="ps-drawer__wrapper">
                        <div className="ps-drawer__menu">
                            <MenuAccordion
                                data={menu.main_menu_mobile}
                                classes="menu--accordion"
                            />
                        </div>
                        <div className="ps-drawer__footer">
                            <figure>
                                <FormSearchHeader />
                            </figure>
                            <figure>
                                {/* <ModuleHeaderSwichers /> */}
                            </figure>
                            <figure>
                                {/* <ModuleHeaderContactNumber /> */}
                            </figure>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default NavigationBottom;