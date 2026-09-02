import React from "react";

const ModuleArticleComments = () => {
    return (
        <div className="ps-comment--post">
            <h2 className="ps-comment__title">Comments (6)</h2>
            <ul className="ps-comment__list">
                <li>
                    <div className="ps-review--product">
                        <div className="ps-review__row">
                            <div className="ps-review__avatar">
                                <img
                                    src="/static/img/avatar/avatar-review3.jpg"
                                    alt="alt"
                                />
                            </div>
                            <div className="ps-review__info">
                                <div className="ps-review__name">Jenna S.</div>
                                <div className="ps-review__date">
                                    Aug 12, 2021
                                </div>
                            </div>
                            <div className="ps-review__desc">
                                <p>Everything is perfect. I would recommend!</p>
                                <a className="ps-review__reply" href="#">
                                    Reply
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="ps-review--product">
                        <div className="ps-review__row">
                            <div className="ps-review__avatar">
                                <img
                                    src="/static/img/avatar/avatar-review4.jpg"
                                    alt="alt"
                                />
                            </div>
                            <div className="ps-review__info">
                                <div className="ps-review__name">John M.</div>
                                <div className="ps-review__date">
                                    Aug 12, 2021
                                </div>
                            </div>
                            <div className="ps-review__desc">
                                <p>
                                    I ordered on Friday evening and on Monday at
                                    12:30 the package was with me. I have never
                                    encountered such a fast order processing.
                                </p>
                                <a className="ps-review__reply" href="#">
                                    Reply
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul className="ps-comment__children">
                        <li>
                            <div className="ps-review--product">
                                <div className="ps-review__row">
                                    <div className="ps-review__avatar">
                                        <img
                                            src="/static/img/avatar/avatar-admin.jpg"
                                            alt="alt"
                                        />
                                    </div>
                                    <div className="ps-review__info">
                                        <div className="ps-review__name">
                                            Admin
                                        </div>
                                        <div className="ps-review__date">
                                            Oct 30, 2021
                                        </div>
                                    </div>
                                    <div className="ps-review__desc">
                                        <p>
                                            Everything is perfect. I would
                                            recommend!
                                        </p>
                                        <a
                                            className="ps-review__reply"
                                            href="#">
                                            Reply
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="ps-review--product">
                                <div className="ps-review__row">
                                    <div className="ps-review__avatar">
                                        <img
                                            src="/static/img/avatar/avatar-review4.jpg"
                                            alt="alt"
                                        />
                                    </div>
                                    <div className="ps-review__info">
                                        <div className="ps-review__name">
                                            John M.
                                        </div>
                                        <div className="ps-review__date">
                                            Oct 30, 2021
                                        </div>
                                    </div>
                                    <div className="ps-review__desc">
                                        <p>
                                            Thank you for your reply and help!
                                        </p>
                                        <a
                                            className="ps-review__reply"
                                            href="#">
                                            Reply
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="ps-review--product">
                        <div className="ps-review__row">
                            <div className="ps-review__avatar">
                                <img
                                    src="/static/img/avatar/avartar-comment.jpg"
                                    alt="alt"
                                />
                            </div>
                            <div className="ps-review__info">
                                <div className="ps-review__name">Monica B.</div>
                                <div className="ps-review__date">
                                    Aug 12, 2021
                                </div>
                            </div>
                            <div className="ps-review__desc">
                                <p>
                                    There was a small mistake in the order. In
                                    return, I got the correct order and I could
                                    keep the wrong one for myself. I ordered on
                                    Friday evening and on Monday at 12:30 the
                                    package was with me. I have never
                                    encountered such a fast order processing.
                                </p>
                                <a className="ps-review__reply" href="#">
                                    Reply
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="ps-review--product">
                        <div className="ps-review__row">
                            <div className="ps-review__avatar">
                                <img
                                    src="/static/img/avatar/avatar-review2.jpg"
                                    alt="alt"
                                />
                            </div>
                            <div className="ps-review__info">
                                <div className="ps-review__name">Ann R.</div>
                                <div className="ps-review__date">
                                    Aug 12, 2021
                                </div>
                            </div>
                            <div className="ps-review__desc">
                                <p>Everything is perfect. I would recommend!</p>
                                <a className="ps-review__reply" href="#">
                                    Reply
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ModuleArticleComments;
