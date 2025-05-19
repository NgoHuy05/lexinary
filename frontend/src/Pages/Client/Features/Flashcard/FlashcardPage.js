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
  const [topics, setTopics] = useState([]); // Lưu trữ danh sách topic
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const location = useLocation(); // Lấy pathname hiện tại
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
        setLoading(true); // Bắt đầu loading khi gọi API
        let response;

        // Kiểm tra để xác định gọi API phù hợp
        if (location.pathname === "/flashcard/home") {
          response = await getPublicTopics(); // Lấy topic công khai cho trang Home
        } else if (location.pathname === "/flashcard/library") {
          response = await getUserTopics(); // Lấy topic của người dùng cho trang Library
        } else {
          return;
        }

        // Kiểm tra kết quả từ API
        if (Array.isArray(response)) {
          setTopics(response); // Cập nhật danh sách topic
        } else {
          message.error("Dữ liệu topics không hợp lệ!");
        }
      } catch (error) {
        message.warning("Vui lòng đăng nhập để xem các chủ đề flashcard");
        navigate("/login");
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchTopics(); // Gọi hàm fetchTopics mỗi khi pathname thay đổi
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
        trigger={null} // tắt trigger mặc định
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
          {/* Chuyển trang với Outlet */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default FlashcardPage;
