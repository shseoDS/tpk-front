import { api } from '@/services/api';
import type {
  Exam,
  ExamAnswer,
  ExamDetail,
  ExamFile,
  ExamInstruction,
  ExamListParams,
  ExamQuestion,
} from '../types';

export const examService = {
  getExams: (params?: ExamListParams) =>
    api.get<Exam[]>('/exams', { params }),

  getExam: (examKey: number) =>
    api.get<ExamDetail>(`/exams/${examKey}`),

  getQuestions: (examKey: number) =>
    api.get<ExamQuestion[]>(`/exams/${examKey}/questions`),

  getQuestion: (examKey: number, questionNo: number) =>
    api.get<ExamQuestion>(`/exams/${examKey}/questions/${questionNo}`),

  getAnswers: (examKey: number) =>
    api.get<ExamAnswer[]>(`/exams/${examKey}/answers`),

  getAnswer: (examKey: number, questionNo: number) =>
    api.get<ExamAnswer>(`/exams/${examKey}/answers/${questionNo}`),

  getInstructions: (examKey: number) =>
    api.get<ExamInstruction[]>(`/exams/${examKey}/instructions`),

  getFiles: (examKey: number) =>
    api.get<ExamFile[]>(`/exams/${examKey}/files`),
};
