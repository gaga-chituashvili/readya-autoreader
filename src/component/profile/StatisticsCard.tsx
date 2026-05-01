interface StatisticsCardProps {
  weeklyMinutes: number;
}

export function StatisticsCard({ weeklyMinutes }: StatisticsCardProps) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">Statistics</span>
        <span className="text-lg text-gray-300" aria-hidden>
          ›
        </span>
      </div>
      <p className="text-2xl font-normal text-gray-400">{weeklyMinutes} min</p>
      <p className="text-xs text-gray-300 mt-1">This week</p>
    </div>
  );
}
