import React from "react";
import Link from "next/link";

const ModuleDetailMeta = ({ product }) => (
    <div className="ps-product__specification">
        <p>
            <strong>Tags: </strong>
            <span>{product.category['name']}</span>
            {/* <Link href="/shop" legacyBehavior>
                <a>Thermometer</a>
            </Link> */}
            <Link href="/shop">Health</Link>
        </p>
        <p>
            <strong>SKU: </strong>
            <span>AU110876</span>
        </p>
    </div>
);

export default ModuleDetailMeta;
