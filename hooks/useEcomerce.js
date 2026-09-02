// // "use client";
// // import React, { useState, useEffect } from "react";
// // // import ProductRepository from "@/repositories/ProductRepository";
// // import { useCookies } from "react-cookie";
// // import { useDispatch } from "react-redux";
// // import {
// //     setCompareItems,
// //     setCartItems,
// //     setWishlistItems,
// // } from "@/store/ecommerce/action";
// // import { client } from "@/utilities/client";

// // export default function useEcomerce() {
// //     const dispatch = useDispatch();
// //     const [loading, setLoading] = useState(false);
// //     const [cartItemsOnCookie] = useState(null);
// //     const [cookies, setCookie] = useCookies(["cart"]);
// //     const [products, setProducts] = useState([]);
// //     const [wishlistProducts, setWishlistProducts] = useState([]);
// //     const [cartProducts, setCartProducts] = useState([]);

// //     return {
// //         loading,
// //         cartItemsOnCookie,
// //         products,
// //         wishlistProducts,
// //         cartProducts,
        
// //         getProducts: (payload, allProducts, group = "") => {
// //             console.log("CCCARTTT_ITEMS",payload)
// //             setLoading(true);
// //             if (payload && payload.length > 0) {
// //                 const idsToFind = [];
// //                 payload.forEach(item => idsToFind.push(item.id));

// //                 const responseData = allProducts.filter(product => idsToFind.includes(product.id));
// //                 if (responseData && responseData.length > 0) {
// //                     if (group === "cart") {
                        
// //                         let cartItems = responseData;
// //                         payload.forEach((item, index) => {
// //                             if (item.id === cartItems[index].id) {
// //                                 console.log(true);
// //                                 cartItems[index].quantity = item.quantity;
// //                             }
// //                         });
// //                         setCartProducts(cartItems);
// //                     } else {
// //                         setWishlistProducts(responseData);
// //                     }
// //                     setTimeout(
// //                         function () {
// //                             setLoading(false);
// //                         }.bind(this),
// //                         250
// //                     );
// //                 }
// //             } 
// //             else {
// //                 setLoading(false);
// //                 setWishlistProducts([]);
// //             }
// //         },
// //         increaseQty: (payload, currentCart) => {
// //             let cart = [];
// //             if (currentCart) {
// //                 cart = currentCart;
// //                 const existItem = cart.find((item) => item.id === payload.id);
// //                 if (existItem) {
// //                     existItem.quantity = existItem.quantity + 1;
// //                 }
// //                 setCookie("cart", cart, { path: "/" });
// //                 dispatch(setCartItems(cart));
// //             }
// //             return cart;
// //         },

// //         decreaseQty: (payload, currentCart) => {
// //             let cart = [];
// //             if (currentCart) {
// //                 cart = currentCart;
// //                 const existItem = cart.find((item) => item.id === payload.id);
// //                 if (existItem) {
// //                     if (existItem.quantity > 1) {
// //                         existItem.quantity = existItem.quantity - 1;
// //                     }
// //                 }
// //                 setCookie("cart", cart, { path: "/" });
// //                 dispatch(setCartItems(cart));
// //             }
// //             return cart;
// //         },
// //         // newItem means Product on which we are on
// //         addItem: (newItem, items, group) => {
// //             console.log("NEW_ITEM", newItem)
// //             console.log("ITEMS", items)
// //             console.log("GROUP", group)
// //             let newItems = [];
// //             if (items) {
// //                 newItems = items;
// //                 const existItem = items.find((item) => item.id === newItem.id);
// //                 if (existItem) {
// //                     if (group === "cart") {
// //                         existItem.quantity += newItem.quantity;
// //                     }
// //                 } else {
// //                     newItems.push(newItem);
// //                 }
// //             } else {
// //                 newItems.push(newItem);
// //             }
// //             if (group === "cart") {
// //                 setCookie("cart", newItems, { path: "/" });
// //                 dispatch(setWishlistItems(newItems));
// //             }
// //             if (group === "wishlist") {
// //                 console.log("NewwwwwwItems",newItems);
// //                 setCookie("wishlist", newItems, { path: "/" });
// //                 dispatch(setWishlistItems(newItems));
                
// //                 console.log("Itemmmmm",newItem);
// //             }

// //             return newItems;
// //         },

