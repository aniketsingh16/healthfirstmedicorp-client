import React from "react";

const AboutVideo = () => {
    return (
        <section className="ps-about--video">
            <div className="ps-banner">
                <div className="container">
                    <div className="ps-banner__block">
                        <div className="ps-banner__content">
                            <h2 className="ps-banner__title">
                                Your one and only
                                <br />
                                online pharmacy!
                            </h2>
                            <div className="ps-banner__desc">
                                Only this week 30% to 50% cheaper!
                            </div>
                            <div className="ps-banner__btn-group">
                                <div className="ps-banner__btn">
                                    <img
                                        src="/static/img/icon/virus.svg"
                                        alt=""
                                    />
                                    Up to 5 users simultaneously
                                </div>
                                <div className="ps-banner__btn">
                                    <img
                                        src="/static/img/icon/ribbon.svg"
                                        alt=""
                                    />
                                    Has HEALTH certificate
                                </div>
                            </div>
                            <a className="ps-banner__shop bg-warning" href="#">
                                About
                            </a>
                        </div>
                        <div className="ps-banner__thumnail">
                            <img
                                className="ps-banner__image"
                                src="/static/img/about/goby-tD3GaS9ysF4-unsplash-1.jpg"
                                alt=""
                            />
                            <div id="ps-video-gallery">
                                <div
                                    className="video"
                                    data-html="#video1"
                                    data-poster="/static/img/about/goby-tD3GaS9ysF4-unsplash-1.jpg">
                                    <a href="">
                                        <div className="ps-banner__video">
                                            <i className="fa fa-play"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutVideo;
