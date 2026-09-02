import React from 'react';

const WidgetFooterCurrency = () => {
    return (
        <aside className="widget widget_footer widget_align-right">
            <h3 className="widget-title">Currency</h3>
            <select className="ps-select">
                <option value="1">USD</option>
                <option value="2">GBP</option>
            </select>
        </aside>
    );
};

export default WidgetFooterCurrency;
