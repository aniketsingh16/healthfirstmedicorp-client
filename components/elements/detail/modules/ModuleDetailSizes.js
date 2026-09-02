"use client";

import React, { useState } from "react";
import Link from "next/link";

const sizes = [
    {
        id: 1,
        text: "Small",
        simple: "S",
    },
    {
        id: 2,
        text: "Medium",
        simple: "M",
    },
    {
        id: 3,
        text: "Large",
        simple: "L",
    },
];
const ModuleDetailColors = ({ simple = false }) => {
    const [active, setActive] = useState(sizes[0]);

    function handleSetActiveSize(e, payload) {
        e.preventDefault();
        setActive(payload);
    }

    const sizesView = sizes.map((item) => (
        <a
            className={item.id === active.id ? "active" : ""}
            key={item.productID}
            onClick={(e) => handleSetActiveSize(e, item)}>
            {!simple ? item.text : item.simple}
        </a>
    ));

    return (
        <figure className="ps-product__sizes">
            <figcaption className="ps-product__label">Sizes:</figcaption>
            <div className="items">{sizesView}</div>
        </figure>
    );
};

export default ModuleDetailColors;
