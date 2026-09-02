import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import ModuleProductActions from "@/components/elements/products/modules/ModuleProductActions";
import useProduct from "@/hooks/useProduct";
import ModuleProductRating from "@/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "@/components/elements/products/modules/ModuleProductImages";

const ProductGridWithDetail = ({ product }) => {
    const { price, badges } = useProduct();

    return (
        <div className="ps-product ps-product--standard ps-product--grid-with-detail">
            <div className="ps-product__thumbnail">
                <ModuleProductImages product={product} />
                {badges(product)}
            </div>
            <div className="ps-product__content">
                <div className="ps-product__categories">
                    <Link href="/shop" legacyBehavior>
                        <a>Thermometer Brand</a>
                    </Link>
                </div>
                <h4 className="ps-product__title">
                    <Link href="/product/[pid]" as={`/product/${product.productID}`} legacyBehavior>
                        <a>{product.name}</a>
                    </Link>
                </h4>
                {price(product)}
                <ModuleProductRating />
                <ul className="ps-product__short-desc">
                    <li>Study history up to 30 days</li>
                    <li>Up to 5 users simultaneously</li>
                    <li>Has HEALTH certificate</li>
                </ul>
                <ModuleProductActions product={product} type="horizontal" />
            </div>
        </div>
    );
};

export default ProductGridWithDetail;
