import React from "react";
import ModuleFooterCopyright from "@/components/shared/footers/modules/ModuleFooterCopyright";

const ModuleFooterBottom = () => {
    return (
        <div className="ps-footer--bottom">
            <div className="row">
                <div className="col-12 col-md-6">
                    {/* <ModuleFooterCopyright /> */}
                    <p>Copyright &copy; {new Date().getFullYear()} Healthfirst Medicorp. All Rights Reserved.</p>
                </div>
                <div className="col-12 col-md-6 text-right">
                    <img src="/static/img/payment.png" alt="" />
                    <img
                        className="payment-light"
                        src="/static/img/payment-light.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default ModuleFooterBottom;
