import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/notes`;

// Lấy tất cả ghi chú của người dùng
export const getNotes = async () => {
  try {
    const response = await axios.get(BASE_URL, { withCredentials: true });
    return response.data.notes;
  } catch (error) {
    console.error("Lỗi khi lấy ghi chú:", error);
    throw error;
  }
};

// Tạo ghi chú mới (có thể kèm theo danh sách tasks)
export const createNote = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo ghi chú:", error);
    throw error;
  }
};

// Cập nhật ghi chú (bao gồm cập nhật danh sách tasks nếu có)
export const updateNote = async (id, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/update/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa ghi chú:", error);
    throw error;
  }
};

// Xóa ghi chú theo ID
export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa ghi chú:", error);
    throw error;
  }
};
