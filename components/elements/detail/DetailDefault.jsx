import React from "react";
import ModuleDetailTopInformation from "@/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "@/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "@/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSharing from "@/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailThumbnail from "@/components/elements/detail/modules/ModuleDetailThumbnail";
// import useProduct from "@/hooks/useProduct";
import ModuleDetailMeta from "@/components/elements/detail/modules/ModuleDetailMeta";
import ModuleDetailColors from "@/components/elements/detail/modules/ModuleDetailColors";
import ModuleDetailSizes from "@/components/elements/detail/modules/ModuleDetailSizes";
import ModuleDetailTabs from "@/components/elements/detail/modules/ModuleDetailTabs";
import FrequentlyBoughtTogether from "@/components/partials/products/FrequentlyBoughtTogether";
import ProductPrice from "../ProductPrice";
// import useProduct from "@/hooks/useProduct";

const DetailDefault = ({ product }) => {
    // const { price } = useProduct();
    let status = product.instock;   
    let statusView;
    if (status) {
        statusView = (
            <p className="ps-product__log-status">Only {product.stock} left in stock</p>
        );
    } else {
        statusView = (
            <p className="ps-product__log-status outstock">Out of stock</p>
        );
    }

    return (
        <div className="product--detail ps-product--detail">
            <div className="ps-product__header">
                <ModuleDetailThumbnail product={product} />
                <div className="ps-product__info">
                    {statusView}    {/* // Stock Details */} 
                    <ModuleDetailTopInformation product={product} />
                    <ModuleProductDetailDescription product={product} />
                    {/* {price(product)} */}
                    {/* {product.price} */}
                    <ProductPrice discountedPrice={product.sellingPrice} mrp={product.mrp} />
                    <div className="ps-product__variants">
                        {/* <ModuleDetailColors />
                        <ModuleDetailSizes /> */}
                    </div>
                    {status && (
                        <ModuleDetailShoppingActions product={product} />
                    )}
                    <ModuleDetailMeta product={product} />    {/* // Tags and SKU's */} 
                    {/* <ModuleProductDetailSharing /> */}
                </div>
            </div>
            <div className="ps-product__content ">
                <ModuleDetailTabs product={product}/>
                {/* <FrequentlyBoughtTogether /> */}
            </div>
        </div>
    );
};

export default DetailDefault;


