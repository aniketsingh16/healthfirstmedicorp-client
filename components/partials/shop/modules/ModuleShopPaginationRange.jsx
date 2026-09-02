import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const ModuleShopPaginationRange = () => {
    let ranges = [10, 20, 50, 100];
    const paginationRangeItems = ranges.map((item) => (
        <Menu.Item key={item}>
            <a href="#">{item}</a>
        </Menu.Item>
    ));
    const view = <Menu>{paginationRangeItems}</Menu>;
    return (
        <div className="ps-shop__pagination-range">
            <span>Show</span>
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle">
                <Button>
                    <strong>10</strong> <i className="icon-chevron-down"></i>
                </Button>
            </Dropdown>
        </div>
    );
};

export default ModuleShopPaginationRange;
