// "use client";

// import React, { useEffect, useState } from "react";
// import { toggleDrawer } from "@/store/app/action";
// import { useDispatch, connect, useSelector } from "react-redux";
// import Link from "next/link";
// import {
//     caculateArrayQuantity,
//     calculateCartQuantity,
// } from "@/utilities/ecomerce-helpers";
// // import DrawerPrimary from "../../drawers/DrawerPrimary";
// // import { toggleDrawerSuccess } from "@/redux/appSlice";
// // import { toggleDrawer } from "@/redux/appSlice";

// const ModuleHeaderActions = ({ ecommerce, search = false, products }) => {
//     // const wishlistItems = useSelector(state => state.ecommerce.wishlistItems);
//     // const cartItems = useSelector(state => state.ecommerce.cartItems);
//     // const toggleDrawer = useSelector(state => state.app.isDrawerShow);
//     // console.log("togggggle",toggleDrawer)
//     const dispatch = useDispatch();
//     const [cartTotal, setCartTotal] = useState(0);
//     const [wishlistTotal, setWishlistTotal] = useState(0);

//     console.log("CCCCCCTTTTTTTTTTT",cartTotal)
//     function handleOpenDrawer(e) {
//         e.preventDefault();
//         dispatch(toggleDrawer(true));
//     }
//     useEffect(() => {
//         if (ecommerce.cartItems) {
//             console.log("EECOMM cart items", ecommerce.cartItems)
//             setCartTotal(calculateCartQuantity(ecommerce.cartItems));
//         }
//         if (ecommerce.wishlistItems) {
//             setWishlistTotal(caculateArrayQuantity(ecommerce.wishlistItems));
//         }
//     }, [ecommerce]);

//     // view
//     let searchBtnView;
//     if (search) {
//         searchBtnView = (
//             <li>
//                 <a className="header__action" href="#">
//                     <i className="icon-magnifier"></i>
//                 </a>
//             </li>
//         );
//     }

//     return (
//         <>
//         <p className="welcome_user"> Hi, User</p>
//         <ul className="header__actions">
//             {searchBtnView}
//             <li>
//                 <Link href="/my-account" className="header__action">
//                     <i className="icon-user"></i>
//                 </Link>
//             </li>
//             <li>
//                 <Link href="/shop/wishlist" className="header__action">
//                     <i className="fa fa-heart-o"></i>
//                     <span className="header__action-badge">{wishlistTotal ? wishlistTotal : 0}</span>
//                 </Link>
//             </li>
//             <li>
//                 <a
//                     className="header__action"
//                     // href="/shop/shopping-cart"
//                     id="cart-mini"
//                     onClick={(e) => handleOpenDrawer(e)}
//                     >
//                     <i className="icon-cart-empty"></i>
//                     <span className="header__action-badge">
//                         {cartTotal ? cartTotal : 0}
//                     </span>
//                 </a>
//                 {/* <DrawerPrimary products = {products}/> */}
//                 {/* <button onClick={() => handleClick()}> <i className="icon-cart-empty"></i></button> */}
//             </li>
//         </ul>
//         </>
        
//     );
// };

// export default connect((state) => state)(ModuleHeaderActions);
// // export default ModuleHeaderActions;

"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/Zustand/useAppStore";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

import {
    caculateArrayQuantity,
    calculateCartQuantity,
} from "@/utilities/ecomerce-helpers";

const ModuleHeaderActions = ({ search = false, products }) => {
    const cartItems = useEcommerceStore((state) => state.cartItems);
    const wishlistItems = useEcommerceStore((state) => state.wishlistItems);
    const toggleDrawer = useAppStore((state) => state.toggleDrawer);

    const [cartTotal, setCartTotal] = useState(0);
    const [wishlistTotal, setWishlistTotal] = useState(0);

    function handleOpenDrawer(e) {
        e.preventDefault();
        toggleDrawer(true);
    }

    useEffect(() => {
        if (cartItems) {
            setCartTotal(calculateCartQuantity(cartItems));
        }
        if (wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(wishlistItems));
        }
    }, [cartItems, wishlistItems]);

    // view
    let searchBtnView;
    if (search) {
        searchBtnView = (
            <li>
                <a className="header__action" href="#">
                    <i className="icon-magnifier"></i>
                </a>
            </li>
        );
    }

    return (
        <>

        {/* <Show when="signed-in">
            <UserButton
                afterSwitchSessionUrl="/"
                appearance={{
                elements: {
                    avatarBox: "h-9 w-9",
                },
                }}
            />
            </Show>

            <Show when="signed-out">
            <SignInButton />
        </Show> */}
        <ul className="header__actions">
            {searchBtnView}
            <li>
                <Show when="signed-in">
                    <UserButton
                        appearance={{
                        elements: {
                            avatarBox: "user-avatar",
                        },
                        }}
                    >
                        <UserButton.MenuItems>
                        <UserButton.Link
                            label="My Orders"
                            labelIcon={<i className="fa fa-shopping-bag" />}
                            href="/orders"
                        />
                        </UserButton.MenuItems>
                    </UserButton>
                    </Show>

                    <Show when="signed-out">
                    <SignInButton
                        mode="modal"
                        appearance={{
                            elements: {
                                modalBackdrop: "clerk-modal-backdrop",
                                modalContent: "clerk-modal-content",
                                card: "clerk-card",
                                rootBox: "clerk-root-box",
                            },
                        }}
                    >
                        <button type="button" className="sign-in-button" aria-label="Sign in">
                            <i className="icon-user" aria-hidden="true"></i>
                        </button>
                    </SignInButton>
                </Show>
            </li>
            <li>
                <Link href="/shop/wishlist" className="header__action">
                    <i className="fa fa-heart-o"></i>
                    <span className="header__action-badge">{wishlistTotal ? wishlistTotal : 0}</span>
                </Link>
            </li>
            <li>
                 <a
                    className="header__action"
                    href="/shop/shopping-cart"
                    id="cart-mini"
                    onClick={(e) => handleOpenDrawer(e)}
                    >
                    <i className="icon-cart-empty"></i>
                    <span className="header__action-badge">
                        {cartTotal ? cartTotal : 0}
                    </span>
                </a>
            </li>
        </ul>
        </>
    );
};

export default ModuleHeaderActions;