import Link from "next/link";
import React from "react";

const PopularCategories = () => {
    return (
        <div className="ps-section--category">
            <div className="container">
                <h3 className="ps-section__title">
                    Check out the most popular categories
                </h3>
                <div className="ps-category--block">
                    <div className="ps-category__thumbnail">
                        <Link className="ps-category__image" href="#">
                            <img
                                src="/static/img/promotion/facemask-cat.png"
                                alt=""
                            />
                        </Link>
                        <div className="ps-category__content">
                            <Link className="ps-category__name" href="#">
                                Face masks
                            </Link>
                            <Link className="ps-category__more" href="#">
                                More
                            </Link>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <Link className="ps-category__image" href="#">
                            <img
                                src="/static/img/promotion/uniforms-cat.png"
                                alt=""
                            />
                        </Link>
                        <div className="ps-category__content">
                            <Link className="ps-category__name" href="#">
                                Uniforms
                            </Link>
                            <Link className="ps-category__more" href="#">
                                More
                            </Link>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <Link className="ps-category__image" href="#">
                            <img
                                src="/static/img/promotion/protectcover-cat.png"
                                alt=""
                            />
                        </Link>
                        <div className="ps-category__content">
                            <Link className="ps-category__name" href="#">
                                Protective covers
                            </Link>
                            <Link className="ps-category__more" href="#">
                                More
                            </Link>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <Link className="ps-category__image" href="#">
                            <img
                                src="/static/img/promotion/dental-cat.png"
                                alt=""
                            />
                        </Link>
                        <div className="ps-category__content">
                            <Link className="ps-category__name" href="#">
                                Dental
                            </Link>
                            <Link className="ps-category__more" href="#">
                                More
                            </Link>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <Link className="ps-category__image" href="#">
                            <img
                                src="/static/img/promotion/pressure-cat.png"
                                alt=""
                            />
                        </Link>
                        <div className="ps-category__content">
                            <Link className="ps-category__name" href="#">
                                Blood pressure
                            </Link>
                            <Link className="ps-category__more" href="#">
                                More
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="ps-category__nav">
                            <div className="ps-category__title">Wound Care</div>
                            <ul className="ps-category__list">
                                <li>
                                    <a href="#">Accessories</a>
                                </li>
                                <li>
                                    <a href="#">Bandages</a>
                                </li>
                                <li>
                                    <a href="#">Gypsum foundations</a>
                                </li>
                                <li>
                                    <a href="#">Patches and tapes</a>
                                </li>
                                <li>
                                    <a href="#">Surgical sutures</a>
                                </li>
                                <li>
                                    <a href="#">Swabs</a>
                                </li>
                                <li>
                                    <a href="#">Wound healing</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="ps-category__nav">
                            <div className="ps-category__title">Higiene</div>
                            <ul className="ps-category__list">
                                <li>
                                    <a href="#">Disinfectants</a>
                                </li>
                                <li>
                                    <a href="#">Disposable products</a>
                                </li>
                                <li>
                                    <a href="#">Face Masks - protective</a>
                                </li>
                                <li>
                                    <a href="#">Gloves</a>
                                </li>
                                <li>
                                    <a href="#">Protective clothing</a>
                                </li>
                                <li>
                                    <a href="#">Sterilization</a>
                                </li>
                                <li>
                                    <a href="#">Surgical foils</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="ps-category__nav">
                            <div className="ps-category__title">Laboratory</div>
                            <ul className="ps-category__list">
                                <li>
                                    <a href="#">Accessories</a>
                                </li>
                                <li>
                                    <a href="#">Devices</a>
                                </li>
                                <li>
                                    <a href="#">Diagnostic tests</a>
                                </li>
                                <li>
                                    <a href="#">Dyes</a>
                                </li>
                                <li>
                                    <a href="#">Pipettes</a>
                                </li>
                                <li>
                                    <a href="#">Tubes</a>
                                </li>
                                <li>
                                    <a href="#">Test-tubes</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="ps-category__nav">
                            <div className="ps-category__title">Tools</div>
                            <ul className="ps-category__list">
                                <li>
                                    <a href="#">Care products</a>
                                </li>
                                <li>
                                    <a href="#">Claws and forceps</a>
                                </li>
                                <li>
                                    <a href="#">Electrosurgery</a>
                                </li>
                                <li>
                                    <a href="#">Needles</a>
                                </li>
                                <li>
                                    <a href="#">Plaster tools</a>
                                </li>
                                <li>
                                    <a href="#">Scalpels, blades</a>
                                </li>
                                <li>
                                    <a href="#">Scissors</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="ps-category__nav">
                            <div className="ps-category__title">Diagnosis</div>
                            <ul className="ps-category__list">
                                <li>
                                    <a href="#">Accessories</a>
                                </li>
                                <li>
                                    <a href="#">Biopsy tools</a>
                                </li>
                                <li>
                                    <a href="#">Endoscopes</a>
                                </li>
                                <li>
                                    <a href="#">Monitoring</a>
                                </li>
                                <li>
                                    <a href="#">Otoscopes</a>
                                </li>
                                <li>
                                    <a href="#">Oxygen concentrators</a>
                                </li>
                                <li>
                                    <a href="#">Thermometers</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="ps-category__nav">
                            <div className="ps-category__title">Equipment</div>
                            <ul className="ps-category__list">
                                <li>
                                    <a href="#">Blades</a>
                                </li>
                                <li>
                                    <a href="#">Education</a>
                                </li>
                                <li>
                                    <a href="#">Germicidal lamps</a>
                                </li>
                                <li>
                                    <a href="#">Infusion stands</a>
                                </li>
                                <li>
                                    <a href="#">Lighting</a>
                                </li>
                                <li>
                                    <a href="#">Machines</a>
                                </li>
                                <li>
                                    <a href="#">Tables and assistants</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
