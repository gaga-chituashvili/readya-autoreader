import { Dot } from "lucide-react";
import type { FeatureCardProps } from "@/types/home.type";

export const FeatureCard = ({ item }: FeatureCardProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
      <ul className="space-y-2">
        {item.points.map((point: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <Dot className="w-4 h-4" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};
