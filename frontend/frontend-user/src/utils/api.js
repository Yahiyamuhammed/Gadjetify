import axios from "axios";
import { useNavigate } from "react-router-dom";
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://gadjetify.ddns.net/api";

// const BASE_URL ="https://d6052791c50d.ngrok-free.app/api"
  // import.meta.env.MODE === 'development'
  //   ? 'http://localhost:3000/api'
  //   : ' https://78b516853766.ngrok-free.app';


export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "";

    console.log("ERROR STATUS:", status);
    console.log("ERROR MESSAGE:", message);

    if (
      (status === 401 || status === 403) &&
      message.toLowerCase().includes("admin")
    ) {
      console.log("Redirecting to /admin/login");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "";
    if (status === 403 && message?.toLowerCase().includes("blocked")) {
      console.log("User is blocked");

      try {
        await api.post("/auth/signout");
        window.location.reload();
      } catch (err) {
        console.warn(
          "Error during signout:",
          err?.response?.data?.message || err.message
        );
      }
    }

    return Promise.reject(error);
  }
);
