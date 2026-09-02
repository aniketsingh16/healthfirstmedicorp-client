import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
// import { baseUrl } from "@/repositories/Repository";
import NextArrow from "@/components/elements/carousel/NextArrow";
import PrevArrow from "@/components/elements/carousel/PrevArrow";
import { SwiperSlide } from "swiper/react";
import SwiperCarousel from "@/components/elements/carousel/SwiperCarousel";

const variantSetting = {
    slidesToShow: 6,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 6,
                dots: false,
                arrows: false,
                vertical: false,
                infinite: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 4,
                dots: false,
                arrows: false,
                vertical: false,
                infinite: false,
            },
        },
    ],
};

const gallerySetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

const ModuleDetailThumbnailSingle = ({ product, vertical = true }) => {
    const galleryCarousel = useRef(null);
    const variantCarousel = useRef(null);
    const [gallery, setGallery] = useState(null);
    const [variant, setVariant] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [productImages, setProductImages] = useState([]);

    const handleOpenLightbox = (e, imageIndex) => {
        e.preventDefault();
        setPhotoIndex(imageIndex);
        setIsOpen(true);
    };

    useEffect(() => {
        let images = [];
        if (product && product.images.length > 0) {
            product.images.map((item) => {
                images.push(`${baseUrl}${item.url}`);
            });
            setProductImages(images);
        }
        setGallery(galleryCarousel.current);
        setVariant(variantCarousel.current);
    }, [product]);

    //Views
    let carousel;
    const swiperParams = {
        slidesPerView: 1,
        navigation: true,
    };
    if (productImages.length > 0) {
        const items = productImages.map((item) => (
            <SwiperSlide key={item}>
                <img src={item} alt={item} />
            </SwiperSlide>
        ));

        carousel = (
            <SwiperCarousel setting={swiperParams}>{items}</SwiperCarousel>
        );
    }

    return (
        <div
            className="ps-product__thumbnail"
            data-vertical={vertical ? "true" : "false"}>
            <figure>
                <div className="ps-wrapper">{carousel}</div>
            </figure>
        </div>
    );
};

export default ModuleDetailThumbnailSingle;
