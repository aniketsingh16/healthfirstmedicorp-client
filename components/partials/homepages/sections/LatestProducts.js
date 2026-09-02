"use client";
// import React, { useEffect } from "react";
// import useGetProducts from "~/hooks/useGetProducts";
// import useProductGroup from "~/hooks/useProductGroup";

// const LatestProducts = ({ collectionSlug }) => {
//     const { loading, productItems, getProducts } = useGetProducts();
//     const { withCarousel } = useProductGroup();

//     useEffect(() => {
//         getProducts({ _limit: 6 });
//     }, [collectionSlug]);

//     const products = withCarousel(productItems, loading);

//     return (
//         <div className="ps-section--standard ps-latest-products">
//             <div className="container">
//                 <div className="ps-section__header">
//                     <h3>Latest Products</h3>
//                 </div>
//                 <div className="ps-section__content">{products}</div>
//             </div>
//         </div>
//     );
// };

// export default LatestProducts;

import React, { useEffect } from "react";
// import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "../../../../hooks/useProductGroup";

const LatestProducts = ({ products }) => {
    // const { loading, productItems, getProducts } = useGetProducts();
    const { withCarousel } = useProductGroup();

    const productsComp = withCarousel(products);

    return (
        <div className="ps-section--standard ps-latest-products">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Latest Products</h3>
                </div>
                <div className="ps-section__content">{productsComp}</div>
            </div>
        </div>
    );
};

export default LatestProducts;
