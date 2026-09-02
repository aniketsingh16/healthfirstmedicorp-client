import React from "react";
import Link from "next/link";
import useProduct from "@/hooks/useProduct";
import ModuleProductRating from "@/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "@/components/elements/products/modules/ModuleProductImages";

const ProductList = ({ product }) => {
    const { price, badges } = useProduct();

    return (
        <div className="ps-product ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <ModuleProductImages product={product} />
                {badges(product)}
            </div>
            <div className="ps-product__wrapper">
                <div className="ps-product__content">
                    <div className="ps-product__categories">
                        <Link href="/shop" legacyBehavior>
                            <a>{product.name}</a>
                        </Link>
                    </div>
                    <h4 className="ps-product__title">
                        <Link
                            href="/product/[id]"
                            as={`/product/${product.productID}`} legacyBehavior>
                            <a>{product.name}</a>
                        </Link>
                    </h4>
                    <ModuleProductRating />
                    <ul className="ps-product__short-desc">
                        <li>Study history up to 30 days</li>
                        <li>Up to 5 users simultaneously</li>
                        <li>Has HEALTH certificate</li>
                    </ul>
                </div>
                <div className="ps-product__right">
                    {price(product)}
                    <div className="ps-product__shopping">
                        <div className="form-group--number">
                            <button className="up"></button>
                            <button className="down"></button>
                            <input
                                className="form-control"
                                type="text"
                                defaultValue="1"
                                placeholder="1"
                            />
                        </div>
                        <a className="ps-btn">Add to cart</a>
                        <div className="ps-product__quick-actions">
                            <a href="#">Add to wishlist</a>
                            {/* <a href="#">Add to compare</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
