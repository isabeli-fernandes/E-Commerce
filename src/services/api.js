import axios from "axios";

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
}

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;