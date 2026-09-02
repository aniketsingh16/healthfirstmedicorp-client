'use client';
import React, { useState } from "react";
import ModuleShopSortBy from "@/components/partials/shop/modules/ModuleShopSortBy";
import ModuleShopPaginationRange from "@/components/partials/shop/modules/ModuleShopPaginationRange";
import { useRouter } from "next/navigation";

const layoutItems = [
    {
        id: 1,
        url: "/shop?layout=list",
        image: "/static/img/icon/bars.svg",
        imageActive: "/static/img/icon/bars.svg",
    },
    {
        id: 2,
        url: "/shop?layout=grid&columns=2",
        image: "/static/img/icon/gird2.svg",
        imageActive: "/static/img/icon/gird2.svg",
    },
    {
        id: 3,
        url: "/shop?layout=grid&columns=3",
        image: "/static/img/icon/gird3.svg",
        imageActive: "/static/img/icon/gird3.svg",
    },
    {
        id: 4,
        url: "/shop?layout=grid&columns=4",
        image: "/static/img/icon/gird4.svg",
        imageActive: "/static/img/icon/gird4.svg",
    },
];

const ModuleShopActions = () => {
    const [selectedLayout, setSelectedLayout] = useState(layoutItems[3]);
    const router = useRouter();

    function handleSelecteLayout(e, layout) {
        e.preventDefault();
        setSelectedLayout(layout);
        router.push(layout.url, { scroll: false });
    }

    const swichersItemsView = layoutItems.map((item) => (
        <a
            className={`ps-shop__layout-switcher ${
                item.productID === selectedLayout.productID ? "active" : ""
            }`}
            onClick={(e) => handleSelecteLayout(e, item)}
            key={item.productID}>
            <img src={item.image} alt={item.image} />
        </a>
    ));

    return (
        <div className="ps-shop__actions">
            <div className="ps-shop__actions-left">
                <div className="ps-shop__layout-switchers">
                    {swichersItemsView}
                </div>
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="show-onsale"
                        name="show-onsale"
                    />
                    <label htmlFor="show-onsale">
                        Show only products on sale
                    </label>
                </div>
            </div>
            <div className="ps-shop__actions-right">
                <ModuleShopSortBy />
                <ModuleShopPaginationRange />
            </div>
        </div>
    );
};

export default ModuleShopActions;