import React from "react";

import ModuleDetailTopInformation from "@/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "@/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "@/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSharing from "@/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailThumbnail from "@/components/elements/detail/modules/ModuleDetailThumbnail";
import useProduct from "@/hooks/useProduct";
import ModuleDetailMeta from "@/components/elements/detail/modules/ModuleDetailMeta";
import ModuleDetailColors from "@/components/elements/detail/modules/ModuleDetailColors";
import ModuleDetailSizes from "@/components/elements/detail/modules/ModuleDetailSizes";
import { Tabs } from "antd";
import ModuleDetailFeatures from "@/components/elements/detail/modules/ModuleDetailFeatures";
import ModuleDetailTabs from "@/components/elements/detail/modules/ModuleDetailTabs";

const DetailTwo = ({ product }) => {
    const { price } = useProduct();

    return (
        <div className="product--detail ps-product--detail ps-product--detail-two">
            <div className="ps-product__header">
                <ModuleDetailThumbnail product={product} />
                <div className="ps-product__info">
                    <div className="ps-product__left">
                        <ModuleDetailTopInformation product={product} />
                        <ModuleProductDetailDescription product={product} />
                        <ModuleDetailFeatures />
                        <ModuleDetailMeta />
                        <ModuleProductDetailSharing />
                    </div>
                    <div className="ps-product__right">
                        <div className="ps-product__shopping-wrapper">
                            <p className="ps-product__log-status">
                                Only 3 left in stock
                            </p>
                            {price(product)}
                            <ModuleDetailColors />
                            <ModuleDetailSizes simple={true} />
                            <ModuleDetailShoppingActions product={product} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ps-product__content">
                <ModuleDetailTabs />
            </div>
        </div>
    );
};

export default DetailTwo;
