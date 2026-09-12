import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import Container from "@/components/layouts/Container";
import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import HomeOneTopBanners from "@/components/partials/homepages/home-1/HomeOneTopBanners";
import FeaturedProducts from "@/components/shared/sections/FeaturedProducts";
import Subscribe from "@/components/shared/sections/Subscribe";
import FollowInstagram from "@/components/shared/sections/FollowInstagram";
import HomeOnePromotionsTwo from "@/components/partials/homepages/home-1/HomeOnePromotionsTwo";
import LatestProducts from "@/components/partials/homepages/sections/LatestProducts";
import TopSellers from "@/components/partials/homepages/sections/TopSellers";
import PromotionSecureInformation from "@/components/shared/sections/PromotionSecureInformation";
import BestDealOfWeek from "@/components/partials/homepages/sections/BestDealOfWeek";
import Testimonials from "@/components/shared/sections/Testimonials";
import BrandStrip from "@/components/shared/sections/BrandStrip";

const OG_IMAGE =
  'https://cdn.sanity.io/images/27p517bf/production/fcd2009306b35b4eba8fa9d6cc3daf2a7e20a022-700x250.png?w=1200&h=630&fit=fill&bg=ffffff';

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Healthfirst Medicorp' }],
  },
  twitter: {
    images: [OG_IMAGE],
  },
};

export default async function Home() {

  const { data: products } = await sanityFetch({
    query: `*[_type == "allProducts"]{
      ...,
      category->{
        _id,
        "name": coalesce(name, title),
        slug
      }
    }`
  });

  const { data: categories } = await sanityFetch({
    query: `*[_type == "category"]`
  })
    const { data: testimonials } = await sanityFetch({
    query: `*[_type == "reviews"]`
  })
console.log(testimonials)
  console.log(products)
  return (
    <Container
      title="Healthfirst Medicorp"
      header={<HeaderDefault classes="without-border" products={products} />}
    >
      <main id="homepage-one">
       <HomeOneTopBanners />
       
         {/* <HomeOnePromotions /> */}
        {/* <LatestProducts products={products} /> */}
        <TopSellers categoriesProducts={products} /> 
        <div className="container">
          <PromotionSecureInformation />
        </div>
        <BestDealOfWeek />
        
        {/* <HomeOnePromotionsTwo /> */}
        <FeaturedProducts featured_products={products} />
        <BrandStrip />
        <Testimonials testimonials={testimonials} />
        <FollowInstagram /> 
        <Subscribe /> 
      </main>
    </Container>
  );
}
