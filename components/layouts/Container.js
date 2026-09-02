"use client";

import React, { useContext } from "react";
import Head from "next/head";
import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import FooterDefault from "@/components/shared/footers/FooterDefault";
import HeaderMobile from "@/components/shared/mobiles/HeaderMobile";
import ProductsContext from "@/utilities/ProductContext";


const Container = ({
    children,
    title = "Healthfirst Medicorp",
    header,
    footer = <FooterDefault />,
}) => {

    const { products } = useContext(ProductsContext) ?? {};

    let titleView;
    if (title !== undefined) {
        titleView = process.env.title + " | " + title;
    } else {
        titleView = process.env.title + " | " + process.env.titleDescription;
    }
    return (
        <div className="ps-root">
            <Head>
                <title>{titleView}</title>
            </Head>
            {header ?? <HeaderDefault products={products ?? []} />}
            <HeaderMobile />
            {children}
            {footer}
        </div>
    );
};

export default Container;
