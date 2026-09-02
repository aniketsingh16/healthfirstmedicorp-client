import React from "react";
import Rating from "@/components/elements/Rating";

const LatestReviews = () => {
    const reviews = [
        {
            id: 1,
            text: "Everything is perfect. I would recommend",
        },
        {
            id: 2,
            text:
                "I ordered on Friday evening and on Monday at 12:30 the package was with me. I have never encountered such a fast order processing.",
        },
        {
            id: 3,
            text:
                "There was a small mistake in the order. In return, I got the correct order and I could keep the wrong one for myself.",
        },
        {
            id: 4,
            text:
                "I ordered on Friday evening and on Monday at 12:30 the package was with me. I have never encountered such a fast order processing.",
        },
        {
            id: 5,
            text:
                "There was a small mistake in the order. In return, I got the correct order and I could keep the wrong one for myself.",
        },
        {
            id: 6,
            text: "Everything is perfect. I would recommend!",
        },
    ];
    const reviewsView = reviews.map((item) => (
        <div className="ps-block__item" key={item.productID}>
            <p>{item.text}</p>
            <h5>Mark J.</h5>
            <Rating />
        </div>
    ));

    return (
        <section className="ps-latest-reviews">
            <div className="ps-section__header">
                <h3>Latest Reviews</h3>
                <a href="#">Write a review</a>
            </div>
            <div className="ps-section__content">
                <div className="ps-block--reviews">{reviewsView}</div>
                <div className="ps-section__footer text-center">
                    <a href="#">Load more</a>
                </div>
            </div>
        </section>
    );
};

export default LatestReviews;
