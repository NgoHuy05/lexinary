import React, { useEffect, useState } from "react";
import { Layout, Button, Dropdown, Space, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/images/logo.webp";
import { FaPhoneAlt, FaFacebook } from "react-icons/fa";
import { logoutUser } from "../api/apiUser";
import { removeAllCookies } from "../utils/cookie";
import "../UI/layoutDefault.scss";

const { Content, Header } = Layout;

function LayoutDefault() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  const userId = Cookies.get("id");

  useEffect(() => {
    const name = Cookies.get("name");
    const status = Cookies.get("status");
    setStatus(status);
    setName(name);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeAllCookies();
      setStatus(false);
      setName("");
      navigate("/");
    } catch (error) {
      console.error("Có lỗi khi đăng xuất:", error);
    }
  };

  const menuItemsFeature = [
    { key: "flashcard", label: <NavLink to="flashcard">Flashcard</NavLink> },
    { key: "game", label: <NavLink to="game">Game</NavLink> },
    { key: "note", label: <NavLink to="note">Ghi chú</NavLink> }
  ];

  const menuItemSetting = [
    { key: "progress", label: <NavLink to="/progress">Tiến trình học tập</NavLink> },
    { key: "setting", label: <NavLink to="/setting">Cài đặt</NavLink> },
    { key: "logout", label: (
      <span onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
        Đăng xuất
      </span>
    ), },
    
  ];


  return (
    <>
    <Layout>
      <Header className="header">
        <NavLink to="/">
          <div className="header__logo">
            <img src={logo} alt="logo" />
            <span className="header__brand">Lexinary</span>
          </div>
        </NavLink>
        <div className="header__nav">
          <div className="header__nav--left">
            <NavLink to="/">TRANG CHỦ</NavLink>
            <NavLink to="/courses">KHÓA HỌC</NavLink>
            <NavLink to="/method">PHƯƠNG PHÁP HỌC</NavLink>
            <NavLink to="/quotes">TRÍCH DẪN</NavLink>

            <Dropdown menu={{ items: menuItemsFeature }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  TÍNH NĂNG
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className="header__nav--right">
            {status && name ? (
              <div className="user__info">
                <Dropdown menu={{ items: menuItemSetting }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar src={null} icon={<UserOutlined />} />
                    </Space>
                  </a>
                </Dropdown>
              
              </div>
            ) : (
              <>
                <Button className="btn__login" type="primary" shape="round">
                  <NavLink to="/login">ĐĂNG NHẬP</NavLink>
                </Button>
                <Button className="btn__register" type="primary" shape="round">
                  <NavLink to="/register">ĐĂNG KÍ</NavLink>
                </Button>
              </>
            )}
          </div>
        </div>
      </Header>

      <Content className="content">
        <Outlet />
      </Content>

        <footer className="footer">
          <div className="footer__title">
            <h2>Học tiếng anh với Lexinary.</h2>
            <Button type="primary" className="btn__footer" onClick={() => navigate("/login")}>
              Bắt đầu
            </Button>
          </div>
          <div className="footer__content">
            <div className="footer__content--left">
              <h3>Giới thiệu</h3>
              <NavLink to="/method" className="nav-link">Phương pháp học</NavLink>
              <NavLink to="/quotes" className="nav-link">Trích dẫn</NavLink>
            </div>
            <div className="footer__content--mid">
              <h3>Chính sách</h3>
              <NavLink to="/terms" className="nav-link">Điều khoản</NavLink>
              <NavLink to="/privacy" className="nav-link">Bảo mật</NavLink>
            </div>
            <div className="footer__content--right">
              <h3>Liên hệ</h3>
              <div><FaPhoneAlt /> 000.000.0000</div>
              <div><FaFacebook /> Facebook</div>
            </div>
          </div>
        </footer>
    </Layout>
    </>
  );
}

export default LayoutDefault;
