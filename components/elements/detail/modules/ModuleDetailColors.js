import React from "react";
import Link from "next/link";

const ModuleDetailColors = () => (
    <figure className="ps-product__colors">
        <figcaption className="ps-product__label">Color:</figcaption>
        <div className="items">
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
        </div>
    </figure>
);

export default ModuleDetailColors;
