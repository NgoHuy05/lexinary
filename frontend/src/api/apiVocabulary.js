import axios from "axios";

const BASE_VOCABULARY_URL = "http://localhost:8888/api/v1/vocabularies";  // Đảm bảo URL này khớp với backend

// Lấy tất cả từ vựng theo lessonId
export const getVocabularyByLesson = (lessonId) =>
  axios.get(`${BASE_VOCABULARY_URL}/lesson/${lessonId}`, { withCredentials: true });  // Lấy từ vựng theo lessonId

// Lấy chi tiết từ vựng theo ID
export const getVocabularyById = (id) =>
  axios.get(`${BASE_VOCABULARY_URL}/${id}`, { withCredentials: true });  // Lấy từ vựng theo ID

// Tạo mới từ vựng
export const createVocabulary = (data) =>
  axios.post(`${BASE_VOCABULARY_URL}/create`, data, { withCredentials: true });  // Tạo mới từ vựng

// Chỉnh sửa từ vựng
export const updateVocabulary = (id, data) =>
  axios.patch(`${BASE_VOCABULARY_URL}/update/${id}`, data, { withCredentials: true });  // Cập nhật từ vựng

// Xóa từ vựng
export const deleteVocabulary = (id) =>
  axios.delete(`${BASE_VOCABULARY_URL}/delete/${id}`, { withCredentials: true });  // Xóa từ vựng
