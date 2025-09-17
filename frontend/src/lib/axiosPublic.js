import axios from "axios";

const baseURL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5174/api";

// Cliente HTTP público (sin autenticación)
export const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Solo interceptors para logging, sin autenticación
axiosPublic.interceptors.request.use((config) => {
  console.log('📤 Public API request:', config.url);
  return config;
});

axiosPublic.interceptors.response.use(
  (response) => {
    console.log('✅ Public API response - Success:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.log('❌ Public API response - Error:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);