const CHOICE_LABELS = ['①', '②', '③', '④', '⑤'];

/** 데이터에 이미 포함된 "① " 형태의 접두어 제거 */
function stripChoicePrefix(text: string): string {
  return text.replace(/^[①②③④⑤]\s*/, '');
}

type AnswerState = 'idle' | 'correct' | 'wrong';

interface ChoiceListProps {
  choices: string[];
  selectedIdx: number | null;   // 0-based, 사용자 선택
  correctIdx: number;            // 0-based, 정답
  answerState: AnswerState;
  onSelect: (idx: number) => void;
}

export default function ChoiceList({
  choices,
  selectedIdx,
  correctIdx,
  answerState,
  onSelect,
}: ChoiceListProps) {
  function getStyle(idx: number): string {
    const base =
      'w-full flex items-start gap-3 p-4 rounded-xl border text-left text-sm transition-all ';

    if (answerState === 'idle') {
      return (
        base +
        (selectedIdx === idx
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500 shadow-sm'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer active:scale-[0.98]')
      );
    }

    // 정답 확인 후
    if (idx === correctIdx) {
      return base + 'border-green-500 bg-green-50 dark:bg-green-900/30';
    }
    if (idx === selectedIdx && answerState === 'wrong') {
      return base + 'border-red-400 bg-red-50 dark:bg-red-900/30';
    }
    return base + 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-40';
  }

  function getLabelStyle(idx: number): string {
    const base =
      'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ';

    if (answerState === 'idle') {
      return (
        base +
        (selectedIdx === idx
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400')
      );
    }
    if (idx === correctIdx)
      return base + 'bg-green-500 text-white';
    if (idx === selectedIdx && answerState === 'wrong')
      return base + 'bg-red-400 text-white';
    return base + 'bg-gray-100 dark:bg-gray-700 text-gray-400';
  }

  return (
    <div className="space-y-2.5">
      {choices.map((choice, idx) => (
        <button
          key={idx}
          onClick={() => answerState === 'idle' && onSelect(idx)}
          disabled={answerState !== 'idle'}
          className={getStyle(idx)}
        >
          <span className={getLabelStyle(idx)}>
            {CHOICE_LABELS[idx] ?? idx + 1}
          </span>

          <span className="flex-1 text-gray-800 dark:text-gray-200 leading-relaxed text-left">
            {stripChoicePrefix(choice)}
          </span>

          {/* 정답 확인 후 아이콘 */}
          {answerState !== 'idle' && idx === correctIdx && (
            <svg className="shrink-0 w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {answerState === 'wrong' && idx === selectedIdx && (
            <svg className="shrink-0 w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
