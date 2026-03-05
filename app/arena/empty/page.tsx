"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ContestCard } from "@/components/arena/contest-card";
import { Podium } from "@/components/arena/podium";
import { SnapshotTimestamp } from "@/components/arena/snapshot-timestamp";
import { LeaderboardRankBadge } from "@/components/arena/leaderboard-rank-badge";
import { CONTESTS, SNAPSHOT_INFO, LEADERBOARD_OUT_OF_TOP } from "@/lib/mock-data";
import { Trophy, Lock, ArrowRight, PanelLeft, Medal, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ArenaEmptyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const top3 = LEADERBOARD_OUT_OF_TOP.filter((e) => e.rank <= 3);

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

            {/* Hero CTA — first-time state */}
            <div
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-[14px] p-8 flex flex-col items-center text-center gap-4 animate-fade-in"
              style={{ animationDelay: "40ms" }}
            >
              <div className="h-14 w-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900 mb-1">
                  Your rank is waiting
                </h3>
                <p className="text-sm text-indigo-700 max-w-sm">
                  Complete your first Arena task to join the leaderboard and start competing with {CONTESTS[0].participantCount} specialists.
                </p>
              </div>
              <Link
                href="/arena/contest/skin-lesion"
                className="inline-flex items-center gap-2 h-[40px] px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-[8px] transition-colors btn-shadow"
              >
                Start Your First Arena Task
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-indigo-500 flex items-center gap-1.5">
                <Medal className="h-3.5 w-3.5" />
                Top performers earn rewards — winners contacted via email
              </p>
            </div>

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

            {/* Global Leaderboard — empty state */}
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
                      150 specialists
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

              {/* Podium — shown normally to create aspiration */}
              <div className="mb-6">
                <Podium top3={top3} />
              </div>

              {/* Ghost leaderboard rows with lock overlay */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden relative">
                {/* Ghost rows */}
                <div className="py-1">
                  {[4, 5, 6, 7, 8].map((rank) => (
                    <div
                      key={rank}
                      className="flex items-center gap-4 px-4 h-[48px] mx-2 rounded-[10px] select-none"
                    >
                      <div className="w-8 flex justify-center">
                        <div className="h-4 w-6 bg-slate-100 rounded animate-pulse" />
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="h-3.5 bg-slate-100 rounded animate-pulse" style={{ width: `${80 + rank * 10}px` }} />
                      </div>
                      <div className="h-4 w-12 bg-slate-100 rounded animate-pulse" />
                      <div className="h-3.5 w-8 bg-slate-100 rounded animate-pulse" />
                      <div className="h-3.5 w-14 bg-slate-100 rounded animate-pulse" />
                    </div>
                  ))}
                </div>

                {/* Lock overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px] rounded-[10px]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Complete your first Arena task
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        to claim your rank and see the full leaderboard
                      </p>
                    </div>
                    <Link
                      href="/arena/contest/skin-lesion"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      Get Started <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <SnapshotTimestamp
                  lastUpdated={SNAPSHOT_INFO.lastUpdated}
                  nextRefresh={SNAPSHOT_INFO.nextRefresh}
                />
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
