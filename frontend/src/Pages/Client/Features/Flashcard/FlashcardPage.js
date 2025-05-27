import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, message } from "antd";
import { getPublicTopics, getUserTopics } from "../../../../api/apiTopic"; // Import hai hàm API
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../../../UI/FlashcardPage.scss";
import {
  HomeOutlined,
  PlusOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
const { Sider, Content } = Layout;

const FlashcardPage = () => {
  const [topics, setTopics] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const location = useLocation(); 
  const [collapsed, setCollapsed] = useState(false);
  const userId = Cookies.get("id");
  
  useEffect(() => {
    if (!userId) {
      message.warning("Vui lòng đăng nhập để xem chủ đề flashcard");
      navigate("/login");
    }
  }, []);
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true); 
        let response;
        if (location.pathname === "/flashcard/home") {
          response = await getPublicTopics(); 
        } else if (location.pathname === "/flashcard/library") {
          response = await getUserTopics(); 
        } else {
          return;
        }
        if (Array.isArray(response)) {
          setTopics(response); 
        } else {
          message.error("Dữ liệu topics không hợp lệ!");
        }
      } catch (error) {
        message.warning("Vui lòng đăng nhập để xem các chủ đề flashcard");
        navigate("/login");
      } finally {
        setLoading(false); 
      }
    };

    fetchTopics(); 
  }, [location.pathname]);

  const menuItems = [
    {
      key: "/flashcard/home",
      icon: <HomeOutlined />,
      label: <Link to="/flashcard/home">Trang chủ</Link>,
    },
    {
      key: "/flashcard/create",
      icon: <PlusOutlined />,
      label: <Link to="/flashcard/create">Tạo mới</Link>,
    },
    {
      key: "/flashcard/library",
      icon: <BookOutlined />,
      label: <Link to="/flashcard/library">Thư viện của bạn</Link>,
    },
  ];


  return (
    <>
    <Layout className="flashcard-page">
      <Sider
        className="flashcard-page__sider"
        collapsible
        collapsed={collapsed}
        trigger={null} 
      >
        <button
          type="primary"
          onClick={toggleCollapsed}
          className="flashcard-page__btn"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>

        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={loading ? [] : menuItems}
        />
      </Sider>


      <Layout>
        <Content className="flashcard-page__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default FlashcardPage;
