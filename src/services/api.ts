import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Flutter WebView → Web API URL 브릿지
 *
 * Flutter에서 WebView가 로드된 뒤 아래처럼 주입하면
 * axios baseURL이 런타임에 교체됩니다.
 *
 * Flutter 측 (onPageFinished 콜백 안에서):
 * ```dart
 * controller.runJavaScript(
 *   "window.dispatchEvent(new CustomEvent('flutter-config', "
 *   "{ detail: { apiBaseUrl: 'http://192.168.0.90:8000' } }))"
 * );
 * ```
 */
export function initFlutterConfigBridge() {
  window.addEventListener('flutter-config', (e: Event) => {
    const event = e as CustomEvent<{ apiBaseUrl?: string }>;
    const { apiBaseUrl } = event.detail;
    if (apiBaseUrl) {
      apiClient.defaults.baseURL = apiBaseUrl;
    }
  });
}

// Request Interceptor — JWT 토큰 자동 주입
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// Response Interceptor — 에러 핸들링
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        useAuthStore.getState().clearAuth();
      }

      const message: string =
        error.response?.data?.detail ??
        error.response?.data?.message ??
        error.message ??
        '알 수 없는 오류가 발생했습니다.';

      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
