// API 공통 응답 래퍼 (필요시 사용)
export interface ApiError {
  status: number;
  message: string;
  detail?: string;
}

// 페이지네이션 파라미터
export interface PaginationParams {
  skip?: number;
  limit?: number;
}

// 사용자
export interface User {
  user_key: number;
  email: string;
  provider_type: 'google' | 'apple' | 'kakao';
  ins_date: string;
}

// 코드 테이블
export interface GroupCode {
  group_code: string;
  group_name: string;
  group_desc: string;
}

export interface Code {
  group_code: string;
  code: string;
  code_name: string;
  code_desc: string;
  sort_order: number;
}
