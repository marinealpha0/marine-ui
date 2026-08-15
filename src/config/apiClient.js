// Simple API client for making HTTP requests using axios
import axios from 'axios';
import { getAccessToken, setAccessToken } from "@/store/useAuthStore";
import ENDPOINTS from "@/constant/Endpoints";

// Get the base URL from environment variables or use default
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.marineui.dev';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  withCredentials: true, // Send cookies with requests
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401s and token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop if the refresh endpoint itself fails or is 401
    // Also skip refresh attempt for the login endpoint (a 401 there means wrong credentials, not expired token)
    if (originalRequest.url.includes(ENDPOINTS.auth.refresh) || originalRequest.url.includes(ENDPOINTS.auth.login)) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use a clean axios instance for refresh to avoid interceptors
        const response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.auth.refresh}`,
          {},
          { withCredentials: true }
        );

        const { access_token, accessToken, jwtToken } = response.data;
        const newToken = access_token || accessToken || jwtToken;

        if (newToken) {
          setAccessToken(newToken);
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          processQueue(null, newToken);
          return axiosInstance(originalRequest);
        } else {
          throw new Error("No access token returned from refresh");
        }
      } catch (err) {
        processQueue(err, null);
        // Force logout on refresh failure
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Function to make API requests
export const fetchApi = async (endpoint, method, body) => {
  // Set up the request config
  const config = {
    method: method,
    url: endpoint,
    headers: {},
  };

  // Add body if provided (for POST, PUT requests)
  if (body) {
    config.data = body;
    // If body is not FormData, set Content-Type to application/json
    if (!(body instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    // If body is FormData, we don't set Content-Type and let axios handle it
  }

  try {
    // Make the request
    const response = await axiosInstance(config);

    // Return success response
    return {
      status: true,
      data: response.data
    };
  } catch (error) {
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const responseData = error.response.data;
      let errorMessage = 'Something went wrong';

      // console.error("Full API Error Object:", error.response); // Debug log

      if (responseData) {
        if (typeof responseData === 'string') {
          // Check if the response is HTML (starts with <)
          if (responseData.trim().startsWith('<')) {
            if (error.response.status === 404) {
              errorMessage = "Resource not found (404)";
            } else if (error.response.status === 500) {
              errorMessage = "Internal Server Error (500)";
            } else {
              errorMessage = `Request failed (${error.response.status})`;
            }
          } else {
            errorMessage = responseData;
          }
        } else if (typeof responseData === 'object') {
          // If the response has a detailed errors array, prefer that over the generic message
          const fieldErrors = Array.isArray(responseData.errors) && responseData.errors.length > 0
            ? responseData.errors.map(e => e.message).filter(Boolean).join(', ')
            : null;

          errorMessage =
            responseData.errorMsg ||
            fieldErrors ||        // Specific field-level errors (e.g. validation errors array)
            responseData.message ||
            responseData.error ||
            responseData.detail ||  // Common in FastAPI/Django
            responseData.title ||   // Problem Details
            JSON.stringify(responseData); // Fallback

          // If the fallback is just "{}", revert to default
          if (errorMessage === '{}') errorMessage = 'Something went wrong';
        }
      }

      // Pass the status code separately if needed by the UI
      return {
        status: false,
        errorMsg: errorMessage,
        statusCode: error.response.status,
        data: responseData
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        status: false,
        errorMsg: 'No response from server. Please try again later.'
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        status: false,
        errorMsg: 'Network error. Please check your connection.'
      };
    }
  }
};