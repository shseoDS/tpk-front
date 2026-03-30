interface QuestionCardProps {
  questionNo: number;
  questionText: string;
  passage?: string;
  questionType?: string;
  score?: number;
}

export default function QuestionCard({
  questionNo,
  questionText,
  passage,
  questionType,
  score,
}: QuestionCardProps) {
  return (
    <div className="space-y-3">
      {/* 문제 메타 */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white typography-caption-3 shrink-0">
          {questionNo}
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {questionType && (
            <span className="typography-caption-4 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
              {questionType}
            </span>
          )}
          {score != null && (
            <span className="typography-caption-4 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
              {score}점
            </span>
          )}
        </div>
      </div>

      {/* 지문 (passage) */}
      {passage && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl">
          <p className="typography-caption-3 text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wide">
            지문
          </p>
          <p className="typography-body-3 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {passage}
          </p>
        </div>
      )}

      {/* 질문 텍스트 */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <p className="typography-body-1 text-gray-900 dark:text-white leading-relaxed">
          {questionText}
        </p>
      </div>
    </div>
  );
}
