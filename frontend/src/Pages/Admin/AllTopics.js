import React, { useEffect, useState } from "react";
import { Table, message, Button, Space } from "antd";
import { getPublicTopics } from "../../api/apiTopic";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function AllTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await getPublicTopics();
      console.log(res)
      setTopics(res);
    } catch (err) {
      message.error("Lỗi khi tải danh sách chủ đề!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description", ellipsis: { showTitle: false } },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} >
            Sửa
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin__page" style={{ padding: 20 }}>
      <h2>Danh sách chủ đề</h2>
      <Table
        columns={columns}
        dataSource={topics}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />


    </div>
  );
}

export default AllTopics;
