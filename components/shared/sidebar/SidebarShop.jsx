import React from "react";
import WidgetShopCategories from "@/components/shared/widgets/WidgetShopCategories";
import WidgetShopFilterByPriceRange from "@/components/shared/widgets/WidgetShopFilterByPriceRange";
import WidgetShopFilterByColor from "@/components/shared/widgets/WidgetShopFilterByColor";
import WidgetShopByRating from "@/components/shared/widgets/WidgetShopByRating";
import WidgetShopFilterByBrands from "@/components/shared/widgets/WidgetShopFilterByBrands";
import WidgetShopPromotion from "@/components/shared/widgets/WidgetShopPromotion";

const SidebarShop = () => {
    return (
        <div className="ps-sidebar--shop">
            <WidgetShopCategories />
            <WidgetShopFilterByPriceRange />
            {/* <WidgetShopFilterByColor /> */}
            <WidgetShopFilterByBrands />
            <WidgetShopByRating />
            {/* <WidgetShopPromotion /> */}
        </div>
    );
};

export default SidebarShop;
