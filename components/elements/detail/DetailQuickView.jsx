"use client";

import React, { useEffect } from "react";

import ModuleDetailTopInformation from "@/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "@/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "@/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSharing from "@/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailThumbnail from "@/components/elements/detail/modules/ModuleDetailThumbnail";
import useProduct from "@/hooks/useProduct";
import ModuleDetailMeta from "@/components/elements/detail/modules/ModuleDetailMeta";
import ModuleDetailColors from "@/components/elements/detail/modules/ModuleDetailColors";
import ModuleDetailSizes from "@/components/elements/detail/modules/ModuleDetailSizes";
import ModuleDetailThumbnailSingle from "@/components/elements/detail/modules/ModuleDetailThumbnailSingle";
const DetailQuickView = ({ product }) => {
    const { price } = useProduct();
    return (
        <>
            <div className="product--detail ps-product--detail ps-product--quickview">
                <div className="ps-product__header">
                    <ModuleDetailThumbnailSingle product={product} />
                    <div className="ps-product__info">
                        <p className="ps-product__log-status">
                            Only 3 left in stock
                        </p>
                        <ModuleDetailTopInformation product={product} />
                        <ModuleProductDetailDescription product={product} />
                        {price(product)}
                        <div className="ps-product__variants">
                            <ModuleDetailColors />
                            <ModuleDetailSizes />
                        </div>
                        <ModuleDetailShoppingActions product={product} />
                        <ModuleDetailMeta />
                        <ModuleProductDetailSharing />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailQuickView;