// //         removeItem: (selectedItem, items, group) => {
// //             let currentItems = items;
// //             if (currentItems.length > 0) {
// //                 const index = currentItems.findIndex(
// //                     (item) => item.id === selectedItem.id
// //                 );
// //                 currentItems.splice(index, 1);
// //             }
// //             if (group === "cart") {
// //                 setCookie("cart", currentItems, { path: "/" });
// //                 dispatch(setCartItems(currentItems));
// //             }
// //             if (group === "wishlist") {
// //                 setCookie("wishlist", currentItems, { path: "/" });
// //                 dispatch(setWishlistItems(currentItems));
// //                 setWishlistProducts(currentItems);
// //                 console.log("REEM_ITEM",wishlistProducts)
// //             }
// //         },

// //         removeItems: (group) => {
// //             if (group === "wishlist") {
// //                 setCookie("wishlist", [], { path: "/" });
// //                 dispatch(setWishlistItems([]));
// //             }
// //             if (group === "cart") {
// //                 setCookie("cart", [], { path: "/" });
// //                 dispatch(setCartItems([]));
// //             }
// //         },
// //     };
// // }


// "use client";
// import { useState } from "react";
// import { useCookies } from "react-cookie";
// import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";

// export default function useEcomerce() {
//     const setCartItems = useEcommerceStore((state) => state.setCartItems);
//     const setWishlistItems = useEcommerceStore((state) => state.setWishlistItems);
//     const [loading, setLoading] = useState(false);
//     const [cartItemsOnCookie] = useState(null);
//     const [cookies, setCookie] = useCookies(["cart"]);
//     const [products, setProducts] = useState([]);
//     const [wishlistProducts, setWishlistProducts] = useState([]);
//     const [cartProducts, setCartProducts] = useState([]);

//     return {
//         loading,
//         cartItemsOnCookie,
//         products,
//         wishlistProducts,
//         cartProducts,

//         getProducts: (payload, allProducts, group = "") => {
//             setLoading(true);
//             if (payload && payload.length > 0) {
//                 const idsToFind = [];
//                 payload.forEach(item => idsToFind.push(item.id));

//                 const responseData = allProducts.filter(product => idsToFind.includes(product.id));
//                 if (responseData && responseData.length > 0) {
//                     if (group === "cart") {
//                         let cartItems = responseData;
//                         payload.forEach((item, index) => {
//                             if (item.id === cartItems[index].id) {
//                                 cartItems[index].quantity = item.quantity;
//                             }
//                         });
//                         setCartProducts(cartItems);
//                     } else {
//                         setWishlistProducts(responseData);
//                     }
//                     setTimeout(function () {
//                         setLoading(false);
//                     }, 250);
//                 }
//             } else {
//                 setLoading(false);
//                 setWishlistProducts([]);
//             }
//         },

//         increaseQty: (payload, currentCart) => {
//             let cart = [];
//             if (currentCart) {
//                 cart = currentCart;
//                 const existItem = cart.find((item) => item.id === payload.id);
//                 if (existItem) {
//                     existItem.quantity = existItem.quantity + 1;
//                 }
//                 setCookie("cart", cart, { path: "/" });
//                 setCartItems(cart);
//             }
//             return cart;
//         },

//         decreaseQty: (payload, currentCart) => {
//             let cart = [];
//             if (currentCart) {
//                 cart = currentCart;
//                 const existItem = cart.find((item) => item.id === payload.id);
//                 if (existItem) {
//                     if (existItem.quantity > 1) {
//                         existItem.quantity = existItem.quantity - 1;
//                     }
//                 }
//                 setCookie("cart", cart, { path: "/" });
//                 setCartItems(cart);
//             }
//             return cart;
//         },

//         // newItem means Product on which we are on
//         addItem: (newItem, items, group) => {
//             let newItems = [];
//             if (items) {
//                 newItems = items;
//                 const existItem = items.find((item) => item.id === newItem.id);
//                 if (existItem) {
//                     if (group === "cart") {
//                         existItem.quantity += newItem.quantity;
//                     }
//                 } else {
//                     newItems.push(newItem);
//                 }
//             } else {
//                 newItems.push(newItem);
//             }
//             if (group === "cart") {
//                 setCookie("cart", newItems, { path: "/" });
//                 setCartItems(newItems); // was setWishlistItems(newItems) in the original — fixed
//             }
//             if (group === "wishlist") {
//                 setCookie("wishlist", newItems, { path: "/" });
//                 setWishlistItems(newItems);
//             }

//             return newItems;
//         },

//         removeItem: (selectedItem, items, group) => {
//             const currentItems = items.filter((item) => item.id !== selectedItem.id);

//             if (group === "cart") {
//                 setCookie("cart", currentItems, { path: "/" });
//                 setCartItems(currentItems);
//             }
//             if (group === "wishlist") {
//                 setCookie("wishlist", currentItems, { path: "/" });
//                 setWishlistItems(currentItems);
//                 setWishlistProducts(currentItems);
//             }
//         },

