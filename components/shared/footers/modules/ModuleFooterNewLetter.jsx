import React from "react";

const ModuleFooterNewLetter = () => {
    return (
        <>
            <div className="ps-footer--newsletter">
                <h5 className="ps-footer__title">Join our newsletter</h5>
                <p>And get $20 discount for your first order</p>
                <form action="do_action" method="post">
                    <div className="ps-form--newsletter">
                        <div className="input-group">
                            <input
                                className="form-control ps-input"
                                type="text"
                                placeholder="Enter your email address"
                            />
                            <button className="ps-btn ps-btn--warning">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ModuleFooterNewLetter;
