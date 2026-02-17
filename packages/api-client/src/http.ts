import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiClientConfig {
  baseUrl: string;
  apiPrefix?: string;
  getToken?: () => string | null;
}

export class ApiClient {
  private axios: AxiosInstance;
  private apiPrefix: string;

  constructor(config: ApiClientConfig) {
    this.apiPrefix = config.apiPrefix ?? "/api/v1";

    this.axios = axios.create({
      baseURL: config.baseUrl + this.apiPrefix,
    });

    if (config.getToken) {
      this.axios.interceptors.request.use((req) => {
        const token = config.getToken?.();
        if (token) {
          req.headers = req.headers ?? {};
          req.headers["Authorization"] = `Bearer ${token}`;
        }
        return req;
      });
    }
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config).then((r) => r.data);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config).then((r) => r.data);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.patch<T>(url, data, config).then((r) => r.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(url, config).then((r) => r.data);
  }
}
