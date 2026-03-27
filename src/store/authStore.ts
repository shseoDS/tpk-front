import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // Flutter WebView에서 postMessage로 토큰 전달받아 저장
  setAuth: (token: string, user: User) => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) =>
        set({ accessToken: token, user, isAuthenticated: true }),

      setToken: (token) =>
        set({ accessToken: token, isAuthenticated: true }),

      setUser: (user) =>
        set({ user }),

      clearAuth: () =>
        set({ accessToken: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'tpk-auth',
      // accessToken만 localStorage에 영속화
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

/**
 * Flutter WebView → Web 토큰 브릿지
 *
 * Flutter에서 아래처럼 postMessage를 보내면 자동으로 토큰을 저장합니다.
 *
 * Flutter 측 코드 예시:
 * ```dart
 * controller.runJavaScript(
 *   "window.dispatchEvent(new CustomEvent('flutter-token', { detail: { token: '$token' } }))"
 * );
 * ```
 */
export function initFlutterTokenBridge() {
  window.addEventListener('flutter-token', (e: Event) => {
    const event = e as CustomEvent<{ token: string; user?: User }>;
    const { token, user } = event.detail;

    if (user) {
      useAuthStore.getState().setAuth(token, user);
    } else {
      useAuthStore.getState().setToken(token);
    }
  });
}
