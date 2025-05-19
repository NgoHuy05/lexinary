import { useState, useEffect } from "react";
import { Row, Col, Card, Select, Typography, Spin } from "antd";
import "../../../UI/Courses.scss";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../../api/apiCourse";
import Cookies from "js-cookie";
import { message } from "antd"; // Thêm dòng này đầu file

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
    // Lấy dữ liệu từ API khi component được render
    setLoading(true);

    const fetchCourses = async () => {
      try {
        const response = await getCourses(); // Đảm bảo gọi đúng hàm
        setCourses(response.data);

        // Phân loại các khóa học dựa vào categoryType
        const categorizedCourses = {
          skill: response.data.filter(course => course.categoryType === "Skill"),
          level: response.data.filter(course => course.categoryType === "Level"),
          purpose: response.data.filter(course => course.categoryType === "Purpose"),
        };

        setFilteredCourses(categorizedCourses);  // Cập nhật dữ liệu phân loại
        setLoading(false);

      } catch (error) {
        console.error("Có lỗi khi tải khóa học: ", error);
        setLoading(false);

      }
    };

    fetchCourses();  // Gọi API khi component mount
  }, []); // Chỉ gọi API khi component mount


  // Tiêu đề phân loại theo categoryType
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

  if (loading ) {
  return (
    <div style={{ textAlign: "center", padding: 100 }}>
      <Spin size="large" tip="Đang tải dữ liệu..." />
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

        {/* Các phần hiển thị khóa học */}
        <div className="course-library__section">
          {/* Tiêu đề phân loại động */}
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
                          bodyStyle={{ padding: "30px", backgroundColor: course.color }}

                          // Thay alert bằng message
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
