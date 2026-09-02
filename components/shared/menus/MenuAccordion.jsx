import React, { useState } from "react";
import Link from "next/link";
import Collapse from "@/components/elements/basic/Collapse";

const MenuAccordion = ({ data, classes = "menu" }) => {
    const [isOpen, setIsOpen] = useState(null);
    const handleToggleAccordion = (index) => {
        if (index !== isOpen) {
            setIsOpen(index);
        } else {
            setIsOpen(null);
        }
    };

    return (
        <ul className={classes}>
            {data.map((item) => {
                if (item.subMenu) {
                    return (
                        <li
                            className={`menu__item menu__item--has-children ${
                                isOpen === item.productID || item.active === true
                                    ? "active"
                                    : ""
                            }`}
                            key={item.productID}>
                            <a
                                href="#"
                                className="menu__toggle"
                                onClick={(e) => handleToggleAccordion(item.productID)}>
                                <span className="menu__text">{item.text}</span>
                                <i className="icon-chevron-down menu__icon--down" />
                            </a>
                            <Collapse
                                elementType="div"
                                isOpen={
                                    item.productID === isOpen || item.active === true
                                        ? true
                                        : false
                                }
                                aria-hidden="true"
                                className="sub-menu-wrapper">
                                <MenuAccordion
                                    data={item.subMenu}
                                    classes="sub-menu"
                                />
                            </Collapse>
                        </li>
                    );
                } else if (item.megaContent) {
                    return (
                        <li
                            className={`menu__item menu__item--has-children has-mega-menu ${
                                isOpen === item.productID || item.active === true
                                    ? "active"
                                    : ""
                            }`}
                            key={item.productID}>
                            <a
                                href="#"
                                className="menu__toggle"
                                onClick={(e) => handleToggleAccordion(item.productID)}>
                                <span className="menu__text">{item.text}</span>
                                <i className="icon-chevron-down menu__icon--down" />
                            </a>
                            <Collapse
                                elementType="div"
                                isOpen={
                                    item.productID === isOpen || item.active === true
                                        ? true
                                        : false
                                }
                                aria-hidden={isOpen ? "false" : "true"}
                                className="sub-menu-wrapper">
                                <MenuAccordion
                                    data={item.megaContent}
                                    classes="sub-menu"
                                />
                            </Collapse>
                        </li>
                    );
                } else if (item.megaItems) {
                    return (
                        <li
                            className={`menu__item menu__item--has-children ${
                                isOpen === item.productID || item.active === true
                                    ? "active"
                                    : ""
                            }`}
                            key={item.productID}>
                            <a
                                href="#"
                                className="menu__toggle"
                                onClick={(e) => handleToggleAccordion(item.productID)}>
                                <span className="menu__text">
                                    {item.heading}
                                </span>
                                <i className="icon-chevron-down menu__icon--down" />
                            </a>
                            <Collapse
                                elementType="div"
                                isOpen={
                                    item.productID === isOpen || item.active === true
                                        ? true
                                        : false
                                }
                                aria-hidden={isOpen ? "false" : "true"}
                                className="sub-menu-wrapper">
                                <MenuAccordion
                                    data={item.megaItems}
                                    classes="sub-menu"
                                />
                            </Collapse>
                        </li>
                    );
                } else {
                    if (item.title) {
                        return (
                            <li className="menu__title" key={item.productID}>
                                <span>{item.text}</span>
                            </li>
                        );
                    } else {
                        return (
                            <li key={item.text} className="menu__item">
                                <Link href={item.url} legacyBehavior>
                                    <a>
                                        <span className="menu__text">
                                            {item.text}
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        );
                    }
                }
            })}
        </ul>
    );
};

export default MenuAccordion;
