import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { listUser } from "../../api/apiUser";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await listUser();
      setUsers(res.data.users);
    } catch (err) {
      message.error("Lỗi khi tải danh sách người dùng!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };;


  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
        />
      ),
    },
  ];

  return (
    <div className="admin__page">
      <h2>Danh sách người dùng</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default UserList;
