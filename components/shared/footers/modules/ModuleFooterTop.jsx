import React from 'react';

const ModuleFooterTop = () => {
    return (
        <div className="ps-footer--top ps-footer__top">
            <div className="container">
                <div className="row m-0">
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-wallet"></i>100% Genuine Products
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-bag2"></i>Shipment across India
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-sm-4 p-0">
                        <p className="text-center">
                            <a className="ps-footer__link" href="#">
                                <i className="icon-truck"></i>1,200+ cities and 20,000+ Pin codes served
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleFooterTop;
