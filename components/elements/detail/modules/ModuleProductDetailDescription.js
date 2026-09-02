import React from "react";

const ModuleProductDetailDescription = ({product}) => (

    <ul className="ps-product__short-desc">
        {product.bulletDescription.map((item, index) => (
        <li key={index}>{item}</li>))
        }
    </ul>
);

export default ModuleProductDetailDescription;
