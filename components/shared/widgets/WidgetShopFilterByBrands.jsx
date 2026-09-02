import React from "react";
import brands from "@/data/brands";

const WidgetShopFilterByBrands = () => {
    //Views
    const brandsView = brands.brands.map((item, index) => (
        <div className="form-group" key={index}>
            <div className="ps-checkbox">
                <input
                    className="form-control"
                    type="checkbox"
                    id={index}
                    name={index}
                />
                <label htmlFor={index}>{item.text}</label>
            </div>
        </div>
    ));

    return (
        <aside className="widget widget_shop widget_filter-by-brands">
            <h3 className="widget-title">Brands</h3>
            <div className="widget__content">{brandsView}</div>
        </aside>
    );
};

export default WidgetShopFilterByBrands;
