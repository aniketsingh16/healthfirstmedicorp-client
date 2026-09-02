'use client';

import { useEffect } from "react";
import Link from "next/link";
import useProductGroup from "@/hooks/useProductGroup";

const HomeOneFeaturedProducts = ({
    featured_products,
    title = "Featured Products",
    showAll = false,
}) => {
    const { withGrid } = useProductGroup();
    const ft_products = withGrid(featured_products);

    let showAllView;
    if (showAll) {
        showAllView = (
            <div className="ps-section__bottom">
                <Link href="/shop" className="ps-btn ps-btn--outline ps-btn--">
                    Show all
                </Link>
            </div>
        );
    }

    return (
        <section className="ps-section--standard ps-featured-products">
            <div className="container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                </div>
                <div className="ps-section__content">{ft_products}</div>
                {showAllView}
            </div>
        </section>
    );
};

export default HomeOneFeaturedProducts;