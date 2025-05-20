import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Badge, Dropdown, Space, message } from "antd";
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
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "../UI/LayoutAdmin.scss";
import { logoutUser } from "../api/apiUser";
import { removeAllCookies } from "../utils/cookie";
import Cookies from "js-cookie";

function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const roleAd = Cookies.get("role");
useEffect(() => {
    if (!roleAd) {
        message.warning("Vui lòng đăng nhập");
        navigate("/admin/login");
    }
}, [roleAd]); 

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            removeAllCookies();
            navigate("/admin/login");
        } catch (error) {
            console.error("Có lỗi khi đăng xuất:", error);
        }
    };


    const menuItemSetting = [
        { key: "setting", label: <NavLink to="/setting">Cài đặt</NavLink> },
        {
            key: "logout", label: (
                <span onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
                    Đăng xuất
                </span>
            ),
        },

    ];


    return (
        <Layout className="admin">
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                className="admin__sider"
            >
                <div className={`admin__logo ${collapsed ? "admin__logo--collapsed" : ""}`}>
                    {!collapsed && <span className="admin__logo-title">Lexinary</span>}
                    {collapsed && <span className="admin__logo-title">Lexi</span>}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    className="admin__menu"
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <NavLink to="/admin"> Dashboard </NavLink>  
                        
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <NavLink to="/admin/users"> Users </NavLink>   
                    </Menu.Item>
                    <SubMenu key="sub2" title={!collapsed && "Courses"}>
                        <Menu.Item key="3-1">All Courses</Menu.Item>
                        <Menu.Item key="3-2">Add Course</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={!collapsed && "Topics"}>
                        <Menu.Item key="4-1">All Topics</Menu.Item>
                        <Menu.Item key="4-2">Add Topics</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<SettingOutlined />} title={!collapsed && "Settings"}>
                        <Menu.Item key="5-1">General</Menu.Item>
                        <Menu.Item key="5-2">Security</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

            <Layout>
                <Header className="admin__header">
                    <div className="admin__header-left">
                        <MenuOutlined
                            className="admin__menu-toggle"
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </div>

                    <ul className="admin__header-right">
                        <li className="admin__header-item">
                            {darkMode ? (
                                <MoonOutlined className="admin__icon" onClick={toggleTheme} />
                            ) : (
                                <SunOutlined className="admin__icon" onClick={toggleTheme} />
                            )}
                        </li>
                        <li className="admin__header-item">
                            <Dropdown menu={{ items: menuItemSetting }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar src={null} icon={<UserOutlined />} />
                                    </Space>
                                </a>
                            </Dropdown>                        </li>
                    </ul>
                </Header>

                <Content className="admin__content">
                    <Outlet />
                </Content>
                <Footer className="admin__footer">
                    Admin Dashboard Lexinary ©2025
                </Footer>
            </Layout>
        </Layout>
    );
}

export default LayoutAdmin;
