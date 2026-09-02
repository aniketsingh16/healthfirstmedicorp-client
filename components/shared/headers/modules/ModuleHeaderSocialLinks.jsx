import React from 'react';
import Link from 'next/link';

const ModuleHeaderSocialLinks = () => {
    const links = [
        {
            id: 1,
            classes: 'fa fa-facebook',
        },
        {
            id: 2,
            classes: 'fa fa-instagram',
        },
        {
            id: 3,
            classes: 'fa fa-youtube-play',
        },
        {
            id: 4,
            classes: 'fa fa-pinterest',
        },
        {
            id: 5,
            classes: 'fa fa-linkedin',
        },
    ];
    // Views
    let linksView = links.map((item) => (
        <li key={item.productID}>
            <Link href="/" legacyBehavior>
                <a>
                    <i className={item.classes}></i>
                </a>
            </Link>
        </li>
    ));

    return (
        <ul className="ps-list--social header__social-links">{linksView}</ul>
    );
};

export default ModuleHeaderSocialLinks;
