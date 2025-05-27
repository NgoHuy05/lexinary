import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/topics`;

export const getPublicTopics = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/public`, {
      withCredentials: true,
    });
    return res.data.topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserTopics = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      withCredentials: true,
    });
    return res.data.topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllTopics = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/all`, {
      withCredentials: true,
    });
    return res.data.topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTopicWithFlashcards = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPublicTopicById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/public/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserTopicById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createTopic = async (title, description) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/create`,
      { title, description },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateTopic = async (id, values, flashcards) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/update/${id}`,
      { ...values, flashcards },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTopic = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
