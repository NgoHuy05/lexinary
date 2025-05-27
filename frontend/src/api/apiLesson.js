// API cho Lesson
import axios from "axios";

const BASE_LESSON_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/lessons`;

// Lấy danh sách bài học theo chapterId
export const getLessons = (chapterId) =>
  axios.get(`${BASE_LESSON_URL}/${chapterId}`, { withCredentials: true });

// Lấy chi tiết 1 bài học theo ID
export const getLessonDetail = (id) =>
  axios.get(`${BASE_LESSON_URL}/detail/${id}`, { withCredentials: true });

// Tạo mới bài học
export const createLesson = (data) =>
  axios.post(`${BASE_LESSON_URL}/create`, data, { withCredentials: true });

// Chỉnh sửa bài học theo ID
export const updateLesson = (id, data) =>
  axios.patch(`${BASE_LESSON_URL}/update/${id}`, data, { withCredentials: true });

// Xoá bài học theo ID
export const deleteLesson = (id) =>
  axios.delete(`${BASE_LESSON_URL}/delete/${id}`, { withCredentials: true });
