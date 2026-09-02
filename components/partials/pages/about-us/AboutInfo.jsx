import Image from "next/image";
import React from "react";
import { Dancing_Script } from "next/font/google";

// Signature face for the director's name. Scoped to this component — delete
// this import, the const, and the className on the <h4> to revert.
const signatureFont = Dancing_Script({
    subsets: ["latin"],
    weight: ["600"],
    display: "swap",
});

// Statically imported rather than referenced by URL: the file lives inside
// app/, not public/, so it has no public path. The import also gives Next the
// real width/height, so no dimensions need to be declared below.
import storyImage from "@/public/static/img/about/about-us.jpg";
import AboutValues from "@/components/partials/pages/about-us/AboutValues";

const AboutInfo = () => {
    return (
        <section className="ps-about--info">
            <h2> About Us </h2>
            <br />
            <h3 className="ps-block__title">
                Our Story
            </h3>
            <hr />
            <div className="ps-about__story">
                <div className="ps-block__subtitle ps-about__story-text">
                    <p>
                        <strong>Healthfirst Medicorp</strong> is one of India's leading wholesale suppliers of healthcare
                         and medical equipment, trusted by hospitals and businesses across 20+ states for genuine,
                          quality-assured products. Our range spans first aid kits, hospital furniture, and a wide
                           array of medical equipment each selected for low maintenance, high efficiency, and 
                           dependable performance. We are steadily expanding our portfolio to include a broader
                            variety of imported medical products, giving our customers 
                            access to global quality standards alongside trusted local service.
                    </p>
                    <p>
                        At the helm is our Director, <strong>Mr. Ravi Singh</strong>, a seasoned industry professional
                         with over 15+ years of experience in the medical equipment sector.
                          A former officer in the Indian Navy, Ravi brings a rare combination 
                          of discipline, precision, and integrity to the business. His vision
                           and unwavering commitment to improving healthcare access continue 
                           to drive Healthfirst Medicorp's growth and success.
                    </p>
                </div>

                <div className="ps-about__story-image">
                    <Image
                        src={storyImage}
                        alt="Healthfirst Medicorp"
                        sizes="(max-width: 991px) 100vw, 45vw"
                        placeholder="blur"
                    />
                </div>
            </div>
            <br /><br />
            <h3 className="ps-block__title">
                Director&apos;s Message
            </h3>
            <hr />
            <div className="ps-about__content">
                <section className="ps-about__project">
                    <div className="container"> 
                        <section className="ps-section--block-grid">
                            <div className="ps-section__thumbnail">
                                <a className="ps-section__image" href="#">
                                    <Image
                                        src="/static/img/Ravi_Singh.png"
                                        width={1239}
                                        height={1269}
                                        alt="Ravi Singh, Director & Chief Executive Officer"
                                        sizes="(max-width: 991px) 280px, 350px"
                                    />
                                </a>
                            </div>
                            <div className="ps-section__content">
                                <div className="ps-section__desc">
                                    <h3 className="ps-section__title">
                                        <img src="/static/img/quote-icon.png" alt="" />
                                    </h3>
                                    At <strong>Healthfirst Medicorp</strong>, Our mission is to enhance the quality of healthcare 
                                    by providing state-of-the-art medical equipments that healthcare professionals 
                                    can rely on. We push the boundaries of excellence in everything we do, so we can
                                    deliver the highest standards products that not only meet but exceed industry 
                                    standards, ensuring the best care for patients.
                                        <hr />
                                </div>
                                <h4 className={`ps-about__signature ${signatureFont.className}`}>
                                    Ravi Singh
                                </h4>
                                <p>Director & Chief Executive Officer</p>
                            </div>
                        </section>
                    </div>
                </section> 
                <h3 className="ps-block__title">
                Our Values
            </h3>
            <hr />
            </div>    
            <div className="ps-about__extent">
                <AboutValues />
            </div>
        </section>
    );
};

export default AboutInfo;
