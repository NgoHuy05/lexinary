import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFlashcardsByTopic } from "../../../../api/apiFlashcard";
import { message, Button, Spin, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import icon
import { Pie } from "react-chartjs-2"; // Import Pie chart từ react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Cấu hình cho Chart.js

import "../../../../UI/ReviewFlashcards.scss";

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ReviewFlashcards = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewWrong, setReviewWrong] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await getFlashcardsByTopic(id);
        if (Array.isArray(res.flashcards)) {
          setFlashcards(res.flashcards);
        } else {
          message.error("Dữ liệu flashcards không hợp lệ!");
        }
      } catch (error) {
        message.error("Lỗi khi lấy flashcards!");
      } finally {
        setLoading(false);
      }
    };
    fetchFlashcards();
  }, [id]);

  useEffect(() => {
    if (flashcards.length > 0 && !isFinished) {
      generateOptions();
    }
  }, [flashcards, currentIndex, isFinished]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const generateOptions = () => {
    const correct = flashcards[currentIndex];
    const wrong = flashcards
      .filter((fc, i) => i !== currentIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = shuffle([...wrong, correct]).map((item) => ({
      text: item.definition,
      isCorrect: item === correct,
    }));

    setOptions(allOptions);
    setSelected(null);
  };

  const handleSelect = (option) => {
    setSelected(option);
    const currentFlashcard = flashcards[currentIndex];

    if (option.isCorrect) {
      setScore((prev) => prev + 1);
      message.success("🎉 Chính xác!", 1.5);
    } else {
      setWrongAnswers((prev) => [...prev, currentFlashcard]);
      message.error("❌ Sai rồi!", 1.5);
    }
  };

  const handleNext = () => {
    const currentFlashcard = flashcards[currentIndex];
  
    if (!selected) {
      setWrongAnswers((prev) => [...prev, currentFlashcard]);
    }
  
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      message.success("✅ Bạn đã hoàn thành ôn tập!", 2);
    }
  };
  

  const handleReviewWrong = () => {
    setFlashcards(wrongAnswers);
    setCurrentIndex(0);
    setIsFinished(false);
    setScore(0);
    setWrongAnswers([]);
    setReviewWrong(true);
  };

  const handleBackToLibrary = () => {
    navigate("/flashcard/library");
  };

  // Cấu hình dữ liệu cho biểu đồ Pie
  const chartData = {
    labels: ["Đúng", "Sai"],
    datasets: [
      {
        data: [score, flashcards.length - score],
        backgroundColor: ["#00C853", "#FF4D4F"],
        hoverBackgroundColor: ["#00C853", "#FF4D4F"],
      },
    ],
  };

  if (loading) return <div className="loading-container"><Spin size="large" /></div>;
  if (!flashcards.length) return <p className="no-flashcards">Không có flashcard nào để ôn tập</p>;

  if (isFinished) {
    const correctCount = score;
    const wrongCount = flashcards.length - score;

    return (
      <div className="review-container">
        <div className="review-result">
          <h2>Kết quả ôn tập</h2>


          {/* Biểu đồ Pie của Chart.js */}
          <Pie data={chartData} options={{ responsive: true, plugins: { tooltip: { enabled: true } } }} />


          {wrongAnswers.length > 0 && (
            <Button type="primary" onClick={handleReviewWrong} style={{ marginTop: 24 }}>
              Ôn lại những câu sai
            </Button>
          )}
          <Button type="default" onClick={handleBackToLibrary} style={{ marginTop: 16 }}>
            Quay lại thư viện của bạn
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="flashcard-title">Ôn tập Flashcards:</div>
      <div className="flashcard-term">
        <h1>{flashcards[currentIndex].term}</h1>
      </div>

      <div className="options">
        {options.map((opt, idx) => (
          <Card
            key={idx}
            className={`option-card ${
              selected
                ? opt.isCorrect
                  ? "correct"
                  : opt === selected
                  ? "wrong"
                  : "disabled"
                : ""
            }`}
            onClick={() => !selected && handleSelect(opt)}
          >
            {opt.text}
          </Card>
        ))}
      </div>

      <div className="buttons">

        <Button 
          type="primary" 
          onClick={handleNext} 
          className="next-button"
        >
          {currentIndex === flashcards.length - 1 ? "Hoàn thành" : ""} 
          Tiếp theo <RightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ReviewFlashcards;
