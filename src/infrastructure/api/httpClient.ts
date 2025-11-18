import { HttpClient, RequestConfig } from './types';
import { NetworkError, ApiError } from '@shared/errors';
import { logger } from '@shared/utils/logger';
import { API_BASE_URL, API_TIMEOUT } from '@shared/constants';

/**
 * Axios-based HTTP client implementation
 */
export class AxiosHttpClient implements HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const fullUrl = this.buildUrl(url, config?.params);
    const headers = { ...this.defaultHeaders, ...config?.headers };
    const timeout = config?.timeout || this.timeout;

    logger.debug(`HTTP ${method} ${fullUrl}`, { data, headers });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const requestOptions: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(fullUrl, requestOptions);
      clearTimeout(timeoutId);

      logger.debug(`HTTP ${method} ${fullUrl} - Status: ${response.status}`);

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const responseData = await response.json();
      return responseData as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      logger.error(`HTTP ${method} ${fullUrl} failed`, { error });

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new NetworkError('Request timeout', error);
        }
        throw new NetworkError(error.message, error);
      }

      throw new NetworkError('Unknown network error', error);
    }
  }

  private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    if (!params) {
      return fullUrl;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    return `${fullUrl}?${searchParams.toString()}`;
  }

  private async parseErrorResponse(response: Response): Promise<{ message: string }> {
    try {
      const data = await response.json();
      return { message: data.message || data.error || 'Request failed' };
    } catch {
      return { message: response.statusText || 'Request failed' };
    }
  }

  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }
}
