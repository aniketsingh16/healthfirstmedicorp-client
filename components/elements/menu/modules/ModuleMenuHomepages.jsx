import React from "react";
import menu from "@/data/menu";
import Link from "next/link";

const DemoItem = ({ source }) => (
    <div className="ps-block__item">
        <div className="ps-block__wrapper">
            <div className="ps-block__thumbnail">
                <img src={source.image} alt={source.text} />
                <Link href={source.url} legacyBehavior>
                    <a className="ps-block__overlay" />
                </Link>
            </div>
            <Link href={source.url} legacyBehavior>
                <a className="ps-block__text">{source.text}</a>
            </Link>
        </div>
    </div>
);

const ModuleMenuHomepages = () => {
    const items = menu.homepage_demos.map((item) => {
        return <DemoItem source={item} key={item.productID} />;
    });
    return <div className="ps-block--menu-demos">{items}</div>;
};

export default ModuleMenuHomepages;
