import { useState, useEffect } from "react";
import { Row, Col, Card, Select, Typography, Spin } from "antd";
import "../../../UI/Courses.scss";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../../api/apiCourse";
import Cookies from "js-cookie";
import { message } from "antd";

const { Title, Paragraph } = Typography;

export default function CourseLibrary() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredCourses, setFilteredCourses] = useState({
    skill: [],
    level: [],
    purpose: [],
  });
  const navigate = useNavigate();
  const userId = Cookies.get("id");

  useEffect(() => {
    if (!userId) {
      message.warning("Vui lòng đăng nhập để xem khóa học");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
        const categorizedCourses = {
          skill: response.data.filter(course => course.categoryType === "Skill"),
          level: response.data.filter(course => course.categoryType === "Level"),
          purpose: response.data.filter(course => course.categoryType === "Purpose"),
        };

        setFilteredCourses(categorizedCourses);
        setLoading(false);

      } catch (error) {
        console.error("Có lỗi khi tải khóa học: ", error);
        setLoading(false);

      }
    };

    fetchCourses();
  }, []);

  const getCategoryTitle = (categoryType) => {
    switch (categoryType) {
      case "Skill":
        return "Khóa học theo chức năng";
      case "Level":
        return "Khóa học theo cấp độ";
      case "Purpose":
        return "Khóa học theo nhu cầu";
      default:
        return "";
    }
  };

if (loading) {
  return (
    <div style={{ textAlign: "center", padding: 100 }}>
      <Spin size="large" />
      <div style={{ marginTop: 16 }}>Đang tải dữ liệu...</div>
    </div>
  );
}


  return (
    <>
      <div className="course-library">
        <div className="course-library__container">
          <Title className="course-library__title">Thư viện Khóa học Lexinary</Title>
          <Paragraph className="course-library__description">
            Hệ thống khóa học tiếng Anh thông minh giúp bạn ghi nhớ dễ dàng và khoa học hơn.
          </Paragraph>

          <div className="course-library__section">
            {["Skill", "Level", "Purpose"].map((categoryType) => {
              const categoryCourses = filteredCourses[categoryType.toLowerCase()];
              if (categoryCourses.length > 0) {
                return (
                  <div key={categoryType}>
                    <Title level={2} className="course-library__section-title">{getCategoryTitle(categoryType)}</Title>
                    <Row gutter={[24, 24]} className="course-library__grid">
                      {categoryCourses.map((course, index) => (
                        <Col xs={24} sm={12} md={8} key={index} className="course-library__grid-item">
                          <Card
                            hoverable
                            className="course-library__card"
                            styles={{ body: { padding: "30px", backgroundColor: course.color } }}
                            onClick={() => {
                              if (userId) {
                                navigate(`/courses/${course._id}`);
                              } else {
                                message.warning("Vui lòng đăng nhập để xem chi tiết khóa học");
                                navigate("/login");
                              }
                            }}
                          >
                            <div className="course-library__icon">{course.icon}</div>
                            <Title level={3} className="course-library__card-title">{course.title}</Title>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
