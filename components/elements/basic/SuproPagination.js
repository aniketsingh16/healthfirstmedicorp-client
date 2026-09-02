import React from 'react';

const SuproPagination = () => {
    return (
        <ul className="ps-pagination">
            <li className="active">
                <a href="#">
                    <span>01</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span>02</span>
                </a>
            </li>
            <li className="ps-pagination__next">
                <a href="#">
                    <i className="icon-chevron-right"></i>
                </a>
            </li>
        </ul>
    );
};

export default SuproPagination;
