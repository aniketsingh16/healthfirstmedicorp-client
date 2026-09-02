"use client";

import Link from "next/link";
import React, { useEffect, useContext } from "react";
import Container from "@/components/layouts/Container";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { caculateArrayQuantity } from "@/utilities/ecomerce-helpers";
import useEcomerce from "@/hooks/useEcomerce";
import ModuleEcomerceWishlist from "@/components/ecomerce/modules/ModuleEcomerceWishlist";
import SkeletonTable from "@/components/elements/skeletons/SkeletonTable";
import { Result } from "antd";
import ProductsContext from "@/utilities/ProductContext";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";

const breadcrumb = [
    { text: "Home", url: "/" },
    { text: "Shop", url: "/shop" },
    { text: "Wishlist" },
];


export default function WishlistScreen() {
    const wishlistItems = useEcommerceStore((state) => state.wishlistItems);
    const { products } = useContext(ProductsContext);
    let allProducts = products;
    const { loading, getProducts, wishlistProducts } = useEcomerce();

    useEffect(() => {
        if (products?.length > 0) {
            getProducts(wishlistItems ?? [], allProducts);
        }
    }, [wishlistItems, products]);
    
    let totalView, wishListView;
    if (wishlistProducts && wishlistProducts.length > 0) {
        totalView = caculateArrayQuantity(wishlistProducts);
        wishListView = <ModuleEcomerceWishlist source={wishlistProducts} />;
    } else {
        if (loading) {
            wishListView = <SkeletonTable rows={1} />;
        } else {
                wishListView = (
                <div className="ps-empty-state">
                    <span className="ps-empty-state__icon" aria-hidden="true">
                        <i className="fa fa-heart-o" />
                    </span>
                    <h2 className="ps-empty-state__title">
                        You haven&apos;t saved anything yet.
                    </h2>
                    <p className="ps-empty-state__text">
                        Tap the heart on any product to keep it here for later.
                    </p>
                    <Link href="/" className="ps-btn ps-btn--warning">
                        Browse products
                    </Link>
                </div>
            );

        }
    }

    return (
        <Container title="Wishlist">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Wishlist
                            {totalView ? <sup>({totalView})</sup> : ""}
                        </h1>
                    </div>
                    <div className="ps-page__content">{wishListView}</div>
                </div>
            </div>
        </Container>
    );
}