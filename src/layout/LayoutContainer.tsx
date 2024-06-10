import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { Layout, MenuProps } from 'antd';
import './LayoutContainer.scss'
import LayoutSideBar from './sidebar/LayoutSideBar';

const { Content } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Welcome', '/welcome', <HomeOutlined/>),
    getItem('Stores', '/store', <ShopOutlined />),
];

const LayoutContainer: React.FC<any> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentPath, setCurrentPath] = useState<string>(location.pathname);

    const handleMenuClick = ({ key }) => {
        navigate(key)
        setCurrentPath(key)
    }

    return (
        <Layout>
            <LayoutSideBar items={items} currentPath={currentPath} handleMenuClick={handleMenuClick} />
                <Content>
                    <div>
                        {children}
                    </div>
                </Content>
        </Layout>
    );
};

export default LayoutContainer;