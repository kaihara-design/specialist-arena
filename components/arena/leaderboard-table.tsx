"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/types";
import { LeaderboardRankBadge } from "./leaderboard-rank-badge";
import { SnapshotTimestamp } from "./snapshot-timestamp";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  totalCount: number;
  lastUpdated: string;
  nextRefresh: string;
  showLoadMore?: boolean;
}

function TrendIndicator({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
        <TrendingUp className="h-3 w-3" />+{change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-500">
        <TrendingDown className="h-3 w-3" />
        {change}
      </span>
    );
  }
  return <Minus className="h-3 w-3 text-slate-300" />;
}

function ScoreSlot({ score }: { score: number }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <span className="text-sm font-extrabold text-slate-800">{score.toFixed(1)}</span>
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip((v) => !v)}
        className="text-slate-300 hover:text-slate-500 transition-colors"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 w-52 bg-white border border-slate-200 rounded-[10px] shadow-lg p-3 z-50 animate-fade-in">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            Score breakdown
          </p>
          <div className="space-y-2">
            {[
              { label: "Accuracy", value: 78 },
              { label: "Throughput", value: 62 },
              { label: "Recency", value: 85 },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-medium text-slate-700">
                    {value}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Formula pending confirmation
          </p>
        </div>
      )}
    </div>
  );
}

function LeaderboardRow({
  entry,
  index,
}: {
  entry: LeaderboardEntry;
  index: number;
}) {
  const isCurrentUser = entry.isCurrentUser;
  const isDecayRisk = entry.hasDecayRisk;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 rounded-[10px] transition-colors",
        isCurrentUser
          ? "h-[60px] bg-[#eef2ff] border border-[#e0e7ff]"
          : isDecayRisk
            ? "h-[48px] bg-amber-50 hover:bg-amber-100"
            : "h-[48px] hover:bg-slate-50",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 20}ms` }}
    >
      {/* Left: rank + name */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <LeaderboardRankBadge rank={entry.rank} />
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              "text-sm whitespace-nowrap",
              isCurrentUser
                ? "font-extrabold text-slate-800"
                : "font-medium text-slate-600"
            )}
          >
            {entry.specialistId}
          </span>
          {isCurrentUser && (
            <span className="text-sm font-extrabold text-indigo-600">
              (You)
            </span>
          )}
          {entry.isNew && (
            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-full">
              NEW
            </span>
          )}
          {isDecayRisk && (
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
              ⚠ score at risk
            </span>
          )}
        </div>
      </div>

      {/* Right: score + trend + last active */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <ScoreSlot score={entry.score} />
        <div className="w-12 flex justify-center">
          <TrendIndicator change={entry.rankChange} />
        </div>
        <span className="text-xs text-slate-400 w-16 text-right">
          {entry.lastActive}
        </span>
      </div>
    </div>
  );
}

export function LeaderboardTable({
  entries,
  currentUserId,
  totalCount,
  lastUpdated,
  nextRefresh,
  showLoadMore = true,
}: LeaderboardTableProps) {
  const [showAll, setShowAll] = useState(false);

  const currentUserEntry = entries.find((e) => e.isCurrentUser);
  const currentUserRank = currentUserEntry?.rank ?? 999;

  // Determine layout mode
  const isInTop20 = currentUserRank <= 20;

  if (isInTop20) {
    // Single continuous list
    const topEntries = entries.filter((e) => e.rank <= 20);
    const visibleEntries = showAll ? topEntries : topEntries.slice(0, 10);
    const hasMore = topEntries.length > 10 && !showAll;

    return (
      <div>
        {/* Column headers */}
        <div className="flex items-center justify-between px-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="w-6 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Specialist
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Score
            </span>
            <div className="w-12 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Trend
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-16 text-right">
              Last active
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {visibleEntries.map((entry, i) => (
            <LeaderboardRow key={entry.rank} entry={entry} index={i} />
          ))}
        </div>

        {hasMore && showLoadMore && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-2 w-full py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-[10px] transition-colors"
          >
            Load more
          </button>
        )}

        <SnapshotTimestamp lastUpdated={lastUpdated} nextRefresh={nextRefresh} />
      </div>
    );
  }

  // Two-section layout: TOP PERFORMERS + YOUR RANKING
  const topEntries = entries.filter((e) => e.rank <= 20);
  const visibleTop = showAll ? topEntries : topEntries.slice(0, 5);
  const hasMore = topEntries.length > 5 && !showAll;

  const neighborEntries = entries.filter(
    (e) =>
      e.rank === currentUserRank - 1 ||
      e.rank === currentUserRank ||
      e.rank === currentUserRank + 1
  );

  return (
    <div>
      {/* Column headers */}
      <div className="flex items-center justify-between px-6 pb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Specialist
        </span>
        <div className="flex items-center gap-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Score
          </span>
          <div className="w-12 text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Trend
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-16 text-right">
            Last active
          </span>
        </div>
      </div>

      {/* TOP PERFORMERS section */}
      <div className="flex items-center px-6 py-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Top Performers
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {visibleTop.map((entry, i) => (
          <LeaderboardRow key={entry.rank} entry={entry} index={i} />
        ))}
      </div>

      {hasMore && showLoadMore && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-1 w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-[10px] transition-colors"
        >
          Load more ({topEntries.length - 5} more)
        </button>
      )}

      {/* YOUR RANKING section */}
      <div className="flex items-center px-6 pt-4 pb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Your Ranking
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {neighborEntries.map((entry, i) => (
          <LeaderboardRow key={entry.rank} entry={entry} index={i} />
        ))}
      </div>

      <SnapshotTimestamp lastUpdated={lastUpdated} nextRefresh={nextRefresh} />
    </div>
  );
}
