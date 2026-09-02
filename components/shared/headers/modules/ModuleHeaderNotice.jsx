import React from "react";

const ModuleHeaderNotice = ({ classes }) => {
    return (
        <div className={`ps-noti header__notice ${classes}`}>
            <div className="container">
                <p className="m-0">
                    Due to the <strong>COVID 19 </strong>epidemic, orders may be
                    processed with a slight delay
                </p>
            </div>
            <a className="ps-noti__close">
                <i className="icon-cross"></i>
            </a>
        </div>
    );
};

export default ModuleHeaderNotice;
