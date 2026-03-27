interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({ message = '불러오는 중...', fullPage = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        {content}
      </div>
    );
  }
  return <div className="flex justify-center py-12">{content}</div>;
}
