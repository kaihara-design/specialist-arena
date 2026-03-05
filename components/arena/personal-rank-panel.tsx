"use client";

import { useState } from "react";
import { TrendingUp, AlertTriangle, Target, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalRankPanelProps {
  rank: number;
  totalParticipants: number;
  score: number;
  rankChange: number;
  proximityToNext: number;
  lastActive: string;
  hasDecayRisk?: boolean;
}

export function PersonalRankPanel({
  rank,
  totalParticipants,
  score,
  rankChange,
  proximityToNext,
  lastActive,
  hasDecayRisk,
}: PersonalRankPanelProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

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

      {/* Score — number + info icon only */}
      <div className="bg-slate-50 rounded-[10px] px-4 py-3">
        <p className="text-xs font-medium text-slate-400 mb-1">Arena Score</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-extrabold text-slate-800">{score.toFixed(1)}</p>
          <div className="relative">
            <button
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Score info"
            >
              <Info className="h-4 w-4" />
            </button>
            {tooltipOpen && (
              <div className="absolute left-6 top-0 w-[200px] bg-slate-800 text-white text-xs rounded-[8px] px-3 py-2 z-10 leading-relaxed shadow-lg">
                Score combines accuracy, throughput &amp; recency. Formula pending final confirmation.
                <div className="absolute left-[-4px] top-2 w-2 h-2 bg-slate-800 rotate-45" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proximity to next rank */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Target className="h-3.5 w-3.5 text-indigo-400" />
        <span>
          <span className="font-semibold text-slate-700">{proximityToNext.toFixed(1)} pts</span>{" "}
          to reach rank #{rank - 1}
        </span>
      </div>

      {/* Decay risk */}
      {hasDecayRisk && (
        <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-[8px] px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Your score may drop soon — last active {lastActive}
          </span>
        </div>
      )}

    </div>
  );
}
