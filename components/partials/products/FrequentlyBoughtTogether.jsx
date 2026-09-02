import React from "react";

const FrequentlyBoughtTogether = () => {
    return (
        <section className="ps-bought">
            <h3 className="ps-bought__title">Frequently bought together</h3>
            <div className="ps-bought__wapper">
                <div className="ps-bought__thumbnail">
                    <ul>
                        <li>
                            <a href="#">
                                <img
                                    src="/static/img/products/001.jpg"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="/static/img/products/033.jpg"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="/static/img/products/006.jpg"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="/static/img/products/050.jpg"
                                    alt=""
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ps-bought__content">
                    <ul className="ps-bought__list">
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product0"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product0">
                                    <span className="ps-bought__name">
                                        This Product: Blood Pressure Monitor{" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__price">
                                        $77.65
                                    </span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product1"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product1">
                                    <span className="ps-bought__name">
                                        3 Layer Disposable Protective Face Masks{" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__del">
                                        $15.52
                                    </span>
                                    <span className="ps-bought__price sale">
                                        $14.52
                                    </span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product2"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product2">
                                    <span className="ps-bought__name">
                                        GAnti-Dust Filter, Breathable, 3 Layers
                                        of Purifying{" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__price">
                                        $17.99
                                    </span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product3"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product3">
                                    <span className="ps-bought__name">
                                        Disposable Face Mask for Unisex{" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__del">
                                        $20.39
                                    </span>
                                    <span className="ps-bought__price sale">
                                        $8.15
                                    </span>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <div className="ps-bought__submit">
                        <label>Buy selected for: </label>
                        <div className="ps-bought__total">$115.31</div>
                        <a className="ps-btn ps-btn--warning" href="#">
                            Add all to cart
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrequentlyBoughtTogether;
