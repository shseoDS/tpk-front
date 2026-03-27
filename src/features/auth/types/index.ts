import type { User } from '@/types';

export interface SocialLoginRequest {
  provider_id: string;
  provider_type: 'google' | 'apple' | 'kakao';
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}
