import React from "react";

const AboutPromotion = () => {
    return (
        <section
            className="ps-about__banner bg--cover"
            style={{
                backgroundImage: `url(/static/img/Mask-Group.jpg)`,
            }}>
            <div className="container">
                <div className="ps-banner">
                    <h2 className="ps-banner__title">
                        Hundreds of thousands of products at bargain prices
                    </h2>
                    <div className="ps-banner__desc">
                        Completely the needs of home medicine chest and
                        professional offices
                    </div>
                    <a className="ps-banner__shop" href="#">
                        Shop now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutPromotion;
