import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ExamQuestion } from '@/features/exam/types';

interface ExamSession {
  examKey: number;
  questions: ExamQuestion[];
  currentIndex: number;
  /** questionNo → 선택한 보기 (1-based) */
  answers: Record<number, number>;
}

interface ExamSessionStore {
  session: ExamSession | null;

  /** 새 세션 시작 (answers 초기화) */
  startSession: (examKey: number, questions: ExamQuestion[]) => void;
  /** 세션을 유지한 채 재개 */
  resumeSession: () => void;
  /** 특정 인덱스로 이동 */
  setCurrentIndex: (index: number) => void;
  /** 답안 저장 */
  setAnswer: (questionNo: number, choice: number) => void;
  /** 세션 삭제 */
  clearSession: () => void;
  /** 해당 exam 의 진행 중 세션이 있는지 */
  hasProgressFor: (examKey: number) => boolean;
}

export const useExamSessionStore = create<ExamSessionStore>()(
  persist(
    (set, get) => ({
      session: null,

      startSession: (examKey, questions) =>
        set({
          session: {
            examKey,
            questions,
            currentIndex: 0,
            answers: {},
          },
        }),

      resumeSession: () => {
        // 상태 변경 없이 재개 — 호출부에서 navigate 처리
      },

      setCurrentIndex: (index) =>
        set((s) => {
          if (!s.session) return s;
          return { session: { ...s.session, currentIndex: index } };
        }),

      setAnswer: (questionNo, choice) =>
        set((s) => {
          if (!s.session) return s;
          return {
            session: {
              ...s.session,
              answers: { ...s.session.answers, [questionNo]: choice },
            },
          };
        }),

      clearSession: () => set({ session: null }),

      hasProgressFor: (examKey) => {
        const { session } = get();
        return (
          session !== null &&
          session.examKey === examKey &&
          session.currentIndex > 0
        );
      },
    }),
    { name: 'tpk-exam-session' },
  ),
);
