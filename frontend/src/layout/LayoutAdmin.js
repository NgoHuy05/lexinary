import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Space, message } from "antd";
import { DashboardOutlined, UserOutlined, SettingOutlined, MenuOutlined, MoonOutlined, SunOutlined, BookOutlined, AppstoreOutlined, } from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../UI/LayoutAdmin.scss";
import { logoutUser } from "../api/apiUser";
import { removeAllCookies } from "../utils/cookie";
import Cookies from "js-cookie";

const { Sider, Header, Content, Footer } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const roleAd = Cookies.get("role");


  useEffect(() => {
    if (roleAd !== "admin") {
      message.warning("Vui lòng đăng nhập");
      navigate("/admin/login");
    }
  }, [roleAd, navigate]);

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
    {
      key: "logout",
      label: (
        <span onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
          Đăng xuất
        </span>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <NavLink to="/admin">Dashboard</NavLink>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <NavLink to="/admin/users">Users</NavLink>,
    },
    {
      key: "3",
      icon: <BookOutlined />,
      label: "Courses",
      children: [
        { key: "3-1", label: <NavLink to="/admin/courses/all">All Courses</NavLink> },
        { key: "3-2", label: <NavLink to="/admin/courses/add">Add Courses</NavLink> },
      ],
    },
    {
      key: "4",
      icon: <AppstoreOutlined />,
      label: "Topics",
      children: [
        { key: "4-1", label: <NavLink to="/admin/topics/all">All Topics</NavLink> },
        { key: "4-2", label: <NavLink to="/admin/topics/add">Add Topics</NavLink> },
      ],
    },
    {
      key: "5",
      icon: <SettingOutlined />,
      label: <NavLink to="/admin/setting">Setting</NavLink>,
    },
  ];


  return (
    <Layout className="admin">
      <Sider collapsible collapsed={collapsed} trigger={null} className="admin__sider">
        <div className={`admin__logo ${collapsed ? "admin__logo--collapsed" : ""}`}>
          {!collapsed ? <span className="admin__logo-title">Lexinary</span> : <span className="admin__logo-title">Lexi</span>}
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} className="admin__menu" items={items} />
      </Sider>

      <Layout>
        <Header className="admin__header">
          <div className="admin__header-left">
            <MenuOutlined className="admin__menu-toggle" onClick={() => setCollapsed(!collapsed)} />
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
                    <Avatar icon={<UserOutlined />} />
                  </Space>
                </a>
              </Dropdown>
            </li>
          </ul>
        </Header>

        <Content className="admin__content">
          <Outlet />
        </Content>
        <Footer className="admin__footer">Admin Dashboard Lexinary ©2025</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutAdmin;
