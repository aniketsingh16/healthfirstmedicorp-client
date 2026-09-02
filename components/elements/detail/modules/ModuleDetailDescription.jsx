"use client";
import React from "react";
import { urlFor } from "@/utilities/client";

// Change your description content here
const ModuleDetailDescription = ({ product }) => {
    return (
        <div className="ps-product__description ps-document">
            <div className="row row-reverse">
                <div className="col-12 col-md-6">
                    <img
                        className="ps-thumbnail"
                        src={urlFor(product.imageurl)}
                        alt=""
                    />
                </div>
                <div className="col-12 col-md-6">
                    <h2 className="ps-title">{product.name}</h2>
                    <div className="ps-subtitle">
                        Just a few seconds to measure your body temperature. Up
                        to 5 users! The battery lasts up to 2 years.
                    </div>
                    <p className="ps-desc">
                        {product.description}
                    </p>
                    <ul className="ps-list">
                        <li>
                            <img src="/static/img/icon/bacterial.svg" alt="" />
                            <span>Study history up to 30 days</span>
                        </li>
                        <li>
                            <img src="/static/img/icon/virus.svg" alt="" />
                            <span>Up to 5 users simultaneously</span>
                        </li>
                        <li>
                            <img src="/static/img/icon/ribbon.svg" alt="" />
                            <span>Has HEALTH certificate</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-12 col-md-6">
                    <div className="ps-item">
                        <img src="/static/img/tab-content-img1.jpg" alt="" />
                        <a href="/">
                            The possibility of testing when applied to the
                            forehead. Ready to work in 30 seconds.
                        </a>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="ps-item">
                        <img src="/static/img/tab-content-img2.jpg" alt="" />
                        <a href="/">
                            Specially adapted tip reducing the meter so it can
                            be used in children.
                        </a>
                    </div>
                </div>
            </div> */}
            <div className="row m-0">
                <div className="col-12 col-md-4 p-0">
                    <div className="ps-document__review">
                        <span>+200.000</span>Users all over the world
                    </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                    <div className="ps-document__review">
                        <span>over 20</span>Years on the market
                    </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                    <div className="ps-document__review">
                        <span>5 stars</span>Ratings of our products
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetailDescription;
