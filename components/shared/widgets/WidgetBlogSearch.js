import React from "react";

const WidgetBlogSearch = () => {
    return (
        <aside className="widget widget_blog widget_search">
            <h3 className="widget-title">Search</h3>
            <form className="ps-form--widget-search" action="#" method="get">
                <button>
                    <i className="icon-magnifier"></i>
                </button>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                />
            </form>
        </aside>
    );
};

export default WidgetBlogSearch;
