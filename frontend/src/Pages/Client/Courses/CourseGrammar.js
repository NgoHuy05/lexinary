import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import { getChapters } from "../../../api/apiChapter";
import { getLessonDetail } from "../../../api/apiLesson";
import { getGrammarByLesson } from "../../../api/apiGrammar";
import "../../../UI/CourseGrammar.scss"
const CourseGrammar = () => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [grammars, setGrammars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { courseId, lessonId, chapterId } = useParams();

  // Load chương
  useEffect(() => {
    setLoading(true);
    getChapters(courseId)
      .then((res) => {
        const chapterList = res.data || [];
        setChapters(chapterList);
        const chapter = chapterList.find((chap) => chap._id === chapterId);
        setSelectedChapter(chapter || chapterList[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chương:", err);
        setLoading(false);
      });
  }, [courseId, chapterId]);

useEffect(() => {
  if (selectedChapter && selectedChapter.lessons) {
    const lesson = selectedChapter.lessons.find((l) => l._id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    } else {
        setLoading(true);
      // Nếu không tìm thấy trong chapter, thì fallback gọi API (nếu có sẵn API getLessonDetail)
      getLessonDetail(lessonId)
        .then((res) => setSelectedLesson(res.data))
        .catch((err) => console.error("Lỗi khi tải chi tiết bài học:", err))
        .finally(() => setLoading(false));
    }
  }
}, [selectedChapter, lessonId]);

  // Load exercises
  useEffect(() => {
    if (!selectedLesson) return;
      setLoading(true);
    getGrammarByLesson(selectedLesson._id)
      .then((res) => setGrammars(res.data || []))
      .catch((err) => console.error("Lỗi khi tải bài tập:", err))
      .finally(() => setLoading(false));

  }, [selectedLesson]);

  const columns = [
    {
      title: "STT",
      key: "index",
      width: '3%',
      render: (text, record, index) => index + 1,  // Đếm số thứ tự từ 1
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
    },
    {
      title: 'Sử dụng',
      dataIndex: 'structure',
      key: 'structure',
      width: '15%',
    },
    {
      title: 'Giải thích',
      dataIndex: 'explanation',
      key: 'explanation',
      width: '25%',
    },
    {
      title: 'Ví dụ',
      dataIndex: 'examples',
      key: 'examples',
      width: '10%',
    },
    {
      title: 'Chú ý',
      dataIndex: 'tips',
      key: 'tips',
      width: '37%',
      render: (tips) => (
        <ul>
          {(Array.isArray(tips) ? tips : [tips]).map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      ),
    },
  ];
  
  if (loading ) {
  return (
    <div style={{ textAlign: "center", padding: 100 }}>
      <Spin size="large" tip="Đang tải dữ liệu..." />
    </div>
  );
}

return (
        <div className="course-grammar">
            {selectedChapter ? (
                <h2 className="course-grammar__header">{selectedChapter.title}</h2>
            ) : (
                <h2 className="course-grammar__header">Chưa có chương</h2>
            )}

            {selectedLesson && (
                <div className="course-grammar__lesson">
                    <h3 className="course-grammar__lesson-title">{`${selectedLesson.title}: ${selectedLesson.description}`}</h3>
                </div>
            )}

            {loading ? (
                <p className="course-grammar__loading">Đang tải dữ liệu...</p>
            ) : grammars.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={grammars}
                    rowKey="_id"
                    pagination={false}
                    className="course-grammar__grammar-table"
                />
            ) : (
                <p className="course-grammar__no-grammars">Chưa có ngữ pháp cho bài học này.</p>
            )}
        </div>
    );
};


export default CourseGrammar;
