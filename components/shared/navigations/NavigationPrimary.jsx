import React from "react";
import ModuleHeaderCategories from "@/components/shared/headers/modules/ModuleHeaderCategories";
import ModuleHeaderSupplies from "@/components/shared/headers/modules/ModuleHeaderSupplies";
import Menu from "@/components/elements/menu/Menu";
import menu from "@/data/menu";
import AskAiButton from "@/components/shared/chat/AskAiButton";

const NavigationPrimary = () => {
    return (
        <nav className="navigation--primary">
            <div className="container">
                <div className="navigation__left">
                    <ModuleHeaderCategories />
                    <div className="navigation__menu">
                        <Menu
                            source={menu.main_menu}
                            className="menu menu--desktop"
                        />
                    </div>
                </div>
                <div className="navigation__right">
                    <p className="ps-text--contact-number">
                        Need Help? <i className="icon-telephone"></i>{" "}
                        <strong>+91 73870 86440</strong>
                    </p>
                    <AskAiButton />
                </div>
            </div>
        </nav>
    );
};

export default NavigationPrimary;
