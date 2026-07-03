import axios from 'axios';

// Create a globally accessible Axios instance
export const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Necessary to send Better Auth cookies
});

// Request Interceptor
apiService.interceptors.request.use(
  (config) => {
    // You can attach additional tokens or logging here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle global API errors (e.g., 401 Unauthorized redirect)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;
