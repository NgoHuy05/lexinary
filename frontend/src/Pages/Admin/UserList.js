import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { listUser } from "../../api/apiUser";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await listUser();
                setUsers(res.data.users || []);
                console.log(res.data);

            } catch (err) {
                message.error("Lỗi khi tải danh sách người dùng!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const columns = [
        { title: "Tên", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
       { title: "Role", dataIndex: "role", key: "role" },
{
  title: "Ngày tạo",
  dataIndex: "createdAt",
  key: "createdAt",
  render: (text) => new Date(text).toLocaleDateString("vi-VN"),
}

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
