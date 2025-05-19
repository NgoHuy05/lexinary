import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/flashcards`

// Lấy flashcard theo topicId (sửa phần này lại)
export const getFlashcardsByTopic = async (topicId) => {
  try {
    const res = await axios.get(`${BASE_URL}/topic/${topicId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy flashcard theo topic:", err);
    throw err;
  }
};
export const getFlashcards = async (flashcardId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${flashcardId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy flashcard theo id:", err);
    throw err;
  }
};


// Tạo flashcard mới
export const createFlashcard = async (term, definition, example, pronunciation, topicId) => {
  try {
    const res = await axios.post(`${BASE_URL}/create`, {
      term, definition, example, pronunciation, topicId
    }, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi tạo flashcard:", err);
    throw err;
  }
};


// Sửa flashcard
export const editFlashcard = async (id, term, definition, example, pronunciation ) => {
  try {
    const res = await axios.patch(`${BASE_URL}/update/${id}`, {term, definition, example, pronunciation}, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi sửa flashcard:", err);
    throw err;
  }
};

// Xoá flashcard
export const deleteFlashcard = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi xoá flashcard:", err);
    throw err;
  }
};
