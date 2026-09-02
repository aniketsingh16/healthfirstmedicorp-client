import React from "react";

/**
 * Our Values — circular icon badges alternating above and below a connecting
 * line, after the reference artwork.
 *
 * Alternation is derived from the index rather than stored per item, so adding
 * or removing a value keeps the up/down/up rhythm without hand-editing flags.
 * Colour alternates on the same axis: raised badges blue, dropped ones orange.
 */
const VALUES = [
    {
        title: "Quality",
        icon: "/static/img/icon/quality.png",
        text: "We are committed to offering only high-quality, carefully sourced products that ensure lasting safety and trusted reliability for every customer.",
    },
    {
        title: "Integrity",
        icon: "/static/img/icon/integrity.png",
        text: "We uphold honesty and transparency in every dealing, ensuring trust is never compromised. Our practices reflect a strong commitment to ethical standards.",
    },
    {
        title: "Customer Focus",
        icon: "/static/img/icon/customer-focus.png",
        text: "We prioritize our customers' needs with reliable products and responsive service. Their trust and satisfaction remain at the heart of what we do.",
    },
    {
        title: "Excellence",
        icon: "/static/img/icon/excellence.png",
        text: "We are committed to delivering only the highest quality medical equipment and healthcare solutions, consistently exceeding industry standards.",
    },
];

const AboutValues = () => {
    return (
        <div className="ps-values">
            <div className="ps-values__track">
                {VALUES.map((value, index) => {
                    const raised = index % 2 === 0;

                    return (
                        <div
                            key={value.title}
                            className={[
                                "ps-values__item",
                                raised ? "ps-values__item--up" : "ps-values__item--down",
                                raised ? "ps-values__item--blue" : "ps-values__item--orange",
                            ].join(" ")}
                        >
                            <div className="ps-values__badge">
                                <img src={value.icon} alt="" />
                            </div>

                            <span className="ps-values__stem" aria-hidden="true" />

                            <div className="ps-values__copy">
                                <h3 className="ps-values__title">{value.title}</h3>
                                <p className="ps-values__text">{value.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AboutValues;
