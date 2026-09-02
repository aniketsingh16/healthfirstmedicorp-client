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
import ModuleDetailFeatures from "@/components/elements/detail/modules/ModuleDetailFeatures";
import ModuleDetailContent from "@/components/elements/detail/modules/ModuleDetailContent";

const DetailThree = ({ product }) => {
    const { price } = useProduct();

    return (
        <div className="product--detail ps-product--detail ps-product--detail-two ps-product--detail-three">
            <div className="ps-product__header">
                <ModuleDetailThumbnail product={product} />
                <div className="ps-product__info">
                    <div className="ps-product__left">
                        <ModuleDetailTopInformation product={product} />
                        <ModuleProductDetailDescription product={product} />
                        <div className="ps-product__variants">
                            <ModuleDetailFeatures />
                            <ModuleDetailMeta />
                            <ModuleProductDetailSharing />
                        </div>
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
                <ModuleDetailContent />
            </div>
        </div>
    );
};

export default DetailThree;
