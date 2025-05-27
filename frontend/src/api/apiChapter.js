// API cho Chapter
import axios from "axios";

const BASE_CHAPTER_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/chapters`;

// Lấy danh sách chương thuộc một khoá học theo courseId
export const getChapters = (courseId) =>
  axios.get(`${BASE_CHAPTER_URL}/${courseId}`, { withCredentials: true });

// Lấy chi tiết một chương theo ID
export const getChapterDetail = (id) =>
  axios.get(`${BASE_CHAPTER_URL}/detail/${id}`, { withCredentials: true });

// Lấy tất cả chương (không theo course nào)
export const getAllChapters = () =>
  axios.get(`${BASE_CHAPTER_URL}/get/all`, { withCredentials: true });

// Tạo mới một chương
export const createChapter = (data) =>
  axios.post(`${BASE_CHAPTER_URL}/create`, data, { withCredentials: true });

// Chỉnh sửa một chương theo ID
export const updateChapter = (id, data) =>
  axios.patch(`${BASE_CHAPTER_URL}/update/${id}`, data, { withCredentials: true });

// Xoá một chương theo ID
export const deleteChapter = (id) =>
  axios.delete(`${BASE_CHAPTER_URL}/delete/${id}`, { withCredentials: true });
