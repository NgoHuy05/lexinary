import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, message } from "antd";
import { getAdminStats } from "../../api/apiCourse";
import "../../UI/AdminDashboard.scss"
const displayNames = {
  users: "Số người dùng",
  courses: "Số khóa học",
  chapters: "Số chương",
  lessons: "Số bài học",
  vocabularies: "Số từ vựng",
  sentences: "Số câu",
  exercises: "Số bài tập",
  topics: "Số chủ đề",
  flashcards: "Số flashcards",
};

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("URL gọi API:", `${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/stats`);
        const res = await getAdminStats();
        setStats(res.data);
      } catch (error) {
        console.log(error);
        message.error("Không thể tải dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) return <Spin size="large" />;

  return (
    <div className="admin-dashboard">
      <Row gutter={[16, 16]}>
        {Object.entries(stats).map(([key, value]) => (
          <Col xs={24} sm={12} md={8} lg={6} key={key}>
            <Card title={displayNames[key] || key} bordered className="stat-card">
              <h2>{value}</h2>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AdminDashboard;
