import React from "react";
import ActiveLink from "@/components/elements/basic/ActiveLink";
import Logo from "@/components/elements/basic/Logo";
import Link from "next/link";

const ModuleFooterAddress = () => {
    // const links = {
    //     instagram: 'https://www.instagram.com/healthfirstmedicorp/',
    //     facebook: 'https://www.facebook.com/Healthfirstmedicorp.in/',
    //     whatsapp: 'https://wa.me/7387086440'
    // }
    return (
        <div className="ps-footer--address">
            <Logo />
            <div className="ps-footer__title">Our store</div>
            <p>
                A-17, Bramha Avenue
                <br />
                Pune, Maharashtra 
            </p>
            <p>
                <Link
                    href="https://maps.app.goo.gl/JPFFJ8jNxpWAyzuJ7"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Show on map
                </Link>
            </p>
            
            <ul className="ps-social">
            <p> Follow us on</p>
                <li>
                    <a className="ps-social__link instagram" href="https://www.instagram.com/healthfirstmedicorp/" target="_blank">
                        <i className="fa fa-instagram"></i>
                        {/* <span className="ps-tooltip">Instagram</span> */}
                    </a>
                </li>
                <li>
                    <a className="ps-social__link facebook" href="https://www.facebook.com/Healthfirstmedicorp.in/" target="_blank">
                        <i className="fa fa-facebook"> </i>
                        {/* <span className="ps-tooltip">Facebook</span> */}
                    </a>
                </li>
              
                <li>
                    <a className="ps-social__link youtube" href="#">
                        <i className="fa fa-youtube-play"></i>
                        {/* <span className="ps-tooltip">Youtube</span> */}
                    </a>
                </li>
                <li>
                    <a className="ps-social__link whatsapp" href="https://wa.me/7387086440" target="_blank">
                        <i className="fa fa-whatsapp"></i>
                        {/* <span className="ps-tooltip">Whatsapp</span> */}
                    </a>
                </li>
                {/* <li>
                    <a className="ps-social__link linkedin" href="#">
                        <i className="fa fa-linkedin"></i>
                        <span className="ps-tooltip">Linkedin</span>
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default ModuleFooterAddress;
