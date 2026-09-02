import React from 'react';

import { Select, Menu, Dropdown, Button } from 'antd';

const { Option } = Select;

const ModuleHeaderSwichers = () => {
    const languageItems = (
        <Menu>
            <Menu.Item>
                <a href="#">English</a>
            </Menu.Item>
            <Menu.Item>
                <a href="#">French</a>
            </Menu.Item>
        </Menu>
    );

    const currencyItems = (
        <Menu>
            <Menu.Item>
                <a href="#">USD</a>
            </Menu.Item>
            <Menu.Item>
                <a href="#">EURO</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header__switchers">
            <div className="header__switcher">
                <Dropdown
                    overlay={languageItems}
                    placement="bottomLeft"
                    className="ps-dropdown-toggle">
                    <Button>
                        English <i className="icon-chevron-down"></i>
                    </Button>
                </Dropdown>
            </div>
            <div className="header__switcher">
                <Dropdown overlay={currencyItems} placement="bottomLeft">
                    <Button>
                        USD <i className="icon-chevron-down"></i>
                    </Button>
                </Dropdown>
            </div>
        </div>
    );
};

export default ModuleHeaderSwichers;
