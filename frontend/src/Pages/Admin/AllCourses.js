import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { getCourses } from "../../api/apiCourse";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setCourses(res.data); // giả sử API trả về mảng courses ở res.data
    } catch (err) {
      message.error("Lỗi khi tải danh sách khóa học!");
    } finally {
      setLoading(false);
    }
  };

const columns = [
  {
    title: "STT",
    key: "stt",
    render: (_, __, index) => index + 1,
    width: 60,
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
    width: 200,
    // giữ ellipsis hoặc bỏ tùy bạn
    ellipsis: true,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    ellipsis: false,
    onCell: () => ({
      style: {
        whiteSpace: 'normal', // cho phép xuống dòng
        wordBreak: 'break-word', // ngắt từ khi dài
        maxWidth: 300, // bạn chỉnh độ rộng phù hợp
      }
    })
  },
  {
    title: "Đối tượng",
    dataIndex: "target",
    key: "target",
    ellipsis: false,
    onCell: () => ({
      style: {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        maxWidth: 300,
      }
    })
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    render: (text) => new Date(text).toLocaleDateString("vi-VN"),
  },
];


  return (
    <div className="admin__page">
      <h2>Danh sách tất cả khóa học</h2>
      <Table
        columns={columns}
        dataSource={courses}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}

export default AllCourses;
