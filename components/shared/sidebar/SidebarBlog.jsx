import React from "react";
import WidgetShopPromotion from "@/components/shared/widgets/WidgetShopPromotion";
import WidgetBlogCategories from "@/components/shared/widgets/WidgetBlogCategories";
import WidgetShopRelatedProducts from "@/components/shared/widgets/WidgetShopRelatedProducts";

const SidebarBlog = () => {
    return (
        <div className="ps-sidebar--shop">
            <WidgetBlogCategories />
            <WidgetShopRelatedProducts />
            <WidgetShopPromotion />
        </div>
    );
};

export default SidebarBlog;
