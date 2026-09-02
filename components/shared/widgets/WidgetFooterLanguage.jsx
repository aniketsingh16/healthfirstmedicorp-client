import React from 'react';

const WidgetFooterLanguage = () => {
    return (
        <aside className="widget widget_footer widget_align-right">
            <h3 className="widget-title">Language</h3>
            <select className="ps-select">
                <option value="1">English</option>
                <option value="2">Italian</option>
                <option value="3">Germany</option>
                <option value="4">French</option>
            </select>
        </aside>
    );
};

export default WidgetFooterLanguage;
