import { useNavigate, useParams, Link } from 'react-router-dom';
import { useExam, useExamQuestions } from '@/features/exam/hooks/useExam';
import { useExamSessionStore } from '@/store/examSessionStore';
import { EXAM_TYPE_MAP, TPK_LEVEL_MAP, SECTION_MAP } from '@/features/exam/types';
import Badge from '@/components/common/Badge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';
import SLButton from '@/components/common/SLButton';

export default function ExamDetailPage() {
  const { examKey } = useParams<{ examKey: string }>();
  const key = Number(examKey);
  const navigate = useNavigate();

  const { data: exam, isLoading: examLoading, isError: examError } = useExam(key);
  const { data: questions, isLoading: qLoading, isError: qError, refetch } = useExamQuestions(key);

  const { session, startSession, hasProgressFor } = useExamSessionStore();
  const hasProgress = hasProgressFor(key);

  const isLoading = examLoading || qLoading;
  const isError = examError || qError;

  function handleStart() {
    if (!questions?.length) return;
    startSession(key, questions);
    navigate(`/exams/${key}/questions`);
  }

  function handleResume() {
    if (!session) return;
    const currentQ = session.questions[session.currentIndex];
    navigate(`/exams/${key}/questions`);
    // currentIndex는 store에 이미 남아있어 QuestionPage에서 읽음
    void currentQ;
  }

  if (isLoading) return <LoadingSpinner fullPage />;
  if (isError) return <ErrorState onRetry={() => void refetch()} />;
  if (!questions) return null;

  const total = questions.length;
  const progressIndex = hasProgress && session ? session.currentIndex : 0;
  const answeredCount = hasProgress && session ? Object.keys(session.answers).length : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 w-full">
      {/* 뒤로가기 */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/exams"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="typography-subtitle-1 text-gray-900 dark:text-white">
          {exam?.exam_year}년 {exam?.round}회차
        </h1>
      </div>

      {/* 시험 정보 카드 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-5">
        <div className="flex gap-1.5 flex-wrap mb-4">
          {exam && (
            <>
              <Badge variant="blue">{TPK_LEVEL_MAP[exam.tpk_level] ?? exam.tpk_level}</Badge>
              <Badge variant="green">{SECTION_MAP[exam.section] ?? exam.section}</Badge>
              <Badge variant="gray">{EXAM_TYPE_MAP[exam.exam_type] ?? exam.exam_type}</Badge>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
          <div className="flex flex-col items-center gap-1 px-2">
            <span className="typography-heading-1 text-gray-900 dark:text-white">{total}</span>
            <span className="typography-caption-4 text-gray-400">총 문제</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2">
            <span className="typography-heading-1 text-blue-600 dark:text-blue-400">
              {questions.reduce((sum, q) => sum + (q.score ?? 0), 0)}
            </span>
            <span className="typography-caption-4 text-gray-400">총 점수</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2">
            <span className="typography-heading-1 text-gray-900 dark:text-white">
              {exam?.exam_year}
            </span>
            <span className="typography-caption-4 text-gray-400">출제 연도</span>
          </div>
        </div>
      </div>

      {/* 이어서 하기 섹션 (진행 중인 세션이 있을 때) */}
      {hasProgress && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-600 dark:text-blue-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="typography-body-2 text-blue-700 dark:text-blue-300">
              이전 진행 기록이 있습니다
            </span>
          </div>

          {/* 진행 바 */}
          <div className="mb-3">
            <div className="flex justify-between typography-caption-4 text-gray-500 dark:text-gray-400 mb-1">
              <span>{progressIndex + 1}번째 문제 진행 중</span>
              <span>{answeredCount} / {total} 완료</span>
            </div>
            <div className="w-full bg-white dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <SLButton variant="primary" fullWidth onClick={handleResume}>
              이어서 하기
            </SLButton>
            <SLButton variant="outlined" fullWidth onClick={handleStart}>
              처음부터
            </SLButton>
          </div>
        </div>
      )}

      {/* 시작하기 버튼 (진행 기록 없을 때) */}
      {!hasProgress && (
        <SLButton
          variant="primary"
          fullWidth
          disabled={total === 0}
          onClick={handleStart}
          className="py-4 shadow-sm shadow-blue-200 dark:shadow-none"
        >
          시작하기 →
        </SLButton>
      )}

      {total === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500 mt-4">
          <p className="text-3xl mb-3">📭</p>
          <p className="typography-body-4">등록된 문제가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
