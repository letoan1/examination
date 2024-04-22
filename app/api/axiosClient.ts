import axios from "axios";
import { getCookie, deleteCookie, setCookie } from "../utils/helpers/storage";
import { AuthService } from "./auth";

const BACKEND_API_URL = "https://frontend-exam.digitalfortress.dev";

const axiosClient = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const tokenResponse = await AuthService.refreshToken();
        const { access_token } = tokenResponse.data;
        setCookie("accessToken", access_token);
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        deleteCookie("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (error.response && error.response.status === 403) {
      window.location.href = "/403";
      return;
    }
    if (error.response && error.response.status === 429) {
      alert("Too many requests. Please try again later.");
    }
    if (!error.response) {
      alert("A network error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
);
export const http = axiosClient;
