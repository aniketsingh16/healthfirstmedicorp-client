import React from "react";
import Link from "next/link";
import ModuleProductActions from "@/components/elements/products/modules/ModuleProductActions";
import useProduct from "@/hooks/useProduct";
import ModuleProductRating from "@/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "@/components/elements/products/modules/ModuleProductImages";

const ProductOnCart = ({ product, children, simple = false }) => {
    const { price } = useProduct();

    if (simple) {
        return (
            <div className="ps-product--on-cart simple">
                <div className="ps-product__thumbnail">
                    <Link href={`/product/${product.productID}`} className="ps-product__overlay"></Link>
                    <ModuleProductImages product={product} />
                </div>
                <div className="ps-product__content">
                    <h4 className="ps-product__title">
                        <Link href={`/product/${product.productID}`}>{product.name}</Link>
                    </h4>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-product--on-cart">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.productID}`} className="ps-product__overlay"></Link>
                <ModuleProductImages product={product} />
            </div>
            <div className="ps-product__content">
                <h4 className="ps-product__title">
                    <Link href={`/product/${product.slug.current}`}>{product.name}</Link>
                </h4>
                {price(product)}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;