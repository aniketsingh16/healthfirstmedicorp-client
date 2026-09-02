"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const swiperParams = {
    loop: true,
    slidesPerView: 5,
    modules: [Autoplay, Navigation, Pagination],
    pagination: true,
    breakpoints: {
        320: {
            slidesPerView: 2,
        },

        768: {
            slidesPerView: 3,
        },

        992: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
};

const SwiperCarousel = ({
    children,
    setting = swiperParams,
    classses = "",
}) => {
    const swiperRef = useRef(null);

    function handlePrev() {
        swiperRef.current.swiper.slidePrev(300);
    }

    function handleNext() {
        swiperRef.current.swiper.slideNext(300);
    }

    return (
        <>
            <div className={`ps-carousel--swiper ${classses}`}>
                <div className="ps-carousel__navigation">
                    <span
                        className="swiper-arrow swiper-arrow--prev"
                        onClick={(e) => handlePrev(e)}>
                        <i className="icon-chevron-left"></i>
                    </span>
                    <span
                        className="swiper-arrow swiper-arrow--next"
                        onClick={(e) => handleNext(e)}>
                        <i className="icon-chevron-right"></i>
                    </span>
                </div>
                <Swiper ref={swiperRef} {...setting}>
                    {children}
                </Swiper>
            </div>
        </>
    );
};

export default SwiperCarousel;