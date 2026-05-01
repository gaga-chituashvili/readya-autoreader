import { DailyGoalCard } from "@/component/profile/DailyGoalCard";
import { StatisticsCard } from "@/component/profile/StatisticsCard";
import { HelpCard } from "@/component/profile/HelpCard";

const DAILY_GOAL_MINUTES = 15;
const DAILY_PROGRESS_MINUTES = 0;
const WEEKLY_MINUTES = 0;

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-3 pt-20">
      <div className="grid grid-cols-2 gap-3">
        <DailyGoalCard
          progress={DAILY_PROGRESS_MINUTES}
          goal={DAILY_GOAL_MINUTES}
        />
        <StatisticsCard weeklyMinutes={WEEKLY_MINUTES} />
      </div>

      <HelpCard />
    </div>
  );
}
