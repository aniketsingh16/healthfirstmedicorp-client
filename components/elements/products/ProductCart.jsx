import React from "react";
import Link from "next/link";
import { SPGetProductThumbailImage } from "@/utilities/product-helper";
const ProductCart = ({ product }) => {
    const imageThumbnail = SPGetProductThumbailImage(product, "thumbnail");
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[id]" as={`/product/${product.productID}`} legacyBehavior>
                    <a>{imageThumbnail}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href="/product/[id]" as={`/product/${product.productID}`} legacyBehavior>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
            </div>
        </div>
    );
};

export default ProductCart;
