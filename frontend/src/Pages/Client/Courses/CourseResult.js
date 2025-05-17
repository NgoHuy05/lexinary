  import React, { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { Pie } from "react-chartjs-2";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
  import "../../../UI/CourseResult.scss";

  ChartJS.register(ArcElement, Tooltip, Legend);

  const CourseResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
      courseId,
      chapterId,
      lessonId,
      correctCount = 0,
      incorrectCount = 0,
      incorrectAnswers = [],
      allAnswers = [],
      retryPath = `/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/exercise`,
      reviewPath = `/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/review`,
    } = location.state || {};

    const pieData = {
      labels: ["Đúng", "Sai"],
      datasets: [
        {
          data: [correctCount, incorrectCount],
          backgroundColor: ["#52c41a", "#ff4d4f"],
          hoverBackgroundColor: ["#4CAF50", "#F44336"],
        },
      ],
    };

    const pieOptions = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((tooltipItem.raw / total) * 100).toFixed(1);
              return `${tooltipItem.label}: ${percentage}%`;
            },
          },
        },
      },
    };

    const handleRetry = () => {
      navigate(retryPath);
    };
    const handleBack = () => {
      navigate(-1);
    }
    const handleReview = () => {
      navigate(reviewPath , {
        state: {
          courseId,
          chapterId,
          lessonId,    
          correctCount,
          incorrectCount,
          allAnswers: allAnswers,
        }
      });
  }

    return (
      <div className="course-result">
        <h2 className="course-result__title">Kết quả làm bài</h2>

        

          <div className="course-result__res">

            <div className="course-result__chart">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="course-result__summary">
              <p className="course-result__summary-item">Số câu đúng: {correctCount}</p>
              <p className="course-result__summary-item">Số câu sai: {incorrectCount}</p>
            </div>
          </div>

        <div className="course-result__retry">
          <button onClick={handleRetry} className="course-result__retry-btn">
            Làm lại bài
          </button>
          <button onClick={handleReview} className="course-result__review-btn">
            Xem lại bài của bạn
          </button>
          <button className="course-ex__back-button" onClick={handleBack}>
            Quay lại
          </button>
        </div>
      </div>
    );
  };

  export default CourseResult;
