import { api } from '@/services/api';
import type {
  HistoryExam,
  HistoryExamRequest,
  HistoryListParams,
  HistoryPractice,
  HistoryPracticeRequest,
} from '../types';

export const historyService = {
  saveExamHistory: (body: HistoryExamRequest) =>
    api.post<HistoryExam>('/history/exam', body),

  getExamHistory: (params?: HistoryListParams) =>
    api.get<HistoryExam[]>('/history/exam', { params }),

  savePracticeHistory: (body: HistoryPracticeRequest) =>
    api.post<HistoryPractice>('/history/practice', body),

  getPracticeHistory: (params?: HistoryListParams) =>
    api.get<HistoryPractice[]>('/history/practice', { params }),
};
