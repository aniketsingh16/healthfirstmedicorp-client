import React from "react";
import FormSearchHeader from "@/components/shared/forms/FormSearchHeader";
import ModuleHeaderActions from "@/components/shared/headers/modules/ModuleHeaderActions";
import NavigationPrimary from "@/components/shared/navigations/NavigationPrimary";
import Logo from "@/components/elements/basic/Logo";

const HeaderNew = ({ classes = "" }) => {
    return (
        <header
            className={`header--desktop header--one header--sticky`}
            id="header-sticky"
            >
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <Logo />
                    </div>
                    <div className="header__center">
                        <div className="ps-header__search">
                            {/* <FormSearchHeader /> */}
                        </div>
                    </div>
                    <div className="header__right">
                        <ModuleHeaderActions />
                    </div>
                </div>
            </div>
            <div className={`header__bottom active`}>
                <NavigationPrimary />
            </div>
        </header>
    );
};

export default HeaderNew;
