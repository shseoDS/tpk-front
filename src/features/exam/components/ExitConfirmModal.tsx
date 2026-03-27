interface ExitConfirmModalProps {
  onContinue: () => void;
  onExit: () => void;
}

export default function ExitConfirmModal({ onContinue, onExit }: ExitConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* 딤 배경 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onContinue}
      />

      {/* 모달 */}
      <div className="relative w-full sm:max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-8" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              시험을 종료하시겠습니까?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              지금까지의 진행 상황은 저장됩니다.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={onContinue}
              className="w-full py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              계속 진행하기
            </button>
            <button
              onClick={onExit}
              className="w-full py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              종료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
