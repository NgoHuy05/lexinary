import React, { useState, useEffect } from "react";
import { message, Spin, Empty, List, Card, Input, Popconfirm, Button, Space, } from "antd";
import { getPublicTopics, deleteTopic, } from "../../../../api/apiTopic";
import { getUserProfile } from "../../../../api/apiUser";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

const TopicHome = () => {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await getPublicTopics();
        setTopics(response);
        setFilteredTopics(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chủ đề flashcard!");
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setRole(res.data.user.role);
      } catch (err) {
        console.log("Không thể lấy thông tin user:", err);
      }
    };

    fetchUser();
    fetchTopics();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  const handleClickTopic = (id) => {
    navigate(`/flashcard/home/topic/${id}`);
  };

  const handleDeleteTopic = async (id) => {
    try {
      await deleteTopic(id);
      message.success("Xoá topic thành công!");
      setTopics((prev) => prev.filter((topic) => topic._id !== id));
      setFilteredTopics((prev) => prev.filter((topic) => topic._id !== id));
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi xoá topic!");
    }
  };

  const handleEditTopic = (id) => {
    navigate(`/flashcard/update/${id}`);
  };

  if (loading) {
  return (
    <div style={{ textAlign: "center", padding: 100 }}>
      <Spin size="large" />
      <div style={{ marginTop: 16 }}>Đang tải dữ liệu...</div>
    </div>
  );
}
  if (!filteredTopics || filteredTopics.length === 0)
    return <Empty description="Không có topic nào phù hợp" />;

  return (
    <div style={{ padding: 24 }}>
      <h2>Danh sách chủ đề chung</h2>

      <Search
        placeholder="Tìm kiếm topic..."
        enterButton
        allowClear
        onSearch={handleSearch}
        style={{ maxWidth: 400, marginBottom: 24 }}
      />

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredTopics}
        renderItem={(topic) => (
          <List.Item key={topic._id}>
            <Card
              hoverable
              onClick={() => handleClickTopic(topic._id)}
              style={{ cursor: "pointer" }}
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{topic.title}</span>
                  {role === "admin" && (
                    <Space onClick={(e) => e.stopPropagation()}>
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditTopic(topic._id)}
                      />
                      <Popconfirm
                        title="Bạn có chắc muốn xoá topic này không?"
                        onConfirm={() => handleDeleteTopic(topic._id)}
                        okText="Xoá"
                        cancelText="Huỷ"
                      >
                        <Button
                          type="text"
                          icon={<DeleteOutlined style={{ color: "red" }} />}
                        />
                      </Popconfirm>
                    </Space>
                  )}
                </div>
              }
            >
              <p>{topic.description}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TopicHome;
