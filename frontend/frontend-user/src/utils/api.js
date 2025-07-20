import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // update if your backend runs elsewhere

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // only if you are using cookies (e.g., JWT in cookies)
});