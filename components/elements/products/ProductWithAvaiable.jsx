import React from "react";
import Link from "next/link";
import ModuleProductActions from "@/components/elements/products/modules/ModuleProductActions";
import useProduct from "@/hooks/useProduct";
import ModuleProductRating from "@/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "@/components/elements/products/modules/ModuleProductImages";

const ProductWithAvailable = ({ product }) => {
    const { price, onSale } = useProduct();

    // Matches the route at app/(app)/products/[slug] — plural, keyed by slug.
    const href = `/products/${product.slug?.current}`;

    return (
        <div className="ps-product ps-product--grid">
            <div className="ps-product__thumbnail">
                <Link href={href} className="ps-product__overlay" />
                <ModuleProductImages product={product} />
                <ModuleProductActions product={product} />
                {onSale(product)}
            </div>
            <div className="ps-product__content">
                <h4 className="ps-product__title">
                    <Link href={href}>{product.name}</Link>
                </h4>
                {price(product)}
                <ModuleProductRating />
                <div className="ps-product__number-available">
                    <span>
                        No of pcs <br /> available
                    </span>
                    <strong>24</strong>
                </div>
            </div>
        </div>
    );
};

export default ProductWithAvailable;
