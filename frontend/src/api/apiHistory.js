import axios from "axios";

// URL cơ sở cho API lịch sử làm bài
const BASE_HISTORY_URL = "http://localhost:8888/api/v1/histories";  // Đảm bảo URL này khớp với backend của bạn

// Lấy tất cả lịch sử làm bài theo userId
export const getHistoryByUser = (userId, courseId, chapterId, lessonId) =>
    axios.get(`${BASE_HISTORY_URL}/user/${userId}/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}`, { withCredentials: true });
  
// Tạo mới lịch sử làm bài
export const createHistory = (data) =>
  axios.post(`${BASE_HISTORY_URL}/create`, data, { withCredentials: true });  // Tạo mới lịch sử làm bài

// Xóa lịch sử làm bài (nếu cần)
export const deleteHistory = (id) =>
  axios.delete(`${BASE_HISTORY_URL}/delete/${id}`, { withCredentials: true });  // Xóa lịch sử làm bài
