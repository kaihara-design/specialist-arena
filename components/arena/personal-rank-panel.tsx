import { TrendingUp, AlertTriangle, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PersonalRankPanelProps {
  rank: number;
  totalParticipants: number;
  score: number;
  rankChange: number;
  proximityToNext: number;
  lastActive: string;
  hasDecayRisk?: boolean;
  contestId: string;
}

export function PersonalRankPanel({
  rank,
  totalParticipants,
  score,
  rankChange,
  proximityToNext,
  lastActive,
  hasDecayRisk,
  contestId,
}: PersonalRankPanelProps) {
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

      {/* Score */}
      <div className="bg-slate-50 rounded-[10px] px-4 py-3">
        <p className="text-xs font-medium text-slate-400 mb-1">Arena Score</p>
        <p className="text-2xl font-extrabold text-slate-800">{score}</p>
        <p className="text-[10px] text-slate-400 mt-0.5">Formula pending confirmation</p>
      </div>

      {/* Score breakdown placeholder */}
      <div className="space-y-2.5">
        {[
          { label: "Accuracy", value: 78 },
          { label: "Throughput", value: 62 },
          { label: "Recency", value: 85 },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-slate-500">{label}</span>
              <span className="text-xs font-semibold text-slate-700">
                {value}%
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Proximity to next rank */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Target className="h-3.5 w-3.5 text-indigo-400" />
        <span>
          <span className="font-semibold text-slate-700">{proximityToNext} pts</span>{" "}
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

      {/* CTA */}
      <Link
        href={`/arena/contest/${contestId}`}
        className="flex items-center justify-center gap-2 h-[36px] w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-[8px] transition-colors btn-shadow"
      >
        Start Task
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