//         removeItems: (group) => {
//             if (group === "wishlist") {
//                 setCookie("wishlist", [], { path: "/" });
//                 setWishlistItems([]);
//             }
//             if (group === "cart") {
//                 setCookie("cart", [], { path: "/" });
//                 setCartItems([]);
//             }
//         },
//     };
// }

"use client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";

export default function useEcomerce() {
    const setCartItems = useEcommerceStore((state) => state.setCartItems);
    const setWishlistItems = useEcommerceStore((state) => state.setWishlistItems);
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(["cart"]);
    const [products, setProducts] = useState([]);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    return {
        loading,
        cartItemsOnCookie,
        products,
        wishlistProducts,
        cartProducts,

        // getProducts: (payload, allProducts, group = "") => {
        //     setLoading(true);
        //     if (payload && payload.length > 0) {
        //         const idsToFind = [];
        //         payload.forEach(item => idsToFind.push(item.id));

        //         const responseData = allProducts.filter(product => idsToFind.includes(product.id));
        //         if (responseData && responseData.length > 0) {
        //             if (group === "cart") {
        //                 let cartItems = responseData;
        //                 payload.forEach((item, index) => {
        //                     if (item.id === cartItems[index].id) {
        //                         cartItems[index].quantity = item.quantity;
        //                     }
        //                 });
        //                 setCartProducts(cartItems);
        //             } else {
        //                 setWishlistProducts(responseData);
        //             }
        //             setTimeout(function () {
        //                 setLoading(false);
        //             }, 250);
        //         }
        //     } else {
        //         setLoading(false);
        //         setWishlistProducts([]);
        //     }
        // },
        getProducts: (payload, allProducts, group = "") => {
    setLoading(true);

    if (payload && payload.length > 0) {
        const idsToFind = payload.map((item) => item.productID);
        const responseData = allProducts.filter((product) =>
            idsToFind.includes(product.productID)
        );

        if (responseData.length > 0) {
            if (group === "cart") {
                const cartItemsWithQty = responseData.map((product) => {
                    const payloadItem = payload.find((p) => p.productID === product.productID);
                    return { ...product, quantity: payloadItem?.quantity ?? 1 };
                });
                setCartProducts(cartItemsWithQty);
            } else {
                setWishlistProducts(responseData);
            }
            setTimeout(() => setLoading(false), 250);
        } else {
            setLoading(false);
            if (group === "cart") {
                setCartProducts([]);
            } else {
                setWishlistProducts([]);
            }
        }
    } else {
        setLoading(false);
        if (group === "cart") {
            setCartProducts([]);
        } else {
            setWishlistProducts([]);
        }
    }
},

        increaseQty: (payload, currentCart) => {
            if (!currentCart) return [];
            const cart = currentCart.map((item) =>
                item.productID === payload.productID
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCookie("cart", cart, { path: "/" });
            setCartItems(cart);
            return cart;
        },

        decreaseQty: (payload, currentCart) => {
            if (!currentCart) return [];
            const cart = currentCart.map((item) =>
                item.productID === payload.productID && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            setCookie("cart", cart, { path: "/" });
            setCartItems(cart);
            return cart;
        },

        // newItem means Product on which we are on
        addItem: (newItem, items, group) => {
            let newItems;
            if (items && items.length > 0) {
                const existItem = items.find((item) => item.productID === newItem.productID);
                if (existItem) {
                    newItems = items.map((item) =>
                        item.productID === newItem.productID && group === "cart"
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                } else {
                    newItems = [...items, newItem];
                }
            } else {
                newItems = [newItem];
            }

            if (group === "cart") {
                setCookie("cart", newItems, { path: "/" });
                setCartItems(newItems);
            }
            if (group === "wishlist") {
                setCookie("wishlist", newItems, { path: "/" });
                setWishlistItems(newItems);
            }

            return newItems;
        },

        removeItem: (selectedItem, items, group) => {
            const currentItems = items.filter((item) => item.productID !== selectedItem.productID);

            if (group === "cart") {
                setCookie("cart", currentItems, { path: "/" });
                setCartItems(currentItems);
            }
            if (group === "wishlist") {
                setCookie("wishlist", currentItems, { path: "/" });
                setWishlistItems(currentItems);
                setWishlistProducts(currentItems);
            }
        },

        removeItems: (group) => {
            if (group === "wishlist") {
                setCookie("wishlist", [], { path: "/" });
                setWishlistItems([]);
            }
            if (group === "cart") {
                setCookie("cart", [], { path: "/" });
                setCartItems([]);
            }
        },
    };
}




// "use client";
// import { useState } from "react";
// import { useCookies } from "react-cookie";
// import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";

// export default function useEcomerce() {
//     const setCartItems = useEcommerceStore((state) => state.setCartItems);
//     const setWishlistItems = useEcommerceStore((state) => state.setWishlistItems);
//     const [loading, setLoading] = useState(false);
//     const [cartItemsOnCookie] = useState(null);
//     const [cookies, setCookie] = useCookies(["cart"]);
//     const [products, setProducts] = useState([]);
//     const [wishlistProducts, setWishlistProducts] = useState([]);
//     const [cartProducts, setCartProducts] = useState([]);

//     return {
//         loading,
//         cartItemsOnCookie,
//         products,
//         wishlistProducts,
//         cartProducts,

//         getProducts: (payload, allProducts, group = "") => {
//             setLoading(true);
//             if (payload && payload.length > 0) {
//                 const idsToFind = [];
//                 payload.forEach(item => idsToFind.push(item.id));

//                 const responseData = allProducts.filter(product => idsToFind.includes(product.id));
//                 if (responseData && responseData.length > 0) {
//                     if (group === "cart") {
//                         let cartItems = responseData;
//                         payload.forEach((item, index) => {
//                             if (item.id === cartItems[index].id) {
//                                 cartItems[index].quantity = item.quantity;
//                             }
//                         });
//                         setCartProducts(cartItems);
//                     } else {
//                         setWishlistProducts(responseData);
//                     }
//                     setTimeout(function () {
//                         setLoading(false);
//                     }, 250);
//                 } else {
//                     // Matched IDs returned nothing from allProducts — clear
//                     // stale state instead of leaving old rows on screen.
//                     setLoading(false);
//                     if (group === "cart") {
//                         setCartProducts([]);
//                     } else {
//                         setWishlistProducts([]);
//                     }
//                 }
//             } else {
//                 setLoading(false);
//                 // FIX: previously only cleared wishlistProducts, so removing
//                 // the last cart item left a stale row visible until refresh.
//                 if (group === "cart") {
//                     setCartProducts([]);
//                 } else {
//                     setWishlistProducts([]);
//                 }
//             }
//         },

//         increaseQty: (payload, currentCart) => {
//             if (!currentCart) return [];
//             const cart = currentCart.map((item) =>
//                 item.id === payload.id
//                     ? { ...item, quantity: item.quantity + 1 }
//                     : item
//             );
//             setCookie("cart", cart, { path: "/" });
//             setCartItems(cart);
//             return cart;
//         },

//         decreaseQty: (payload, currentCart) => {
//             if (!currentCart) return [];
//             const cart = currentCart.map((item) =>
//                 item.id === payload.id && item.quantity > 1
//                     ? { ...item, quantity: item.quantity - 1 }
//                     : item
//             );
//             setCookie("cart", cart, { path: "/" });
//             setCartItems(cart);
//             return cart;
//         },

//         // newItem means Product on which we are on
//         addItem: (newItem, items, group) => {
//             let newItems;
//             if (items && items.length > 0) {
//                 const existItem = items.find((item) => item.id === newItem.id);
//                 if (existItem) {
//                     newItems = items.map((item) =>
//                         item.id === newItem.id && group === "cart"
//                             ? { ...item, quantity: item.quantity + newItem.quantity }
//                             : item
//                     );
//                 } else {
//                     newItems = [...items, newItem];
//                 }
//             } else {
//                 newItems = [newItem];
//             }

//             if (group === "cart") {
//                 setCookie("cart", newItems, { path: "/" });
//                 setCartItems(newItems);
//             }
//             if (group === "wishlist") {
//                 setCookie("wishlist", newItems, { path: "/" });
//                 setWishlistItems(newItems);
//             }

//             return newItems;
//         },

//         removeItem: (selectedItem, items, group) => {
//             const currentItems = items.filter((item) => item.id !== selectedItem.id);

//             if (group === "cart") {
//                 setCookie("cart", currentItems, { path: "/" });
//                 setCartItems(currentItems);
//             }
//             if (group === "wishlist") {
//                 setCookie("wishlist", currentItems, { path: "/" });
//                 setWishlistItems(currentItems);
//                 setWishlistProducts(currentItems);
//             }
//         },

//         removeItems: (group) => {
//             if (group === "wishlist") {
//                 setCookie("wishlist", [], { path: "/" });
//                 setWishlistItems([]);
//             }
//             if (group === "cart") {
//                 setCookie("cart", [], { path: "/" });
//                 setCartItems([]);
//             }
//         },
//     };
// }