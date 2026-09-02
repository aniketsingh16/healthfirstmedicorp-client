import React from "react";
import useProduct from "@/hooks/useProduct";
import Link from "next/link";

const ModuleProductImages = ({ product }) => {
    const { thumbnailImages, price } = useProduct();
    return (
        <div className="ps-product__images">
            <Link href={`/products/${product.slug.current}`} className="ps-product__overlay"></Link>
            {thumbnailImages(product)}
        </div>
    );
};

export default ModuleProductImages;
