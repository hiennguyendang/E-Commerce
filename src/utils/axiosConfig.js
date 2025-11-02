import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // đổi theo địa chỉ backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;