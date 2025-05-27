import React, { useEffect, useState } from "react";
import { getHistoryByUser } from "../../../api/apiHistory";
import "../../../UI/CourseHistory.scss";
import { Table, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const CourseHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    userId,
    courseId,
    chapterId,
    lessonId,
    allAnswers = [],
    incorrectAnswers = [],
    reviewPath = `/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/review`,
  } = location.state || {};
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId && courseId && chapterId && lessonId) {
      setLoading(true);
      getHistoryByUser(userId, courseId, chapterId, lessonId)
        .then((res) => {
          if (Array.isArray(res.data.history)) {
            setHistoryData(res.data.history);
          } else {
            console.error("Dữ liệu 'history' không phải là mảng");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi tải lịch sử làm bài:", err);
        })
        .finally(() => setLoading(false));

    }
  }, [userId, courseId, chapterId, lessonId]);

  const handleReview = (record) => {
    navigate(`/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/review`, {
      state: {
        courseId,
        chapterId,
        lessonId,
        allAnswers: record.allAnswers || [],
        incorrectAnswers: record.incorrectAnswers || [],
        correctCount: record.correctCount,
        incorrectCount: record.incorrectCount
      }
    });
  };
  const columns = [
    {
      title: "Mã bài tập",
      dataIndex: "lessonId",
      key: "lessonId",
      render: (lesson) => lesson?.title || lesson?._id || "Không có"
    },
    {
      title: "Số câu đúng",
      dataIndex: "correctCount",
      key: "correctCount"
    },
    {
      title: "Số câu sai",
      dataIndex: "incorrectCount",
      key: "incorrectCount"
    },
    {
      title: "Tổng số câu",
      key: "totalCount",
      render: (record) => (record.correctCount || 0) + (record.incorrectCount || 0)
    },
    {
      title: "Ngày làm bài",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) =>
        record.createdAt ? new Date(record.createdAt).toLocaleString() : "Không rõ"
    },
    {
      title: "Chi tiết",
      key: "detail",
      render: (record) => (
        <Button onClick={() => handleReview(record)}>Xem chi tiết</Button>
      )
    }
  ];

  return (
    <div className="course-history">
      <h2>Lịch sử làm bài</h2>
      <Table
        columns={columns}
        dataSource={historyData}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

    </div>
  );
};

export default CourseHistory;
