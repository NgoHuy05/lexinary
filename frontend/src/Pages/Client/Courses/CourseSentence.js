import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { getChapters } from "../../../api/apiChapter";
import { getLessonDetail } from "../../../api/apiLesson";
import "../../../UI/CourseVoca.scss";
import { getSentenceByLesson } from "../../../api/apiSentence";
import "../../../UI/CourseSentence.scss";
import { markLessonCompleted } from "../../../api/apiUser";
import { updateProgress } from "../../../api/apiProgress";
const CourseSentence = () => {
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [sentences, setSentences] = useState([]);
    const [loading, setLoading] = useState(false);
    const { courseId, lessonId, chapterId } = useParams();
      const userId = Cookies.get("id");
    
    // Load chương
    useEffect(() => {
        setLoading(true);
        getChapters(courseId)
            .then((res) => {
                const chapterList = res.data || [];
                setChapters(chapterList);
                // Tìm chương đã chọn dựa trên chapterId
                const chapter = chapterList.find((chap) => chap._id === chapterId);
                setSelectedChapter(chapter || chapterList[0]);  // Chọn chương mặc định nếu không tìm thấy
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi khi tải chương:", err);
                setLoading(false);
            });
    }, [courseId, chapterId]);  // Thêm chapterId để theo dõi khi nó thay đổi

    // Load bài học theo chương
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

    // Load từ vựng theo bài học
    useEffect(() => {
        if (selectedLesson && selectedLesson._id) {
            setLoading(true);
            getSentenceByLesson(selectedLesson._id)
                .then((res) => {
                    setSentences(res.data || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Lỗi khi tải từ vựng:", err);
                    setLoading(false);
                });
        } else {
            setSentences([]);
        }
    }, [selectedLesson]);

    const handleSubmit = () => {
      try {
        markLessonCompleted(userId, lessonId)
            .then(() => {
                updateProgress({
                userId,
                lessonId,
                })
            .catch((error) => {
            console.error("Lỗi khi cập nhật tiến trình học:", error);
            });
        })
      } catch (error) {
        console.error("Lỗi khi nộp bài:", error);
      }
    };
    // Table cột từ vựng
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,  // Đếm số thứ tự từ 1
        },
        { title: "Mẫu câu", dataIndex: "sentence", key: "sentence" },
        { title: "Ý nghĩa", dataIndex: "meaning", key: "meaning" },
        { title: "Ví dụ", dataIndex: "example", key: "example" },
    ];

    return (
        <div className="course-stc">
            {selectedChapter ? (
                <h2 className="course-stc__header">{selectedChapter.title}</h2>
            ) : (
                <h2 className="course-stc__header">Chưa có chương</h2>
            )}

            {selectedLesson && (
                <div className="course-stc__lesson">
                    <h3 className="course-stc__lesson-title">{`${selectedLesson.title}: ${selectedLesson.description}`}</h3>
                </div>
            )}

            {loading ? (
                <p className="course-stc__loading">Đang tải dữ liệu...</p>
            ) : sentences.length > 0 ? (
                <>
                    <Table
                        columns={columns}
                        dataSource={sentences}
                        rowKey="_id"
                        pagination={false}
                        className="course-stc__sentence-table"
                    />
                    <button className="course-stc__submit-button" onClick={handleSubmit}>
                        Hoàn thành
                    </button>
                </>
            ) : (
                <p className="course-stc__no-sentences">Chưa có mẫu câu nào cho bài học này.</p>
            )}
        </div>
    );
};

export default CourseSentence;
