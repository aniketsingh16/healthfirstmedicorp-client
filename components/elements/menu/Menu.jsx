import React from "react";
import Link from "next/link";
import MenuDropdown from "@/components/elements/menu/MenuDropdown";
import MegaMenu from "@/components/elements/menu/MegaMenu";
import ModuleMenuHomepages from "@/components/elements/menu/modules/ModuleMenuHomepages";
import AskAiMenuItem from "@/components/shared/chat/AskAiMenuItem";

const Menu = ({ source, className }) => {
    let menuView;
    if (source) {
        menuView = source.map((item) => {
            // Items with an `action` do something rather than navigate, so they
            // render as a client component with a handler instead of a Link.
            if (item.action === "chat") {
                return <AskAiMenuItem item={item} key={item.text} />;
            } else if (item.subMenu) {
                return <MenuDropdown source={item} key={item.text} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={item.text} />;
            } else if (item.external) {
                if (item.module === "homepages") {
                    return (
                        <li
                            className="menu-item-has-children has-mega-menu"
                            key={item.module}>
                            <Link href={item.url}>
                                {item.text}
                            </Link>
                            <div className="mega-menu">
                                <ModuleMenuHomepages />
                            </div>
                        </li>
                    );
                }
            } else {
                return (
                    <li key={item.text}>
                        <Link href={item.url}>
                            {item.icon && <i className={item.icon}></i>}
                            {item.text}
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;