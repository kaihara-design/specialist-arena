"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ContestCard } from "@/components/arena/contest-card";
import { LeaderboardTable } from "@/components/arena/leaderboard-table";
import { Podium } from "@/components/arena/podium";
import { InactivityWarning } from "@/components/arena/inactivity-warning";
import { CONTESTS, SNAPSHOT_INFO, LEADERBOARD_OUT_OF_TOP, CURRENT_USER } from "@/lib/mock-data";
import { Trophy, X, PanelLeft, Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ArenaPage() {
  const [rewardBannerDismissed, setRewardBannerDismissed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const top3 = LEADERBOARD_OUT_OF_TOP.filter((e) => e.rank <= 3);
  const totalCount = 150;

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
          <h1 className="text-base font-semibold text-[#1e293b]">Arena</h1>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1131px] mx-auto px-6 py-10 flex flex-col gap-10">

            {/* Page header */}
            <div className="flex items-center justify-between animate-fade-in">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 bg-indigo-50 rounded-[10px] flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-[30px] font-bold text-[#1e293b] leading-[36px]">
                    Specialist Arena
                  </h2>
                </div>
                <p className="text-base text-slate-500 ml-12">
                  Compete against all specialists. Rank by accuracy, throughput &amp; recency.
                </p>
              </div>
            </div>

            {/* Reward callout banner */}
            {!rewardBannerDismissed && (
              <div
                className="flex items-center gap-3 px-5 py-3 bg-indigo-50 border border-indigo-100 rounded-[14px] animate-fade-in"
                style={{ animationDelay: "60ms" }}
              >
                <Medal className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                <p className="flex-1 text-sm font-medium text-indigo-700">
                  Top performers will earn rewards — winners contacted via email
                </p>
                <button
                  onClick={() => setRewardBannerDismissed(true)}
                  className="text-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Active Contests */}
            <section
              className="animate-fade-in"
              style={{ animationDelay: "80ms" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Active Contests
                </h3>
                <span className="text-base font-normal text-slate-500">
                  {CONTESTS.length} open now
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {CONTESTS.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </section>

            {/* Global Leaderboard */}
            <section
              className="animate-fade-in"
              style={{ animationDelay: "120ms" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Global Leaderboard
                  </h3>
                  <div className="flex items-center gap-1.5 bg-white border border-[rgba(0,0,0,0.1)] px-2.5 py-0.5 rounded-[8px]">
                    <span className="text-xs font-medium text-slate-500">
                      {totalCount} specialists
                    </span>
                  </div>
                </div>
                <Link
                  href="/arena/contest/skin-lesion"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  View full leaderboard →
                </Link>
              </div>

              {/* Podium */}
              <div className="mb-6">
                <Podium top3={top3} />
              </div>

              {/* Leaderboard table */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden py-1">
                <LeaderboardTable
                  entries={LEADERBOARD_OUT_OF_TOP}
                  currentUserId={CURRENT_USER.id}
                  totalCount={totalCount}
                  lastUpdated={SNAPSHOT_INFO.lastUpdated}
                  nextRefresh={SNAPSHOT_INFO.nextRefresh}
                  showLoadMore={false}
                />
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
