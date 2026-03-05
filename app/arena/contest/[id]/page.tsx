"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { LeaderboardTable } from "@/components/arena/leaderboard-table";
import { PersonalRankPanel } from "@/components/arena/personal-rank-panel";
import { InactivityWarning } from "@/components/arena/inactivity-warning";
import { CONTESTS, SNAPSHOT_INFO, CURRENT_USER } from "@/lib/mock-data";
import {
  ArrowLeft,
  Users,
  CalendarDays,
  Tag,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContestPage({
  params,
}: {
  params: { id: string };
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contest = CONTESTS.find((c) => c.id === params.id);
  if (!contest) notFound();

  const currentUserEntry = contest.leaderboard.find((e) => e.isCurrentUser);
  const totalCount = contest.participantCount;

  // Proximity: points gap to the rank above current user
  const currentUserRank = currentUserEntry?.rank ?? 0;
  const entryAbove = contest.leaderboard.find(
    (e) => e.rank === currentUserRank - 1
  );
  const proximityToNext = entryAbove && currentUserEntry
    ? entryAbove.score - currentUserEntry.score
    : 3;

  // Show inactivity warning for demo if user hasn't been active recently
  const showInactivity = currentUserEntry?.hasDecayRisk;

  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar active="arena" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="border-b border-[#e5e7eb] flex items-center gap-6 px-6 py-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-[#e5e7eb]" />
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/arena"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              Arena
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#1e293b] font-medium">{contest.title}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1131px] mx-auto px-6 py-10 flex flex-col gap-8">

            {/* Back nav */}
            <div className="animate-fade-in">
              <Link
                href="/arena"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All Contests
              </Link>
            </div>

            {/* Contest hero */}
            <div
              className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 animate-fade-in"
              style={{ animationDelay: "40ms" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 h-[22px] px-2 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded-[4px] tracking-wide">
                      <Tag className="h-3 w-3" />
                      {contest.taskType}
                    </span>
                    <span className="inline-flex items-center h-[22px] px-2 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-[4px] tracking-wide">
                      Active
                    </span>
                  </div>

                  <h1 className="text-[26px] font-bold text-[#1e293b] leading-tight mb-2">
                    {contest.title}
                  </h1>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[600px]">
                    {contest.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-3 flex-shrink-0 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-sm text-slate-500">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{contest.participantCount}</span>
                    <span>specialists</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4 text-slate-400" />
                    <span>Active since {contest.activeSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inactivity warning */}
            {showInactivity && (
              <div className="animate-fade-in" style={{ animationDelay: "60ms" }}>
                <InactivityWarning
                  daysInactive={12}
                  contestId={contest.id}
                />
              </div>
            )}

            {/* Two-column layout: Leaderboard + Personal Rank Panel */}
            <div
              className="flex gap-6 animate-fade-in items-start"
              style={{ animationDelay: "80ms" }}
            >
              {/* Leaderboard */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Leaderboard
                  </h2>
                  <div className="flex items-center gap-1.5 bg-white border border-[rgba(0,0,0,0.1)] px-2.5 py-0.5 rounded-[8px]">
                    <span className="text-xs font-medium text-slate-500">
                      {totalCount} specialists
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden py-1">
                  <LeaderboardTable
                    entries={contest.leaderboard}
                    currentUserId={CURRENT_USER.id}
                    totalCount={totalCount}
                    lastUpdated={SNAPSHOT_INFO.lastUpdated}
                    nextRefresh={SNAPSHOT_INFO.nextRefresh}
                    showLoadMore={true}
                  />
                </div>
              </div>

              {/* Personal Rank Panel */}
              <div className="w-[280px] flex-shrink-0 sticky top-6">
                {currentUserEntry ? (
                  <PersonalRankPanel
                    rank={currentUserEntry.rank}
                    totalParticipants={totalCount}
                    score={currentUserEntry.score}
                    rankChange={currentUserEntry.rankChange}
                    proximityToNext={proximityToNext}
                    lastActive={currentUserEntry.lastActive}
                    hasDecayRisk={currentUserEntry.hasDecayRisk}
                    contestId={contest.id}
                  />
                ) : (
                  /* Not yet ranked */
                  <div className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 flex flex-col items-center gap-4 text-center">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                      <Users className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-1">
                        Not yet ranked
                      </p>
                      <p className="text-xs text-slate-500">
                        Complete your first task to claim your rank
                      </p>
                    </div>
                    <Link
                      href={`/arena/contest/${contest.id}`}
                      className="flex items-center justify-center gap-2 h-[36px] w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-[8px] transition-colors btn-shadow"
                    >
                      Start Task
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
