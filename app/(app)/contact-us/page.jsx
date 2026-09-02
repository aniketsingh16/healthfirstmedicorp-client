// import "./contact-us.scss";
import React from "react";
import Container from "@/components/layouts/Container";
import BreadCrumb from "@/components/elements/BreadCrumb";
import SidebarShop from "@/components/shared/sidebar/SidebarShop";
import Shop from "@/components/partials/shop/Shop";
import PromotionSecureInformation from "@/components/shared/sections/PromotionSecureInformation";
import FormContact from "@/components/shared/forms/FormContact";
import ContactMap from "@/components/partials/pages/contact-us/ContactMap";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },
    {
        id: 2,
        text: "Contact Us",
    },
];

const ContactUsScreen = () => {
    return (
        <Container title="Contact Us">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-contact">
                            <div className="row">
                                <div className="col-12 col-lg-4">
                                    <div className="ps-contact__info">
                                        <h2 className="ps-contact__title">
                                            How can we help you?
                                        </h2>
                                        <p className="ps-contact__text">
                                            We are at your disposal 6 days a
                                            week!
                                        </p>
                                        <h3 className="ps-contact__fax">
                                            +91 73870 86440
                                        </h3>
                                        <div className="ps-contact__work">
                                            Monday to Saturday: 9:00 AM - 6:00 PM
                                            <br />
                                            Sunday: Closed
                                        </div>
                                        <div className="ps-contact__email">
                                            <a href="mailto:healthfirstmedicorp@gmail.com">
                                                healthfirstmedicorp@gmail.com
                                            </a>
                                        </div>
                                        <ul className="ps-social">
                                            <p> Follow us on</p>
                                            <li>
                                                <a
                                                    className="ps-social__link instagram"
                                                    href="https://www.instagram.com/healthfirstmedicorp/" target="_blank">
                                                    <i className="fa fa-instagram"></i>
                                                    {/* <span className="ps-tooltip">
                                                        Instagram
                                                    </span> */}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link facebook"
                                                    href="https://www.facebook.com/Healthfirstmedicorp.in/" target="_blank">
                                                    <i className="fa fa-facebook">
                                                        {" "}
                                                    </i>
                                                    {/* <span className="ps-tooltip">
                                                        Facebook
                                                    </span> */}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link youtube"
                                                    href="#">
                                                    <i className="fa fa-youtube-play"></i>
                                                    {/* <span className="ps-tooltip">
                                                        Youtube
                                                    </span> */}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link whatsapp"
                                                    href="https://wa.me/7387086440?text=Hi" target="_blank">
                                                    <i className="fa fa-whatsapp"></i>
                                                    {/* <span className="ps-tooltip">
                                                        Whatsapp
                                                    </span> */}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <div className="col-12 col-lg-8">
                                    <div className="ps-contact__map">
                                        
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101820.22578111451!2d73.77086803169173!3d18.487428407059706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea86e286d8bb%3A0x87d0cdf3e94e01f1!2sHealthfirst%20Medicorp!5e0!3m2!1sen!2sin!4v1714852330606!5m2!1sen!2sin"
                                            width="600"
                                            height="450"
                                            allowFullScreen=""
                                            loading="lazy"></iframe>
                                    </div>
                                </div> */}
                                <div className="col-12 col-lg-8">
                                    <ContactMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101820.22578111451!2d73.77086803169173!3d18.487428407059706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea86e286d8bb%3A0x87d0cdf3e94e01f1!2sHealthfirst%20Medicorp!5e0!3m2!1sen!2sin!4v1714852330606!5m2!1sen!2sin" />
                                </div>

                            </div>
                            <FormContact />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContactUsScreen;
