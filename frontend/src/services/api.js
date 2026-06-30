import axios from "axios";

const API = axios.create({
  baseURL: "https://securebank-1-sk9w.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;