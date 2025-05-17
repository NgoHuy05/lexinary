import axios from "axios";

const BASE_GRAMMAR_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/grammars`

// Lấy tất cả ngữ pháp
export const getAllGrammars = () =>
  axios.get(`${BASE_GRAMMAR_URL}`, { withCredentials: true });  // Lấy tất cả ngữ pháp

// Lấy ngữ pháp theo lessonId
export const getGrammarByLesson = (lessonId) =>
  axios.get(`${BASE_GRAMMAR_URL}/lesson/${lessonId}`, { withCredentials: true });  // Lấy ngữ pháp theo lessonId

// Lấy ngữ pháp theo ID
export const getGrammarById = (grammarId) =>
  axios.get(`${BASE_GRAMMAR_URL}/${grammarId}`, { withCredentials: true });  // Lấy ngữ pháp theo ID

// Tạo mới ngữ pháp
export const createGrammar = (data) =>
  axios.post(`${BASE_GRAMMAR_URL}/create`, data, { withCredentials: true });  // Tạo mới ngữ pháp

// Cập nhật ngữ pháp
export const updateGrammar = (grammarId, data) =>
  axios.patch(`${BASE_GRAMMAR_URL}/edit/${grammarId}`, data, { withCredentials: true });  // Cập nhật ngữ pháp

// Xóa ngữ pháp
export const deleteGrammar = (grammarId) =>
  axios.delete(`${BASE_GRAMMAR_URL}/delete/${grammarId}`, { withCredentials: true });  // Xóa ngữ pháp
