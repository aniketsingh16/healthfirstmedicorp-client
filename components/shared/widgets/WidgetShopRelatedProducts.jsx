"use client";

import React, { useEffect } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import Product from "@/components/elements/products/Product";
import { generateTempArray } from "@/utilities/common-helpers";
import SkeletonProduct from "@/components/elements/skeletons/SkeletonProduct";

const WidgetShopRelatedProducts = () => {
    const { loading, productItems, getProducts } = useGetProducts();

    useEffect(() => {
        getProducts({ _limit: 2 });
    }, []);

    let productsView;
    if (productItems && productItems.length > 0) {
        productsView = productItems.map((item) => (
            <Product product={item} key={item.productID} />
        ));
    } else {
        if (loading) {
            const items = generateTempArray(4).map((item) => (
                <SkeletonProduct key={item} />
            ));
            productsView = (
                <div className="ps-shop-items with-skeleton">{items}</div>
            );
        } else {
            productsView = <p>No product found.</p>;
        }
    }
    return (
        <div className="widget widget--shop widget--shop-related-products">
            <h4 className="widget__heading">Related products</h4>
            <div className="widget__content">{productsView}</div>
        </div>
    );
};

export default WidgetShopRelatedProducts;
