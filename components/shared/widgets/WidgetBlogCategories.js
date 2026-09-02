import React from "react";
import Link from "next/link";

const WidgetBlogCategories = () => {
    const categories = [
        {
            url: "/blog",
            text: "Wound Care",
        },
        {
            url: "/blog",
            text: "Higiene",
        },
        {
            url: "/blog",
            text: "Laboratory",
        },
        {
            url: "/blog",
            text: "Tools",
        },
        {
            url: "/blog",
            text: "Diagnosic",
        },
        {
            url: "/blog",
            text: "Equipments",
        },
    ];

    const items = categories.map((item) => (
        <Link href={item.url} key={item.text} legacyBehavior>
            <a>{item.text}</a>
        </Link>
    ));

    return (
        <aside className="widget widget_blog widget_categories">
            <h3 className="widget-title">Categories</h3>
            <ul>{items}</ul>
        </aside>
    );
};

export default WidgetBlogCategories;
