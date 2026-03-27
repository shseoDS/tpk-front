import { api } from '@/services/api';
import type { LoginResponse, SocialLoginRequest } from '../types';
import type { User } from '@/types';

export const authService = {
  socialLogin: (body: SocialLoginRequest) =>
    api.post<LoginResponse>('/auth/social-login', body),

  getMe: () =>
    api.get<User>('/auth/me'),

  deleteMe: () =>
    api.delete<void>('/auth/me'),
};
