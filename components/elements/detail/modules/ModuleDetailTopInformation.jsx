import React from "react";
import Link from "next/link";
import Rating from "@/components/elements/Rating";
// import useProduct from "@/hooks/useProduct";

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    // const { brand } = useProduct();

    return (
        <header className="ps-product__top-info">
            <div className="ps-product__categories">{product.company}</div>
            <h1 className="ps-product__title">{product.name}</h1>
            <div className="ps-product__rating">
                <Rating />
                <span className="ml-20">(1 review)</span>
            </div>
        </header>
    );
};

export default ModuleDetailTopInformation;
