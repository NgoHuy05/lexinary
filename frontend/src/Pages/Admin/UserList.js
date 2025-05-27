import React, { useEffect, useState } from "react";
import { Table, message, Button, Space, Modal, Form, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteUserById, listUser, updateUserById } from "../../api/apiUser";

const { confirm } = Modal;

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await listUser();
      setUsers(res.data);
    } catch (err) {
      message.error("Lỗi khi tải danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await updateUserById(editingUser._id, values);
      message.success("Cập nhật người dùng thành công");
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error("Cập nhật thất bại");
    }
  };

  const handleDelete = (user) => {
    confirm({
      title: `Bạn có chắc muốn xóa người dùng ${user.name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteUserById(user._id);
          message.success("Xóa người dùng thành công");
          fetchUsers();
        } catch (error) {
          message.error("Xóa người dùng thất bại");
        }
      },
    });
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
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
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Sửa
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin__page">
      <h2>Danh sách người dùng</h2>
      <Table columns={columns} dataSource={users} rowKey="_id" loading={loading} pagination={{ pageSize: 10 }} />

      <Modal
        title="Chỉnh sửa người dùng"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" name="formUserEdit">
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Vui lòng chọn role" }]}
          >
            <Select placeholder="Chọn role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserList;
