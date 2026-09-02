"use client"
import React, {useState, useEffect} from "react";
import Link from "next/link";
import ModuleProductActions from "../products/modules/ModuleProductActions";
import useProduct from "../../../hooks/useProduct";
import ModuleProductRating from "@/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "../products/modules/ModuleProductImages";
import client from "../../../utilities/client";
import ProductPrice from "../ProductPrice";

// Product Box
const Product = ({ product }) => {
    console.log("Price ", product.price)
    console.log("Slug ", product.slug)
    const { price, badges } = useProduct();

    const slug = product?.slug?.current;
    
    return (
        <div className="ps-product ps-product--grid">
            <div className="ps-product__thumbnail">
                <Link href={`/products/${slug}`} className="ps-product__overlay" />
                <ModuleProductImages product={product} />
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__content">
                <h4 className="ps-product__title">
                    <Link href={`/products/${slug}`}>
                        {product.name}
                    </Link>
                </h4>
                {/* {price(product)} */}
                <ProductPrice discountedPrice={product.sellingPrice} mrp={product.mrp} />
                <ModuleProductRating value={product.rating} />
            </div>
        </div>
    );
};

export default Product;






// const Product = ({ product }) => {
//     console.log("Price ", product.price)
//     const { price, badges } = useProduct();
    
//     return (
//         <div className="ps-product ps-product--grid">
//             <div className="ps-product__thumbnail">
//                 <Link href={`/products/${product.slug}`} className="ps-product__overlay">
//                 </Link>
//                 <ModuleProductImages product={product} />
//                 <ModuleProductActions product={product} />
//                 {/* {badges(product)}  */}
//                 {/* {console.log(badges(product))} */}
//             </div>
//             <div className="ps-product__content">
//                 <h4 className="ps-product__title">
//                     <Link href={`/products/${product.slug.current}`} />
//                 </h4>
//                 {/* Rs.{product.price} */}
//                 {price(product)}
//                 <ModuleProductRating value = {product.rating} />
//             </div>
//         </div>
//     );
// };
