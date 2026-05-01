import { ProgressBar } from "./ProgressBar";

interface DailyGoalCardProps {
  progress: number;
  goal: number;
}

export function DailyGoalCard({ progress, goal }: DailyGoalCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-black/[0.07] dark:border-white/[0.07] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Daily Goal
        </span>
        <button
          aria-label="Edit daily goal"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm transition-colors"
        >
          ✎
        </button>
      </div>
      <p className="text-2xl font-normal text-gray-400 dark:text-gray-500">
        {progress} min
      </p>
      <ProgressBar value={progress} max={goal} />
      <p className="text-xs text-gray-300 dark:text-gray-600 text-right">
        {goal} min
      </p>
    </div>
  );
}
