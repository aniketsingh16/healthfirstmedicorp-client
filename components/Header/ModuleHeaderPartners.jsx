import React from 'react';
import Link from 'next/link';

export const PartnerItem = ({ image }) => (
    <div className="ps-branch__item">
        <Link href="/shop" >
            <img src={image.image} alt={image.image} />
        </Link>
    </div>
);

const ModuleHeaderPartners = () => {
    const partnersItems = [
        { image: '/static/img/branch/brand-1.jpg' },
        { image: '/static/img/branch/brand-2.jpg' },
        { image: '/static/img/branch/brand-3.jpg' },
        { image: '/static/img/branch/brand-4.jpg' },
        { image: '/static/img/branch/brand-5.jpg' },
        { image: '/static/img/branch/brand-6.jpg' },
        { image: '/static/img/branch/brand-7.jpg' },
        { image: '/static/img/branch/brand-8.jpg' },
        { image: '/static/img/branch/brand-9.jpg' },
        { image: '/static/img/branch/brand-10.jpg' },
    ];

    return (
        <div className="ps-branch">
            <h3 className="ps-branch__title">Popular Brands</h3>
            <div className="ps-branch__box">
                {partnersItems.map((item) => (
                    <PartnerItem image={item} key={item.image} />
                ))}
            </div>
        </div>
    );
};

export default ModuleHeaderPartners;
