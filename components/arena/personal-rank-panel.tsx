"use client";

import { TrendingUp, Target, RefreshCw, AlertCircle, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIZE_BREAKDOWN } from "@/lib/mock-data";

interface PersonalRankPanelProps {
  rank: number;
  totalParticipants: number;
  score: number;
  readsThisWeek: number;
  minReads: number;
  maxReads: number;
  rankChange: number;
  scoreToNext: number;
  daysUntilReset: number;
}

export function PersonalRankPanel({
  rank,
  totalParticipants,
  score,
  readsThisWeek,
  minReads,
  maxReads,
  rankChange,
  scoreToNext,
  daysUntilReset,
}: PersonalRankPanelProps) {
  const readsProgress = Math.min((readsThisWeek / maxReads) * 100, 100);
  const isAtMax = readsThisWeek >= maxReads;
  const isBelowMin = readsThisWeek < minReads;
  const readsToMin = minReads - readsThisWeek;
  const potentialEarning = PRIZE_BREAKDOWN.find((p) => p.rank === rank)?.prize ?? null;

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

      {/* Score this cycle */}
      <div className="bg-slate-50 rounded-[10px] px-4 py-3">
        <p className="text-xs font-medium text-slate-400 mb-1">Score this cycle</p>
        <div className="flex items-end justify-between mb-2">
          <p className="text-2xl font-extrabold text-slate-800">
            {score.toFixed(1)}
          </p>
          <p className="text-xs text-slate-400 mb-0.5">
            {readsThisWeek} / {maxReads} cases
          </p>
        </div>
        {/* Reads progress bar */}
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isAtMax ? "bg-amber-400" : isBelowMin ? "bg-rose-400" : "bg-indigo-500"
            )}
            style={{ width: `${readsProgress}%` }}
          />
        </div>
        {isBelowMin && (
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Complete {readsToMin} more case{readsToMin !== 1 ? "s" : ""} to appear on the leaderboard.
          </p>
        )}
      </div>

      {/* Earning potential */}
      {potentialEarning !== null && !isBelowMin && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-[8px] px-3 py-2">
          <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
          <span>
            You&apos;re on track to earn{" "}
            <span className="font-bold">${potentialEarning}</span> this week
          </span>
        </div>
      )}

      {/* Bottom state */}
      {isAtMax ? (
        <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-[8px] px-3 py-2">
          <RefreshCw className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Weekly case limit reached — resets in {daysUntilReset} day{daysUntilReset !== 1 ? "s" : ""}
          </span>
        </div>
      ) : isBelowMin ? (
        <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-[8px] px-3 py-2">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>
            {readsToMin} more case{readsToMin !== 1 ? "s" : ""} needed to appear on the leaderboard
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Target className="h-3.5 w-3.5 text-indigo-400" />
          <span>
            <span className="font-semibold text-slate-700">{scoreToNext.toFixed(1)} pts</span>{" "}
            to reach rank #{rank - 1}
          </span>
        </div>
      )}
    </div>
  );
}
