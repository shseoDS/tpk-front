import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExams } from '@/features/exam/hooks/useExam';
import { EXAM_TYPE_MAP, TPK_LEVEL_MAP, SECTION_MAP } from '@/features/exam/types';
import Badge from '@/components/common/Badge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';

const LEVELS = [
  { value: '', label: '전체 레벨' },
  { value: '1', label: 'TOPIK I' },
  { value: '2', label: 'TOPIK II' },
];

const SECTIONS = [
  { value: '', label: '전체 영역' },
  { value: '15', label: '듣기' },
  { value: '16', label: '읽기' },
  { value: '17', label: '쓰기' },
];

export default function ExamListPage() {
  const [tpkLevel, setTpkLevel] = useState('');
  const [section, setSection] = useState('');

  const { data: exams, isLoading, isError, refetch } = useExams({
    tpk_level: tpkLevel || undefined,
    section: section || undefined,
    limit: 50,
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 w-full">
      <h1 className="typography-heading-4 text-gray-900 dark:text-white mb-5">기출문제</h1>

      {/* 필터 */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {LEVELS.map((item) => (
          <button
            key={item.value}
            onClick={() => setTpkLevel(item.value)}
            className={`shrink-0 px-3 py-1.5 rounded-full typography-body-4 border transition-colors ${
              tpkLevel === item.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400'
            }`}
          >
            {item.label}
          </button>
        ))}
        <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch mx-1" />
        {SECTIONS.map((item) => (
          <button
            key={item.value}
            onClick={() => setSection(item.value)}
            className={`shrink-0 px-3 py-1.5 rounded-full typography-body-4 border transition-colors ${
              section === item.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => void refetch()} />}

      {exams && exams.length === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-3xl mb-3">📭</p>
          <p className="typography-body-4">해당 조건의 시험이 없습니다.</p>
        </div>
      )}

      {exams && exams.length > 0 && (
        <ul className="space-y-2">
          {exams.map((exam) => (
            <li key={exam.exam_key}>
              <Link
                to={`/exams/${exam.exam_key}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="typography-body-2 text-gray-900 dark:text-white truncate">
                    {exam.exam_year}년 {exam.round}회차
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    <Badge variant="blue">{TPK_LEVEL_MAP[exam.tpk_level] ?? exam.tpk_level}</Badge>
                    <Badge variant="green">{SECTION_MAP[exam.section] ?? exam.section}</Badge>
                    <Badge variant="gray">{EXAM_TYPE_MAP[exam.exam_type] ?? exam.exam_type}</Badge>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
