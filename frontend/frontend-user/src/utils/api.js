import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:5000/api"; // update if your backend runs elsewhere

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // only if you are using cookies (e.g., JWT in cookies)
});
const queryClient = new QueryClient();

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('enetre the intercepter')
    const user = response?.data?.user;
    if (user) {
      console.log('inside the interseptor',user)
      queryClient.setQueryData(["auth-user"], user);
      console.log('querry set',queryClient.getQueryData(['auth-user']))
    } else {
      // Optional: clear user if not returned
      // queryClient.removeQueries(["auth-user"]);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);