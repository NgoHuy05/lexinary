// API cho Chapter
import axios from "axios";

const BASE_CHAPTER_URL = "http://localhost:8888/api/v1/chapters";  // Thay đổi theo route backend của Chapter

export const getChapters = (courseId) =>
  axios.get(`${BASE_CHAPTER_URL}/${courseId}`, {withCredentials: true }); // Lấy danh sách chương theo courseId

export const getChapterDetail = (id) =>
  axios.get(`${BASE_CHAPTER_URL}/detail/${id}`, { withCredentials: true }); // Lấy chi tiết chapter

export const getAllChapters = () =>
  axios.get(`${BASE_CHAPTER_URL}/get/all`, { withCredentials: true }); 

export const createChapter = (data) =>
  axios.post(`${BASE_CHAPTER_URL}/create`, data, { withCredentials: true }); // Tạo mới chapter

export const updateChapter = (id, data) =>
  axios.patch(`${BASE_CHAPTER_URL}/update/${id}`, data, { withCredentials: true }); // Chỉnh sửa chapter

export const deleteChapter = (id) =>
  axios.delete(`${BASE_CHAPTER_URL}/delete/${id}`, { withCredentials: true }); // Xóa chapter
