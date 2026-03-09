import type { LeaderboardEntry } from "@/lib/types";
import { LeaderboardRankBadge } from "./leaderboard-rank-badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodiumProps {
  top3: LeaderboardEntry[];
}

const podiumConfig = [
  {
    rank: 2,
    order: 0,
    height: "h-[120px]",
    bg: "bg-gradient-to-b from-slate-50 to-slate-100",
    border: "border-slate-200",
    label: "2nd",
  },
  {
    rank: 1,
    order: 1,
    height: "h-[148px]",
    bg: "bg-gradient-to-b from-amber-50 to-amber-100",
    border: "border-amber-200",
    label: "1st",
  },
  {
    rank: 3,
    order: 2,
    height: "h-[100px]",
    bg: "bg-gradient-to-b from-orange-50 to-orange-100",
    border: "border-orange-200",
    label: "3rd",
  },
];

export function Podium({ top3 }: PodiumProps) {
  return (
    <div className="flex items-end gap-3 justify-center">
      {podiumConfig.map(({ rank, order, height, bg, border }) => {
        const entry = top3.find((e) => e.rank === rank);
        if (!entry) return null;

        return (
          <div
            key={rank}
            className={cn(
              "flex-1 max-w-[200px] border rounded-[14px] p-4 flex flex-col items-center justify-end gap-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] animate-fade-in",
              height,
              bg,
              border
            )}
            style={{ animationDelay: `${order * 80}ms` }}
          >
            <LeaderboardRankBadge rank={rank} size="md" />
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-700 leading-tight">
                {entry.specialistId}
              </p>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                {entry.score.toFixed(1)}
              </p>
            </div>
            {entry.rankChange !== 0 && (
              <div
                className={cn(
                  "flex items-center gap-0.5 text-[10px] font-medium",
                  entry.rankChange > 0
                    ? "text-emerald-600"
                    : "text-red-500"
                )}
              >
                {entry.rankChange > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {entry.rankChange > 0 ? "+" : ""}
                {entry.rankChange}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
