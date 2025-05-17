import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getChapters } from "../../../api/apiChapter";
import { getLessonDetail } from "../../../api/apiLesson";
import { getExercisesByLesson } from "../../../api/apiExercise";
import "../../../UI/CourseEx.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

  ChartJS.register(ArcElement, Tooltip, Legend);

const CourseReview = () => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [reviewMode, setReviewMode] = useState(true);
  const { courseId, lessonId, chapterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    correctCount,
    incorrectCount,
    incorrectAnswers = [],
    allAnswers = [] } = location.state || {};

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
  // Load chapters
  useEffect(() => {
    getChapters(courseId)
      .then((res) => {
        const data = res.data || [];
        setChapters(data);
        const initial = data.find((c) => c._id === chapterId) || data[0];
        setSelectedChapter(initial);
      })
      .catch((err) => console.error("Lỗi khi tải chương:", err));
  }, [courseId, chapterId]);

  // Load lessons

useEffect(() => {
  if (selectedChapter && selectedChapter.lessons) {
    const lesson = selectedChapter.lessons.find((l) => l._id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    } else {
      // Nếu không tìm thấy trong chapter, thì fallback gọi API (nếu có sẵn API getLessonDetail)
      getLessonDetail(lessonId)
        .then((res) => setSelectedLesson(res.data))
        .catch((err) => console.error("Lỗi khi tải chi tiết bài học:", err));
    }
  }
}, [selectedChapter, lessonId]);


  // Load exercises
  useEffect(() => {
    if (!selectedLesson) return;
    getExercisesByLesson(selectedLesson._id)
      .then((res) => setExercises(res.data || []))
      .catch((err) => console.error("Lỗi khi tải bài tập:", err));
  }, [selectedLesson]);

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <>
    <div className="course-ex">
      <h2 className="course-ex__lesson-header">
        {selectedChapter?.title || "Chưa có chương"}
      </h2>
      <h3 className="course-ex__lesson-title">
        {selectedLesson ? `${selectedLesson.title}: ${selectedLesson.description}` : "Chưa có bài học"}
      </h3>
          <div className="course-result__res">
            
            <div className="course-result__chart">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="course-result__summary">
              <p className="course-result__summary-item">Số câu đúng: {correctCount}</p>
              <p className="course-result__summary-item">Số câu sai: {incorrectCount}</p>
            </div>
          </div>
      <div className="course-ex__exercise-section">
        <ul className="course-ex__exercise-list">
          {exercises.length > 0 ? (
            exercises.map((ex, idx) => (
              <li key={ex._id} className="course-ex__exercise-item">
<Card
  title={`${idx + 1}. ${ex.question}`}
  className={`course-ex__exercise-card ${allAnswers.find((a) => a.exerciseId === ex._id)?.selectedAnswer === ex.correctAnswer ? 'course-ex__correct-card' : 'course-ex__incorrect-card'}`}
>
{ex.type === "multiple-choice" && (
  <ul className="course-ex__options-list">
    {ex.options.map((opt, i) => {
      const userAnswerObj = allAnswers.find((a) => a.exerciseId === ex._id);
      const isUserSelected = userAnswerObj?.selectedAnswer === opt;  // Kiểm tra nếu người dùng chọn đáp án này
      const isCorrect = ex.correctAnswer === opt;  // Kiểm tra nếu đáp án này là đúng
      const isAnswerCorrect = isUserSelected && isCorrect;  // Đáp án người dùng chọn đúng
      const isAnswerIncorrect = isUserSelected && !isCorrect;  // Đáp án người dùng chọn sai

      return (
        <li key={i} className="course-ex__options-item">
          <input
            type="radio"
            name={ex._id}
            value={opt}
            defaultChecked={isUserSelected}
            disabled
          />
          <label className={isUserSelected ? (isAnswerCorrect ? 'course-ex__correct-answer' : 'course-ex__incorrect-answer') : ''}>
            {opt}
            {reviewMode && isUserSelected && (
              <span className={`answer-icon ${isAnswerCorrect ? 'correct' : isAnswerIncorrect ? 'incorrect' : ''}`}>
                {isAnswerCorrect ? '✔️' : isAnswerIncorrect ? '❌' : ''}
              </span>
            )}
          </label>
        </li>
      );
    })}
    {reviewMode && allAnswers.find((a) => a.exerciseId === ex._id)?.selectedAnswer !== ex.correctAnswer && (
      <p className="course-ex__correct-answer">
        Đáp án đúng: {ex.correctAnswer}
      </p>
    )}
  </ul>
)}


{ex.type === "checkbox" && (
  <ul className="course-ex__options-list">
    {ex.options.map((opt, i) => {
      const userAnswerObj = allAnswers.find((a) => a.exerciseId === ex._id);
      const selected = Array.isArray(userAnswerObj?.selectedAnswer)
        ? userAnswerObj.selectedAnswer.includes(opt)
        : false;
      const isCorrect = selected && userAnswerObj?.selectedAnswer.includes(opt);
      const isUserSelected = selected;
      const answerClass = reviewMode
        ? isCorrect
          ? 'course-ex__correct-answer'
          : 'course-ex__incorrect-answer'
        : '';

      return (
        <li key={i} className="course-ex__options-item">
          <input
            type="checkbox"
            value={opt}
            defaultChecked={selected}
            disabled
          />
          <label className={answerClass}>
            {opt}
            {reviewMode && isUserSelected && (
              <span className={`answer-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? '✔️' : '❌'}
              </span>
            )}
          </label>
        </li>
      );
    })}
    {reviewMode && allAnswers.find((a) => a.exerciseId === ex._id)?.selectedAnswer !== ex.correctAnswer && (
      <p className="course-ex__correct-answer">
        Đáp án đúng: {ex.correctAnswer}
      </p>
    )}
  </ul>
)}

{ex.type === "fill-in-the-blank" && (
  <div className="course-ex__exercise-fill-in">
    <input
      type="text"
      value={allAnswers.find((a) => a.exerciseId === ex._id)?.selectedAnswer || ""}
      readOnly
      className={reviewMode
        ? (allAnswers.find((a) => a.exerciseId === ex._id)?.selectedAnswer === ex.correctAnswer
          ? 'course-ex__correct-answer'
          : 'course-ex__incorrect-answer')
        : ''}
    />
    {reviewMode && allAnswers.find((a) => a.exerciseId === ex._id)?.selectedAnswer !== ex.correctAnswer && (
      <div className="course-ex__correct-answer-container">
        <p className="course-ex__correct-answer">
          Đáp án đúng: {ex.correctAnswer}
        </p>
      </div>
    )}
  </div>
)}

</Card>

              </li>
            ))
          ) : (
            <p className="course-ex__no-exercises">Chưa có bài tập cho bài học này.</p>
          )}
        </ul>
        <button className="course-ex__back-button" onClick={handleBack}>
          Quay lại
        </button>

      </div>
    </div>
    </>
  );
  
};

export default CourseReview;
