import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 403 && message?.toLowerCase().includes("blocked")) {
      console.log("User is blocked");

      try {
        await api.post("/auth/signout");
        window.location.reload();

      } catch (err) {
        console.warn("Error during signout:", err?.response?.data?.message || err.message);
      }
              // window.location.href = '/login';


    }

    return Promise.reject(error);
  }
);
