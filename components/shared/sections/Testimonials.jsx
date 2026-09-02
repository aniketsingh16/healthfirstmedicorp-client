"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import NextArrow from "@/components/elements/carousel/NextArrow";
import PrevArrow from "@/components/elements/carousel/PrevArrow";
import TestimonialItem from "@/components/elements/TestimonialItem";

const carouselSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // Kept so resizing still works. slidesToShow is also passed explicitly
    // below, because of the mount bug described in useSlidesToShow().
    responsive: [
        {
            breakpoint: 1366,
            settings: { slidesToShow: 4, slidesToScroll: 1, dots: true, arrows: false },
        },
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1, dots: true, arrows: false },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 2, slidesToScroll: 1, dots: true, arrows: false },
        },
        {
            breakpoint: 480,
            settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, arrows: false },
        },
    ],
};

/**
 * react-slick's `responsive` config only takes effect on a matchMedia *change*
 * event — slider.js:63 attaches a listener but never reads `mql.matches` at
 * mount. A page loaded straight onto a phone therefore keeps the desktop
 * slidesToShow, and only a resize (or switching device in DevTools) fixes it.
 * Compute the value ourselves and pass it explicitly.
 */
function useSlidesToShow() {
    const [slides, setSlides] = useState(4);

    useEffect(() => {
        const apply = () => {
            const w = window.innerWidth;
            setSlides(w <= 480 ? 1 : w <= 768 ? 2 : w <= 1024 ? 3 : 4);
        };

        apply();
        window.addEventListener("resize", apply);
        return () => window.removeEventListener("resize", apply);
    }, []);

    return slides;
}

const Testimonials = ({ testimonials = [] }) => {
    const slidesToShow = useSlidesToShow();

    if (!testimonials.length) return null;
 
    return (
        <section
            className="ps-section--reviews ps-testimonials"
            style={{ backgroundImage: `url('/static/img/roundbg.png')` }}>
            <h3 className="ps-section__title">
                <img src="/static/img/quote-icon.png" alt="" />
                What Our Clients Are Saying
            </h3>
            <div className="ps-section__content">
                <div className="container">
                    {/* slidesToShow and arrows must come after the spread,
                        otherwise carouselSetting overwrites them. */}
                    <Slider
                        {...carouselSetting}
                        slidesToShow={slidesToShow}
                        arrows={slidesToShow > 2}
                        className="ps-carousel">
                        {testimonials.map((item) => (
                            <div className="ps-carousel__item" key={item._id}>
                                <TestimonialItem source={item} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
