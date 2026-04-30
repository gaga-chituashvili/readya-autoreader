function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div
      className="h-1 w-full bg-gray-100 rounded-full mt-3 mb-1"
      role="progressbar"
    >
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-3 pt-20">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-black/[0.07] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              Daily Goal
            </span>
            <button className="text-gray-400 hover:text-gray-600 text-sm">
              ✎
            </button>
          </div>
          <p className="text-2xl font-normal text-gray-400">0 min</p>
          <ProgressBar value={0} max={15} />
          <p className="text-xs text-gray-300 text-right">15 min</p>
        </div>

        <div className="bg-white border border-black/[0.07] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              Statistics
            </span>
            <span className="text-lg text-gray-300">›</span>
          </div>
          <p className="text-2xl font-normal text-gray-400">0 min</p>
          <p className="text-xs text-gray-300 mt-1">This week</p>
        </div>
      </div>

      <div className="bg-white border border-black/[0.07] rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            Have an idea?
          </span>
          <button className="px-3.5 py-1.5 rounded-lg border border-black/[0.15] bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors">
            Share Your Thoughts
          </button>
        </div>
        <hr className="my-3 border-black/[0.06]" />
        <p className="text-sm font-medium text-gray-900 mb-2.5">Get Help</p>
        <div className="flex gap-2">
          {[
            { icon: "💬", label: "WhatsApp" },
            { icon: "🗨", label: "Start Chat" },
            { icon: "✉", label: "Email" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-black/[0.08] bg-white text-xs text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span aria-hidden>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
