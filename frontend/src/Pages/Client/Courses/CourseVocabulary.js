import React, { useEffect, useState } from "react";
import { message, Spin, Table } from "antd";
import { useParams } from "react-router-dom";
import { getChapters } from "../../../api/apiChapter";
import { getLessonDetail } from "../../../api/apiLesson";
import { getVocabularyByLesson } from "../../../api/apiVocabulary";
import "../../../UI/CourseVoca.scss";
import { markLessonCompleted } from "../../../api/apiUser";
import { updateProgress } from "../../../api/apiProgress";
import Cookies from "js-cookie";

const CourseVocabulary = () => {
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [vocabularies, setVocabularies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { courseId, lessonId, chapterId } = useParams();
    const userId = Cookies.get("id");

    useEffect(() => {
        setLoading(true);
        getChapters(courseId)
            .then((res) => {
                const chapterList = res.data || [];
                setChapters(chapterList);
                const chapter = chapterList.find((chap) => chap._id === chapterId);
                setSelectedChapter(chapter || chapterList[0]);
            })
            .catch((err) => {
                console.error("Lỗi khi tải chương:", err);
            })
            .finally(() => setLoading(false));
    }, [courseId, chapterId]);

    useEffect(() => {
        if (selectedChapter && selectedChapter.lessons) {
            const lesson = selectedChapter.lessons.find((l) => l._id === lessonId);
            if (lesson) {
                setSelectedLesson(lesson);
                setLoading(false); 
            } else {
                setLoading(true);
                getLessonDetail(lessonId)
                    .then((res) => setSelectedLesson(res.data))
                    .catch((err) => console.error("Lỗi khi tải chi tiết bài học:", err))
                    .finally(() => setLoading(false));
            }
        }
    }, [selectedChapter, lessonId]);

    useEffect(() => {
        if (selectedLesson && selectedLesson._id) {
            setLoading(true);
            getVocabularyByLesson(selectedLesson._id)
                .then((res) => setVocabularies(res.data || []))
                .catch((err) => {
                    console.error("Lỗi khi tải từ vựng:", err);
                    setVocabularies([]);
                })
                .finally(() => setLoading(false));
        } else {
            setVocabularies([]);
            setLoading(false);
        }
    }, [selectedLesson]);

    const handleSubmit = () => {
        markLessonCompleted(userId, lessonId)
            .then(() => {
                return updateProgress({
                    userId,
                    lessonId,
                });
            })
            .then(() => {
                message.success("Bạn đã hoàn thành bài học thành công!");
            })
            .catch((error) => {
                console.error("Lỗi khi nộp bài hoặc cập nhật tiến trình học:", error);
                message.error("Có lỗi xảy ra, vui lòng thử lại.");
            });
    };



    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        { title: "Từ vựng", dataIndex: "word", key: "word" },
        { title: "Ý nghĩa", dataIndex: "meaning", key: "meaning" },
        { title: "Phát âm", dataIndex: "pronunciation", key: "pronunciation" },
        { title: "Ví dụ", dataIndex: "example", key: "example" },
    ];


    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: 100 }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>Đang tải dữ liệu...</div>
            </div>
        );
    }

    return (
        <div className="course-voca">
            {selectedChapter ? (
                <h2 className="course-voca__header">{selectedChapter.title}</h2>
            ) : (
                <h2 className="course-voca__header">Chưa có chương</h2>
            )}

            {selectedLesson && (
                <div className="course-voca__lesson">
                    <h3 className="course-voca__lesson-title">{`${selectedLesson.title}: ${selectedLesson.description}`}</h3>
                </div>
            )}

            {loading ? (
                <p className="course-voca__loading">Đang tải dữ liệu...</p>
            ) : vocabularies.length > 0 ? (
                <>
                    <Table
                        columns={columns}
                        dataSource={vocabularies}
                        rowKey="_id"
                        pagination={false}
                        className="course-voca__vocabulary-table"
                    />
                    <button className="course-stc__submit-button" onClick={handleSubmit}>
                        Hoàn thành
                    </button>
                </>
            ) : (
                <p className="course-voca__no-vocabularies">Chưa có từ vựng cho bài học này.</p>
            )}
        </div>
    );
};

export default CourseVocabulary;
