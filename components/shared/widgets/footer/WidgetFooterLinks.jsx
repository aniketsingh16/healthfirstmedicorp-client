import React from "react";
import Link from "next/link";

const WidgetFooterLinks = ({ source, classes = "" }) => {
    const linksView = source.items.map((item, index) => (
        <li key={index}>
            <Link href="/">
                {item.text}
            </Link>
        </li>
    ));
    return (
        <>
            <div
                className={`ps-footer--block widget--footer widget--footer-links ${classes}`}>
                <h5 className="ps-block__title">{source.title}</h5>
                <ul className="ps-block__list">{linksView}</ul>
            </div>
        </>
    );
};

export default WidgetFooterLinks;