import { ProgressBar } from "./ProgressBar";

interface DailyGoalCardProps {
  progress: number;
  goal: number;
}

export function DailyGoalCard({ progress, goal }: DailyGoalCardProps) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">Daily Goal</span>
        <button
          aria-label="Edit daily goal"
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          ✎
        </button>
      </div>
      <p className="text-2xl font-normal text-gray-400">{progress} min</p>
      <ProgressBar value={progress} max={goal} />
      <p className="text-xs text-gray-300 text-right">{goal} min</p>
    </div>
  );
}
