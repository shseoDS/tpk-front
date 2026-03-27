import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { practiceService } from '../services/practiceService';
import type { PracticeListParams } from '../types';

export const practiceKeys = {
  all: ['practice'] as const,
  list: (params?: PracticeListParams) => ['practice', 'list', params] as const,
  detail: (questionNo: number) => ['practice', questionNo] as const,
  answer: (questionNo: number) => ['practice', questionNo, 'answer'] as const,
  withAnswer: (questionNo: number) => ['practice', questionNo, 'with-answer'] as const,
};

export function usePracticeQuestions(params?: PracticeListParams) {
  return useQuery({
    queryKey: practiceKeys.list(params),
    queryFn: () => practiceService.getQuestions(params),
  });
}

export function usePracticeQuestion(questionNo: number) {
  return useQuery({
    queryKey: practiceKeys.detail(questionNo),
    queryFn: () => practiceService.getQuestion(questionNo),
    enabled: !!questionNo,
  });
}

export function usePracticeAnswer(questionNo: number) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: practiceKeys.answer(questionNo),
    queryFn: () => practiceService.getAnswer(questionNo),
    enabled: !!questionNo && isAuthenticated,
  });
}

export function usePracticeQuestionWithAnswer(questionNo: number) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: practiceKeys.withAnswer(questionNo),
    queryFn: () => practiceService.getQuestionWithAnswer(questionNo),
    enabled: !!questionNo && isAuthenticated,
  });
}
