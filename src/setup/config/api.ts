// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import API_CONFIG from "./apiConfig";

// Function to get the authentication token (Modify as needed)
const getToken = (): string | null => {
  return sessionStorage.getItem("authToken"); // Example: Token stored in sessionStorage
};

// Function to get the organization ID
const getOrganizationId = (): string | null => {
  return sessionStorage.getItem("organizationId");
};

// Create a single Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach Bearer token if it exists
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    const organizationId = getOrganizationId();

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    if (organizationId) {
      config.headers["x-organization-id"] = organizationId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      // Remove authentication token
      sessionStorage.removeItem("authToken");

      // Redirect only in browser (not on server)
      if (typeof window !== "undefined") {
        window.location.replace("/"); // Redirect to login/home page
      }
    }

    return Promise.reject(error);
  }
);

// Generic function for GET requests
export const getData = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint, { params });
    return response;
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    throw error;
  }
};

// Generic function for POST requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async <T, D = any>(
  endpoint: string,
  data: D
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.post<T>(endpoint, data);
    return response;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};

// Generic function for DELETE requests
export const deleteData = async <T>(
  endpoint: string
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.delete<T>(endpoint);
    return response;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    throw error;
  }
};

// Generic function for PUT requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putData = async <T, D = any>(
  endpoint: string,
  data: D
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.put<T>(endpoint, data);
    return response;
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    throw error;
  }
};

// Generic function for PATCH requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchData = async <T, D = any>(
  endpoint: string,
  data: D
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.patch<T>(endpoint, data);
    return response;
  } catch (error) {
    console.error(`PATCH ${endpoint} failed:`, error);
    throw error;
  }
};

export const uploadToPresignedUrl = async (
  url: string,
  file: File
): Promise<Response> => {
  try {
    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      throw new Error(`Invalid URL: ${url}`);
    }

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`PATCH ${url} failed:`, error);
    throw error;
  }
};

export const uploadData = async <T>(
  endpoint: string,
  formData: FormData
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.patch<T>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(`UPLOAD ${endpoint} failed:`, error);
    throw error;
  }
};

// Export the Axios instance for other uses if needed
export default api;
