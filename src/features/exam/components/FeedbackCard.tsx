const CHOICE_LABELS = ['①', '②', '③', '④', '⑤'];

interface FeedbackCardProps {
  isCorrect: boolean;
  correctAnswer: number;   // 1-based
  selectedChoice: number;  // 1-based
  feedbackList: string[];  // 원본: "①:T_설명..." 형식
}

/** "①:T_설명..." → "설명..." 추출 */
function parseFeedbackText(raw: string): string {
  const match = raw.match(/^.+:[TF]_(.+)$/);
  return match ? match[1] : raw;
}

export default function FeedbackCard({
  isCorrect,
  correctAnswer,
  selectedChoice,
  feedbackList,
}: FeedbackCardProps) {
  // 사용자가 선택한 번호의 해설 (0-based index)
  const selectedFeedbackRaw = feedbackList[selectedChoice - 1] ?? '';
  const selectedFeedbackText = parseFeedbackText(selectedFeedbackRaw);

  // 틀렸을 때 정답 해설도 함께 (선택과 정답이 다를 때)
  const correctFeedbackRaw = feedbackList[correctAnswer - 1] ?? '';
  const correctFeedbackText = parseFeedbackText(correctFeedbackRaw);
  const showCorrectFeedback = !isCorrect && correctAnswer !== selectedChoice;

  return (
    <div className="space-y-3">
      {/* 결과 배너 */}
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border ${
          isCorrect
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
        }`}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            isCorrect ? 'bg-green-500' : 'bg-red-400'
          }`}
        >
          {isCorrect ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <div>
          <p className={`typography-body-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isCorrect ? '정답입니다!' : '오답입니다.'}
          </p>
          {!isCorrect && (
            <p className="typography-caption-4 text-gray-500 dark:text-gray-400 mt-0.5">
              정답: <strong className="text-gray-700 dark:text-gray-200">{CHOICE_LABELS[correctAnswer - 1]} ({correctAnswer}번)</strong>
            </p>
          )}
        </div>
      </div>

      {/* 선택한 번호 해설 */}
      {selectedFeedbackText && (
        <div
          className={`p-4 rounded-xl border ${
            isCorrect
              ? 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-800'
              : 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-800'
          }`}
        >
          <p className="typography-caption-3 text-gray-500 dark:text-gray-400 mb-1.5">
            {CHOICE_LABELS[selectedChoice - 1]} 선택 해설
          </p>
          <p className={`typography-body-3 leading-relaxed ${
            isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {selectedFeedbackText}
          </p>
        </div>
      )}

      {/* 정답 해설 (오답일 때만) */}
      {showCorrectFeedback && correctFeedbackText && (
        <div className="p-4 rounded-xl border bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-800">
          <p className="typography-caption-3 text-gray-500 dark:text-gray-400 mb-1.5">
            {CHOICE_LABELS[correctAnswer - 1]} 정답 해설
          </p>
          <p className="typography-body-3 leading-relaxed text-green-800 dark:text-green-300">
            {correctFeedbackText}
          </p>
        </div>
      )}
    </div>
  );
}
