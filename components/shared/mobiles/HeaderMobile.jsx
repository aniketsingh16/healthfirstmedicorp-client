"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/components/elements/basic/Logo";
import { stickyHeader } from "@/utilities/common-helpers";
import FormSearchHeader from "@/components/shared/forms/FormSearchHeader";

const HeaderMobile = () => {
    const [search, setSearch] = useState(false);

    function handleToggleSearch(e) {
        e.preventDefault();
        setSearch(!search);
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
    window.addEventListener("scroll", stickyHeader);
}
    }, []);

    let searchView;
    if (search) {
        searchView = (
            <div className="header__searchbox">
                <FormSearchHeader />
            </div>
        );
    }
// MOBILE VIEW CORONA BANNER X
    return (
        <>
            {/* <ModuleHeaderNotice classes="mobile-only" /> */}
            {/* // ONLY TOP HEADER IN MOBILE VIEW */}
            <header
                className="header header--mobile"
                data-sticky="true"
                id="header-sticky-mobile">
                <div className="header__left">
                    <Logo />
                </div>
                <div className="header__right">
                    <a
                        className="header__search"
                        href="#"
                        onClick={(e) => handleToggleSearch(e)}>
                        <i className="icon-magnifier"></i>
                    </a>
                </div>
                {searchView}
            </header>
        </>
    );
};

export default HeaderMobile;
