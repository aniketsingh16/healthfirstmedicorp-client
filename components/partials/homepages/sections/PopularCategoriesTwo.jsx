import Link from "next/link";
import React from "react";

const PopularCategoriesTwo = () => {
    return (
        <div className="ps-section--categories ">
            <div className="container">
                <h3 className="ps-section__title">Popular categories</h3>
                <div className="ps-section__content">
                    <div className="ps-categories__list">
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/plastercross.svg"
                                    alt=""
                                />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Bandages
                            </Link>
                        </div>
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/capsule.svg"
                                    alt=""
                                />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Capsules
                            </Link>
                        </div>
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/dental.svg"
                                    alt=""
                                />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Dental
                            </Link>
                        </div>
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/thermometer.svg"
                                    alt=""
                                />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Thermometer
                            </Link>
                        </div>
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/heart-healt.svg"
                                    alt=""
                                />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Heart Health
                            </Link>
                        </div>
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img
                                    src="/static/img/branch/microscope.svg"
                                    alt=""
                                />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Micrscope
                            </Link>
                        </div>
                        <div className="ps-categories__item">
                            <Link className="ps-categories__link" href="/shop">
                                <img src="/static/img/branch/tube.svg" alt="" />
                            </Link>
                            <Link className="ps-categories__name" href="/shop">
                                Tubes
                            </Link>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="ps-categories__show" href="/shop">
                            Show all
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCategoriesTwo;
