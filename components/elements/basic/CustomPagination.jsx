import React from "react";

const CustomPagination = () => {
    return (
        <div className="ps-pagination">
            <ul className="pagination">
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-left"></i>
                    </a>
                </li>
                <li className="active">
                    <a href="#">1</a>
                </li>
                <li>
                    <a href="#">2</a>
                </li>
                <li>
                    <a href="#">3</a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default CustomPagination;
