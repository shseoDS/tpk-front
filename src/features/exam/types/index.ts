import type { PaginationParams } from '@/types';

export interface Exam {
  exam_key: number;
  exam_year: string;
  exam_type: string;   // '1'=기출, '2'=모의
  round: number;
  tpk_level: string;  // '1'=TOPIK I, '2'=TOPIK II
  section: string;    // '15'=듣기, '16'=읽기, '17'=쓰기
}

export interface QuestionJson {
  item_type: string;
  no: number;
  score: number;
  section: string;
  type: string;
  question_text: string;
  choices: string[];
  correct_answer: number;
  feedback: string[];
  passage?: string;
  image_url?: string;
}

export interface ExamQuestion {
  exam_key: number;
  question_no: number;
  section: string;
  question_type: string;
  struct_type: string | null;
  question_json: QuestionJson | null;
  score: number;
  difficulty: string | null;
}

export interface ExamAnswer {
  exam_key: number;
  question_no: number;
  feedback_json: Record<string, unknown> | null;
}

export interface InsJson {
  item_type: string;
  full_sentence: string;       // ※ [31~33] 무엇에 대한 내용입니까?...
  instruction: string;         // 단문 지시
  no_list: number[];           // 해당 문제 번호 목록
  paragraph: string | null;    // 독해 지문 (없으면 null)
  score: number | null;
}

export interface ExamInstruction {
  exam_key: number;
  ins_no: number;
  ins_json: InsJson | null;
}

export interface ExamFile {
  pdf_key: number;
  exam_key: number;
  file_name: string;
  file_path: string;
  file_size: number | null;
  sort_order: number | null;
}

export interface ExamDetail extends Exam {
  questions: ExamQuestion[];
  instructions: ExamInstruction[];
  files: ExamFile[];
}

export interface ExamListParams extends PaginationParams {
  exam_year?: string;
  exam_type?: string;
  tpk_level?: string;
  section?: string;
}

// 코드 → 표시명 매핑
export const EXAM_TYPE_MAP: Record<string, string> = {
  '1': '기출문제',
  '2': '모의문제',
};

export const TPK_LEVEL_MAP: Record<string, string> = {
  '1': 'TOPIK I',
  '2': 'TOPIK II',
};

export const SECTION_MAP: Record<string, string> = {
  '15': '듣기',
  '16': '읽기',
  '17': '쓰기',
};
