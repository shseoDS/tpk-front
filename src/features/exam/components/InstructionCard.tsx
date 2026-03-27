interface InstructionCardProps {
  fullSentence: string;
  paragraph?: string | null;
}

export default function InstructionCard({ fullSentence, paragraph }: InstructionCardProps) {
  return (
    <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 overflow-hidden mb-4">
      {/* 지시문 헤더 */}
      <div className="bg-indigo-50 dark:bg-indigo-900/30 px-4 py-3 flex items-start gap-2">
        <span className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </span>
        <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200 leading-relaxed">
          {fullSentence}
        </p>
      </div>

      {/* 독해 지문 (있을 때만) */}
      {paragraph && (
        <div className="bg-white dark:bg-gray-800/60 px-4 py-4 border-t border-indigo-100 dark:border-indigo-800/60">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {paragraph}
          </p>
        </div>
      )}
    </div>
  );
}
