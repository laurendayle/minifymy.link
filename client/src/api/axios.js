
import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json"},
  withCredentials: true,
});

export default axios;


