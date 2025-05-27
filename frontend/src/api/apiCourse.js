import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/courses`;

// Lấy danh sách tất cả khoá học
export const getCourses = () =>
  axios.get(BASE_URL, { withCredentials: true });

// Lấy chi tiết 1 khoá học theo ID
export const getCourseDetail = (id) =>
  axios.get(`${BASE_URL}/detail/${id}`, { withCredentials: true });

// Tạo mới khoá học
export const createCourse = (data) =>
  axios.post(`${BASE_URL}/create`, data, { withCredentials: true });

// Chỉnh sửa khoá học theo ID
export const updateCourse = (id, data) =>
  axios.patch(`${BASE_URL}/update/${id}`, data, { withCredentials: true });

// Xoá khoá học theo ID
export const deleteCourse = (id) =>
  axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });

// Thay đổi nhiều thuộc tính cho nhiều khoá học
export const changeMulti = (payload) =>
  axios.patch(`${BASE_URL}/change-multi`, payload, { withCredentials: true });

// Lấy thống kê khoá học dành cho Admin
export const getAdminStats = () =>
  axios.get(`${BASE_URL}/stats`, { withCredentials: true });
