import React from "react";
// import { baseUrlProduct } from "@/repositories/Repository";
import { formatCurrency } from "@/utilities/product-helper";
import Link from "next/link";
import { urlFor } from "../utilities/client";

function getImageURL(source, size) {
    let image, imageURL;

    if (source) {
        if (size && size === "large") {
            if (source.formats.large) {
                image = source.formats.large.url;
            } else {
                image = source.url;
            }
        } else if (size && size === "medium") {
            if (source.formats.medium) {
                image = source.formats.medium.url;
            } else {
                image = source.url;
            }
        } else if (size && size === "thumbnail") {
            if (source.formats.thumbnail) {
                image = source.formats.source.url;
            } else {
                image = source.url;
            }
        } else if (size && size === "small") {
            if (source.formats.small !== undefined) {
                image = source.formats.small.url;
            } else {
                image = source.url;
            }
        } else {
            image = source.url;
        }
        imageURL = `${baseUrlProduct}${image}`;
    } else {
        imageURL = `/static/img/undefined-product-thumbnail.jpg`;
    }
    return imageURL;
}

export default function useProduct() {
    return {
        thumbnailImages: (payload) => {
            if (payload) {
                if (payload.imageurl) {
                    return (
                        <>
                            <img
                                src={urlFor(payload.imageurl)}
                                alt=""
                            />
                            <img
                                src={urlFor(payload.imageurl)}
                                className="second"
                                alt=""
                            />
                        </>
                    );
                }
            }
        },
        price: (payload) => {
            let view;
            if (payload.sellingPrice) {
                view = (
                    <p className="ps-product__price sale">
                        <span>₹</span>
                        {formatCurrency(payload.sellingPrice)}
                        <del className="ml-2">
                            <span>₹</span>
                            {formatCurrency(payload.mrp)}
                        </del>
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>₹</span>
                        {formatCurrency(payload.mrp)}
                    </p>
                );
            }
            return view;
        },
        badges: (payload) => {
            let view = null;
            if (payload.badges && payload.badges.length > 0) {
                const items = payload.badges.map((item) => {
                    if (item.value === "hot") {
                        return (
                            <span
                                className="ps-product__badge hot"
                                key={item.productID}>
                                Hot
                            </span>
                        );
                    }
                    if (item.value === "new") {
                        return (
                            <span
                                className="ps-product__badge new"
                                key={item.productID}>
                                New
                            </span>
                        );
                    }
                    if (item.value === "sale") {
                        return (
                            <span
                                className="ps-product__badge sale"
                                key={item.productID}>
                                Sale
                            </span>
                        );
                    }
                });
                view = <div className="ps-product__badges">{items}</div>;
            }
            return view;
        },
            onSale: (payload) => {
                let view = null;
                if (payload.mrp && payload.sellingPrice && payload.mrp > payload.sellingPrice) {
                    const discountPercent = Math.round(
                        ((payload.mrp - payload.sellingPrice) / payload.mrp) * 100
                    );
                    view = (
                        <span className="ps-product__on-sale">
                            -{discountPercent}%
                        </span>
                    );
                }
                return view;
            },

        brand: (payload) => {
            let view;
            if (payload.company) {
                view = (
                    <Link href="/shop" className="text-capitalize">
                        {payload.company}
                    </Link>
                );
            } else {
                view = (
                    <Link href="/shop" className="text-capitalize">
                        No Brand
                    </Link>
                );
            }
            return view;
        },
    };
}