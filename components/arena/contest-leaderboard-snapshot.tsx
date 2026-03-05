import Link from "next/link";
import type { Contest } from "@/lib/types";
import { LeaderboardRankBadge } from "./leaderboard-rank-badge";
import { SnapshotTimestamp } from "./snapshot-timestamp";

interface ContestLeaderboardSnapshotProps {
  contests: Contest[];
  currentUserId: string;
  lastUpdated: string;
  nextRefresh: string;
  topN?: number;
}

export function ContestLeaderboardSnapshot({
  contests,
  currentUserId,
  lastUpdated,
  nextRefresh,
  topN = 5,
}: ContestLeaderboardSnapshotProps) {
  // Build a map: contestId → top N leaderboard entries
  const contestTopEntries = contests.map((c) => {
    const top = c.leaderboard
      .filter((e) => e.rank <= topN)
      .sort((a, b) => a.rank - b.rank);
    return { contest: c, entries: top };
  });

  const ranks = Array.from({ length: topN }, (_, i) => i + 1);

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Table header */}
      <div
        className="grid items-center px-4 py-3 border-b border-slate-100 bg-slate-50/60"
        style={{ gridTemplateColumns: `80px repeat(${contests.length}, 1fr)` }}
      >
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Rank
        </span>
        {contestTopEntries.map(({ contest }) => (
          <Link
            key={contest.id}
            href={`/arena/contest/${contest.id}`}
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors underline-offset-2 hover:underline truncate pr-4"
          >
            {contest.title}
          </Link>
        ))}
      </div>

      {/* Rows — one per rank position */}
      <div className="divide-y divide-slate-50">
        {ranks.map((rank) => {
          // Check if current user appears in this rank row in any contest
          const userInThisRow = contestTopEntries.some(({ entries }) =>
            entries.find((e) => e.rank === rank && e.isCurrentUser)
          );

          return (
            <div
              key={rank}
              className={`grid items-center px-4 h-[52px] transition-colors ${
                userInThisRow
                  ? "bg-[#eef2ff]"
                  : "hover:bg-slate-50"
              }`}
              style={{ gridTemplateColumns: `80px repeat(${contests.length}, 1fr)` }}
            >
              {/* Rank column */}
              <div className="flex items-center">
                <LeaderboardRankBadge rank={rank} />
              </div>

              {/* One cell per contest */}
              {contestTopEntries.map(({ contest, entries }) => {
                const entry = entries.find((e) => e.rank === rank);
                const isCurrentUser = entry?.isCurrentUser ?? false;

                return (
                  <div key={contest.id} className="flex items-center gap-2 pr-4 min-w-0">
                    {entry ? (
                      <span
                        className={`text-sm truncate ${
                          isCurrentUser
                            ? "font-extrabold text-indigo-700"
                            : "font-medium text-slate-700"
                        }`}
                      >
                        {isCurrentUser
                          ? `${entry.displayName ?? entry.specialistId} `
                          : entry.specialistId}
                        {isCurrentUser && (
                          <span className="text-indigo-600 font-extrabold">(You)</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-300">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Timestamp */}
      <div className="border-t border-slate-100">
        <SnapshotTimestamp lastUpdated={lastUpdated} nextRefresh={nextRefresh} />
      </div>
    </div>
  );
}
