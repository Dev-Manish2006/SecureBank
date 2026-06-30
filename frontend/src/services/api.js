import axios from "axios";

// ==========================
// BASE URL (IMPORTANT FIX)
// ==========================
const API = axios.create({
    baseURL: "https://securebank-1-sk9w.onrender.com/api"
});


// ==========================
// REQUEST INTERCEPTOR
// ==========================
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// ==========================
// RESPONSE INTERCEPTOR
// ==========================
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;