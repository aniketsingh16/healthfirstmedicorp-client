// import React, { useState } from "react";
// import { Modal } from "antd";
// import { useDispatch, connect } from "react-redux";
// import useEcomerce from "@/hooks/useEcomerce";
// import { toggleDrawer } from "@/store/app/action";
// import DetailQuickView from "@/components/elements/detail/DetailQuickView";
// // import { toggleDrawer } from "@/redux/appSlice";

// const ModuleProductActions = ({
//     product,
//     type = "vertical",
//     cart,
//     ecommerce,
// }) => {
//     const dispatch = useDispatch();
//     const [isQuickView, setIsQuickView] = useState(false);
//     const { addItem } = useEcomerce();

//     function handleAddItemToCart(e) {
//         e.preventDefault();
//         addItem({ id: product.id, quantity: 1 }, ecommerce.cartItems, "cart");
//         dispatch(toggleDrawer(true));
//     }

//     function handleAddItemToWishlist(e) {
//         e.preventDefault();
//         addItem({ id: product.id }, ecommerce.wishlistItems, "wishlist");
//         const modal = Modal.success({
//             centered: true,
//             title: "Success!",
//             content: `This item has been added to your wishlist`,
//         });
//         modal.update;
//     }

//     // function handleAddItemToCompare(e) {
//     //     e.preventDefault();
//     //     addItem({ id: product.id }, ecomerce.compareItems, "compare");
//     //     const modal = Modal.success({
//     //         centered: true,
//     //         title: "Success!",
//     //         content: `This product has been added to your compare listing!`,
//     //     });
//     //     modal.update;
//     // }

//     function handleShowQuickView(e) {
//         e.preventDefault();
//         setIsQuickView(true);
//     }

//     function handleHideQuickView(e) {
//         e.preventDefault();
//         setIsQuickView(false);
//     }

//     if (type === "vertical") {
//         return (
//             <>
//                 <div className="ps-product__actions">
//                     <a
//                         href="#"
//                         className="ps-product__action"
//                         title="Wishlist"
//                         onClick={(e) => handleAddItemToWishlist(e)}>
//                         <i className="fa fa-heart-o"></i>
//                     </a>
//                     {/* <a
//                         href="#"
//                         className="ps-product__action"
//                         title="Add to compare"
//                         onClick={(e) => handleAddItemToCompare(e)}>
//                         <i className="fa fa-align-left"></i>
//                     </a> */}
//                     <a
//                         href="#"
//                         className="ps-product__action"
//                         title="Quick view"
//                         onClick={(e) => handleShowQuickView(e)}>
//                         <i className="fa fa-search"></i>
//                     </a>
//                     <a
//                         href="#"
//                         className="ps-product__action"
//                         title="Add to cart"
//                         onClick={(e) => handleAddItemToCart(e)}>
//                         <i className="fa fa-shopping-basket"></i>
//                     </a>
//                 </div>
//                 <Modal
//                     centered
//                     footer={null}
//                     width={1024}
//                     onCancel={(e) => handleHideQuickView(e)}
//                     visible={isQuickView}
//                     zIndex={9999}
//                     closeIcon={<i className="icon icon-cross2"></i>}>
//                     <DetailQuickView product={product} />
//                 </Modal>
//             </>
//         );
//     } else {
//         return (
//             <>
//                 <div className="ps-product__actions-horizontal">
//                     <div className="ps-product__btn-add-cart">
//                         <a
//                             href="#"
//                             className="ps-btn"
//                             onClick={(e) => handleAddItemToCart(e)}>
//                             Add to cart
//                         </a>
//                     </div>
//                     <div className="ps-product__other-actions">
//                         <a onClick={(e) => handleAddItemToWishlist(e)}>
//                             <i className="icon-heart"></i>
//                         </a>
//                         <a onClick={(e) => handleAddItemToWishlist(e)}>
//                             <i className="icon-signal"></i>
//                         </a>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// };
// export default connect((state) => state)(ModuleProductActions);

import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "sonner";
import useEcomerce from "@/hooks/useEcomerce";
import { useAppStore } from "@/store/Zustand/useAppStore";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";
import DetailQuickView from "@/components/elements/detail/DetailQuickView";

const ModuleProductActions = ({
    product,
    type = "vertical",
    cart,
}) => {
    const toggleDrawer = useAppStore((state) => state.toggleDrawer);
    const cartItems = useEcommerceStore((state) => state.cartItems);
    const wishlistItems = useEcommerceStore((state) => state.wishlistItems);
    const [isQuickView, setIsQuickView] = useState(false);
    const { addItem } = useEcomerce();

    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem({ productID: product.productID, quantity: 1 }, cartItems, "cart");

        toggleDrawer(true);
    }

        function handleAddItemToWishlist(e) {
        e.preventDefault();

        const alreadySaved = wishlistItems?.some(
            (item) => item.productID === product.productID
        );

        addItem({ productID: product.productID }, wishlistItems, "wishlist");

        toast.success(
            alreadySaved ? `Product "${product.name}" is already in your wishlist` : `Product "${product.name}" Added to your wishlist`,
            { id: `wishlist-${product.productID}` }
        );
    }

    function handleShowQuickView(e) {
        e.preventDefault();
        setIsQuickView(true);
    }

    function handleHideQuickView(e) {
        e.preventDefault();
        setIsQuickView(false);
    }

    if (type === "vertical") {
        return (
            <>
                <div className="ps-product__actions">
                    <a
                        href="#"
                        className="ps-product__action"
                        title="Wishlist"
                        onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="fa fa-heart-o"></i>
                    </a>
                    {/* <a
                        href="#"
                        className="ps-product__action"
                        title="Quick view"
                        onClick={(e) => handleShowQuickView(e)}>
                        <i className="fa fa-search"></i>
                    </a> */}
                    <a
                        href="#"
                        className="ps-product__action"
                        title="Add to cart"
                        onClick={(e) => handleAddItemToCart(e)}>
                        <i className="icon-cart" />
                    </a>
                </div>
                <Modal
                    centered
                    footer={null}
                    width={1024}
                    onCancel={(e) => handleHideQuickView(e)}
                    visible={isQuickView}
                    zIndex={9999}
                    closeIcon={<i className="icon icon-cross2"></i>}>
                    <DetailQuickView product={product} />
                </Modal>
            </>
        );
    } else {
        return (
            <>
                <div className="ps-product__actions-horizontal">
                    <div className="ps-product__btn-add-cart">
                        <a
                            href="#"
                            className="ps-btn"
                            onClick={(e) => handleAddItemToCart(e)}>
                            Add to cart
                        </a>
                    </div>
                    <div className="ps-product__other-actions">
                        <a onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-heart"></i>
                        </a>
                        <a onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-signal"></i>
                        </a>
                    </div>
                </div>
            </>
        );
    }
};

export default ModuleProductActions;