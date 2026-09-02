import React from 'react';

const MenuHeaderProducts = () => {
    return (
        <div className="menu--header-products">
            <a className="menu__toggle" href="#">
                <i className="fa fa-bars"></i>
                <span>Products</span>
            </a>
            <div className="menu__content"></div>
        </div>
    );
};

export default MenuHeaderProducts;
