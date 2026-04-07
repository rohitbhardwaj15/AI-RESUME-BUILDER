import axios from "axios";

const resolveApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "http://localhost:5000/api";
  }

  // Production-safe default. Requires a reverse proxy or same-origin API route.
  return "/api";
};

const api = axios.create({
  baseURL: resolveApiBaseUrl()
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("arb_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
