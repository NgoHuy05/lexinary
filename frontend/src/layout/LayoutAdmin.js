import { useState } from "react";
import { Avatar, Badge, Layout, Menu } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    MenuOutlined,
    MailOutlined,
    UnorderedListOutlined,
    BellOutlined,
    MoonOutlined,
    SunOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import { Content, Footer, Header } from "antd/es/layout/layout";

function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-theme", !darkMode);
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} trigger={null}>
                <div className={`logo__web ${collapsed ? "collapsed" : ""}`}>
                    <img src={logo} className="logo__img" alt="Logo" />
                    {!collapsed && <span className="logo__title">Lexinary</span>}
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title={!collapsed && "Users"}>
                        <Menu.Item key="2-1">All Users</Menu.Item>
                        <Menu.Item key="2-2">Add User</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<SettingOutlined />} title={!collapsed && "Settings"}>
                        <Menu.Item key="3-1">General</Menu.Item>
                        <Menu.Item key="3-2">Security</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

            <Layout>
                <Header className="header__admin">
                    <div className="header__left">
                        <MenuOutlined className="menu-icon" onClick={() => setCollapsed(!collapsed)} />

                    </div>

                    <ul className="header__right">
                        <li className="header__right--item"><Badge count={5}>
                            <BellOutlined className="header-icon" />
                        </Badge></li>
                        <li className="header__right--item"><Badge count={5} style={{ backgroundColor: "orange" }}>
                            <UnorderedListOutlined className="header-icon" />
                        </Badge></li>
                        <li className="header__right--item"><Badge count={7} style={{ backgroundColor: "blue" }}>
                            <MailOutlined className="header-icon" />
                        </Badge></li>


                        <li className="header__right--item">
                            {darkMode ? (
                                <MoonOutlined className="header-icon" onClick={toggleTheme} style={{ fontSize: "18px", cursor: "pointer" }} />
                            ) : (
                                <SunOutlined className="header-icon" onClick={toggleTheme} style={{ fontSize: "18px", cursor: "pointer" }} />
                            )}
                        </li>
                        <li className="header__right--item">
                            <Avatar src="https://i.pravatar.cc/40" className="header-avatar" />
                        </li>
                    </ul>
                </Header>


                <Content>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>Admin Dashboard Lexinary ©2025</Footer>
            </Layout>
        </Layout>
    );
}

export default LayoutAdmin;
