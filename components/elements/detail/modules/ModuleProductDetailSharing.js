import React from "react";

const ModuleProductDetailSharing = () => (
    <div className="ps-product__sharing">
        <ul className="ps-social ps-social--color">
            <li>
                <a className="ps-social__link facebook" href="#">
                    <i className="fa fa-facebook"> </i>
                    <span className="ps-tooltip">Facebook</span>
                </a>
            </li>
            <li>
                <a className="ps-social__link twitter" href="#">
                    <i className="fa fa-twitter"></i>
                    <span className="ps-tooltip">Twitter</span>
                </a>
            </li>
            <li>
                <a className="ps-social__link pinterest" href="#">
                    <i className="fa fa-pinterest-p"></i>
                    <span className="ps-tooltip">Pinterest</span>
                </a>
            </li>
            <li className="ps-social__linkedin">
                <a className="ps-social__link linkedin" href="#">
                    <i className="fa fa-linkedin"></i>
                    <span className="ps-tooltip">Linkedin</span>
                </a>
            </li>
            <li className="ps-social__reddit">
                <a className="ps-social__link reddit-alien" href="#">
                    <i className="fa fa-reddit-alien"></i>
                    <span className="ps-tooltip">Reddit Alien</span>
                </a>
            </li>
            <li className="ps-social__email">
                <a className="ps-social__link envelope" href="#">
                    <i className="fa fa-envelope-o"></i>
                    <span className="ps-tooltip">Email</span>
                </a>
            </li>
            <li className="ps-social__whatsapp">
                <a className="ps-social__link whatsapp" href="#">
                    <i className="fa fa-whatsapp"></i>
                    <span className="ps-tooltip">WhatsApp</span>
                </a>
            </li>
        </ul>
    </div>
);

export default ModuleProductDetailSharing;
