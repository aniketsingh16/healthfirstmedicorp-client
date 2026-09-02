import React from "react";

const FormPostComment = (props) => {
    return (
        <form action="do_action" method="post" className="ps-form--review">
            <div className="ps-form__title">Write a comment</div>
            <div className="ps-form__desc">
                Your email address will not be published. All fields are
                required
            </div>
            <div className="row">
                <div className="col-6 col-md-6">
                    <label className="ps-form__label">Your name</label>
                    <input
                        className="form-control ps-form__input"
                        placeholder="Your name"
                    />
                </div>
                <div className="col-6 col-md-6">
                    <label className="ps-form__label">Your e-mail</label>
                    <input
                        className="form-control ps-form__input"
                        placeholder="Your e-mail"
                    />
                </div>
                <div className="col-12">
                    <div className="ps-form__block">
                        <label className="ps-form__label">Your comment</label>
                        <textarea className="form-control ps-form__textarea"></textarea>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button className="btn ps-btn ps-btn--warning">
                        Add Review
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormPostComment;
