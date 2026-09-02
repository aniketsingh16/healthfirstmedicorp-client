import Link from "next/link";
import React from "react";

const AboutBanner = () => {
    return (
        <section className="ps-banner--round">
            <div className="ps-banner">
                <div className="ps-banner__block">
                    <div className="ps-banner__content">
                        <div className="ps-logo">
                            <Link href="/">
                                {" "}
                                <img src="/static/img/logo.png" alt="" />
                            </Link>
                        </div>
                        <h2 className="ps-banner__title">
                            Your one and only <br />
                            online pharmacy!
                        </h2>
                        <div className="ps-banner__btn-group">
                            <div className="ps-banner__btn">
                                <img src="/static/img/icon/virus.svg" alt="" />
                                Up to 5 users simultaneously
                            </div>
                            <div className="ps-banner__btn">
                                <img src="/static/img/icon/ribbon.svg" alt="" />
                                Has HEALTH certificate
                            </div>
                        </div>
                        <a className="ps-banner__shop bg-yellow" href="#">
                            About
                        </a>
                    </div>
                    <div className="ps-banner__thumnail">
                        <img
                            className="ps-banner__round"
                            src="/static/img/round5.png"
                            alt=""
                        />
                        <img
                            className="ps-banner__image"
                            src="/static/img/girl-face-mask.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutBanner;
