import React from "react";
import WidgetFooterLinks from "~/components/shared/widgets/footer/WidgetFooterLinks";
import FooterLinks from "~/public/static/data/footer.json";

const ModuleFooterCategories = () => {
    return (
        <div className="row ps-footer__category m-0">
            <div className="col-6 col-md-4 col-lg-2 p-0">
                <WidgetFooterLinks source={FooterLinks.woundCare} />
            </div>
            <div className="col-6 col-md-4 col-lg-2 p-0">
                <WidgetFooterLinks source={FooterLinks.higiene} />
            </div>
            <div className="col-6 col-md-4 col-lg-2 p-0">
                <WidgetFooterLinks source={FooterLinks.laboratory} />
            </div>

            <div className="col-6 col-md-4 col-lg-2 p-0">
                <WidgetFooterLinks source={FooterLinks.tools} />
            </div>
            <div className="col-6 col-md-4 col-lg-2 p-0">
                <WidgetFooterLinks source={FooterLinks.diagnosis} />
            </div>
            <div className="col-6 col-md-4 col-lg-2 p-0">
                <WidgetFooterLinks source={FooterLinks.equipment} />
            </div>
        </div>
    );
};

export default ModuleFooterCategories;
