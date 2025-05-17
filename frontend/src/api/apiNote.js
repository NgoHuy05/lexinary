import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/notes"; 
export const getNotes = async () => {
  try {
    const response = await axios.get(BASE_URL, { withCredentials: true });
    return response.data.notes; // Đảm bảo backend trả về { notes: [...] }
  } catch (error) {
    console.error("Lỗi khi lấy ghi chú:", error);
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create`,
      data,  // Thêm tasks vào body request
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo ghi chú:", error);
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/update/${id}`,
      data,  // Cập nhật tasks
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa ghi chú:", error);
    throw error;
  }
};


export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa ghi chú:", error);
    throw error;
  }
};
