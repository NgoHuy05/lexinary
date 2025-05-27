import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Spin, message, Empty, Pagination, Button } from "antd";
import { getFlashcardsByTopic } from "../../../../api/apiFlashcard";
import "../../../../UI/TopicDetail.scss";
import { getPublicTopicById, getUserTopicById } from "../../../../api/apiTopic";

const TopicDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState("");

  const flashcardsPerPage = 1;

  useEffect(() => {
    if (id) {
      fetchFlashcards();
      fetchTopicName();
    }
  }, [id]);

  const fetchFlashcards = async () => {
    setLoading(true);
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

  const fetchTopicName = async () => {
    try {
      let res;
      if (location.pathname.includes("/flashcard/home")) {
        res = await getPublicTopicById(id);
      } else if (location.pathname.includes("/flashcard/library")) {
        res = await getUserTopicById(id);
      } else {
        return;
      }

      if (res?.topic?.title) {
        setTopicName(res.topic.title);
      } else {
        console.log("Không có tên chủ đề trong dữ liệu trả về.");
      }
    } catch (error) {
      console.error("Không thể lấy tên chủ đề:", error);
    }
  };

  const handleFlip = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePaginationChange = (newPage) => {
    if (transitioning) return;

    const direction = newPage > page ? 1 : -1;

    setTransitionClass(direction === 1 ? "slide-in-right" : "slide-in-left");
    setTransitioning(true);

    setPage(newPage);
    setCurrentFlashcardIndex((newPage - 1) * flashcardsPerPage);

    setTimeout(() => {
      setFlipped({});
      setTransitionClass("");

      setTimeout(() => {
        setTransitioning(false);
      }, 100);
    }, 200);
  };

  const currentFlashcard = flashcards[currentFlashcardIndex];

  const handleReviewFlashcards = () => {
    navigate(`/flashcard/review/${id}`);
  };

  if (loading) {
  return (
    <div style={{ textAlign: "center", padding: 100 }}>
      <Spin size="large" />
      <div style={{ marginTop: 16 }}>Đang tải dữ liệu...</div>
    </div>
  );
}
  if ( flashcards.length === 0) {
    return <Empty description="Chưa có flashcard nào" />;
  }


  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>{topicName}</h2>
          <div className={`flashcard-container ${transitionClass}`}>
            <div
              key={currentFlashcard._id}
              className="flip-card"
              onClick={() => handleFlip(currentFlashcard._id)}
            >
              <div
                className={`flip-card-inner ${flipped[currentFlashcard._id] ? "flipped" : ""}`}
              >
                <div className="front">
                  <p className="term">{currentFlashcard.term}</p>
                </div>
                <div className="back">
                  <div className="definition">
                    <strong>Định nghĩa:</strong> {currentFlashcard.definition}
                  </div>
                  {currentFlashcard.pronunciation && (
                    <div className="pronunciation">
                      <strong>Phát âm:</strong> {currentFlashcard.pronunciation}
                    </div>
                  )}
                  {currentFlashcard.example && (
                    <div className="example">
                      <strong>Ví dụ:</strong> <em>{currentFlashcard.example}</em>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Pagination
            simple
            current={page}
            total={flashcards.length}
            pageSize={flashcardsPerPage}
            onChange={handlePaginationChange}
          />
          <Button
            type="primary"
            onClick={handleReviewFlashcards}
            style={{ marginTop: 20 }}
          >
            Ôn tập Flashcards
          </Button>
    </div>
  );
};

export default TopicDetail;
