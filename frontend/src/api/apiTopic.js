  import axios from "axios";

  const BASE_URL = "http://localhost:8888/api/v1/topics";

  // Lấy tất cả topic công khai
  export const getPublicTopics = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/public`, {
        withCredentials: true, // Gửi thông tin cookie nếu cần thiết
      });
      return res.data.topics; // Trả về danh sách topic công khai
    } catch (err) {
      console.error("Lỗi khi lấy danh sách topic công khai:", err);
      throw err; // Ném lỗi để có thể xử lý ở nơi gọi API
    }
  };

  // Lấy tất cả topic của người dùng (chỉ admin hoặc chính người dùng đó mới xem được)
  export const getUserTopics = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        withCredentials: true, // Gửi thông tin cookie nếu cần thiết
      });
      return res.data.topics; // Trả về danh sách topic của người dùng
    } catch (err) {
      console.error("Lỗi khi lấy danh sách topic của người dùng:", err);
      throw err; // Ném lỗi để có thể xử lý ở nơi gọi API
    }
  };

  // Lấy 1 topic kèm flashcards (dùng cho Edit)
  export const getTopicWithFlashcards = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`, {
        withCredentials: true,
      });
      return res.data; // Trả về topic kèm flashcards: { topic: {...}, flashcards: [...] }
    } catch (err) {
      console.error("Lỗi khi lấy topic và flashcards:", err);
      throw err;
    }
  };

  // Lấy 1 topic công khai theo ID
  export const getPublicTopicById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/public/${id}`, {
        withCredentials: true,
      });
      return res.data; // Trả về topic: { topic: { ... } }
    } catch (err) {
      console.error("Lỗi khi lấy topic công khai theo ID:", err);
      throw err;
    }
  };

  // Lấy 1 topic của người dùng theo ID
  export const getUserTopicById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${id}`, {
        withCredentials: true,
      });
      return res.data; // Trả về topic: { topic: { ... } }
    } catch (err) {
      console.error("Lỗi khi lấy topic người dùng theo ID:", err);
      throw err;
    }
  };

  // Tạo topic mới
  export const createTopic = async (title, description) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/create`,
        { title, description },
        { withCredentials: true }
      );
      return res.data; // Trả về thông tin topic đã tạo
    } catch (err) {
      console.error("Lỗi khi tạo topic:", err);
      throw err; // Ném lỗi để có thể xử lý ở nơi gọi API
    }
  };

  export const updateTopic = async (id, values, flashcards) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/update/${id}`,
        { ...values, flashcards },
        { withCredentials: true }
      );
      return res.data; // Trả về kết quả sửa topic và flashcards
    } catch (err) {
      console.error("Lỗi khi sửa topic:", err);
      throw err;
    }
  };

  // Xoá topic
  export const deleteTopic = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
        withCredentials: true,
      });
      return res.data; // Trả về kết quả xoá topic
    } catch (err) {
      console.error("Lỗi khi xoá topic:", err);
      throw err; // Ném lỗi để có thể xử lý ở nơi gọi API
    }
  };
