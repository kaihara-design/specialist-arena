import type { LeaderboardEntry } from "@/lib/types";
import { PRIZE_BREAKDOWN } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface PodiumProps {
  top3: LeaderboardEntry[];
}

const podiumConfig = [
  {
    rank: 2,
    order: 0,
    blockHeight: "h-[68px]",
    blockBg: "bg-gradient-to-b from-slate-300 to-slate-400",
    rankText: "text-slate-50",
  },
  {
    rank: 1,
    order: 1,
    blockHeight: "h-[90px]",
    blockBg: "bg-gradient-to-b from-amber-300 to-amber-400",
    rankText: "text-amber-50",
  },
  {
    rank: 3,
    order: 2,
    blockHeight: "h-[52px]",
    blockBg: "bg-gradient-to-b from-orange-300 to-orange-400",
    rankText: "text-orange-50",
  },
];

export function Podium({ top3 }: PodiumProps) {
  return (
    <div className="flex items-end gap-3 justify-center">
      {podiumConfig.map(({ rank, order, blockHeight, blockBg, rankText }) => {
        const entry = top3.find((e) => e.rank === rank);
        if (!entry) return null;

        const prize = PRIZE_BREAKDOWN.find((p) => p.rank === rank)?.prize;

        return (
          <div
            key={rank}
            className="flex-1 max-w-[200px] flex flex-col items-center animate-fade-in"
            style={{ animationDelay: `${order * 80}ms` }}
          >
            {/* Info above block */}
            <p className="text-xs font-semibold text-slate-700 leading-tight text-center truncate w-full mb-0.5">
              {entry.specialistId}
            </p>
            <p className="text-sm font-extrabold text-slate-800">
              {entry.score.toFixed(1)}
            </p>
            {prize && (
              <p className="text-xs font-bold text-amber-500 mb-3">${prize}</p>
            )}

            {/* Podium block */}
            <div
              className={cn(
                "w-full rounded-t-[10px] flex items-center justify-center",
                blockHeight,
                blockBg
              )}
            >
              <span className={cn("text-2xl font-black", rankText)}>
                {rank}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
