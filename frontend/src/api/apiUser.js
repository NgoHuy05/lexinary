import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users`

// Đăng ký người dùng mới
export const registerUser = (name, email, password) =>
  axios.post(`${BASE_URL}/register`, {name, email, password}, { withCredentials: true });

// Đăng nhập người dùng
export const loginUser = (email, password) =>
  axios.post(`${BASE_URL}/login`, {email, password}, { withCredentials: true });

// Đăng xuất người dùng
export const logoutUser = () =>
  axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

// Cập nhật hồ sơ người dùng
export const updateUserProfile = (name, email, phone, gender, address) =>
  axios.patch(`${BASE_URL}/update/profile`, {name, email, phone, gender, address} , { withCredentials: true });

// Lấy thông tin hồ sơ người dùng
export const getUserProfile = () =>
  axios.get(`${BASE_URL}/profile`, { withCredentials: true });

// Lấy danh sách người dùng
export const listUser = () =>
  axios.get(`${BASE_URL}/list`, { withCredentials: true });

// Quên mật khẩu - gửi email
export const forgotPassword = (email) =>
  axios.post(`${BASE_URL}/password-forgot`, { email }, { withCredentials: true });

// Xác minh OTP
export const verifyOtp = (email, otp) =>
  axios.post(`${BASE_URL}/password-otp`, { email, otp }, { withCredentials: true });

// Đặt lại mật khẩu
export const resetPassword = (email, password) =>
  axios.post(`${BASE_URL}/password-reset`, {email, password}, { withCredentials: true });

// Đánh dấu lesson đã hoàn thành
export const markLessonCompleted = (userId, lessonId) =>
  axios.post(`${BASE_URL}/${userId}/marked-complete-lesson/${lessonId}`, { withCredentials: true });

// Lấy danh sách lesson đã hoàn thành của user
export const getCompletedLessons = (userId) =>
  axios.get(`${BASE_URL}/${userId}/completed-lessons`, { withCredentials: true });

// Cập nhật hồ sơ người dùng theo id
export const updateUserById = (id, data) =>
  axios.patch(`${BASE_URL}/update/${id}`, data , { withCredentials: true });

// Xóa người dùng theo id
export const deleteUserById = (id) =>
  axios.delete(`${BASE_URL}/delete/${id}` , { withCredentials: true });
