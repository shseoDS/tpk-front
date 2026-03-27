import { Link } from 'react-router-dom';
import { useExams } from '@/features/exam/hooks/useExam';
import { EXAM_TYPE_MAP, TPK_LEVEL_MAP, SECTION_MAP } from '@/features/exam/types';
import Badge from '@/components/common/Badge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';

export default function HomePage() {
  const { data: exams, isLoading, isError, refetch } = useExams({ limit: 10 });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 w-full">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          한국어능력시험 기출문제
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          TOPIK 기출문제로 실력을 키워보세요
        </p>
      </div>

      {/* Quick Menu */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <Link
          to="/exams"
          className="flex flex-col items-center gap-2 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
        >
          <span className="text-3xl">📋</span>
          <span className="font-semibold text-blue-700 dark:text-blue-300 text-sm">기출문제 풀기</span>
        </Link>
        <Link
          to="/practice"
          className="flex flex-col items-center gap-2 p-5 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
        >
          <span className="text-3xl">✏️</span>
          <span className="font-semibold text-green-700 dark:text-green-300 text-sm">유형별 연습</span>
        </Link>
      </div>

      {/* Recent Exams */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">최근 시험</h2>
          <Link to="/exams" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            전체보기 →
          </Link>
        </div>

        {isLoading && <LoadingSpinner />}
        {isError && <ErrorState onRetry={() => void refetch()} />}
        {exams && (
          <ul className="space-y-2">
            {exams.map((exam) => (
              <li key={exam.exam_key}>
                <Link
                  to={`/exams/${exam.exam_key}`}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {exam.exam_year}년 {exam.round}회차
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      <Badge variant="blue">{TPK_LEVEL_MAP[exam.tpk_level] ?? exam.tpk_level}</Badge>
                      <Badge variant="green">{SECTION_MAP[exam.section] ?? exam.section}</Badge>
                      <Badge variant="gray">{EXAM_TYPE_MAP[exam.exam_type] ?? exam.exam_type}</Badge>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
