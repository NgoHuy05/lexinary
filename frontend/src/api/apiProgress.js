import axios from "axios";

const BASE_PROGRESS_URL = "http://localhost:8888/api/v1/progresses"; // Thay theo route backend

// Lấy toàn bộ tiến trình học của người dùng
export const getUserProgress = (userId) =>
  axios.get(`${BASE_PROGRESS_URL}/`, { params: { userId }, withCredentials: true });

// Cập nhật tiến trình học (gồm completed, streak, lastStudyDate)
export const updateProgress = (data) =>
  axios.patch(`${BASE_PROGRESS_URL}/update`, data, { withCredentials: true });

// Tạo mới tiến trình học cho một bài học (POST)
export const createProgress = (data) =>
  axios.post(`${BASE_PROGRESS_URL}/create`, data, { withCredentials: true });
