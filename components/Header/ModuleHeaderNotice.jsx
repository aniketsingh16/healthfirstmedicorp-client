import React from "react";

const ModuleHeaderNotice = ({ classes }) => {
    return (
        <div className={`ps-noti header__notice ${classes}`}>
            <div className="container">
                <p className="m-0">
                    [ IMPORTANT NOTICE! ] We're improving your experience, some features may not behave perfectly yet.
                </p>
            </div>
            {/* <a className="ps-noti__close">
                <i className="icon-cross"></i>
            </a> */}
        </div>
    );
};

export default ModuleHeaderNotice;
