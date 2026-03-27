interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = '데이터를 불러오지 못했습니다.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="text-4xl">⚠️</div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
