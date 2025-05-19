import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getChapters } from "../../../api/apiChapter";
import { getLessonDetail } from "../../../api/apiLesson";
import { getExercisesByLesson } from "../../../api/apiExercise";
import "../../../UI/CourseEx.scss";
import { createHistory } from "../../../api/apiHistory";
import Cookies from "js-cookie";
import { markLessonCompleted } from "../../../api/apiUser";
import { updateProgress } from "../../../api/apiProgress";

const CourseEx = () => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { courseId, lessonId, chapterId } = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get("id");
  // Load chapters
useEffect(() => {
  setLoading(true);
  getChapters(courseId)
    .then((res) => {
      const data = res.data || [];
      setChapters(data);
      const initial = data.find((c) => c._id === chapterId) || data[0];
      setSelectedChapter(initial);
    })
    .catch((err) => console.error("Lỗi khi tải chương:", err))
    .finally(() => setLoading(false));
}, [courseId, chapterId]);

useEffect(() => {
  if (!selectedChapter || !selectedChapter.lessons) return;

  const lesson = selectedChapter.lessons.find((l) => l._id === lessonId);
  if (lesson) {
    setSelectedLesson(lesson);
  } else {
    setLoading(true);
    getLessonDetail(lessonId)
      .then((res) => setSelectedLesson(res.data))
      .catch((err) => console.error("Lỗi khi tải chi tiết bài học:", err))
      .finally(() => setLoading(false));
  }
}, [selectedChapter, lessonId]);

useEffect(() => {
  if (!selectedLesson) return;
  setLoading(true);
  getExercisesByLesson(selectedLesson._id)
    .then((res) => setExercises(res.data || []))
    .catch((err) => console.error("Lỗi khi tải bài tập:", err))
    .finally(() => setLoading(false));
}, [selectedLesson]);

  // Xử lý chọn đáp án cho các loại bài tập
  const handleAnswerSelect = (exerciseId, selectedAnswer, correctAnswer) => {
    setUserAnswers((prev) => {
      const updated = prev.filter((ans) => ans.exerciseId !== exerciseId);
      return [...updated, { exerciseId, selectedAnswer, correctAnswer }];
    });
  };

  const handleCheckboxAnswer = (exerciseId, selected, checked) => {
    setUserAnswers((prev) => {
      const current = prev.find((a) => a.exerciseId === exerciseId);
      if (current) {
        let newSelected = [...current.selectedAnswer];
        if (checked) newSelected.push(selected);
        else newSelected = newSelected.filter((s) => s !== selected);

        return [
          ...prev.filter((a) => a.exerciseId !== exerciseId),
          { ...current, selectedAnswer: newSelected },
        ];
      } else {
        return [...prev, { exerciseId, selectedAnswer: [selected], correctAnswer: [] }];
      }
    });
  };

  const handleFillInAnswer = (exerciseId, answer, correctAnswer) => {
    setUserAnswers((prev) => {
      const updated = prev.filter((a) => a.exerciseId !== exerciseId);
      return [...updated, { exerciseId, selectedAnswer: answer, correctAnswer }];
    });
  };

  const handleViewHistory = () => {
    const completed = [...userAnswers];

    exercises.forEach((ex) => {
      const exists = completed.find((a) => a.exerciseId === ex._id);
      if (!exists) {
        completed.push({
          exerciseId: ex._id,
          selectedAnswer: ex.type === "checkbox" ? [] : "",
          correctAnswer: ex.correctAnswer,
          question: ex.question,
        });
      }
    });

    const correct = completed.filter((a) =>
      Array.isArray(a.correctAnswer)
        ? a.correctAnswer.length === a.selectedAnswer.length &&
          a.correctAnswer.every((val) => a.selectedAnswer.includes(val))
        : a.selectedAnswer === a.correctAnswer
    );

    const incorrect = completed.filter((a) =>
      Array.isArray(a.correctAnswer)
        ? a.correctAnswer.length !== a.selectedAnswer.length ||
          !a.correctAnswer.every((val) => a.selectedAnswer.includes(val))
        : a.selectedAnswer !== a.correctAnswer
    );
    navigate(`/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/history`, {
      state: {
        userId,
        courseId,
        chapterId,
        lessonId,
        correctCount: correct.length,
        incorrectCount: incorrect.length,
        incorrectAnswers: incorrect.map((a) => {
          const ex = exercises.find((e) => e._id === a.exerciseId);
          return {
            question: ex?.question || "Không tìm thấy câu hỏi",
            correctAnswer: a.correctAnswer,
            userAnswer: a.selectedAnswer, 
          };
        }),
        allAnswers: completed,
      },
    });
  }
  // Hàm nộp bài
