import React from "react";

const BannerPromotionSeven = () => {
    return (
        <div className="ps-banner--promotion-seven bg--cover">
            <img src="/static/img/banners/promotion-seven.jpg" alt="" />
            <div className="ps-banner__content">
                <h2 className="ps-banner__title">
                    Your one and only <br />
                    online pharmacy!
                </h2>
                <p>
                    Just a few seconds to measure
                    <br />
                    your body temperature.
                </p>
                <div className="ps-banner__meta">
                    <span>
                        <img
                            src="/static/img/icon/virus.svg"
                            alt=""
                            className="mr-2"
                        />
                        Up to 5 users simultaneously
                    </span>
                    <span>
                        <img
                            src="/static/img/icon/ribbon.svg"
                            alt=""
                            className="mr-2"
                        />
                        Has HEALTH certificate
                    </span>
                </div>
                <a className="ps-btn ps-btn--rounded" href="#">
                    About
                </a>
            </div>
        </div>
    );
};

export default BannerPromotionSeven;
