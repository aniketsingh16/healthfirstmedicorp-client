import React from "react";

const WidgetShopFilterByColor = () => {
    return (
        <aside className="widget widget_shop widget_shop-colors">
            <h3 className="widget-title">Color</h3>
            <div className="widget__content">
                <div className="ps-checkbox color">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="#103178"
                        name="#103178"
                    />
                    <label
                        htmlFor="#103178"
                        style={{ "--bgColor": "#103178" }}></label>
                </div>
                <div className="ps-checkbox color">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="gray"
                        name="gray"
                    />
                    <label
                        htmlFor="gray"
                        style={{ "--bgColor": "#5b6c8f" }}></label>
                </div>
                <div className="ps-checkbox color">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="#ff9923"
                        name="#ff9923"
                    />
                    <label
                        htmlFor="#ff9923"
                        style={{ "--bgColor": "#FF9923" }}></label>
                </div>
                <div className="ps-checkbox color">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="#12A05C"
                        name="#12A05C"
                    />
                    <label
                        htmlFor="#12A05C"
                        style={{ "--bgColor": "#12A05C" }}></label>
                </div>
                <div className="ps-checkbox color">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="#F00000"
                        name="#F00000"
                    />
                    <label
                        htmlFor="#F00000"
                        style={{ "--bgColor": "#F00000" }}></label>
                </div>
            </div>
        </aside>
    );
};

export default WidgetShopFilterByColor;
