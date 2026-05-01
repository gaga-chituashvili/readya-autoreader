interface StatisticsCardProps {
  weeklyMinutes: number;
}

export function StatisticsCard({ weeklyMinutes }: StatisticsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-black/[0.07] dark:border-white/[0.07] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Statistics
        </span>
        <span className="text-lg text-gray-300 dark:text-gray-600" aria-hidden>
          ›
        </span>
      </div>
      <p className="text-2xl font-normal text-gray-400 dark:text-gray-500">
        {weeklyMinutes} min
      </p>
      <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">This week</p>
    </div>
  );
}
