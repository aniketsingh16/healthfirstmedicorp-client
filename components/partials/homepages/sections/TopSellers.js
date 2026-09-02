"use client";

import React, { useEffect, useState } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import useProductGroup from "@/hooks/useProductGroup";

const categories = [
    {
        id: 1,
        text: "CPR Training Manikins",
        collectionSlug: "Manikins",
    },
    {
        id: 2,
        text: "First Aid Kits",
        collectionSlug: "First-Aid-Kits",
    },
    {
        id: 3,
        text: "AED",
        collectionSlug: "AED",
    },
];

// const TopSellers = ({ collectionSlug }) => {
//     const { loading, productItems, getProductsByCollection } = useGetProducts();
//     const { withCarousel } = useProductGroup();
//     const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//     function handleSelectedCategory(e, category) {
//         e.preventDefault();
//         getProductsByCollection(category.collectionSlug);
//         setSelectedCategory(category);
//     }

//     useEffect(() => {
//         getProductsByCollection("top-5-best-sellers");
//     }, [collectionSlug]);
//     const products = withCarousel(productItems, loading);

//     // Views
//     const categoriesView = categories.map((item) => (
//         <li
//             className={item.id === selectedCategory.id ? "active" : ""}
//             key={item.id}>
//             <a href="#" onClick={(e) => handleSelectedCategory(e, item)}>
//                 {item.text}
//             </a>
//         </li>
//     ));

//     return (
//         <div className="ps-section--standard ps-best-sellers">
//             <div className="container">
//                 <div className="ps-section__header">
//                     <h3>Top 5 Bestsellers in:</h3>
//                     <ul className="ps-list--categories">{categoriesView}</ul>
//                 </div>
//                 <div className="ps-section__content">{products}</div>
//             </div>
//         </div>
//     );
// };

// export default TopSellers;
// async function getCategoriesData() {
//     const query = `*[_type == "allProducts" && category->name == "AED"]`;

//     const data = await client.fetch(query);
//     console.log("DDDDDDDATA", data)
//     set
//     return data;
// }
// export async function getServerSideProps() {
//     // const { category } = context.params;
//     const query = '*[_type == "allProducts" && category->name == "AED"]';
//       const data = await client.fetch(query);
//       return {
//         props: {
//           data
//         },
//       };
//     }
      
const TopSellers =  ({ categoriesProducts }) => {
    
    const { loading, productItems, getProductsByCollection } = useGetProducts();
    const { withCarousel } = useProductGroup();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [productsNew, setProductsNew] = useState([])
    // console.log("selected-category", productsNew)

    function categoriesData(selectedCategory) {
        const filteredProducts = categoriesProducts.filter(product => product.category.name === selectedCategory);
        console.log(filteredProducts)
        setProductsNew(filteredProducts);
    }

    function handleSelectedCategory (e, category) {
        console.log(category.text)
        e.preventDefault();
        // getProductsByCollection(category.collectionSlug);
        setSelectedCategory(category);
        categoriesData(category.collectionSlug)
    }

    useEffect(() => {
        // getProductsByCollection("top-5-best-sellers");
        categoriesData("Manikins")
        // setProductsNew()
    }, []);
    const products = withCarousel(productsNew, loading);
    // Views
    const categoriesView = categories.map((item) => (
        <li
            className={item.id === selectedCategory.id ? "active" : ""}
            key={item.id}>
            <a href="#" onClick={(e) => handleSelectedCategory(e, item)}>
                {item.text}
            </a>
        </li>
    ));

    return (
        <div className="ps-section--standard ps-best-sellers">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Top 5 Bestsellers in:</h3>
                    <ul className="ps-list--categories">{categoriesView}</ul>
                </div>
                <div className="ps-section__content">{products}</div>
            </div>
        </div>
    );
};

export default TopSellers;