import type { PaginationParams } from '@/types';

export interface HistoryExamRequest {
  exam_key: number;
  question_no: number;
  history_type: string;
  result_json: Record<string, unknown>;
  duration: number;
}

export interface HistoryPracticeRequest {
  question_no: number;
  history_type: string;
  result_json: Record<string, unknown>;
  duration: number;
}

export interface HistoryExam extends HistoryExamRequest {
  history_key: number;
  user_key: number;
  ins_date: string;
}

export interface HistoryPractice extends HistoryPracticeRequest {
  history_key: number;
  user_key: number;
  ins_date: string;
}

export interface HistoryListParams extends PaginationParams {
  exam_key?: number;
}
