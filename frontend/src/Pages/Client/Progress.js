import React, { useEffect, useState } from "react";
import { Card, List, message, Button } from "antd";
import { getUserProgress } from "../../api/apiProgress";
import Cookies from "js-cookie";
import { getLessonDetail } from "../../api/apiLesson";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from "chart.js";
import "../../UI/Progress.scss";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const Progress = () => {
  const [progressData, setProgressData] = useState({});
  const [lessonsData, setLessonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const response = await getUserProgress(userId);
        setProgressData(response.data);
      } catch (error) {
        message.error("Không thể lấy dữ liệu tiến trình.");
      }
    };
    fetchProgress();
  }, [userId]);

  useEffect(() => {
    if (progressData.lessons?.length > 0) {
      const fetchLessons = async () => {
        setLoading(true);
        try {
          const lessons = await Promise.all(
            progressData.lessons.map(async (lessonProgress) => {
              const lessonDetail = await getLessonDetail(lessonProgress.lesson);
              return {
                ...lessonDetail.data,
                completed: lessonProgress.completed,
              };
            })
          );
          setLessonsData(lessons);
        } catch (error) {
          message.error("Không thể lấy thông tin bài học.");
        } finally {
          setLoading(false);
        }
      };
      fetchLessons();
    } else {
      setLessonsData([]);
      setLoading(false);
    }
  }, [progressData.lessons]);

  // Hàm convert data cho biểu đồ 
  const convertToChartData = (history = []) => {
    const dateMap = {};
    history.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!dateMap[date]) dateMap[date] = 0;
      dateMap[date] += item.count;
    });
    return Object.keys(dateMap).map((date) => ({
      date,
      count: dateMap[date],
    }));
  };

  // Render item cho bài học đã hoàn thành
  const renderLessonItemComplete = (item) => {
    if (!item?.course || !item?.chapter) return null; // check tránh lỗi
    let type = item.course.title === "MẪU CÂU" ? "sentence" : "history";
    return (
      <List.Item
        actions={[
          <Button
            type="primary"
            onClick={() => handleViewDetail(item.course._id, item.chapter._id, item._id, type)}
          >
            Xem chi tiết
          </Button>,
        ]}
      >
        <List.Item.Meta
          title={
            <>
              <div><strong>{item.title}</strong></div>
              <div style={{ color: 'gray' }}>{item.course.title} / {item.chapter.title}</div>
            </>
          }
          description={item.description}
        />
      </List.Item>
    );
  };

  // Render item cho bài học chưa hoàn thành
  const renderLessonItemUnComplete = (item) => {
    if (!item?.course || !item?.chapter) return null; // check tránh lỗi
    let type = item.course.title === "MẪU CÂU" ? "sentence" : "vocabulary";
    return (
      <List.Item
        actions={[
          <Button
            type="primary"
            onClick={() => handleViewDetail(item.course._id, item.chapter._id, item._id, type)}
          >
            Xem chi tiết
          </Button>,
        ]}
      >
        <List.Item.Meta
          title={
            <>
              <div><strong>{item.title}</strong></div>
              <div style={{ color: 'gray' }}>{item.course.title} / {item.chapter.title}</div>
            </>
          }
          description={item.description}
        />
      </List.Item>
    );
  };

  // Chuyển hướng
  const handleViewDetail = (courseId, chapterId, lessonId, type) => {
    navigate(`/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/${type}`, {
      state: { userId, courseId, chapterId, lessonId },
    });
  };

  // Biểu đồ
  const StudyChart = ({ studyData }) => {
    const data = {
      labels: studyData.map((item) => item.date),
      datasets: [
        {
          label: "Số bài hoàn thành",
          data: studyData.map((item) => item.count),
          fill: true,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
      },
    };

    return <Line data={data} options={options} />;
  };

  const completedLessons = lessonsData.filter((lesson) => lesson.completed);
  const uncompletedLessons = lessonsData.filter((lesson) => !lesson.completed);

  return (
    <div className="progress">
      <h1 className="progress__title">Tiến Trình Học Tập</h1>

      <Card title="Thông tin tiến trình" className="progress__card progress__card--info">
        <p className="progress__info">Số ngày streak: {progressData.streak || 0}</p>
        <p className="progress__info">
          Ngày học gần nhất:{" "}
          {progressData.lastStudyDate
            ? new Date(progressData.lastStudyDate).toLocaleDateString()
            : "Chưa có"}
        </p>
      </Card>

      {progressData.studyHistory?.length > 0 && (
        <Card title="Biểu đồ thống kê ngày học" className="progress__card progress__card--chart">
          <StudyChart studyData={convertToChartData(progressData.studyHistory)} />
        </Card>
      )}

      <Card title="Danh Sách Bài Học Đã Hoàn Thành" className="progress__card progress__card--complete">
        <List loading={loading} dataSource={completedLessons} renderItem={renderLessonItemComplete} />
      </Card>

      <Card title="Danh Sách Bài Học Chưa Hoàn Thành" className="progress__card progress__card--uncomplete">
        <List loading={loading} dataSource={uncompletedLessons} renderItem={renderLessonItemUnComplete} />
      </Card>
    </div>
  );
};

export default Progress;
