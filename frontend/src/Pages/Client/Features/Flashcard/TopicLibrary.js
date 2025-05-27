import React, { useState, useEffect } from "react";
import { Card, List, Spin, message, Empty, Popconfirm, Button, Space, } from "antd";
import { deleteTopic, getUserTopics, } from "../../../../api/apiTopic";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TopicLibrary = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await getUserTopics();
      setTopics(response);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách học phần của bạn!");
    } finally {
      setLoading(false);
    }
  };

  const handleClickTopic = (id) => {
    navigate(`/flashcard/library/topic/${id}`);
  };

  const handleEditTopic = (id) => {
    navigate(`/flashcard/update/${id}`);
  };

  const handleDeleteTopic = async (id) => {
    try {
      await deleteTopic(id);
      message.success("Xoá học phần thành công!");
      setTopics((prev) => prev.filter((topic) => topic._id !== id));
    } catch (err) {
      console.log(err);
      message.error("Lỗi khi xoá học phần!");
    }
  };

  if (loading) return <Spin size="large" />;
  if (!topics || topics.length === 0) return <Empty description="Không có học phần nào" />;

  return (
    <div style={{ padding: 24 }}>
      <h2>Danh sách chủ đề của bạn</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={topics}
        renderItem={(topic) => (
          <List.Item key={topic._id}>
            <Card
              hoverable
              onClick={() => handleClickTopic(topic._id)}
              style={{ cursor: "pointer" }}
              title={
                <Space
                  style={{ justifyContent: "space-between", width: "100%" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{topic.title}</span>
                  <Space>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTopic(topic._id);
                      }}
                    />
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xoá học phần này không?"
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
                </Space>
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

export default TopicLibrary;
