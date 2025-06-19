import axios from "axios";
import { url } from "../config";

export const api = axios.create({
  baseURL: url,
  // timeout: 60000,
});

api.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("accessToken")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }
    return config;
  },
  async (error) => { }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    // Network error (no response object)
    if (!error.response) {
      console.error("Network Error: ", error.message);

      // Show a user-friendly message (or toast)
      alert("Network error: Unable to reach the server. Please check your connection.");

      // Optionally throw or return a custom error
      return Promise.reject({ message: "Network Error", originalError: error });
    }

    const status = error.response.status;

    if (status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    return Promise.reject(error); // Return error to be caught downstream
  }
);