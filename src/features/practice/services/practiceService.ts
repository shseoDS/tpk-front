import { api } from '@/services/api';
import type {
  PracticeAnswer,
  PracticeListParams,
  PracticeQuestion,
  PracticeQuestionWithAnswer,
} from '../types';

export const practiceService = {
  getQuestions: (params?: PracticeListParams) =>
    api.get<PracticeQuestion[]>('/practice/questions', { params }),

  getQuestion: (questionNo: number) =>
    api.get<PracticeQuestion>(`/practice/questions/${questionNo}`),

  getAnswer: (questionNo: number) =>
    api.get<PracticeAnswer>(`/practice/questions/${questionNo}/answer`),

  getQuestionWithAnswer: (questionNo: number) =>
    api.get<PracticeQuestionWithAnswer>(
      `/practice/questions/${questionNo}/with-answer`,
    ),
};
