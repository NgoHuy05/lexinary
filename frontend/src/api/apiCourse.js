  import axios from "axios";

  const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/courses`;

  export const getCourses = () =>
    axios.get(BASE_URL, { withCredentials: true });

  export const getCourseDetail = (id) =>
    axios.get(`${BASE_URL}/detail/${id}`, { withCredentials: true });

  export const createCourse = (data) =>
    axios.post(`${BASE_URL}/create`, data, { withCredentials: true });

  export const updateCourse = (id, data) =>
    axios.patch(`${BASE_URL}/update/${id}`, data, { withCredentials: true });

  export const deleteCourse = (id) =>
    axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });

  export const changeStatus = (ids, value) =>
    axios.patch(`${BASE_URL}/change-status/${ids[0]}`, { ids, key: "status", value }, { withCredentials: true });

  export const changeMulti = (payload) =>
    axios.patch(`${BASE_URL}/change-multi`, payload, { withCredentials: true });
