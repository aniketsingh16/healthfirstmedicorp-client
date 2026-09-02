import React from 'react';
import { connect } from 'react-redux';

const ModuleDrawerShopOverlay = ({ isFilter }) => {
    return (
        <div className={`ps-site-overlay ${isFilter ? 'active' : ''}`}></div>
    );
};

export default connect((state) => state.shop)(ModuleDrawerShopOverlay);
