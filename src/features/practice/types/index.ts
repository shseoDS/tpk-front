import type { PaginationParams } from '@/types';

export interface PracticeQuestion {
  question_no: number;
  section: string;
  question_type: string;
  struct_type: string;
  question_json: Record<string, unknown>;
  score: number;
  difficulty: '상' | '중' | '하';
  confirm_yn: 'Y' | 'N';
}

export interface PracticeAnswer {
  question_no: number;
  feedback_json: Record<string, unknown>;
}

export interface PracticeQuestionWithAnswer extends PracticeQuestion {
  answer: PracticeAnswer;
}

export interface PracticeListParams extends PaginationParams {
  section?: string;
  question_type?: string;
  difficulty?: '상' | '중' | '하';
}
