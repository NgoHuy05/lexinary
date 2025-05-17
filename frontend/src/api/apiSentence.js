import axios from "axios";

const BASE_SENTENCE_URL = "http://localhost:8888/api/v1/sentences";  // Đảm bảo URL này khớp với backend

// Lấy tất cả câu
export const getAllSentences = () =>
  axios.get(`${BASE_SENTENCE_URL}`, { withCredentials: true });  // Lấy tất cả câu

// Lấy câu theo lessonId
export const getSentenceByLesson = (lessonId) =>
  axios.get(`${BASE_SENTENCE_URL}/lesson/${lessonId}`, { withCredentials: true });  // Lấy câu theo lessonId

// Lấy câu theo ID
export const getSentenceById = (sentenceId) =>
  axios.get(`${BASE_SENTENCE_URL}/${sentenceId}`, { withCredentials: true });  // Lấy câu theo ID

// Tạo mới câu
export const createSentence = (data) =>
  axios.post(`${BASE_SENTENCE_URL}/create`, data, { withCredentials: true });  // Tạo mới câu

// Cập nhật câu
export const updateSentence = (sentenceId, data) =>
  axios.put(`${BASE_SENTENCE_URL}/update/${sentenceId}`, data, { withCredentials: true });  // Cập nhật câu

// Xóa câu
export const deleteSentence = (sentenceId) =>
  axios.delete(`${BASE_SENTENCE_URL}/delete/${sentenceId}`, { withCredentials: true });  // Xóa câu
