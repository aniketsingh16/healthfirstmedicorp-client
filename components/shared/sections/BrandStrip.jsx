import React from "react";
import "./brand-strip.scss";

const BRANDS = [
    { name: "Schindler", logo: "/static/img/brands/schindler.png" },
    { name: "TetraPak", logo: "/static/img/brands/tetra-pak.png" },
    { name: "Bajaj", logo: "/static/img/brands/bajaj-auto.png" },
    { name: "Skoda", logo: "/static/img/brands/skoda.png" },
];

const BrandStrip = ({
    title = "Trusted By Industry Leading Brands",
    subtitle = "Hospitals and corporates across India rely on us for equipment and emergency preparedness.",
    brands = BRANDS,
}) => {

    return (
        <section className="brand-marquee">
            <div className="container">
                <h2 className="brand-marquee__title">{title}</h2>
                {subtitle && <p className="brand-marquee__subtitle">{subtitle}</p>}

                <div className="brand-marquee__viewport">
                    {/* The row is rendered twice so the loop is seamless: the track
                        animates to -50%, at which point copy 2 sits exactly where
                        copy 1 started. The duplicate is hidden from screen readers. */}
                    <div className="brand-marquee__track">
                        {[0, 1].map((copy) => (
                            <ul
                                className="brand-marquee__list"
                                key={copy}
                                aria-hidden={copy === 1 ? "true" : undefined}
                            >
                            {brands.map((brand) => (
                                <li
                                    className="brand-marquee__item"
                                    key={`${copy}-${brand.name}`}
                                >
                                    <img
                                        src={brand.logo}
                                        alt={copy === 0 ? brand.name : ""}
                                        height={48}
                                        loading="lazy"
                                    />
                                </li>
                            ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandStrip;
