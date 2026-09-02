// import React from "react";
// import Rating from "@/components/elements/Rating";

// const TestimonialItem = ({ source }) => {
//     return (
//         <div className="ps-review">
//             <div className="ps-review__text">{source.text}</div>
//             <div className="ps-review__name">{source.customerName}</div>
//             <div className="ps-review__review">
//                 <Rating />
//             </div>
//         </div>
//     );
// };

// export default TestimonialItem;

import React from "react";
import Rating from "@/components/elements/Rating";
import "./testimonial-item.scss";

// The `reviews` schema has no avatar image, so we draw the customer's initials.
function initials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0] ?? "")
        .join("")
        .toUpperCase();
}

const TestimonialItem = ({ source }) => {
    return (
        <article className="testimonial-card">
            {/* <span className="testimonial-card__quote" aria-hidden="true">
                &rdquo;
            </span> */}
            <i className="fa fa-quote-left testimonial-card__quote" aria-hidden="true" />

            <p className="testimonial-card__text">{source.text}</p>

            <footer className="testimonial-card__footer">
                <span className="testimonial-card__avatar" aria-hidden="true">
                    {initials(source.customerName)}
                </span>
                <span className="testimonial-card__meta">
                    <span className="testimonial-card__name">
                        {source.customerName}
                    </span>
                    
                    <span className="testimonial-card__rating">
                        <Rating value={source.rating ?? 0} />
                    </span>
                </span>
            </footer>
        </article>
    );
};

export default TestimonialItem;
