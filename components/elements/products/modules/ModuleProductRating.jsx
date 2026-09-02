import React from 'react';

const ModuleProductRating = ({ value }) => {
    const stars = Array.from({ length: value }, (_, index) => (      
        <i key={index} className="fa fa-star"></i>
));
const reminingStars = 5 - value
const emptyStars = Array.from({ length: reminingStars }, (_, index) => (      
    <i key={index} className="fa fa-star-o"></i>
));
if (value > 5){
    return(
    <span className="ps-rating">
    <i className="fa fa-star"></i>
    <i className="fa fa-star"></i>
    <i className="fa fa-star"></i>
    <i className="fa fa-star"></i>
    <i className="fa fa-star"></i>
</span>
    )
}
else {
    return <span className="ps-rating">{stars}{emptyStars}</span>;
}
};

export default ModuleProductRating;