const handleSubmit = () => {
  try {
    const completed = [...userAnswers];

    exercises.forEach((ex) => {
      const exists = completed.find((a) => a.exerciseId === ex._id);
      if (!exists) {
        completed.push({
          exerciseId: ex._id,
          selectedAnswer: ex.type === "checkbox" ? [] : "",
          correctAnswer: ex.correctAnswer,
          question: ex.question,
        });
      }
    });

    const correct = completed.filter((a) =>
      Array.isArray(a.correctAnswer)
        ? a.correctAnswer.length === a.selectedAnswer.length &&
          a.correctAnswer.every((val) => a.selectedAnswer.includes(val))
        : a.selectedAnswer === a.correctAnswer
    );

    const incorrect = completed.filter((a) =>
      Array.isArray(a.correctAnswer)
        ? a.correctAnswer.length !== a.selectedAnswer.length ||
          !a.correctAnswer.every((val) => a.selectedAnswer.includes(val))
        : a.selectedAnswer !== a.correctAnswer
    );

    // Gọi API để đánh dấu bài học đã hoàn thành
    markLessonCompleted(userId, lessonId)
  .then(() => {
    // Cập nhật tiến trình học khi nộp bài
    updateProgress({
      userId,
      lessonId,
   
    })
    .then(() => {
      // Nếu cập nhật tiến trình thành công, tiếp tục thực hiện các hành động khác (lưu lịch sử, chuyển hướng...)
      createHistory({
        userId,
        courseId,
        chapterId,
        lessonId,
        correctCount: correct.length,
        incorrectCount: incorrect.length,
        incorrectAnswers: incorrect.map((a) => {
          const ex = exercises.find((e) => e._id === a.exerciseId);
          return {
            question: ex?.question || "Không tìm thấy câu hỏi",
            correctAnswer: a.correctAnswer,
            userAnswer: a.selectedAnswer,
          };
        }),
        allAnswers: completed,
      });
      // Chuyển hướng tới trang kết quả
      navigate(`/courses/${courseId}/chapter/${chapterId}/lesson/${lessonId}/result`, {
        state: {
          courseId,
          chapterId,
          lessonId,
          correctCount: correct.length,
          incorrectCount: incorrect.length,
          incorrectAnswers: incorrect.map((a) => {
            const ex = exercises.find((e) => e._id === a.exerciseId);
            return {
              question: ex?.question || "Không tìm thấy câu hỏi",
              correctAnswer: a.correctAnswer,
              userAnswer: a.selectedAnswer,
            };
          }),
          allAnswers: completed,
        },
      });
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật tiến trình học:", error);
    });
  })
  .catch((error) => {
    if (error.response) {
      // Lỗi trả về từ server
      console.error("Lỗi từ server:", error.response.data);
      console.error("Mã lỗi:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Lỗi do không nhận được phản hồi từ server
      console.error("Không nhận được phản hồi từ server:", error.request);
    } else {
      // Lỗi xảy ra khi thiết lập yêu cầu
      console.error("Lỗi thiết lập yêu cầu:", error.message);
    }
  });


  } catch (error) {
    console.error("Lỗi khi nộp bài:", error);
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
    <div className="course-ex">
      <h2 className="course-ex__lesson-header">
        {selectedChapter?.title || "Chưa có chương"}
      </h2>
      <h3 className="course-ex__lesson-title">
        {selectedLesson ? `${selectedLesson.title}: ${selectedLesson.description}` : "Chưa có bài học"}
      </h3>

      <div className="course-ex__exercise-section">
        <ul className="course-ex__exercise-list">
          {exercises.length > 0 ? (
            exercises.map((ex, idx) => (
              <li key={ex._id} className="course-ex__exercise-item">
                <Card
                  title={`${idx + 1}. ${ex.question}`}
                  className="course-ex__exercise-card"
                >
                  {ex.type === "multiple-choice" && (
                    <ul className="course-ex__options-list">
                      {ex.options.map((opt, i) => (
                        <li key={i} className="course-ex__options-item">
                          <input
                            type="radio"
                            name={ex._id}
                            value={opt}
                            onChange={(e) =>
                              handleAnswerSelect(ex._id, e.target.value, ex.correctAnswer)
                            }
                          />
                          <label>{opt}</label>
                        </li>
                      ))}
                    </ul>
                  )}

                  {ex.type === "checkbox" && (
                    <ul className="course-ex__options-list">
                      {ex.options.map((opt, i) => (
                        <li key={i} className="course-ex__options-item">
                          <input
                            type="checkbox"
                            value={opt}
                            onChange={(e) =>
                              handleCheckboxAnswer(ex._id, e.target.value, e.target.checked)
                            }
                          />
                          <label>{opt}</label>
                        </li>
                      ))}
                    </ul>
                  )}

                  {ex.type === "fill-in-the-blank" && (
                    <div className="course-ex__exercise-fill-in">
                      <input
                        type="text"
                        placeholder="Nhập câu trả lời"
                        onBlur={(e) =>
                          handleFillInAnswer(ex._id, e.target.value, ex.correctAnswer)
                        }
                      />
                    </div>
                  )}
                </Card>
              </li>
            ))
            
          ) : (
            <p className="course-ex__no-exercises">Chưa có bài tập cho bài học này.</p>
          )}
        </ul>

        <button className="course-ex__submit-button" onClick={handleSubmit}>
          Nộp bài
        </button>
        <button className="course-ex__history-button" onClick={handleViewHistory}>
          Xem lại lịch sử làm bài
        </button>
      </div>
    </div>
    </>
  );
};

export default CourseEx;
