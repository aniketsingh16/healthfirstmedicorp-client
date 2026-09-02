import React from "react";
import "./about-us.scss";
import Container from "@/components/layouts/Container";
import BreadCrumb from "@/components/elements/BreadCrumb";
import AboutBanner from "@/components/partials/pages/about-us/AboutBanner";
import AboutInfo from "@/components/partials/pages/about-us/AboutInfo";
// import AboutPromotion from "@/components/partials/pages/about-us/AboutPromotion";
// import AboutProject from "@/components/partials/pages/about-us/AboutProject";
import AboutVideo from "@/components/partials/pages/about-us/AboutVideo";
import Testimonials from "@/components/shared/sections/Testimonials";
import Subscribe from "@/components/shared/sections/Subscribe";
import BrandStrip from "@/components/shared/sections/BrandStrip";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },

    {
        id: 2,
        text: "About us",
    },
];

const AboutUsScreen = () => {
    return (
        <Container title="About Us">
            <main className="ps-page ps-page--inner ps-page--about">
                
                    <div className="container">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
             
                <div className="ps-page__content">
                    <div className="ps-about">
                        <div className="container">
                            {/* <AboutBanner /> */}
                            <AboutInfo />
                        </div>
                        <div className="ps-about__content">
                            {/* <AboutPromotion />
                            <AboutProject /> */}
                            {/* <AboutVideo /> */}
                        </div>
                        {/* <Testimonials /> */}
                        <BrandStrip />
                        <Subscribe />
                    </div>
                </div>
            </main>
         </Container>
    );
};

export default AboutUsScreen;
