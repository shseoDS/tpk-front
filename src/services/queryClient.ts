import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5분간 fresh
      gcTime: 1000 * 60 * 10,        // 10분 캐시 유지
      retry: 1,                       // 실패 시 1회 재시도
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
