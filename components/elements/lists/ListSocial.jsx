import React from 'react';

const ListSocial = ({ more }) => {
    if (more) {
        return (
            <ul className="ps-list--social">
                <li>
                    <a href="#">
                        <i className="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-youtube-play"></i>
                    </a>
                </li>
            </ul>
        );
    } else {
        return (
            <ul className="ps-list--social">
                <li>
                    <a className="facebook" href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a className="google-plus" href="#">
                        <i className="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a className="twitter" href="#">
                        <i className="fa fa-twitter"></i>
                    </a>
                </li>
            </ul>
        );
    }
};

export default ListSocial;
