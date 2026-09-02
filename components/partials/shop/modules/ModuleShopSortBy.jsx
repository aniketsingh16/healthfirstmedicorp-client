import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const ModuleShopSortBy = () => {
    const sortByItems = [
        {
            id: 1,
            text: 'Popularity',
        },
        {
            id: 2,
            text: 'Avarage Rating',
        },
        {
            id: 3,
            text: 'Latest',
        },
        {
            id: 4,
            text: 'Price: Low - High',
        },
        {
            id: 5,
            text: 'Price: High - Low',
        },
    ];
    const viewItems = sortByItems.map((item) => (
        <Menu.Item key={item.productID}>
            <a href="#">{item.text}</a>
        </Menu.Item>
    ));
    const view = <Menu>{viewItems}</Menu>;

    return (
        <div className="ps-shop__sortby">
            <span>Sortby</span>
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle">
                <Button>
                    Popularity <i className="icon-chevron-down"></i>
                </Button>
            </Dropdown>
        </div>
    );
};

export default ModuleShopSortBy;
