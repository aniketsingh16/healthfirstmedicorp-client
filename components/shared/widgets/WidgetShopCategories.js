"use client";

import React, { useState, useEffect } from "react";
// import ProductRepository from "~/repositories/ProductRepository";
import Link from "next/link";
import { useRouter } from "next/router";

const WidgetShopCategories = () => {
    const router = useRouter();
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = router.query;

    // async function getCatgories() {
    //     const SPCategories = await ProductRepository.getProductCategories();
    //     if (SPCategories) {
    //         setCategories(SPCategories);
    //         setTimeout(function () {
    //             setLoading(false);
    //         }, 200);
    //     } else {
    //         return null;
    //     }
    // }

    // useEffect(() => {
    //     getCatgories();
    // }, []);

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            categoriesView = categories.map((item) => (
                <li key={item.productID}>
                    <Link href={`/category/${item.slug}`} legacyBehavior>
                        <a
                            className={`ps-link--line ${
                                slug && slug === item.slug ? "active" : ""
                            }`}>
                            {item.name}
                        </a>
                    </Link>
                </li>
            ));
        } else {
            categoriesView = <p>No category found.</p>;
        }
    } else {
        categoriesView = <span>Loading...</span>;
    }

    return (
        <aside className="widget widget_shop widget_categories">
            <h3 className="widget-title">Categories</h3>
            <ul className="ps-list--under">{categoriesView}</ul>
        </aside>
    );
};

export default WidgetShopCategories;
