// Axios dependencies
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Models
import { ApiClientConfig } from '../model';

export class ApiClient {
    protected instance: AxiosInstance;

    constructor(config: ApiClientConfig) {
        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 10000,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
        });

        this.setupInterceptors();
    }

    protected setupInterceptors(): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            config => {
                // if (token) {
                //   config.headers.Authorization = `Bearer ${token}`;
                // }
                return config;
            },
            error => Promise.reject(error)
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            response => response,
            error => Promise.reject(error)
        );
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.instance.get(endpoint, config);
        return response.data;
    }

    async post<T, D = any>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.instance.post(endpoint, data, config);
        return response.data;
    }

    async put<T, D = any>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.instance.put(endpoint, data, config);
        return response.data;
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.instance.delete(endpoint, config);
        return response.data;
    }
}

export const apiClient = new ApiClient({ baseURL: 'http://localhost:3001' });
