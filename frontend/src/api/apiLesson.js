// API cho Lesson
import axios from "axios";

const BASE_LESSON_URL = "http://localhost:8888/api/v1/lessons";  // Thay đổi theo route backend của Lesson

export const getLessons = (chapterId) =>
  axios.get(`${BASE_LESSON_URL}/${chapterId}`, { withCredentials: true }); // Lấy danh sách bài học theo chapterId

export const getLessonDetail = (id) =>
  axios.get(`${BASE_LESSON_URL}/detail/${id}`, { withCredentials: true }); // Lấy chi tiết lesson

export const createLesson = (data) =>
  axios.post(`${BASE_LESSON_URL}/create`, data, { withCredentials: true }); // Tạo mới lesson

export const updateLesson = (id, data) =>
  axios.patch(`${BASE_LESSON_URL}/update/${id}`, data, { withCredentials: true }); // Chỉnh sửa lesson

export const deleteLesson = (id) =>
  axios.delete(`${BASE_LESSON_URL}/delete/${id}`, { withCredentials: true }); // Xóa lesson
