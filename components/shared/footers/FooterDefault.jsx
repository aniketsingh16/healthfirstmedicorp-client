import React from "react";
import ModuleFooterTop from "@/components/shared/footers/modules/ModuleFooterTop";
import ModuleFooterAddress from "@/components/shared/footers/modules/ModuleFooterAddress";
import ModuleFooterContact from "@/components/shared/footers/modules/ModuleFooterContact";
import WidgetFooterLinks from "@/components/shared/widgets/footer/WidgetFooterLinks";
import ModuleFooterBottom from "@/components/shared/footers/modules/ModuleFooterBottom";
import FooterLinks from "@/data/footer.json";

const FooterDefault = () => {
    return (
        <footer className="ps-footer ps-footer--1">
            <ModuleFooterTop />
            <div className="container">
                <div className="ps-footer__middle">
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <div className="row ps-footer__information">
                                <div className="col-12 col-lg-4 col-md-4 col-sm-12">
                                    <ModuleFooterAddress />
                                </div>
                                <div className="col-12 col-lg-8 col-md-8 col-sm-12">
                                    <ModuleFooterContact />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="row">
                                <div className="col-6 col-md-4">
                                    <WidgetFooterLinks
                                        source={FooterLinks.information}
                                    />
                                </div>
                                <div className="col-6 col-md-4">
                                    <WidgetFooterLinks
                                        source={FooterLinks.account}
                                    />
                                </div>
                                <div className="col-6 col-md-4">
                                    <WidgetFooterLinks
                                        source={FooterLinks.store}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModuleFooterBottom />
            </div>
        </footer>
    );
};

export default FooterDefault;
