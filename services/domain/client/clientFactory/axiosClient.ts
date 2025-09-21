import axios, { AxiosResponse } from "axios";

// Axios instance with custom response interceptor
const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

function dataResolverInterceptor(response: AxiosResponse) {
  return response.data;
}

axiosClient.interceptors.response.use(dataResolverInterceptor);

declare module "axios" {
  export interface AxiosInstance {
    request<T = unknown, R = T, D = T>(config: AxiosRequestConfig<D>): Promise<R>;
    get<T = unknown, R = T, D = T>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = unknown, R = T, D = T>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    head<T = unknown, R = T, D = T>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = unknown, R = T, D = T>(url: string, data?: unknown, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = unknown, R = T, D = T>(url: string, data?: unknown, config?: AxiosRequestConfig<D>): Promise<R>;
    patch<T = unknown, R = T, D = T>(url: string, data?: unknown, config?: AxiosRequestConfig<D>): Promise<R>;
  }
}

export { axiosClient };
