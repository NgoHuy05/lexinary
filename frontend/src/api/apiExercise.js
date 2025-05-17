import axios from "axios";

const BASE_EXERCISE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/exercises`

// Lấy tất cả bài tập theo lessonId
export const getExercisesByLesson = (lessonId) =>
  axios.get(`${BASE_EXERCISE_URL}/lesson/${lessonId}`, { withCredentials: true });

// Lấy chi tiết bài tập theo ID
export const getExerciseDetail = (id) =>
  axios.get(`${BASE_EXERCISE_URL}/detail/${id}`, { withCredentials: true });

// Tạo mới bài tập
export const createExercise = (data) =>
  axios.post(`${BASE_EXERCISE_URL}/create`, data, { withCredentials: true });

// Chỉnh sửa bài tập
export const editExercise = (id, data) =>
  axios.patch(`${BASE_EXERCISE_URL}/update/${id}`, data, { withCredentials: true });

// Xóa bài tập
export const deleteExercise = (id) =>
  axios.delete(`${BASE_EXERCISE_URL}/delete/${id}`, { withCredentials: true });
