import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { examService } from '../services/examService';
import type { ExamListParams } from '../types';

export const examKeys = {
  all: ['exams'] as const,
  list: (params?: ExamListParams) => ['exams', 'list', params] as const,
  detail: (examKey: number) => ['exams', examKey] as const,
  questions: (examKey: number) => ['exams', examKey, 'questions'] as const,
  question: (examKey: number, questionNo: number) =>
    ['exams', examKey, 'questions', questionNo] as const,
  answers: (examKey: number) => ['exams', examKey, 'answers'] as const,
  answer: (examKey: number, questionNo: number) =>
    ['exams', examKey, 'answers', questionNo] as const,
  instructions: (examKey: number) => ['exams', examKey, 'instructions'] as const,
  files: (examKey: number) => ['exams', examKey, 'files'] as const,
};

export function useExams(params?: ExamListParams) {
  return useQuery({
    queryKey: examKeys.list(params),
    queryFn: () => examService.getExams(params),
  });
}

export function useExam(examKey: number) {
  return useQuery({
    queryKey: examKeys.detail(examKey),
    queryFn: () => examService.getExam(examKey),
    enabled: !!examKey,
  });
}

export function useExamQuestions(examKey: number) {
  return useQuery({
    queryKey: examKeys.questions(examKey),
    queryFn: () => examService.getQuestions(examKey),
    enabled: !!examKey,
  });
}

export function useExamQuestion(examKey: number, questionNo: number) {
  return useQuery({
    queryKey: examKeys.question(examKey, questionNo),
    queryFn: () => examService.getQuestion(examKey, questionNo),
    enabled: !!examKey && !!questionNo,
  });
}

export function useExamAnswers(examKey: number) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: examKeys.answers(examKey),
    queryFn: () => examService.getAnswers(examKey),
    enabled: !!examKey && isAuthenticated,
  });
}

export function useExamAnswer(examKey: number, questionNo: number) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: examKeys.answer(examKey, questionNo),
    queryFn: () => examService.getAnswer(examKey, questionNo),
    enabled: !!examKey && !!questionNo && isAuthenticated,
  });
}

export function useExamInstructions(examKey: number) {
  return useQuery({
    queryKey: examKeys.instructions(examKey),
    queryFn: () => examService.getInstructions(examKey),
    enabled: !!examKey,
  });
}

export function useExamFiles(examKey: number) {
  return useQuery({
    queryKey: examKeys.files(examKey),
    queryFn: () => examService.getFiles(examKey),
    enabled: !!examKey,
  });
}
