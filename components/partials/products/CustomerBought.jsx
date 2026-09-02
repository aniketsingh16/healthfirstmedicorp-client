"use client";

import React, { useEffect } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import useProductGroup from "@/hooks/useProductGroup";

const CustomerBought = ({ similarProducts }) => {
    // const { loading, productItems, getProducts } = useGetProducts();
    const { withCarousel } = useProductGroup();

    // useEffect(() => {
    //     getProducts({ _limit: 6 });
    // }, [collectionSlug]);

    const products = withCarousel(similarProducts, false);

    return (
        <div
            className="ps-customer-bought bg--cover"
            style={{ background: "url(/static/img/related-bg.jpg)" }}>
            <div className="container">
                <div className="ps-section__header">
                    <h3>Customer also bought</h3>
                </div>
                <div className="ps-section__content">{products}</div>
            </div>
        </div>
    );
};

export default CustomerBought;
