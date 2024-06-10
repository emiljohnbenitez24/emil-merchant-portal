

import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import empLogo from '../../assets/logo/emp-logo.png'
import './LayoutSideBar.scss'

const { Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

interface Props {
    items: MenuItem[],
    handleMenuClick: (key: MenuItem) => void;
    currentPath: string;
}

const LayoutSideBar: React.FC<Props> = ({ items, handleMenuClick, currentPath }) => {

    return <Sider
        breakpoint="lg"
        collapsedWidth="0"
    >
        <img src={empLogo} alt='Logo' className='emp-logo' />
        <Menu theme="dark" inlineIndent={8} selectedKeys={[currentPath]} items={items} inlineCollapsed={false} onClick={handleMenuClick} />
    </Sider>
}

export default React.memo(LayoutSideBar)