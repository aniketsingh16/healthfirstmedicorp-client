import React from 'react';
import Link from 'next/link';

const MegaMenu = ({ source, classes = 'mega-menu', onlyItems = false }) => {
    let megaContentView;
    if (source) {
        megaContentView = source.megaContent.map((item) => (
            <div className="mega-menu__column" key={item.heading}>
                <h4 className="mega-menu__heading">{item.heading}</h4>
                <ul className="mega-menu__list menu--single">
                    {item.megaItems.map((subItem) => (
                        <li key={subItem.text}>
                            <Link href={subItem.url}>
                                {subItem.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    }
    if (!onlyItems) {
        return (
            <li className="menu-item-has-children has-mega-menu">
                <Link href={source.url !== '' ? source.url : '/'}>
                    {source.icon && <i className={source.icon}></i>}
                    {source.text}
                </Link>
                <div className={classes}>
                    <div className="mega-menu__wrapper">{megaContentView}</div>
                </div>
            </li>
        );
    } else {
        return (
            <div className={classes}>
                <div className="mega-menu__wrapper">{megaContentView}</div>
            </div>
        );
    }
};

export default MegaMenu;