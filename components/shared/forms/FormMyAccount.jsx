import React from "react";
import ListSocial from "~/components/elements/lists/ListSocial";

const FormMyAccount = () => {
    return (
        <form className="ps-form--auth" action="/" method="get">
            <ul className="ps-tab-list">
                <li className="active">
                    <a href="#tab-1">Login</a>
                </li>
                <li>
                    <a href="#tab-2">Register</a>
                </li>
            </ul>
            <div className="ps-tabs">
                <div className="ps-tab active" id="tab-1">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <div className="ps-checkbox">
                            <input
                                className="form-control"
                                type="checkbox"
                                id="remember"
                                name="remember"
                            />
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                    </div>
                    <div className="form-group submit">
                        <button className="ps-btn ps-btn--fullwidth ps-btn--black">
                            Submit
                        </button>
                    </div>
                    <p>
                        Connect with
                        <ListSocial />
                    </p>
                </div>
                <div className="ps-tab" id="tab-2">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Password"
                        />
                    </div>
                    <div className="ps-form__desc">
                        <p>
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account, and for other purposes described in
                            our privacy policy.
                        </p>
                    </div>
                    <div className="ps-form__social">
                        <p>Connect with</p>
                        <ListSocial />
                    </div>
                    <div className="form-group submit">
                        <button className="ps-btn ps-btn--fullwidth ps-btn--black">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default COMPONENT_NAME;
