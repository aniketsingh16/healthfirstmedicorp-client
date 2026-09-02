import React, { useEffect } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import useProductGroup from "@/hooks/useProductGroup";

const settings = {
    loop: true,
    slidesPerView: 4,
    pagination: true,
    breakpoints: {
        320: {
            slidesPerView: 2,
        },

        768: {
            slidesPerView: 3,
        },

        992: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 4,
        },
    },
};

const ShopBestSellers = ({ bestsellers }) => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withCarousel } = useProductGroup();

    // useEffect(() => {
    //     getProducts({ _limit: 6 });
    // }, [collectionSlug]);
    const products = withCarousel(bestsellers, loading, settings);

    return (
        <section className="ps-section--shop ps-shop-best-sellers">
            <div className="ps-section__header">
                <h3>Bestsellers in Face Masks</h3>
            </div>
            <div className="ps-section__content">{products}</div>
        </section>
    );
};

export default ShopBestSellers;
