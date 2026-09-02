import React from 'react';

const WidgetShopActiveFilters = () => {
    return (
        <aside className="widget widget_shop widget_active-filters">
            <h3 className="widget-title">Active filters</h3>
            <div className="widget__content">
                <a href="#">
                    <i className="icon-cross"></i> Min £ 9.00
                </a>
                <a href="#">
                    <i className="icon-cross"></i> Max £ 9.00
                </a>
                <a href="#">
                    <i className="icon-cross"></i> Remove all filter
                </a>
            </div>
        </aside>
    );
};

export default WidgetShopActiveFilters;
