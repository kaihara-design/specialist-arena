"use client";

import { TrendingUp, Target, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalRankPanelProps {
  rank: number;
  totalParticipants: number;
  earnings: number;
  earningCap: number;
  rankChange: number;
  earningsToNext: number;
  lastActive: string;
  isCapped?: boolean;
}

export function PersonalRankPanel({
  rank,
  totalParticipants,
  earnings,
  earningCap,
  rankChange,
  earningsToNext,
  lastActive,
  isCapped,
}: PersonalRankPanelProps) {
  const capProgress = Math.min((earnings / earningCap) * 100, 100);
  const hasEarnings = earnings > 0;

  return (
    <div className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Your Ranking
        </p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-slate-800">#{rank}</span>
          <span className="text-sm text-slate-400 mb-1">
            of {totalParticipants}
          </span>
        </div>
        {rankChange !== 0 && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium mt-1",
              rankChange > 0 ? "text-emerald-600" : "text-red-500"
            )}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            {rankChange > 0 ? `↑ Up ${rankChange}` : `↓ Down ${Math.abs(rankChange)}`} since last update
          </div>
        )}
      </div>

      {/* Earnings this cycle */}
      <div className="bg-slate-50 rounded-[10px] px-4 py-3">
        <p className="text-xs font-medium text-slate-400 mb-1">Earned this cycle</p>
        <div className="flex items-end justify-between mb-2">
          <p className="text-2xl font-extrabold text-slate-800">
            ${earnings.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 mb-0.5">
            of ${earningCap} cap
          </p>
        </div>
        {/* Progress bar toward cap */}
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isCapped ? "bg-amber-400" : "bg-indigo-500"
            )}
            style={{ width: `${capProgress}%` }}
          />
        </div>
        {!hasEarnings && (
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Reads are assessed individually. Only qualified reads earn.
          </p>
        )}
      </div>

      {/* Proximity to next rank OR capped state */}
      {isCapped ? (
        <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-[8px] px-3 py-2">
          <RefreshCw className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Weekly cap reached — your earnings reset in {4} days
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Target className="h-3.5 w-3.5 text-indigo-400" />
          <span>
            <span className="font-semibold text-slate-700">${earningsToNext.toFixed(2)}</span>{" "}
            to reach rank #{rank - 1}
          </span>
        </div>
      )}
    </div>
  );
}
