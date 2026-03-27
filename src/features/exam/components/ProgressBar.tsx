interface ProgressBarProps {
  current: number; // 1-based
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-blue-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 tabular-nums">
        {current} / {total}
      </span>
    </div>
  );
}
