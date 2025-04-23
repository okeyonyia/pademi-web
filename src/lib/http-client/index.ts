import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * HttpClient class provides methods to perform HTTP requests.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
class HttpClient {
  private axiosInstance = axios.create({
    // baseURL: "http://192.168.1.15:8000/api/v1", // Local URL
    baseURL: "https://pademi.vercel.app/api/v1", // Set Prod. base URL
    // timeout: 15000, // Set timeout (optional)
  });

  constructor() {
    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = this.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = "/login"; // Redirect user to login
        }
        return Promise.reject(error);
      }
    );
  }

  /** Get token from localStorage (only if in browser) */
  private getToken(): string | null {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  }

  /** Save token to localStorage after login */
  public setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  /** Clear token (e.g., on logout or expired session) */
  public clearToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  /**
   * Performs an HTTP GET request to retrieve data of type T from the specified URL.
   * @param url The URL to perform the GET request.
   * @returns A Promise that resolves with the retrieved data of type T, or null if an error occurs.
   */
  async get<T>(url: string): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      console.log(`GET request to ${url} failed:`, this.formatError(error));
      return error;
    }
  }

  /**
   * Performs multiple HTTP GET requests concurrently for an array of URLs.
   * @param urls An array of URLs to perform the GET requests.
   * @returns A Promise that resolves with an array of results corresponding to each URL.
   * Each result is of type T if fulfilled, or null if the request failed or was rejected.
   */
  async getMany<T>(urls: string[]): Promise<(T | null)[]> {
    if (!urls.length) return [];

    const promises = urls.map((url) => this.get<T>(url));
    const results = await Promise.allSettled(promises);

    return results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        console.error("One of the GET requests failed:", result.reason);
        return null;
      }
    });
  }

  /**
   * Performs an HTTP POST request to send data of type T to the specified URL.
   * @param url The URL to perform the POST request.
   * @param data The data to be sent in the POST request.
   * @returns A Promise that resolves with the response data of type R, or null if an error occurs.
   */
  async post<T, R>(url: string, data: T): Promise<R | null> {
    try {
      const response: AxiosResponse<R> = await this.axiosInstance.post(
        url,
        data
      );
      return response.data;
    } catch (error: any) {
      // Rethrow the error to allow the calling function to handle it
      throw error;
    }
  }

  /**
   * Performs an HTTP POST request to send data of type T to the specified URL.
   * @param url The URL to perform the POST request.
   * @param data The data to be sent in the POST request.
   * @returns A Promise that resolves with the response data of type R, or null if an error occurs.
   */
  async delete<_, R>(url: string): Promise<R | null> {
    try {
      const response: AxiosResponse<R> = await this.axiosInstance.delete(url);
      return response.data;
    } catch (error: any) {
      // Rethrow the error to allow the calling function to handle it
      throw error;
    }
  }

  async patch<T, R>(url: string, data: T): Promise<R | null> {
    try {
      const response: AxiosResponse<R> = await this.axiosInstance.patch(
        url,
        data
      );
      return response.data;
    } catch (error: any) {
      return error;
    }
  }

  /**
   * Performs an HTTP PUT request to update data of type T at the specified URL.
   * @param url The URL to perform the PUT request.
   * @param data The data to be updated in the PUT request.
   * @returns A Promise that resolves with the response data of type R, or null if an error occurs.
   */
  async put<T, R>(url: string, data: T): Promise<R | null> {
    try {
      const response: AxiosResponse<R> = await this.axiosInstance.put(
        url,
        data
      );
      return response.data;
    } catch (error: any) {
      console.log(`PUT request to ${url} failed:`, this.formatError(error));
      return error;
    }
  }

  /**
   * Formats the error message from AxiosError.
   * @param error The error object.
   * @returns Formatted error message.
   */
  private formatError(error: AxiosError): string {
    if (error.response) {
      // Server responded with a status other than 2xx
      return `Response error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response received
      return `No response received: ${error.request}`;
    } else {
      // Something happened in setting up the request
      return `Request setup error: ${error.message}`;
    }
  }
}

const Http = new HttpClient();
export default Http;
