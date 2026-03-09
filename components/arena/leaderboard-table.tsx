"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
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

function LeaderboardRow({
  entry,
  index,
}: {
  entry: LeaderboardEntry;
  index: number;
}) {
  const isCurrentUser = entry.isCurrentUser;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 rounded-[10px] transition-colors",
        isCurrentUser
          ? "h-[60px] bg-[#eef2ff] border border-[#e0e7ff]"
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
        </div>
      </div>

      {/* Right: score + trend */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <span className="text-sm font-extrabold text-slate-800">
          {entry.score.toFixed(1)}
        </span>
        <div className="w-12 flex justify-center">
          <TrendIndicator change={entry.rankChange} />
        </div>
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
