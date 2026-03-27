import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { historyService } from '../services/historyService';
import type { HistoryExamRequest, HistoryListParams, HistoryPracticeRequest } from '../types';

export const historyKeys = {
  exam: (params?: HistoryListParams) => ['history', 'exam', params] as const,
  practice: (params?: HistoryListParams) => ['history', 'practice', params] as const,
};

export function useExamHistory(params?: HistoryListParams) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: historyKeys.exam(params),
    queryFn: () => historyService.getExamHistory(params),
    enabled: isAuthenticated,
  });
}

export function usePracticeHistory(params?: HistoryListParams) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: historyKeys.practice(params),
    queryFn: () => historyService.getPracticeHistory(params),
    enabled: isAuthenticated,
  });
}

export function useSaveExamHistory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: HistoryExamRequest) => historyService.saveExamHistory(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['history', 'exam'] });
    },
  });
}

export function useSavePracticeHistory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: HistoryPracticeRequest) =>
      historyService.savePracticeHistory(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['history', 'practice'] });
    },
  });
}
