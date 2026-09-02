import React from "react";

const SiteFeatures = () => {
    return (
        <div className="ps-footer--top ps-site-features">
            <div className="container">
                <div className="row m-0">
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-wallet"></i>100% Money back
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-bag2"></i>Non-contact
                                shipping
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-truck"></i>Free delivery for
                                order over $200
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteFeatures;
