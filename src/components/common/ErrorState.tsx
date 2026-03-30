import SLButton from '@/components/common/SLButton';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = '데이터를 불러오지 못했습니다.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="text-4xl">⚠️</div>
      <p className="typography-body-3 text-gray-500 dark:text-gray-400">{message}</p>
      {onRetry && (
        <SLButton onClick={onRetry}>다시 시도</SLButton>
      )}
    </div>
  );
}
