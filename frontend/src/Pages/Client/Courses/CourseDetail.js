import React, { useEffect, useState } from "react";
import { Layout, Menu, Spin } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getChapters } from "../../../api/apiChapter";
import { getLessonDetail } from "../../../api/apiLesson";
import { getCourseDetail } from "../../../api/apiCourse";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../../../UI/CourseDetail.scss";
import { getCompletedLessons } from "../../../api/apiUser";
import Cookies from "js-cookie";

const { Sider, Content } = Layout;

const CourseDetail = () => {
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('overview');
  const userId = Cookies.get("id");
  const navigate = useNavigate();
  const specialCourses = ["Du lịch", "Phỏng vấn và Văn phòng", "Học thuật"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const courseResponse = await getCourseDetail(courseId);
        setCourse(courseResponse.data);

        const chaptersResponse = await getChapters(courseId);
        const chaptersData = chaptersResponse.data || [];
        setChapters(chaptersData);

        const lessonsIds = chaptersData.reduce((ids, chapter) => {
          return ids.concat(chapter.lessons);
        }, []);
        if (lessonsIds.length > 0) {
          const lessonResponses = await Promise.all(
            lessonsIds.map((lesson) => getLessonDetail(lesson._id))
          );
          setLessons(lessonResponses.map((res) => res.data));
        }

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);



  useEffect(() => {
    setLoading(true);
    const userId = Cookies.get("id");
    const fetchCompletedLessons = async () => {
      try {
        const response = await getCompletedLessons(userId);
        if (Array.isArray(response.data.completedLessons)) {
          const completedLessonIds = response.data.completedLessons.map(lesson => lesson._id); // Chỉ lấy ID bài học
          setCompletedLessons(completedLessonIds); // Lưu trữ các ID bài học đã hoàn thành
        } else {
          console.error("Dữ liệu trả về không chứa mảng completedLessons:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải bài học đã hoàn thành:", error);
        setLoading(false);
      }
    };

    fetchCompletedLessons();
  }, [userId]);



  useEffect(() => {
    const storedMenuKey = sessionStorage.getItem(`course-${courseId}-menu`);
    if (storedMenuKey) {
      setSelectedMenuKey(storedMenuKey);
    } else {
      setSelectedMenuKey("overview");
    }
  }, [courseId]);

  const handleMenuClick = (e) => {
    setSelectedMenuKey(e.key);
    sessionStorage.setItem(`course-${courseId}-menu`, e.key);

    if (e.key !== 'overview') {
      const lesson = lessons.find((lesson) => lesson._id === e.key);
      setSelectedLesson(lesson);
      const chapter = chapters.find((chapter) => chapter.lessons.includes(e.key));
      setSelectedChapter(chapter);

      if (!specialCourses.includes(course?.title) && lesson && (course?.title !== "MẪU CÂU")) {
        navigate(`/courses/${courseId}/lesson/${lesson._id}`);
      }
    } else {
      setSelectedLesson(null);
    }
  };
  const handleSubMenuClick = (lessonId, chapterId, type) => {
    navigate(`/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/${type}`);
  };

  if (loading || !course || chapters.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 100 }}>
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <Layout className="course-detail">
      <Sider
        className="course-detail__sider"
        width={380}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div
          className="course-detail__sider-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        {course?.title === "NGỮ PHÁP" ? (
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
            items={[
              { key: "overview", label: collapsed ? "T" : "Tổng quan" },
              ...chapters.map((chapter, index) => {
                const lessonItems = chapter.lessons.map(lesson => ({
                  key: lesson._id,
                  label: (
                    <div>
                      {completedLessons.includes(lesson._id) && (
                        <span className="green-checkmark">✔️</span>  // Dấu tích xanh
                      )}
                      {lesson.title}
                    </div>
                  ),
                  children: [
                    {
                      key: `${lesson._id}-grammar`,
                      label: "Lý thuyết",
                      onClick: () => handleSubMenuClick(lesson._id, chapter._id, "grammar"),
                    },
                    {
                      key: `${lesson._id}-exercises`,
                      label: "Bài tập",
                      onClick: () => handleSubMenuClick(lesson._id, chapter._id, "exercise"),
                    }
                  ]
                }));
                if (lessonItems.length > 0) {
                  return {
                    key: chapter._id,
                    label: (
                      <div title={chapter.title}>
                        {collapsed ? `C${index + 1}` : chapter.title}
                      </div>
                    ),
                    children: lessonItems
                  };
                }

                return null;
              }).filter(item => item !== null)
            ]}
          />
        )
          : course?.title === "MẪU CÂU" ? (
            <>
              <Menu
                mode="inline"
                selectedKeys={[selectedMenuKey]}
                onClick={handleMenuClick}
                items={[
                  { key: "overview", label: collapsed ? "T" : "Tổng quan" },
                  ...chapters.map((chapter, index) => {
                    const lessonItems = chapter.lessons.map(lesson => ({
                      key: lesson._id,
                      label: (
                        <div>
                          {completedLessons.includes(lesson._id) && (
                            <span className="green-checkmark">✔️</span>  // Dấu tích xanh
                          )}
                          {lesson.title}
                        </div>
                      ),

                      onClick: () => handleSubMenuClick(lesson._id, chapter._id, "sentence"),

                    }));

                    if (lessonItems.length > 0) {
                      return {
                        key: chapter._id,
                        label: (
                          <div title={chapter.title}>
                            {collapsed ? `C${index + 1}` : chapter.title}
                          </div>
                        ),
                        children: lessonItems
                      };
                    }

                    return null;
                  }).filter(item => item !== null)
                ]}
              />
            </>
          )
            : specialCourses.includes(course?.title) ? (
              <Menu
                mode="inline"
                selectedKeys={[selectedMenuKey]}
                onClick={handleMenuClick}
                items={[
                  { key: "overview", label: collapsed ? "T" : "Tổng quan" },
                  ...chapters.map((chapter, index) => {
                    const lessonItems = chapter.lessons.map((lesson) => {
                      let type = "exercise";
                      if (lesson.title === "Từ vựng") type = "vocabulary";
                      else if (lesson.title === "Mẫu câu") type = "sentence";

                      return {
                        key: lesson._id,
                        label: (
                          <div>
                            {completedLessons.includes(lesson._id) && (
                              <span className="green-checkmark">✔️</span>
                            )}
                            {lesson.title}
                          </div>
                        ),
                        onClick: () => handleSubMenuClick(lesson._id, chapter._id, type),
                      };
                    });

                    if (lessonItems.length > 0) {
                      return {
                        key: chapter._id,
                        label: (
                          <div title={chapter.title}>
                            {collapsed ? `C${index + 1}` : chapter.title}
                          </div>
                        ),
                        children: lessonItems,
                      };
                    }

                    return null;
                  }).filter(item => item !== null),
                ]}
              />
            )
              : (
                <>
                  <Menu
                    mode="inline"
                    selectedKeys={[selectedMenuKey]}
                    onClick={handleMenuClick}
                    items={[
                      { key: "overview", label: collapsed ? "T" : "Tổng quan" },
                      ...chapters.map((chapter, index) => {
                        const lessonItems = chapter.lessons.map(lesson => ({
                          key: lesson._id,
                          label: (
                            <div>
                              {completedLessons.includes(lesson._id) && (
                                <span className="green-checkmark">✔️</span>
                              )}
                              {lesson.title}
                            </div>
                          ),
                          children: [
                            {
                              key: `${lesson._id}-vocabulary`,
                              label: "Từ vựng",
                              onClick: () => handleSubMenuClick(lesson._id, chapter._id, "vocabulary"),
                            },
                            {
                              key: `${lesson._id}-exercises`,
                              label: "Bài tập",
                              onClick: () => handleSubMenuClick(lesson._id, chapter._id, "exercise"),
                            }
                          ]
                        }));

                        if (lessonItems.length > 0) {
                          return {
                            key: chapter._id,
                            label: (
                              <div title={chapter.title}>
                                {collapsed ? `C${index + 1}` : chapter.title}
                              </div>
                            ),
                            children: lessonItems
                          };
                        }

                        return null;
                      }).filter(item => item !== null)
                    ]}
                  />

                </>
              )}

      </Sider>

      <Layout className="course-detail__layout">
        <Content className="course-detail__content">
          {selectedMenuKey === "overview" ? (
            <div className="course-detail__overview">
              <h2 className="course-detail__overview-header">{course?.title}</h2>

              <div className="course-detail__overview-section">
                <h3 className="course-detail__overview-title">Mô tả</h3>
                <p className="course-detail__overview-description">{course?.description}</p>
              </div>

              <div className="course-detail__overview-section">
                <h3 className="course-detail__overview-title">Nội dung khóa học</h3>
                <p className="course-detail__overview-description">{course?.content}</p>
              </div>

              <div className="course-detail__overview-item">
                <h3 className="course-detail__overview-title">Đối tượng học viên</h3>
                <p className="course-detail__overview-item-description">{course?.audience}</p>
              </div>

              <div className="course-detail__overview-item">
                <h3 className="course-detail__overview-title">Mục tiêu</h3>
                <p className="course-detail__overview-item-description">{course?.target}</p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CourseDetail;
