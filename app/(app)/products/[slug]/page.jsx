
// import SkeletonProductDetail from "@/components/elements/skeletons/SkeletonProductDetail";
// import BreadCrumb from "@/components/elements/BreadCrumb";
// import Container from "@/components/layouts/Container";
// import WidgetProductPromotion from "@/components/shared/widgets/WidgetProductPromotion";
// import DetailDefault from "@/components/elements/detail/DetailDefault";
// import WidgetShopRelatedProducts from "@/components/shared/widgets/WidgetShopRelatedProducts";
// import WidgetShopPromotion from "@/components/shared/widgets/WidgetShopPromotion";
// import CustomerBought from "@/components/partials/products/CustomerBought";
// import useGetProducts from "@/hooks/useGetProducts";
// import { Image } from "antd";
// import Rating from "@/components/elements/Rating";
// import { defineQuery } from "next-sanity";
// import { sanityFetch } from "@/sanity/lib/live";
// import { PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity/queries/products";


// // export default async function ProductDetailPage ({ product, similarProducts }) => {
//     export default async function ProductDetailPage ({ params }) {
// // export default const ProductDetailPage = ({ product }) => {
//     //     console.log("//////////////////////products")
//     const { slug } = await params;
//     console.log("sluggggggg",slug)

//     const product_query = defineQuery(`
//         *[_type == "allProducts" && slug.current == $slug][0]
//     `);

//     // if (!product) {
//     //     notFound();
//     // }
//     const { data: product } = await sanityFetch({
//         query: product_query,
//         params: { slug },
//     });
//     console.log("In prodcut page",product)

//     // // View area
//     let productView;

//     if (product === null) {
//         productView = (
//             <div className="container">
//                 <SkeletonProductDetail />
//             </div>
//         );
//     } else {
//         // Yaha product aana chiaye so that it can be passed as a prop fro detaled view.
//         productView = <DetailDefault product={product} />;
//     }
//     const breadcrumb = [
//         {
//             id: 1,
//             text: "Home",
//             url: "/",
//         },
//         {
//             id: 2,
//             text: "Shop",
//             url: "/shop",
//         },
//         {
//             id: 3,
//             text: `${product.name}`
//         },
//     ];
//     return (        
//         // Single Page Item Details

//         <Container title="Product">
//             <div className="ps-page ps-page--product">
//                 <div className="container">
//                     <div className="ps-page__header">
//                         <BreadCrumb breacrumb={breadcrumb} />
//                     </div>
//                     <div className="ps-page__content">
//                         <div className="ps-layout--with-sidebar ps-reverse">
//                             <div className="ps-layout__left">
//                                 <WidgetProductPromotion />
//                                 {/* <WidgetShopRelatedProducts /> */}
//                                 <WidgetShopPromotion />
//                             </div>
//                             <div className="ps-layout__right">
//                                 {productView}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <CustomerBought similarProducts = {similarProducts}/> */}
//             </div>
//         </Container>
//     );
// };

import { cache } from "react";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import ScrollToTopOnMount from "@/components/elements/ScrollToTopOnMount";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Container from "@/components/layouts/Container";
import DetailDefault from "@/components/elements/detail/DetailDefault";
import WidgetProductPromotion from "@/components/shared/widgets/WidgetProductPromotion";
import WidgetShopPromotion from "@/components/shared/widgets/WidgetShopPromotion";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://healthfirstmedicorp.com";

const PRODUCT_QUERY = defineQuery(`
    *[_type == "allProducts" && slug.current == $slug][0]{
        ...,
        category->{
            _id,
            "name": coalesce(name, title),
            slug
        }
    }
`);

// Wrapped in cache() so generateMetadata and the page share ONE Sanity request.
const getProduct = cache(async (slug) => {
    const { data } = await sanityFetch({
        query: PRODUCT_QUERY,
        params: { slug },
    });
    return data ?? null;
});

// Picks the best available image and returns a 1200x630 social card URL.
function socialImage(product) {
    const source = product.images?.[0] ?? product.imageurl;
    if (!source) return null;
    return urlFor(source).width(1200).height(630).fit("crop").url();
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: "Product not found",
            robots: { index: false, follow: false },
        };
    }

    const title = product.company
        ? `${product.name} - ${product.company}`
        : product.name;

    const description = (
        product.description ||
        `Buy ${product.name} online at Healthfirst Medicorp.`
    )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 155);

    const url = `${SITE_URL}/products/${slug}`;
    const image = socialImage(product);

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            url,
            title,
            description,
            siteName: "Healthfirst Medicorp",
            images: image
                ? [{ url: image, width: 1200, height: 630, alt: product.name }]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : [],
        },
    };
}

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // No /shop route exists yet, so the middle crumb is plain text (BreadCrumb
    // renders items without a `url` as text). Give it a link once /shop lands.
    const breadcrumb = [
        {
            id: 1,
            text: "Home",
            url: "/",
        },
        {
            id: 2,
            text: product.category?.name ?? "Products",
            url: "/",
        },
        {
            id: 3,
            text: product.name,
        },
    ];

    return (
        <Container>
            <div className="ps-page ps-page--product">
                <ScrollToTopOnMount />
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar ps-reverse">
                            <div className="ps-layout__left">
                                <WidgetProductPromotion />
                                <WidgetShopPromotion />
                            </div>
                            <div className="ps-layout__right">
                                <DetailDefault product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
